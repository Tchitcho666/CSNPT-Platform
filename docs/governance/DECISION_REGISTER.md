# CSNPT Governance Decision Register

**Purpose:** Record governance decisions required before public institutional,
directory, membership, formation, or clinical-resource claims and workflows are
implemented or published.

**Register status:** All decisions below are **PENDING CONFIRMATION**. This
document records questions and safe publication defaults only; it does not
approve institutional facts or make decisions on behalf of the CSNPT.

**Use:** The appropriate CSNPT authority must record the decision, supporting
evidence, approver, and date for each item. Until then, a proposed safe default
is guidance for avoiding unsupported publication, not an approved policy.

## Decision register

### GOV-001 — Official identity and legal status

- **Topic:** Official CSNPT name, legal form/status, and approved descriptions.
- **Current evidence from audit:** Source files use several French and English
  names and describe CSNPT as a national chamber/union. The audit found no
  authoritative legal document in the inspected public-site source.
- **Decision required:** Confirm the exact official name in FR/AR/EN, legal
  status, and wording permitted for public use; identify the source document.
- **Current status:** PENDING CONFIRMATION
- **Proposed safe default:** Publish only the name and status supported by an
  approved document; avoid legal-status claims until confirmed.
- **Implementation depends on:** Homepage, metadata, footer, contact,
  membership, legal pages, and institutional history.

### GOV-002 — UTICA / institutional relationship wording

- **Topic:** Whether and how the relationship with UTICA or another institution
  may be described or displayed.
- **Current evidence from audit:** UTICA affiliation wording appears in the
  footer and in static homepage-related data/components. No supporting approval
  source was established by the audit.
- **Decision required:** Confirm whether a relationship may be stated and
  provide the exact approved wording, scope, and any required mark usage.
- **Current status:** PENDING CONFIRMATION
- **Proposed safe default:** Do not state or imply affiliation, supervision,
  endorsement, or authorization without written confirmation.
- **Implementation depends on:** Homepage, footer, metadata, membership,
  formations, and institutional pages.

### GOV-003 — Official address and contact details

- **Topic:** Public postal address, telephone numbers, email addresses, and
  which channels are official.
- **Current evidence from audit:** Contact details are hardcoded in the footer,
  contact page, and static organization/practitioner data. The audit did not
  verify ownership, currentness, or public-use approval.
- **Decision required:** Confirm each public contact channel, its owner, and
  whether a physical address should be published.
- **Current status:** PENDING CONFIRMATION
- **Proposed safe default:** Show only contact details explicitly approved for
  public contact; omit personal or unverified addresses and telephone numbers.
- **Implementation depends on:** Footer, contact page, contact API, privacy
  notice, and organization configuration.

### GOV-004 — Current Bureau, presidency, and secretariat

- **Topic:** Current office holders, titles, terms, and public contact roles.
- **Current evidence from audit:** A practitioner record and public text refer
  to a president/presidency and secretariat. No current official Bureau roster
  or term evidence was established.
- **Decision required:** Confirm whether a public roster is wanted and provide
  approved names, titles, term dates, and source/authorization for publication.
- **Current status:** PENDING CONFIRMATION
- **Proposed safe default:** Do not publish a current-member roster or imply a
  current role based only on static source data.
- **Implementation depends on:** Homepage, institutional/about page, footer,
  directory profile claims, and administration/content ownership.

### GOV-005 — Founders and institutional history

- **Topic:** Founding facts, dates, milestones, and historical narrative.
- **Current evidence from audit:** No dedicated institutional-history route or
  approved historical source was found; the footer links to a missing
  `/a-propos` route.
- **Decision required:** Decide whether to publish history and approve the
  source documents, names, dates, and narrative.
- **Current status:** PENDING CONFIRMATION
- **Proposed safe default:** Publish no founder names, dates, or historical
  claims until verified against an approved source.
- **Implementation depends on:** Institutional/about page and homepage.

### GOV-006 — Directory eligibility and listing categories

- **Topic:** Who may appear in the directory and whether centres/organizations
  are in scope at launch.
- **Current evidence from audit:** The directory has practitioner and centre
  filters and two static records: one practitioner and one centre. The
  approved product direction says practitioners at launch; earlier locked
  direction also excludes public centre listings.
- **Decision required:** Confirm eligible professional categories and whether
  centre listings are prohibited, deferred, or permitted under a separately
  defined policy.
