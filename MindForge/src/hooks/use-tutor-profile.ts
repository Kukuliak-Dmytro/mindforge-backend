import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTutorProfile } from '@/services/profile'
import type { TutorProfileResponse, UpdateTutorProfileRequest, TutorEducation, TutorExperience, TutorSubject } from '@/types/tutor-types'
import { TutorProfileError } from '@/types/tutor-types'

export const tutorProfileKeys = {
  all: ['tutor-profile'] as const,
  details: () => [...tutorProfileKeys.all, 'detail'] as const,
}

export function useTutorProfile() {
  const queryClient = useQueryClient()

  const updateProfile = useMutation({
    mutationFn: updateTutorProfile,
    onSuccess: (updatedProfile) => {
      // Update both the tutor profile and the main profile cache
      queryClient.setQueryData(tutorProfileKeys.details(), updatedProfile)
      queryClient.setQueryData(['profile', 'detail'], (oldData: any) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          tutorProfile: updatedProfile
        }
      })
    },
    onError: (error: TutorProfileError) => {
      // You can add custom error handling here
      console.error('Failed to update tutor profile:', error.message, error.errors)
    }
  })

  return {
    updateProfile,
    isUpdating: updateProfile.isPending,
    error: updateProfile.error as TutorProfileError | null
  }
}

// Helper hook for managing education entries
export function useTutorEducation() {
  const { updateProfile } = useTutorProfile()

  const addEducation = (education: Omit<TutorEducation, 'id'>) => {
    return updateProfile.mutateAsync({
      education: {
        add: [{
          institution: education.institution,
          fieldOfStudy: education.fieldOfStudy,
          degree: education.degree,
          startDate: education.startDate,
          endDate: education.endDate || undefined
        }]
      }
    })
  }

  const removeEducation = (educationId: string) => {
    return updateProfile.mutateAsync({
      education: {
        remove: [educationId]
      }
    })
  }

  // New: updateEducation (remove old, add new in one PATCH)
  const updateEducation = (oldId: string, education: Omit<TutorEducation, 'id'>) => {
    return updateProfile.mutateAsync({
      education: {
        remove: [oldId],
        add: [{
          institution: education.institution,
          fieldOfStudy: education.fieldOfStudy,
          degree: education.degree,
          startDate: education.startDate,
          endDate: education.endDate || undefined
        }]
      }
    })
  }

  return {
    addEducation,
    removeEducation,
    updateEducation, // Exported
    isUpdating: updateProfile.isPending,
    error: updateProfile.error as TutorProfileError | null
  }
}

// Helper hook for managing experience entries
export function useTutorExperience() {
  const { updateProfile } = useTutorProfile()

  const addExperience = (experience: Omit<TutorExperience, 'id'>) => {
    return updateProfile.mutateAsync({
      experience: {
        add: [{
          institution: experience.institution,
          title: experience.title,
          startDate: experience.startDate,
          endDate: experience.endDate || undefined
        }]
      }
    })
  }

  const removeExperience = (experienceId: string) => {
    return updateProfile.mutateAsync({
      experience: {
        remove: [experienceId]
      }
    })
  }

  // New: updateExperience (remove old, add new in one PATCH)
  const updateExperience = (oldId: string, experience: Omit<TutorExperience, 'id'>) => {
    return updateProfile.mutateAsync({
      experience: {
        remove: [oldId],
        add: [{
          institution: experience.institution,
          title: experience.title,
          startDate: experience.startDate,
          endDate: experience.endDate || undefined
        }]
      }
    })
  }

  return {
    addExperience,
    removeExperience,
    updateExperience, // Exported
    isUpdating: updateProfile.isPending,
    error: updateProfile.error as TutorProfileError | null
  }
}

// Helper hook for managing subject entries
export function useTutorSubjects() {
  const { updateProfile } = useTutorProfile()

  const addSubject = (subject: Pick<TutorSubject, 'subjectId' | 'categoryId' | 'price'>) => {
    return updateProfile.mutateAsync({
      subjects: {
        add: [{
          subjectId: subject.subjectId,
          categoryId: subject.categoryId,
          price: subject.price
        }]
      }
    })
  }

  const removeSubject = (subjectId: string, categoryId: string) => {
    return updateProfile.mutateAsync({
      subjects: {
        remove: [{
          subjectId,
          categoryId
        }]
      }
    })
  }

  // New: updateSubject (remove old, add new in one PATCH)
  const updateSubject = (
    oldSubjectId: string,
    oldCategoryId: string,
    subject: Pick<TutorSubject, 'subjectId' | 'categoryId' | 'price'>
  ) => {
    return updateProfile.mutateAsync({
      subjects: {
        remove: [{
          subjectId: oldSubjectId,
          categoryId: oldCategoryId
        }],
        add: [{
          subjectId: subject.subjectId,
          categoryId: subject.categoryId,
          price: subject.price
        }]
      }
    })
  }

  return {
    addSubject,
    removeSubject,
    updateSubject, // Exported
    isUpdating: updateProfile.isPending,
    error: updateProfile.error as TutorProfileError | null
  }
} 