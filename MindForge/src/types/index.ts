export * from './user'
export * from './order'
export * from './chat'
export * from './subject'

export type UserRole = 'STUDENT' | 'TUTOR'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatarUrl?: string
  createdAt: Date
  role: UserRole
} 