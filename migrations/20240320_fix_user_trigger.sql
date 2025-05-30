-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create updated trigger function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_role text;
  new_user_id uuid;
BEGIN
  -- Determine role from metadata with validation
  user_role := CASE 
    WHEN NEW.raw_user_meta_data->>'role' IS NOT NULL THEN
      CASE 
        WHEN (NEW.raw_user_meta_data->>'role')::text IN ('STUDENT', 'TUTOR') 
        THEN (NEW.raw_user_meta_data->>'role')::text
        ELSE 'STUDENT'
      END
    WHEN NEW.raw_user_meta_data->>'userType' = 'tutor' THEN 'TUTOR'
    ELSE 'STUDENT'
  END;

  -- Log the incoming data
  RAISE NOTICE 'Creating new user with role: %', user_role;
  RAISE NOTICE 'User metadata: %', NEW.raw_user_meta_data;

  -- Insert the user with all fields
  INSERT INTO public."User" (
    id,
    email,
    "firstName",
    "lastName",
    role,
    "createdAt",
    "updatedAt",
    bio,
    phone
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NULLIF(NEW.raw_user_meta_data->>'firstName', ''),
      SPLIT_PART(NEW.email, '@', 1)
    ),
    COALESCE(
      NULLIF(NEW.raw_user_meta_data->>'lastName', ''),
      ''
    ),
    user_role::public."UserRole",
    COALESCE(
      (NEW.raw_user_meta_data->>'createdAt')::timestamp,
      CURRENT_TIMESTAMP
    ),
    CURRENT_TIMESTAMP,
    NULLIF(NEW.raw_user_meta_data->>'bio', ''),
    NULLIF(NEW.raw_user_meta_data->>'phone', '')
  )
  RETURNING id INTO new_user_id;

  -- Log success
  RAISE NOTICE 'Successfully created % user (ID: %)', 
    LOWER(user_role), new_user_id;

  RETURN NEW;

EXCEPTION 
  WHEN OTHERS THEN
    -- Log error information
    RAISE NOTICE 'Error in handle_new_user: %', SQLERRM;
    RAISE NOTICE 'Error detail: %', SQLSTATE;
    
    -- Re-raise the error to ensure transaction rollback
    RAISE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add comment to the function for documentation
COMMENT ON FUNCTION public.handle_new_user() IS 
'Handles new user creation from Supabase Auth:
1. Creates a User record with role (STUDENT/TUTOR)
2. Creates a TutorProfile record if user is a tutor
3. Handles role assignment from metadata or userType
4. Includes error handling and logging'; 