- **Current status:** PENDING CONFIRMATION
- **Proposed safe default:** Restrict the launch directory to approved
  practitioner categories and do not expose centre listings until the Bureau
  confirms their scope.
- **Implementation depends on:** Directory filters, records, route mappings,
  profile pages, and seed eligibility.

### GOV-007 — Verification requirements and authority

- **Topic:** Evidence, checks, decision authority, expiry/review, and appeal for
  professional verification.
- **Current evidence from audit:** No verification workflow exists. Static
  records contain role/badge/reference wording that may imply institutional
  verification; no governing evidence or process was found.
- **Decision required:** Define who can verify, accepted evidence, review
  stages, expiry/recheck, rejection, appeal/correction, and public wording.
  Do not infer diploma or legal requirements from current data.
- **Current status:** PENDING CONFIRMATION
- **Proposed safe default:** Do not show verified/referenced/accredited claims
  until an authorized process and evidence exist.
- **Implementation depends on:** Verification schema/workflow, directory
  eligibility, profile badges, and public copy.

### GOV-008 — Verification and membership independence

- **Topic:** Operational relationship between professional verification and
  membership.
- **Current evidence from audit:** The approved architecture treats
  ProfessionalVerification and Membership as separate concepts. Current public
  static content sometimes combines membership, accreditation, directory
  inclusion, and benefits.
- **Decision required:** Confirm policy consequences for each status without
  making one status automatically imply another.
- **Current status:** PENDING CONFIRMATION
- **Proposed safe default:** Preserve their independence; membership alone
  does not confer verification or public-directory eligibility.
- **Implementation depends on:** Directory rules, membership terms, profile
  status, public badges, and authorization policy.

### GOV-009 — Suspension, removal, and correction rules

- **Topic:** Grounds, authority, notice, appeal, and timing for suspending,
  removing, or correcting a directory entry.
- **Current evidence from audit:** The public directory is static and has no
  consent, verification, suspension, or removal workflow.
- **Decision required:** Approve who may act, process/notice, review or appeal,
  and what appears publicly during each state.
- **Current status:** PENDING CONFIRMATION
- **Proposed safe default:** Provide a way to request correction/removal and do
  not publicly list entries whose eligibility or permission is unclear.
- **Implementation depends on:** Directory moderation, profile status,
  verification, consent evidence, and audit events.

### GOV-010 — Public directory fields

- **Topic:** Per-field public visibility for names, title, city/region, bio,
  languages, specialties, email, phone, photo, and other profile information.
- **Current evidence from audit:** Cards render name, role, and city, while the
  client-side directory receives full static practitioner objects containing
  additional contact, identifier, badge, and location fields. The profile
  route currently renders city but has duplicated source fields not shown in
  its rendered page.
- **Decision required:** Approve a field-by-field public allowlist and the
  consent evidence required for each field.
- **Current status:** PENDING CONFIRMATION
- **Proposed safe default:** Public baseline is name, professional role/title,
  and city/region only, subject to an approved listing basis. Do not expose
  phone, full address, identifiers, or verification claims by default.
- **Implementation depends on:** Public DTOs/data projection, client bundles,
  profile rendering, consent model, and directory repository.

### GOV-011 — Public location precision

- **Topic:** Whether directory location is city, region, approximate map point,
  or exact practice coordinates/address.
- **Current evidence from audit:** The map uses coordinates from static
  practitioner records and sends map requests to external map providers.
- **Decision required:** Approve the maximum location precision and whether a
  separate explicit location consent is required.
- **Current status:** PENDING CONFIRMATION
- **Proposed safe default:** Show city/region only; do not publish exact
  coordinates or street-level locations without explicit approval.
- **Implementation depends on:** Directory map, public data projection,
  consent model, privacy notice, and external-map disclosure.

### GOV-012 — Professional contact visibility

- **Topic:** Whether a listed professional’s phone, email, address, or contact
  form may be public, and how permission can be withdrawn.
- **Current evidence from audit:** Static records contain phone/address values;
  the approved public baseline excludes these by default. No contact
  visibility/withdrawal workflow exists.
- **Decision required:** Approve optional fields, granular consent, public
  contact method, withdrawal handling, and any directory-specific anti-abuse
  measures.
- **Current status:** PENDING CONFIRMATION
- **Proposed safe default:** Do not publish personal contact details or full
  addresses; use only an explicitly approved institutional contact channel
  until a consent workflow exists.
- **Implementation depends on:** Profile fields, consent, directory UI,
  privacy notice, and rate/abuse controls.

