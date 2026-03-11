-- AlterTable: Add password reset tracking to Admin
ALTER TABLE "Admin" ADD COLUMN "mustResetPassword" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "Admin" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
