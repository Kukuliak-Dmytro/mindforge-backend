-- CreateTable
CREATE TABLE "SavedOrder" (
    "id" UUID NOT NULL,
    "tutorId" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedTutor" (
    "id" UUID NOT NULL,
    "studentId" UUID NOT NULL,
    "tutorId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedTutor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SavedOrder_tutorId_orderId_key" ON "SavedOrder"("tutorId", "orderId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedTutor_studentId_tutorId_key" ON "SavedTutor"("studentId", "tutorId");

-- AddForeignKey
ALTER TABLE "SavedOrder" ADD CONSTRAINT "SavedOrder_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedOrder" ADD CONSTRAINT "SavedOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedTutor" ADD CONSTRAINT "SavedTutor_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedTutor" ADD CONSTRAINT "SavedTutor_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