### GOV-013 — Student eligibility

- **Topic:** Whether students may create an account, request membership, or
  appear in any professional listing, and under what designation.
- **Current evidence from audit:** The adhesion form offers a student status
  option. No student membership or directory policy was found.
- **Decision required:** Decide account/request eligibility, permitted labels,
  verification evidence, and directory exclusion/inclusion.
- **Current status:** PENDING CONFIRMATION
- **Proposed safe default:** Do not represent a student as a verified
  practitioner; do not list students as practitioners unless an explicit policy
  is approved.
- **Implementation depends on:** Membership categories, onboarding,
  verification, directory filters, and public labels.

### GOV-014 — International professional eligibility

- **Topic:** Eligibility for professionals trained, resident, or practicing
  outside Tunisia, including recognition and directory scope.
- **Current evidence from audit:** No international eligibility rules were
  found in the public source.
- **Decision required:** Decide eligible jurisdictions, evidence/recognition
  requirements, membership options, and any geographic scope for listings.
- **Current status:** PENDING CONFIRMATION
- **Proposed safe default:** Do not imply recognition or eligibility beyond an
  explicitly approved scope.
- **Implementation depends on:** Membership, verification, directory, account
  onboarding, and public policy copy.

### GOV-015 — Membership terms, fees, dates, and statuses

- **Topic:** Membership categories, fee amounts/currency, term dates, payment
  expectations, renewal, suspension, cancellation, and benefits.
- **Current evidence from audit:** `/adhesion` says terms and documents await
  CSNPT specification. Static plan data includes fee and benefit claims, but
  the pricing component is not mounted on the current homepage and the claims
  were not verified.
- **Decision required:** Approve categories, amounts, effective dates, terms,
  eligibility, status transitions, payment method (if any), and exact benefits.
- **Current status:** PENDING CONFIRMATION
- **Proposed safe default:** Do not display static fee/benefit figures as
  approved terms; state only that official terms are pending confirmation.
- **Implementation depends on:** Membership page/form, database model,
  payment decisions, renewal communication, and directory policy.

### GOV-016 — Scientific/resource reviewers

- **Topic:** Reviewer qualifications, assignment, approval authority, conflict
  handling, and publication accountability for scientific/professional
  resources.
- **Current evidence from audit:** Resource entries have no visible author,
  reviewer, source/citation, or review metadata. No reviewers were identified
  by the audit.
- **Decision required:** Approve reviewer roles/qualifications, editorial
  approval stages, source requirements, conflict handling, and attribution.
- **Current status:** PENDING CONFIRMATION
- **Proposed safe default:** Do not label a resource as scientifically reviewed
  or official without recorded review evidence.
- **Implementation depends on:** Resource schema, editorial workflow, public
  metadata, and administration responsibilities.

### GOV-017 — Trousse reviewers and review cadence

- **Topic:** Qualified review authority and review interval/trigger for Trousse
  content and downloadable files.
- **Current evidence from audit:** `/trousse-secours` is a placeholder; it has
  no resource, author, reviewer, version, or review-date data.
- **Decision required:** Approve reviewer qualifications, review cadence,
  update triggers, withdrawal/archival rules, and accountable owner.
- **Current status:** PENDING CONFIRMATION
- **Proposed safe default:** Publish no clinical/professional Trousse resource
  until its reviewer, version, review date, and approval are recorded.
- **Implementation depends on:** Trousse content model, publication workflow,
  resource metadata, and ongoing governance ownership.

### GOV-018 — Public vs. professional Trousse resources

- **Topic:** Audience labels and access policy per Trousse item while keeping
  the main Trousse public.
- **Current evidence from audit:** The route contains no resources or audience
  classification. The approved direction says the main Trousse is public and
  individual professional-level information may need separate labels.
- **Decision required:** Define what is public, what is professional-level,
  precise labels, and whether any item requires account-based access.
- **Current status:** PENDING CONFIRMATION
- **Proposed safe default:** Keep the Trousse landing experience public; label
  each resource individually and do not make the whole Trousse members-only.
- **Implementation depends on:** Resource audience metadata, content review,
  accessibility, and any separately approved authorization.

### GOV-019 — Safety wording for professional/clinical resources

- **Topic:** Approved audience notices, scope statements, and safety language;
  boundaries for content that could be mistaken for diagnosis, treatment, or
  emergency instructions.
