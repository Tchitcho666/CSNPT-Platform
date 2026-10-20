-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "emailVerifiedAt" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "roles" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastLoginAt" DATETIME
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "professionalTitle" TEXT,
    "bio" TEXT,
    "city" TEXT,
    "governorate" TEXT,
    "languages" TEXT NOT NULL DEFAULT '[]',
    "specialties" TEXT NOT NULL DEFAULT '[]',
    "practiceType" TEXT,
    "publicPhone" TEXT,
    "publicAddress" TEXT,
    "publicEmail" TEXT,
    "publicPhotoUrl" TEXT,
    "profileStatus" TEXT NOT NULL DEFAULT 'DRAFT',
    "directoryConsentAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Profile_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProfessionalVerification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profileId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "verificationType" TEXT,
    "submittedAt" DATETIME,
    "reviewedAt" DATETIME,
    "reviewerAccountId" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProfessionalVerification_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProfessionalVerification_reviewerAccountId_fkey" FOREIGN KEY ("reviewerAccountId") REFERENCES "Account" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Membership" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "membershipType" TEXT NOT NULL,
    "startsAt" DATETIME,
    "endsAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Membership_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Formation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "formationId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startsAt" DATETIME NOT NULL,
    "endsAt" DATETIME NOT NULL,
    "location" TEXT,
    "capacity" INTEGER,
    "registrationOpenAt" DATETIME,
    "registrationCloseAt" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'PLANNED',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Session_formationId_fkey" FOREIGN KEY ("formationId") REFERENCES "Formation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "registeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cancelledAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Registration_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Registration_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WaitlistEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'WAITING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WaitlistEntry_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WaitlistEntry_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "recordedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recordedByAccountId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Attendance_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Attendance_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Attendance_recordedByAccountId_fkey" FOREIGN KEY ("recordedByAccountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT,
    "body" TEXT,
    "type" TEXT NOT NULL,
    "audience" TEXT NOT NULL DEFAULT 'PUBLIC',
    "language" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "authorAccountId" TEXT NOT NULL,
    "reviewerAccountId" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "reviewDate" DATETIME,
    "nextReviewDate" DATETIME,
    "safetyNotice" TEXT,
    "pdfUrl" TEXT,
    "changelog" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "publishedAt" DATETIME,
    "archivedAt" DATETIME,
    CONSTRAINT "Resource_authorAccountId_fkey" FOREIGN KEY ("authorAccountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Resource_reviewerAccountId_fkey" FOREIGN KEY ("reviewerAccountId") REFERENCES "Account" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "actorAccountId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "beforeSummary" JSONB,
    "afterSummary" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditLog_actorAccountId_fkey" FOREIGN KEY ("actorAccountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Psychomotricien" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "governorate" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AdhesionRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "diplomaUrl" TEXT,
    "rneUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE INDEX "Account_status_idx" ON "Account"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_accountId_key" ON "Profile"("accountId");

-- CreateIndex
CREATE INDEX "Profile_profileStatus_governorate_city_idx" ON "Profile"("profileStatus", "governorate", "city");

-- CreateIndex
CREATE INDEX "ProfessionalVerification_status_submittedAt_idx" ON "ProfessionalVerification"("status", "submittedAt");

-- CreateIndex
CREATE INDEX "ProfessionalVerification_profileId_status_idx" ON "ProfessionalVerification"("profileId", "status");

-- CreateIndex
CREATE INDEX "Membership_accountId_status_idx" ON "Membership"("accountId", "status");

-- CreateIndex
CREATE INDEX "Membership_status_endsAt_idx" ON "Membership"("status", "endsAt");

-- CreateIndex
CREATE UNIQUE INDEX "Formation_slug_key" ON "Formation"("slug");

-- CreateIndex
CREATE INDEX "Formation_status_createdAt_idx" ON "Formation"("status", "createdAt");

-- CreateIndex
CREATE INDEX "Session_startsAt_idx" ON "Session"("startsAt");

-- CreateIndex
CREATE INDEX "Session_status_startsAt_idx" ON "Session"("status", "startsAt");

-- CreateIndex
CREATE INDEX "Session_formationId_startsAt_idx" ON "Session"("formationId", "startsAt");

-- CreateIndex
CREATE INDEX "Registration_accountId_status_idx" ON "Registration"("accountId", "status");

-- CreateIndex
CREATE INDEX "Registration_sessionId_status_idx" ON "Registration"("sessionId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Registration_sessionId_accountId_key" ON "Registration"("sessionId", "accountId");

-- CreateIndex
CREATE INDEX "WaitlistEntry_accountId_status_idx" ON "WaitlistEntry"("accountId", "status");

-- CreateIndex
CREATE INDEX "WaitlistEntry_sessionId_status_position_idx" ON "WaitlistEntry"("sessionId", "status", "position");

-- CreateIndex
CREATE UNIQUE INDEX "WaitlistEntry_sessionId_accountId_key" ON "WaitlistEntry"("sessionId", "accountId");

-- CreateIndex
CREATE UNIQUE INDEX "WaitlistEntry_sessionId_position_key" ON "WaitlistEntry"("sessionId", "position");

-- CreateIndex
CREATE INDEX "Attendance_accountId_recordedAt_idx" ON "Attendance"("accountId", "recordedAt");

-- CreateIndex
CREATE INDEX "Attendance_sessionId_status_idx" ON "Attendance"("sessionId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_sessionId_accountId_key" ON "Attendance"("sessionId", "accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_slug_key" ON "Resource"("slug");

-- CreateIndex
CREATE INDEX "Resource_status_language_idx" ON "Resource"("status", "language");

-- CreateIndex
CREATE INDEX "Resource_status_audience_idx" ON "Resource"("status", "audience");

-- CreateIndex
CREATE INDEX "Resource_authorAccountId_createdAt_idx" ON "Resource"("authorAccountId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_actorAccountId_createdAt_idx" ON "AuditLog"("actorAccountId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_entityId_createdAt_idx" ON "AuditLog"("entityType", "entityId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Psychomotricien_slug_key" ON "Psychomotricien"("slug");

-- CreateIndex
CREATE INDEX "Psychomotricien_isApproved_governorate_city_idx" ON "Psychomotricien"("isApproved", "governorate", "city");

-- CreateIndex
CREATE INDEX "AdhesionRequest_status_createdAt_idx" ON "AdhesionRequest"("status", "createdAt");
