// Common types
type UUID = string; // Format: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
type ISODateString = string; // Format: "YYYY-MM-DDTHH:mm:ss.sssZ"

/**
 * Basic student information
 */
export interface StudentBasicInfo {
  id: UUID;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  bio: string | null;
  phone: string | null;
  updatedAt: ISODateString;
  createdAt: ISODateString;
}

/**
 * Order information for a student
 */
export interface StudentOrder {
  id: UUID;
  title: string;
  description: string | null;
  status: string;
  totalPrice: number;
  sessionsCount: number;
  sessionsCompleted: number;
  createdAt: ISODateString;
  subject: {
    id: UUID;
    name: string;
  };
  category: {
    id: UUID;
    name: string;
    isRecurring: boolean;
  };
  tutor: {
    id: UUID;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
}

/**
 * Review information submitted by a student
 */
export interface StudentReview {
  id: UUID;
  rating: number;
  comment: string | null;
  createdAt: ISODateString;
  tutor: {
    id: UUID;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
}

/**
 * Complete student profile response
 */
export interface StudentProfileResponse {
  user: StudentBasicInfo;
  studentOrders: StudentOrder[];
  studentReviews: StudentReview[];
}

/**
 * Student profile update request
 */
export interface UpdateStudentProfileRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
}

/**
 * Base response type for API calls
 */
export interface BaseResponse<T> {
  message: string;
  data: T;
}

/**
 * Error response type for API calls
 */
export interface ErrorResponse {
  message: string;
  errors?: Array<{
    path: string[];
    message: string;
  }>;
}

/**
 * Validation rules for student profile
 */
export const StudentProfileValidation = {
  firstName: {
    required: true,
    minLength: 1
  },
  lastName: {
    required: true,
    minLength: 1
  },
  email: {
    required: true,
    format: 'email'
  },
  phone: {
    required: false
  },
  bio: {
    required: false
  }
} as const; 