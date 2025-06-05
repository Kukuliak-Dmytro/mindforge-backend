// Common types
export type UUID = string; // Format: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
export type ISODateString = string; // Format: "YYYY-MM-DDTHH:mm:ss.sssZ"

/**
 * Basic tutor information
 */
export interface TutorBasicInfo {
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
 * Education entry for a tutor
 */
export interface TutorEducation {
  id: UUID;
  institution: string;
  fieldOfStudy: string;
  degree: string;
  startDate: ISODateString;
  endDate: ISODateString | null; // null indicates current education
}

/**
 * Experience entry for a tutor
 */
export interface TutorExperience {
  id: UUID;
  institution: string;
  title: string;
  startDate: ISODateString;
  endDate: ISODateString | null; // null indicates current position
}

/**
 * Subject with category and price
 */
export interface TutorSubject {
  id: UUID;
  subjectId: UUID;
  categoryId: UUID;
  price: number; // Decimal number representing price
  subject: {
    id: UUID;
    name: string;
  };
  category: {
    id: UUID;
    name: string;
    isRecurring: boolean;
  };
}

/**
 * Complete tutor profile response
 */
export interface TutorProfileResponse {
  user: TutorBasicInfo;
  education: TutorEducation[];
  experiences: TutorExperience[];
  subjects: TutorSubject[];
}

/**
 * Tutor profile update request
 */
export interface UpdateTutorProfileRequest {
  // Basic profile info (all fields optional)
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bio?: string;
  
  // Education updates
  education?: {
    add?: Array<{
      institution: string;
      fieldOfStudy: string;
      degree: string;
      startDate: ISODateString;
      endDate?: ISODateString;
    }>;
    remove?: UUID[]; // Array of education entry IDs to remove
  };
  
  // Experience updates
  experience?: {
    add?: Array<{
      institution: string;
      title: string;
      startDate: ISODateString;
      endDate?: ISODateString;
    }>;
    remove?: UUID[]; // Array of experience entry IDs to remove
  };
  
  // Subject updates
  subjects?: {
    add?: Array<{
      subjectId: UUID;
      categoryId: UUID;
      price: number;
    }>;
    remove?: Array<{
      subjectId: UUID;
      categoryId: UUID;
    }>;
  };
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
 * Validation rules for tutor profile
 */
export const TutorProfileValidation = {
  basicInfo: {
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
  },
  education: {
    institution: {
      required: true,
      minLength: 1
    },
    fieldOfStudy: {
      required: true,
      minLength: 1
    },
    degree: {
      required: true,
      minLength: 1
    },
    startDate: {
      required: true,
      format: 'iso-date'
    },
    endDate: {
      required: false,
      format: 'iso-date'
    }
  },
  experience: {
    institution: {
      required: true,
      minLength: 1
    },
    title: {
      required: true,
      minLength: 1
    },
    startDate: {
      required: true,
      format: 'iso-date'
    },
    endDate: {
      required: false,
      format: 'iso-date'
    }
  },
  subjects: {
    subjectId: {
      required: true,
      format: 'uuid'
    },
    categoryId: {
      required: true,
      format: 'uuid'
    },
    price: {
      required: true,
      min: 0
    }
  }
} as const;

// Type guards
export function isTutorProfileResponse(data: unknown): data is TutorProfileResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'user' in data &&
    'education' in data &&
    'experiences' in data &&
    'subjects' in data
  );
}

export function isTutorEducation(data: unknown): data is TutorEducation {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'institution' in data &&
    'fieldOfStudy' in data &&
    'degree' in data &&
    'startDate' in data
  );
}

// Custom error class for tutor profile operations
export class TutorProfileError extends Error {
  constructor(
    message: string,
    public readonly errors?: ErrorResponse['errors']
  ) {
    super(message);
    this.name = 'TutorProfileError';
  }
}

/**
 * Public tutor info for catalog (matches /user/tutors response)
 */
export interface Tutor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
} 