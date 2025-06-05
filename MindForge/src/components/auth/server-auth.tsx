import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function getSession() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function requireAuth(requiredRole?: 'STUDENT' | 'TUTOR') {
  const session = await getSession()
  
  if (!session) {
    redirect('/auth/login')
  }

  const role = session.user.user_metadata.role || 'STUDENT'
  
  if (requiredRole && role !== requiredRole) {
    redirect('/')
  }

  return session
}

export async function getUserRole() {
  const session = await getSession()
  if (!session) return null
  
  return session.user.user_metadata.role || 'STUDENT'
} 