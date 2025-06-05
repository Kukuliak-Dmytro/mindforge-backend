/*
  Warnings:

  - You are about to drop the column `userId` on the `TutorEducation` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TutorExperience` table. All the data in the column will be lost.
  - You are about to drop the column `hourlyRate` on the `TutorSubject` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[tutorId,subjectId,categoryId]` on the table `TutorSubject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tutorId` to the `TutorEducation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tutorId` to the `TutorExperience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `TutorSubject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `TutorSubject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "TutorEducation" DROP CONSTRAINT "TutorEducation_userId_fkey";

-- DropForeignKey
ALTER TABLE "TutorExperience" DROP CONSTRAINT "TutorExperience_userId_fkey";

-- DropForeignKey
ALTER TABLE "TutorSubject" DROP CONSTRAINT "TutorSubject_tutorId_fkey";

-- DropIndex
DROP INDEX "TutorSubject_tutorId_subjectId_key";

-- AlterTable
ALTER TABLE "TutorEducation" DROP COLUMN "userId",
ADD COLUMN     "tutorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TutorExperience" DROP COLUMN "userId",
ADD COLUMN     "tutorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TutorSubject" DROP COLUMN "hourlyRate",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "contactInfo" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "TutorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TutorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TutorProfile_userId_key" ON "TutorProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TutorSubject_tutorId_subjectId_categoryId_key" ON "TutorSubject"("tutorId", "subjectId", "categoryId");

-- AddForeignKey
ALTER TABLE "TutorProfile" ADD CONSTRAINT "TutorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorEducation" ADD CONSTRAINT "TutorEducation_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorExperience" ADD CONSTRAINT "TutorExperience_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorSubject" ADD CONSTRAINT "TutorSubject_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorSubject" ADD CONSTRAINT "TutorSubject_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
