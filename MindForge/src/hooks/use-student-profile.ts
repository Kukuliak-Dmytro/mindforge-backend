import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import http from '@/utils/http';
import type { StudentProfile } from '@/types/profile';

export const studentProfileKeys = {
  all: ['studentProfile'] as const,
  details: () => [...studentProfileKeys.all, 'detail'] as const,
};

// Fetch student profile
async function fetchStudentProfile(): Promise<StudentProfile> {
  const { data }: { data: any } = await http.get('/student/profile');
  const user = data.data.user || {};
  return {
    id: user.id ?? "",
    email: user.email ?? "",
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    avatarUrl: user.avatarUrl ?? null,
    role: "STUDENT",
    createdAt: user.createdAt ?? "",
    profile: {
      bio: user.bio ?? "",
      phone: user.phone ?? "",
      updatedAt: user.updatedAt ?? "",
    },
    studentOrders: data.data.studentOrders ?? [],
    studentReviews: data.data.studentReviews ?? [],
  };
}

// Update student profile
type UpdateStudentProfileInput = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string | null;
};

async function updateStudentProfile(input: UpdateStudentProfileInput): Promise<StudentProfile> {
  const { data }: { data: any } = await http.patch('/student/profile', input);
  return {
    ...data.data,
    profile: {
      bio: data.data.bio || undefined,
      phone: data.data.phone || undefined,
      updatedAt: data.data.updatedAt,
    },
    studentOrders: [],
    studentReviews: [],
  };
}

export function useStudentProfile() {
  return useQuery({
    queryKey: studentProfileKeys.details(),
    queryFn: fetchStudentProfile,
  });
}

export function useUpdateStudentProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStudentProfile,
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(studentProfileKeys.details(), updatedProfile);
    },
  });
} 