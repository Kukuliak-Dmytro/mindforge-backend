-- Script to ensure all existing users have profiles
-- This should be run once after the migration to fix any users created before the trigger

-- Create StudentProfile for any STUDENT users without one
INSERT INTO public."StudentProfile" ("id", "userId", "createdAt", "updatedAt")
SELECT 
    gen_random_uuid(),
    u.id,
    u."createdAt",
    u."updatedAt"
FROM public."User" u
WHERE u.role = 'STUDENT'
AND NOT EXISTS (
    SELECT 1 FROM public."StudentProfile" sp WHERE sp."userId" = u.id
)
ON CONFLICT ("userId") DO NOTHING;

-- Create TutorProfile for any TUTOR users without one
INSERT INTO public."TutorProfile" ("id", "userId", "createdAt", "updatedAt")
SELECT 
    gen_random_uuid(),
    u.id,
    u."createdAt",
    u."updatedAt"
FROM public."User" u
WHERE u.role = 'TUTOR'
AND NOT EXISTS (
    SELECT 1 FROM public."TutorProfile" tp WHERE tp."userId" = u.id
)
ON CONFLICT ("userId") DO NOTHING;

