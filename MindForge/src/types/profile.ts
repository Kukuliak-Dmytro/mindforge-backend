import type { TutorProfileResponse } from './tutor-types';

export type UserRole = 'STUDENT' | 'TUTOR';

export interface BaseProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  role: UserRole;
  createdAt: string;
  profile: {
    bio?: string;
    phone?: string;
    updatedAt: string;
  } | null;
}

export interface StudentProfile extends BaseProfile {
  role: 'STUDENT';
  studentOrders: Array<{
    id: string;
    subjectId: string;
    tutorId: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED';
    createdAt: string;
    updatedAt: string;
  }>;
  studentReviews: Array<{
    id: string;
    tutorId: string;
    rating: number;
    content: string;
    createdAt: string;
  }>;
}

export interface TutorProfile extends BaseProfile {
  role: 'TUTOR';
  tutorProfile: TutorProfileResponse;
}

export type Profile = StudentProfile | TutorProfile;

// API response type
export interface ProfileResponse {
  message: string;
  data: Profile;
}

// Type guard functions
export function isStudentProfile(profile: Profile): profile is StudentProfile {
  return profile.role === 'STUDENT';
}

export function isTutorProfile(profile: Profile): profile is TutorProfile {
  return profile.role === 'TUTOR';
} 