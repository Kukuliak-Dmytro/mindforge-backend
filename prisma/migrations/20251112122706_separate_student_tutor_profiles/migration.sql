-- CreateTable: StudentProfile
CREATE TABLE "StudentProfile" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "bio" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable: TutorProfile
CREATE TABLE "TutorProfile" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "bio" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TutorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex: Unique constraint on StudentProfile.userId
CREATE UNIQUE INDEX "StudentProfile_userId_key" ON "StudentProfile"("userId");

-- CreateIndex: Unique constraint on TutorProfile.userId
CREATE UNIQUE INDEX "TutorProfile_userId_key" ON "TutorProfile"("userId");

-- Migrate data: Create StudentProfile records for all STUDENT users
INSERT INTO "StudentProfile" ("id", "userId", "bio", "phone", "createdAt", "updatedAt")
SELECT 
    gen_random_uuid(),
    "id",
    "bio",
    "phone",
    "createdAt",
    "updatedAt"
FROM "User"
WHERE "role" = 'STUDENT';

-- Migrate data: Create TutorProfile records for all TUTOR users
INSERT INTO "TutorProfile" ("id", "userId", "bio", "phone", "createdAt", "updatedAt")
SELECT 
    gen_random_uuid(),
    "id",
    "bio",
    "phone",
    "createdAt",
    "updatedAt"
FROM "User"
WHERE "role" = 'TUTOR';

-- AddForeignKey: StudentProfile -> User
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: TutorProfile -> User
ALTER TABLE "TutorProfile" ADD CONSTRAINT "TutorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Step 1: Add new columns to existing tables (nullable first)
ALTER TABLE "TutorEducation" ADD COLUMN "tutorProfileId" UUID;
ALTER TABLE "TutorExperience" ADD COLUMN "tutorProfileId" UUID;
ALTER TABLE "TutorSubject" ADD COLUMN "tutorProfileId" UUID;
ALTER TABLE "Order" ADD COLUMN "studentProfileId" UUID;
ALTER TABLE "Order" ADD COLUMN "tutorProfileId" UUID;
ALTER TABLE "Review" ADD COLUMN "studentProfileId" UUID;
ALTER TABLE "Review" ADD COLUMN "tutorProfileId" UUID;
ALTER TABLE "OrderInvite" ADD COLUMN "tutorProfileId" UUID;
ALTER TABLE "OrderInvite" ADD COLUMN "studentProfileId" UUID;
ALTER TABLE "SavedOrder" ADD COLUMN "tutorProfileId" UUID;
ALTER TABLE "SavedTutor" ADD COLUMN "studentProfileId" UUID;
ALTER TABLE "SavedTutor" ADD COLUMN "tutorProfileId" UUID;

-- Step 2: Migrate data to new columns
-- Migrate TutorEducation: userId -> tutorProfileId
UPDATE "TutorEducation" te
SET "tutorProfileId" = tp."id"
FROM "TutorProfile" tp
WHERE te."userId" = tp."userId";

-- Migrate TutorExperience: userId -> tutorProfileId
UPDATE "TutorExperience" te
SET "tutorProfileId" = tp."id"
FROM "TutorProfile" tp
WHERE te."userId" = tp."userId";

-- Migrate TutorSubject: userId -> tutorProfileId
UPDATE "TutorSubject" ts
SET "tutorProfileId" = tp."id"
FROM "TutorProfile" tp
WHERE ts."userId" = tp."userId";

-- Migrate Order: studentId -> studentProfileId
UPDATE "Order" o
SET "studentProfileId" = sp."id"
FROM "StudentProfile" sp
WHERE o."studentId" = sp."userId";

-- Migrate Order: tutorId -> tutorProfileId (nullable, so only update where tutorId exists)
UPDATE "Order" o
SET "tutorProfileId" = tp."id"
FROM "TutorProfile" tp
WHERE o."tutorId" = tp."userId" AND o."tutorId" IS NOT NULL;

-- Migrate Review: studentId -> studentProfileId
UPDATE "Review" r
SET "studentProfileId" = sp."id"
FROM "StudentProfile" sp
WHERE r."studentId" = sp."userId";

-- Migrate Review: tutorId -> tutorProfileId
UPDATE "Review" r
SET "tutorProfileId" = tp."id"
FROM "TutorProfile" tp
WHERE r."tutorId" = tp."userId";