- **Current evidence from audit:** Resource copy is placeholder content and
  lacks reviewed safety metadata. The Trousse has no actual safety wording or
  clinical resources.
- **Decision required:** Have qualified clinical/governance reviewers approve
  allowed content, prohibited content, disclaimers, escalation language, and
  translation equivalents. No protocol should be invented by the product
  team.
- **Current status:** PENDING CONFIRMATION
- **Proposed safe default:** Do not publish diagnosis, scoring, treatment, or
  emergency procedures; do not imply that a resource replaces individualized
  professional care.
- **Implementation depends on:** Resource authoring, Trousse content, review
  workflow, and FR/AR approval.

### GOV-020 — Formation and certificate governance

- **Topic:** Formation approval, event ownership, registration eligibility,
  capacity/waitlist policy, cancellation, attendance evidence, and certificate
  issuance criteria.
- **Current evidence from audit:** The route has four static demonstration
  entries and UI-only registration/waitlist states. No real event owner,
  capacity enforcement, attendance, or certificate workflow exists. The
  database schema includes future formation models but is not activated for
  this public UI.
- **Decision required:** Approve who may publish events, required event fields,
  registration rules, capacity and waitlist behavior, cancellation/refund
  policy if relevant, attendance recording, and certificate criteria/signing
  authority.
- **Current status:** PENDING CONFIRMATION
- **Proposed safe default:** Mark unconfirmed events as provisional or do not
  publish them; do not promise registration, a waitlist place, attendance
  credit, or a certificate through the current UI.
- **Implementation depends on:** Event data, database activation, registration
  services, operational ownership, and any payment/legal decisions.

### GOV-021 — Privacy, legal notices, and cookies

- **Topic:** Final privacy notice, data purposes/recipients, retention,
  contact/rights process, legal notice, cookie/analytics policy, and external
  service disclosures.
- **Current evidence from audit:** `/confidentialite` is explicitly a draft
  pending legal/governance review. The footer links to missing legal and
  accessibility routes. The map loads external assets/tiles; the contact API
  can send through an external email provider when configured. No final
  approved notice was established.
- **Decision required:** Legal/governance review must determine applicable
  notices, purposes, lawful basis/consent language, retention, rights contact,
  cookies/analytics use, and disclosures for external map/email services.
  Do not infer jurisdiction-specific legal requirements or retention periods.
- **Current status:** PENDING CONFIRMATION
- **Proposed safe default:** Keep the notice marked draft; avoid unapproved
  compliance claims, nonessential tracking, and undisclosed data collection.
- **Implementation depends on:** Contact and directory flows, external
  providers, deployment configuration, analytics decisions, and public legal
  pages.

### GOV-022 — Observatory metrics and statistics

- **Topic:** Public counts, map coverage, methodology, source, and update date.
- **Current evidence from audit:** Static source/component data contains
  practitioner/centre counts and map records. No source, methodology, or
  update cadence was established. Some count claims are in components not
  mounted on the current homepage.
- **Decision required:** Confirm each statistic, eligible population,
  calculation method, source of record, publication date, and update owner.
- **Current status:** PENDING CONFIRMATION
- **Proposed safe default:** Do not publish unsourced counts or describe the
  directory as a complete/national registry without supporting evidence.
- **Implementation depends on:** Directory verification, authoritative data,
  Observatory UI, and a maintenance owner.

### GOV-023 — Official language and default language policy

- **Topic:** Official public languages, default language, language selector
  behavior, translation approval, and precedence when a translation is
  missing.
- **Current evidence from audit:** Interfaces support some combination of
  French, Arabic, and English; coverage varies by route. The root layout starts
  French/LTR, language state is often client-side, and multiple FR/AR strings
  contain mojibake.
- **Decision required:** Confirm official launch languages and default,
  dialect/register expectations for Arabic, translation approvers, fallback
  behavior, and whether English is public scope.
- **Current status:** PENDING CONFIRMATION
- **Proposed safe default:** Do not present a corrupted or unreviewed
  translation as official; preserve the approved FR/AR requirement and decide
  missing-translation behavior before launch.
- **Implementation depends on:** Translation workflow, document language/RTL,
  route design, metadata, content review, and accessibility testing.

## Approval record

No decisions are approved by this register. For each item, record an approval
outside this document only after the designated authority confirms the
decision and evidence. Then update the item with the exact decision, evidence
reference, approver role/name as authorized, and date. Until updated, its
status remains **PENDING CONFIRMATION** and the safe default remains advisory.
