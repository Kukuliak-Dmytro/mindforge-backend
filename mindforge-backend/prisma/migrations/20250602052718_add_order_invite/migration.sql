-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REFUSED');

-- CreateTable
CREATE TABLE "OrderInvite" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "tutorId" UUID NOT NULL,
    "studentId" UUID NOT NULL,
    "senderRole" "UserRole" NOT NULL,
    "status" "InviteStatus" NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderInvite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderInvite" ADD CONSTRAINT "OrderInvite_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderInvite" ADD CONSTRAINT "OrderInvite_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderInvite" ADD CONSTRAINT "OrderInvite_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