-- Migrate OrderInvite: tutorId -> tutorProfileId
UPDATE "OrderInvite" oi
SET "tutorProfileId" = tp."id"
FROM "TutorProfile" tp
WHERE oi."tutorId" = tp."userId";

-- Migrate OrderInvite: studentId -> studentProfileId
UPDATE "OrderInvite" oi
SET "studentProfileId" = sp."id"
FROM "StudentProfile" sp
WHERE oi."studentId" = sp."userId";

-- Migrate SavedOrder: tutorId -> tutorProfileId
UPDATE "SavedOrder" so
SET "tutorProfileId" = tp."id"
FROM "TutorProfile" tp
WHERE so."tutorId" = tp."userId";

-- Migrate SavedTutor: studentId -> studentProfileId
UPDATE "SavedTutor" st
SET "studentProfileId" = sp."id"
FROM "StudentProfile" sp
WHERE st."studentId" = sp."userId";

-- Migrate SavedTutor: tutorId -> tutorProfileId
UPDATE "SavedTutor" st
SET "tutorProfileId" = tp."id"
FROM "TutorProfile" tp
WHERE st."tutorId" = tp."userId";

-- Step 3: Make new columns NOT NULL (where applicable) and add foreign keys
ALTER TABLE "TutorEducation" ALTER COLUMN "tutorProfileId" SET NOT NULL;
ALTER TABLE "TutorExperience" ALTER COLUMN "tutorProfileId" SET NOT NULL;
ALTER TABLE "TutorSubject" ALTER COLUMN "tutorProfileId" SET NOT NULL;
ALTER TABLE "Order" ALTER COLUMN "studentProfileId" SET NOT NULL;
ALTER TABLE "Review" ALTER COLUMN "studentProfileId" SET NOT NULL;
ALTER TABLE "Review" ALTER COLUMN "tutorProfileId" SET NOT NULL;
ALTER TABLE "OrderInvite" ALTER COLUMN "tutorProfileId" SET NOT NULL;
ALTER TABLE "OrderInvite" ALTER COLUMN "studentProfileId" SET NOT NULL;
ALTER TABLE "SavedOrder" ALTER COLUMN "tutorProfileId" SET NOT NULL;
ALTER TABLE "SavedTutor" ALTER COLUMN "studentProfileId" SET NOT NULL;
ALTER TABLE "SavedTutor" ALTER COLUMN "tutorProfileId" SET NOT NULL;

-- Step 4: Add foreign key constraints
ALTER TABLE "TutorEducation" ADD CONSTRAINT "TutorEducation_tutorProfileId_fkey" FOREIGN KEY ("tutorProfileId") REFERENCES "TutorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TutorExperience" ADD CONSTRAINT "TutorExperience_tutorProfileId_fkey" FOREIGN KEY ("tutorProfileId") REFERENCES "TutorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TutorSubject" ADD CONSTRAINT "TutorSubject_tutorProfileId_fkey" FOREIGN KEY ("tutorProfileId") REFERENCES "TutorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Order" ADD CONSTRAINT "Order_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "StudentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Order" ADD CONSTRAINT "Order_tutorProfileId_fkey" FOREIGN KEY ("tutorProfileId") REFERENCES "TutorProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Review" ADD CONSTRAINT "Review_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "StudentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Review" ADD CONSTRAINT "Review_tutorProfileId_fkey" FOREIGN KEY ("tutorProfileId") REFERENCES "TutorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "OrderInvite" ADD CONSTRAINT "OrderInvite_tutorProfileId_fkey" FOREIGN KEY ("tutorProfileId") REFERENCES "TutorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "OrderInvite" ADD CONSTRAINT "OrderInvite_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "StudentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "SavedOrder" ADD CONSTRAINT "SavedOrder_tutorProfileId_fkey" FOREIGN KEY ("tutorProfileId") REFERENCES "TutorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "SavedTutor" ADD CONSTRAINT "SavedTutor_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "StudentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "SavedTutor" ADD CONSTRAINT "SavedTutor_tutorProfileId_fkey" FOREIGN KEY ("tutorProfileId") REFERENCES "TutorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Step 5: Drop old foreign key constraints
ALTER TABLE "TutorEducation" DROP CONSTRAINT IF EXISTS "TutorEducation_userId_fkey";
ALTER TABLE "TutorExperience" DROP CONSTRAINT IF EXISTS "TutorExperience_userId_fkey";
ALTER TABLE "TutorSubject" DROP CONSTRAINT IF EXISTS "TutorSubject_userId_fkey";
ALTER TABLE "Order" DROP CONSTRAINT IF EXISTS "Order_studentId_fkey";
ALTER TABLE "Order" DROP CONSTRAINT IF EXISTS "Order_tutorId_fkey";
ALTER TABLE "Review" DROP CONSTRAINT IF EXISTS "Review_studentId_fkey";
ALTER TABLE "Review" DROP CONSTRAINT IF EXISTS "Review_tutorId_fkey";
ALTER TABLE "OrderInvite" DROP CONSTRAINT IF EXISTS "OrderInvite_tutorId_fkey";
ALTER TABLE "OrderInvite" DROP CONSTRAINT IF EXISTS "OrderInvite_studentId_fkey";
ALTER TABLE "SavedOrder" DROP CONSTRAINT IF EXISTS "SavedOrder_tutorId_fkey";
ALTER TABLE "SavedTutor" DROP CONSTRAINT IF EXISTS "SavedTutor_studentId_fkey";
ALTER TABLE "SavedTutor" DROP CONSTRAINT IF EXISTS "SavedTutor_tutorId_fkey";

