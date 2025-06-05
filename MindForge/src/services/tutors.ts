import http from '@/utils/http';
import type { Tutor } from '@/types/tutor-types';

/**
 * Fetch all tutors (public catalog)
 */
export async function fetchAllTutors(): Promise<Tutor[]> {
  try {
    const { data } = await http.get<Tutor[]>('/user/tutors');
    return data;
  } catch (error: any) {
    console.error('Error fetching tutors:', error.response?.data || error.message);
    throw error;
  }
} 