-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_tutorId_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "tutorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