-- Step 6: Drop old columns
ALTER TABLE "TutorEducation" DROP COLUMN "userId";
ALTER TABLE "TutorExperience" DROP COLUMN "userId";
ALTER TABLE "TutorSubject" DROP COLUMN "userId";
ALTER TABLE "Order" DROP COLUMN "studentId";
ALTER TABLE "Order" DROP COLUMN "tutorId";
ALTER TABLE "Review" DROP COLUMN "studentId";
ALTER TABLE "Review" DROP COLUMN "tutorId";
ALTER TABLE "OrderInvite" DROP COLUMN "tutorId";
ALTER TABLE "OrderInvite" DROP COLUMN "studentId";
ALTER TABLE "SavedOrder" DROP COLUMN "tutorId";
ALTER TABLE "SavedTutor" DROP COLUMN "studentId";
ALTER TABLE "SavedTutor" DROP COLUMN "tutorId";

-- Step 7: Drop old unique constraints and create new ones
DROP INDEX IF EXISTS "TutorSubject_userId_subjectId_categoryId_key";
CREATE UNIQUE INDEX "TutorSubject_tutorProfileId_subjectId_categoryId_key" ON "TutorSubject"("tutorProfileId", "subjectId", "categoryId");

DROP INDEX IF EXISTS "SavedOrder_tutorId_orderId_key";
CREATE UNIQUE INDEX "SavedOrder_tutorProfileId_orderId_key" ON "SavedOrder"("tutorProfileId", "orderId");

DROP INDEX IF EXISTS "SavedTutor_studentId_tutorId_key";
CREATE UNIQUE INDEX "SavedTutor_studentProfileId_tutorProfileId_key" ON "SavedTutor"("studentProfileId", "tutorProfileId");

-- Step 9: Drop bio and phone columns from User table
ALTER TABLE "User" DROP COLUMN "bio";
ALTER TABLE "User" DROP COLUMN "phone";

-- Step 10: Create trigger function to automatically create profiles when users are created
CREATE OR REPLACE FUNCTION public.handle_user_profile_creation()
RETURNS TRIGGER AS $$
BEGIN
  -- Create StudentProfile for STUDENT role
  IF NEW.role = 'STUDENT' THEN
    INSERT INTO public."StudentProfile" ("id", "userId", "createdAt", "updatedAt")
    VALUES (gen_random_uuid(), NEW.id, NEW."createdAt", NEW."updatedAt")
    ON CONFLICT ("userId") DO NOTHING;
  END IF;

  -- Create TutorProfile for TUTOR role
  IF NEW.role = 'TUTOR' THEN
    INSERT INTO public."TutorProfile" ("id", "userId", "createdAt", "updatedAt")
    VALUES (gen_random_uuid(), NEW.id, NEW."createdAt", NEW."updatedAt")
    ON CONFLICT ("userId") DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger that fires after user insertion
DROP TRIGGER IF EXISTS on_user_created_create_profile ON public."User";
CREATE TRIGGER on_user_created_create_profile
  AFTER INSERT ON public."User"
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_user_profile_creation();

