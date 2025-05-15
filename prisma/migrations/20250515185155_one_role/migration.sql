/*
  Warnings:

  - You are about to drop the column `isStudent` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isTutor` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'TUTOR');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isStudent",
DROP COLUMN "isTutor",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'STUDENT';
