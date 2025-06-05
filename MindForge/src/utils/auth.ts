import { supabaseClient } from '@/utils/supabase/client'
import type { User } from '@/types'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export type UserRole = 'STUDENT' | 'TUTOR' | 'none'

export async function getUserData(): Promise<User | null> {
  const { data: { user }, error } = await supabaseClient.auth.getUser()
  
  if (error || !user) {
    console.error('Error getting user:', error)
    return null
  }

  return {
    id: user.id,
    email: user.email || '',
    firstName: user.user_metadata.firstName || '',
    lastName: user.user_metadata.lastName || '',
    avatarUrl: user.user_metadata.avatarUrl,
    createdAt: new Date(user.created_at),
    role: user.user_metadata.role || 'STUDENT'
  }
}

export async function signOut() {
  const { error } = await supabaseClient.auth.signOut()
  
  if (error) {
    console.error('Error signing out:', error)
    return { error: error.message }
  }
  
  return { success: true }
}

export async function getUserRole(): Promise<UserRole> {
  const supabase = await createClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    return 'none'
  }

  return session.user.user_metadata.role || 'STUDENT'
}

export async function requireAuth(requiredRole?: 'STUDENT' | 'TUTOR') {
  const role = await getUserRole()
  
  if (role === 'none') {
    redirect('/auth/login')
  }

  if (requiredRole && role !== requiredRole) {
    redirect('/')
  }
}

export async function hasRole(requiredRole: 'STUDENT' | 'TUTOR'): Promise<boolean> {
  const role = await getUserRole()
  return role === requiredRole
} 