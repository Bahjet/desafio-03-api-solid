-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADIN', 'MEMBER');

-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER';
