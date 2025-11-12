-- Create trigger function to automatically create profiles when users are created
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

