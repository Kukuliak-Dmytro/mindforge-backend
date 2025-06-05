export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatarUrl?: string
  createdAt: Date
  isTutor: boolean
  isStudent: boolean
}

export interface Profile {
  id: string
  userId: string
  bio?: string
  updatedAt: Date
}

export interface TutorEducation {
  id: string
  userId: string
  institution: string
  fieldOfStudy: string
  degree: string
  startDate: Date
  endDate?: Date
}

export interface TutorExperience {
  id: string
  userId: string
  institution: string
  title: string
  startDate: Date
  endDate?: Date
}

export interface TutorSubject {
  id: string
  tutorId: string
  subjectId: string
  hourlyRate: number
} 