-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "AccountRole" AS ENUM ('SUPER_ADMIN', 'BUREAU', 'EDITOR', 'REVIEWER');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'DEACTIVATED');

-- CreateEnum
CREATE TYPE "ProfileStatus" AS ENUM ('DRAFT', 'ACTIVE', 'SUSPENDED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "MembershipStatus" AS ENUM ('PENDING', 'ACTIVE', 'EXPIRED', 'SUSPENDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "FormationStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('PLANNED', 'OPEN', 'CLOSED', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "WaitlistStatus" AS ENUM ('WAITING', 'OFFERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'EXCUSED');

-- CreateEnum
CREATE TYPE "ResourceAudience" AS ENUM ('PUBLIC', 'PROFESSIONAL');

-- CreateEnum
CREATE TYPE "ResourceLanguage" AS ENUM ('FR', 'AR', 'EN');

-- CreateEnum
CREATE TYPE "ResourceStatus" AS ENUM ('DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "Account" (
    "id" UUID NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "emailVerifiedAt" TIMESTAMPTZ(3),
    "status" "AccountStatus" NOT NULL DEFAULT 'ACTIVE',
    "roles" "AccountRole"[] DEFAULT ARRAY[]::"AccountRole"[],
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "lastLoginAt" TIMESTAMPTZ(3),

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "displayName" VARCHAR(200) NOT NULL,
    "professionalTitle" VARCHAR(200),
    "bio" TEXT,
    "city" VARCHAR(120),
    "governorate" VARCHAR(120),
    "languages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "specialties" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "practiceType" VARCHAR(100),
    "publicPhone" VARCHAR(40),
    "publicAddress" VARCHAR(500),
    "publicEmail" VARCHAR(320),
    "publicPhotoUrl" TEXT,
    "profileStatus" "ProfileStatus" NOT NULL DEFAULT 'DRAFT',
    "directoryConsentAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalVerification" (
    "id" UUID NOT NULL,
    "profileId" UUID NOT NULL,
    "status" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "verificationType" VARCHAR(120),
    "submittedAt" TIMESTAMPTZ(3),
    "reviewedAt" TIMESTAMPTZ(3),
    "reviewerAccountId" UUID,
    "notes" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ProfessionalVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Membership" (
    "id" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "status" "MembershipStatus" NOT NULL DEFAULT 'PENDING',
    "membershipType" VARCHAR(100) NOT NULL,
    "startsAt" TIMESTAMPTZ(3),
    "endsAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Formation" (
    "id" UUID NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "slug" VARCHAR(250) NOT NULL,
    "summary" TEXT,
    "description" TEXT,
    "status" "FormationStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Formation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" UUID NOT NULL,
    "formationId" UUID NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "startsAt" TIMESTAMPTZ(3) NOT NULL,
    "endsAt" TIMESTAMPTZ(3) NOT NULL,
    "location" VARCHAR(300),
    "capacity" INTEGER,
    "registrationOpenAt" TIMESTAMPTZ(3),
    "registrationCloseAt" TIMESTAMPTZ(3),
    "status" "SessionStatus" NOT NULL DEFAULT 'PLANNED',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" UUID NOT NULL,
    "sessionId" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'PENDING',
    "registeredAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cancelledAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaitlistEntry" (
    "id" UUID NOT NULL,
    "sessionId" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "position" INTEGER NOT NULL,
    "status" "WaitlistStatus" NOT NULL DEFAULT 'WAITING',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "WaitlistEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" UUID NOT NULL,
    "sessionId" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "status" "AttendanceStatus" NOT NULL,
    "recordedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recordedByAccountId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" UUID NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "slug" VARCHAR(250) NOT NULL,
    "summary" TEXT,
    "body" TEXT,
    "type" VARCHAR(100) NOT NULL,
    "audience" "ResourceAudience" NOT NULL DEFAULT 'PUBLIC',
    "language" "ResourceLanguage" NOT NULL,
    "status" "ResourceStatus" NOT NULL DEFAULT 'DRAFT',
    "authorAccountId" UUID NOT NULL,
    "reviewerAccountId" UUID,
    "version" INTEGER NOT NULL DEFAULT 1,
    "reviewDate" TIMESTAMPTZ(3),
    "nextReviewDate" TIMESTAMPTZ(3),
    "safetyNotice" TEXT,
    "pdfUrl" TEXT,
    "changelog" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "publishedAt" TIMESTAMPTZ(3),
    "archivedAt" TIMESTAMPTZ(3),

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" UUID NOT NULL,
    "actorAccountId" UUID,
    "action" VARCHAR(120) NOT NULL,
    "entityType" VARCHAR(120) NOT NULL,
    "entityId" VARCHAR(191) NOT NULL,
    "beforeSummary" JSONB,
    "afterSummary" JSONB,
    "ipAddress" VARCHAR(45),
    "userAgent" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
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

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalVerification" ADD CONSTRAINT "ProfessionalVerification_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalVerification" ADD CONSTRAINT "ProfessionalVerification_reviewerAccountId_fkey" FOREIGN KEY ("reviewerAccountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_formationId_fkey" FOREIGN KEY ("formationId") REFERENCES "Formation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaitlistEntry" ADD CONSTRAINT "WaitlistEntry_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaitlistEntry" ADD CONSTRAINT "WaitlistEntry_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_recordedByAccountId_fkey" FOREIGN KEY ("recordedByAccountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_authorAccountId_fkey" FOREIGN KEY ("authorAccountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_reviewerAccountId_fkey" FOREIGN KEY ("reviewerAccountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorAccountId_fkey" FOREIGN KEY ("actorAccountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
