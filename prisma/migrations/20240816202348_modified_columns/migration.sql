/*
  Warnings:

  - You are about to drop the column `password` on the `orgs` table. All the data in the column will be lost.
  - Added the required column `password_hash` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "password",
ADD COLUMN     "password_hash" TEXT NOT NULL,
ALTER COLUMN "author_name" DROP NOT NULL,
ALTER COLUMN "cep" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "street" DROP NOT NULL;

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "about" DROP NOT NULL,
ALTER COLUMN "environment" DROP NOT NULL;
