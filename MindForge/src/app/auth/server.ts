import { createClient } from '@/utils/supabase/server'
import type { User } from '@/types'

export async function getServerSession() {
  const supabase = await createClient()
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error) {
    console.error('Error getting session:', error)
    return null
  }
  
  return session
}

export async function getServerUserData(): Promise<User | null> {
  const session = await getServerSession()
  
  if (!session?.user) {
    return null
  }

  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    console.error('Error getting user:', error)
    return null
  }

  return {
    id: user.id,
    email: user.email || '',
    firstName: user.user_metadata.firstName || '',
    lastName: user.user_metadata.lastName || '',
    isTutor: user.user_metadata.isTutor || false,
    isStudent: user.user_metadata.isStudent || false,
    createdAt: new Date(user.created_at)
  }
} 