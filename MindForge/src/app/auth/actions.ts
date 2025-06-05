'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: { user, session }, error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  // Log the access token after successful login
  if (session?.access_token) {
    console.log('Access token after login:', session.access_token)
  }

  // Get user role from metadata
  const role = user?.user_metadata.role || 'STUDENT'

  // Revalidate all paths that might need updating
  revalidatePath('/', 'layout')
  revalidatePath('/tutor', 'layout')
  revalidatePath('/(student)', 'layout')
  
  // Redirect based on role
  if (role === 'TUTOR') {
    redirect('/tutor')
  } else {
    redirect('/')
  }
}

export async function signup(formData: FormData) {
  try {
    const supabase = await createClient()

    // Get and validate all required fields
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const userType = formData.get('userType') as string;

    console.log('Form data received:', { email, firstName, lastName, userType });

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !userType) {
      return { error: 'Всі поля обов\'язкові для заповнення' };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { error: 'Невірний формат електронної пошти' };
    }

    // Validate password length
    if (password.length < 6) {
      return { error: 'Пароль повинен містити щонайменше 6 символів' };
    }

    // Validate user type
    if (userType !== 'student' && userType !== 'tutor') {
      return { error: 'Невірний тип користувача' };
    }

    // Set role based on userType
    const metadata = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      role: userType === 'tutor' ? 'TUTOR' : 'STUDENT'
    };

    console.log('Preparing signup with metadata:', metadata);

    const data = {
      email: email.trim(),
      password,
      options: {
        data: metadata
      }
    }

    console.log('Calling Supabase signup with data:', { 
      email: data.email,
      metadata: data.options.data,
      password: '[REDACTED]'
    });

    const { data: signupData, error } = await supabase.auth.signUp(data)

    if (error) {
      console.error('Supabase signup error:', {
        message: error.message,
        status: error.status,
        name: error.name,
        details: error
      });
      return { error: error.message }
    }

    console.log('Signup successful, user data:', signupData);

    // Wait for the session to be established
    await new Promise(resolve => setTimeout(resolve, 100))

    revalidatePath('/', 'layout')
    
    // Return redirect URL instead of redirecting directly
    return { 
      redirectTo: metadata.role === 'TUTOR' ? '/tutor' : '/'
    }
  } catch (err) {
    console.error('Unexpected error during signup:', err);
    return { error: err instanceof Error ? err.message : 'An unexpected error occurred' };
  }
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
  }

  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: 'http://localhost:3000/auth/update-password',
  })

  if (error) {
    console.error(error)  
    return { error: error.message }
  }

  return { success: true }
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()

  const data = {
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.updateUser({
    password: data.password,
  })

  if (error) {
    console.error(error)
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}