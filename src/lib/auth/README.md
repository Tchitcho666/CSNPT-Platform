# Authentication architecture (not implemented)

This document records the approved CSNPT authentication direction. It is
architecture guidance only: there are no authentication functions, endpoints,
providers, cookies, or UI in this directory.

## A. Account identity

`Account` in `prisma/schema.prisma` is already the login identity. It has a
unique email, `emailVerifiedAt`, account status, role values, timestamps, and
`lastLoginAt`. No password field should be added for the approved email OTP
flow. The unique constraint alone does not define case normalization; the
future identity service must canonicalize email consistently before lookup
and persistence, with the database constraint remaining the final duplicate
guard.

Account onboarding and treatment of unknown email addresses are not defined by
the current schema. Decide whether accounts are provisioned before login or
created through a separately approved onboarding flow before designing the
OTP challenge relation.

## B. Profile separation

`Profile` is a separate one-to-one relation from `Account`. It contains
professional/profile fields and optional directory consent. `ProfessionalVerification`
and `Membership` are separate models and remain independent of authentication.
Authentication must not add child, diagnosis, treatment, or other clinical
records.

## C. Email OTP lifecycle (launch)

Approved policy: six decimal digits, one use, ten-minute lifetime, and no more
than five verification attempts per issued code. These values are policy
requirements; no challenge storage or OTP behavior exists yet.

Before implementation, add a dedicated OTP challenge model rather than
overloading `Account` or the formation-schedule `Session`. A minimal candidate
shape is: challenge ID, account reference (subject to the onboarding decision
above), keyed code digest, expiry, attempt count, consumed/invalidation time,
and creation time. Store no plaintext OTP. Because a six-digit code has low
entropy, use a server-held HMAC/pepper key for the digest; a plain unsalted
hash is insufficient against a database read. Verification must atomically
check expiry/attempt count and consume the challenge once, including under
concurrent requests. Issuing a replacement must invalidate prior active
challenges for the same identity.

Do not log codes, digests, email delivery tokens, or full challenge payloads.
The delivery provider and account-enumeration-safe response behavior remain
implementation decisions.

## D. Session lifecycle (launch)

The existing `Session` model is specifically a formation schedule. It is not
an authentication session and must not be repurposed. Add a separately named
`AuthSession` model when session implementation is approved. A minimal
candidate stores account ID, a unique hash of a high-entropy opaque session
token, expiry, revocation time, creation time, and optionally last-seen time.
The browser receives only the opaque token in a `Secure`, `HttpOnly`,
appropriately `SameSite` cookie. Never store the raw token or put it in
client-readable storage. Server-side checks enforce expiry, revocation, and
account status. Session duration, rotation, concurrent-session, and logout-all
policies still need decisions.

## E. Admin TOTP (launch)

`Account.roles` currently supports `SUPER_ADMIN`, `BUREAU`, `EDITOR`, and
`REVIEWER`, but there is no MFA credential or enforcement. Admin roles must
not receive an authenticated administrative session until email OTP and
authenticator-app TOTP have both succeeded. A future credential record should
have a one-to-one account relation, encrypted TOTP secret ciphertext, key
version, enabled/created/updated timestamps, and the last accepted time-step
or equivalent replay guard. Encrypt the seed with a key held outside the
database, such as the deployment secret manager. Never return it after
enrollment confirmation.

## F. Recovery codes (launch for admins)

There is no recovery-code model. Add a separate record per code with account
reference, keyed/hash representation, used time, and creation time. Show raw
codes only once at issuance; persist only hashes, consume atomically, and
revoke prior unused codes when a replacement set is issued. Define code count,
format, and recovery/support governance before implementation.

## G. Authorization boundary

The current repository/service boundary is documented in
`src/lib/repositories/README.md`; current repositories are static adapters.
There is no authentication-aware authorization module, `can(user, action)`
policy, route protection, or server-side role enforcement. Future authorization
must be centralized in a server-only policy boundary and checked by every
protected server action, route handler, and data service. Hiding UI controls is
not authorization.

The current enum contains administrative roles only. A normal authenticated
account should not be treated as a professional merely because it has an
account. Membership and professional verification remain separate facts and
must be considered explicitly by policy. A visitor is unauthenticated; no
parent account or child identity is part of this model.

## H. Security and rate limits

Rate limiting is required but no limiter or policy exists. Before launch,
protect OTP issuance and verification using shared limits that work across
multiple application instances, with controls by identity and network source,
cooldowns, abuse monitoring, and generic responses that avoid account
enumeration. Exact thresholds, window lengths, proxy/IP trust rules, and
retention need a security decision. If limits are persisted in PostgreSQL,
design a minimal expiring bucket/attempt record or select an approved shared
rate-limit service; do not rely on per-process memory in production.

Keep OTP digests, session tokens, TOTP seeds, recovery codes, and encryption
keys out of client bundles and logs. Use TLS, secure cookie settings, CSRF
protections appropriate to cookie-authenticated mutations, atomic state
transitions, and generic external errors. No authentication secret belongs in
`NEXT_PUBLIC_*` configuration.

## I. Audit events

`AuditLog` already provides an optional actor, action, entity type/ID, before/
after summaries, IP/user-agent fields, and timestamp. It can represent events
such as OTP requested/verified/denied, session created/revoked, TOTP enrolled
or challenged, recovery code used, and role/status changes. No auth event
writer or append-only enforcement currently exists. Future server-only code
must append security events, deny update/delete behavior, avoid placing OTPs,
tokens, TOTP seeds, recovery codes, or unnecessary personal data in summaries,
and define access/retention policy before storing IP and user-agent data.

## J. Launch vs. Phase 2

**Launch:** email OTP; six digits; one use; ten-minute expiry; five-attempt
maximum; shared rate limiting; server-side sessions in secure HTTP-only
cookies; admin TOTP in addition to email OTP; admin recovery codes;
centralized authorization; security audit events.

**Phase 2:** passkeys. SMS OTP is outside launch scope. Passwords, parent
accounts, and child/clinical records are not part of the approved design.

## K. What waits for PostgreSQL

PostgreSQL production activation is deferred to deployment handover. The
existing database client is lazy and requires `DATABASE_URL` only when called;
the current application can remain local without it as long as no database
service is invoked. The initial migration has not been confirmed applied to a
database. Do not implement or validate persistent auth flows until the
development/production database environment, migration process, and secret
management are available. At that point, approve the minimal OTP, auth-session,
admin-TOTP, and recovery-code schema additions and their migration before
implementing delivery, cookies, or authorization.

## Current schema gap summary

Existing: `Account`, separate `Profile`, separate `ProfessionalVerification`
and `Membership`, administrative role enum values, and a general `AuditLog`.
Missing: email OTP challenge persistence, authentication sessions, admin TOTP
credentials, recovery-code records, rate-limit persistence/provider, and
authorization enforcement. No schema changes are made by this documentation.
