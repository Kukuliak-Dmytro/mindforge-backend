import http from '@/utils/http'
import { createBrowserClient } from '@supabase/ssr'
import type { Profile, ProfileResponse, StudentProfile, TutorProfile } from '@/types/profile'
import type { UpdateTutorProfileRequest, TutorProfileResponse, BaseResponse } from '@/types/tutor-types'
import { TutorProfileError } from '@/types/tutor-types'
import type { Tutor } from '@/types/tutor-types'

interface ApiProfileResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      avatarUrl: string | null;
      bio: string | null;
      phone: string | null;
      createdAt: string;
      updatedAt: string;
    };
    education: any[];
    experiences: any[];
    subjects: any[];
  };
}

export async function getProfile(): Promise<Profile> {
  try {
    // Get role from Supabase user metadata
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      throw new Error('Failed to get user data')
    }

    console.log('User Metadata:', user.user_metadata)
    const role = user.user_metadata.role || 'STUDENT'

    // Fetch the appropriate profile based on role
    const endpoint = role === 'TUTOR' ? '/tutor/profile' : '/student/profile'
    const { data } = await http.get<ApiProfileResponse>(endpoint)
    
    console.log('Profile data:', data)
    
    // Transform the data based on role
    if (role === 'TUTOR') {
      const tutorProfile: TutorProfile = {
        id: data.data.user.id,
        email: data.data.user.email,
        firstName: data.data.user.firstName,
        lastName: data.data.user.lastName,
        avatarUrl: data.data.user.avatarUrl || null,
        role: 'TUTOR',
        createdAt: data.data.user.createdAt,
        profile: {
          bio: data.data.user.bio || undefined,
          phone: data.data.user.phone || undefined,
          updatedAt: data.data.user.updatedAt
        },
        tutorProfile: {
          user: {
            id: data.data.user.id,
            email: data.data.user.email,
            firstName: data.data.user.firstName,
            lastName: data.data.user.lastName,
            avatarUrl: data.data.user.avatarUrl,
            bio: data.data.user.bio,
            phone: data.data.user.phone,
            updatedAt: data.data.user.updatedAt,
            createdAt: data.data.user.createdAt
          },
          education: data.data.education,
          experiences: data.data.experiences,
          subjects: data.data.subjects
        }
      }
      return tutorProfile
    } else {
      const studentProfile: StudentProfile = {
        id: data.data.user.id,
        email: data.data.user.email,
        firstName: data.data.user.firstName,
        lastName: data.data.user.lastName,
        avatarUrl: data.data.user.avatarUrl || null,
        role: 'STUDENT',
        createdAt: data.data.user.createdAt,
        profile: {
          bio: data.data.user.bio || undefined,
          phone: data.data.user.phone || undefined,
          updatedAt: data.data.user.updatedAt
        },
        studentOrders: [],
        studentReviews: []
      }
      return studentProfile
    }
  } catch (error: any) {
    console.error('Error fetching profile:', {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    })
    throw error
  }
}

export async function updateProfile(profile: Partial<Profile>): Promise<Profile> {
  try {
    // Base update data that applies to both student and tutor profiles
    const baseUpdateData = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      avatarUrl: profile.avatarUrl,
      profile: profile.profile ? {
        bio: profile.profile.bio,
        phone: profile.profile.phone,
        updatedAt: new Date().toISOString()
      } : undefined
    }

    // If it's a tutor profile update with tutor-specific fields
    if ('tutorProfile' in profile) {
      const tutorUpdateData = profile as Partial<TutorProfile>
      const { data } = await http.patch<ProfileResponse>('/tutor/profile/update', {
        ...baseUpdateData,
        tutorProfile: tutorUpdateData.tutorProfile
      })
      return data.data
    }

    // For student profile updates
    const { data } = await http.patch<ProfileResponse>('/profile/update', baseUpdateData)
    return data.data
  } catch (error: any) {
    console.error('Error updating profile:', {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    })
    throw error
  }
}

export async function updateTutorProfile(updateData: UpdateTutorProfileRequest): Promise<TutorProfileResponse> {
  try {
    const { data } = await http.patch<BaseResponse<TutorProfileResponse>>('/tutor/profile', updateData)
    return data.data
  } catch (error: any) {
    console.error('Error updating tutor profile:', {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    })
    throw new TutorProfileError(
      error.response?.data?.message || 'Failed to update tutor profile',
      error.response?.data?.errors
    )
  }
} 