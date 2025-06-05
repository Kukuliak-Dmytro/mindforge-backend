import { UUID } from './common-types';

export interface Subject {
  id: UUID;
  name: string;
  description: string | null;
  icon: string | null;
}

export interface SubjectResponse {
  message: string;
  data: Subject[];
}

export interface SubjectCreateRequest {
  name: string;
  description?: string;
  icon?: string;
}

export interface SubjectUpdateRequest {
  name?: string;
  description?: string;
  icon?: string;
}

export const SubjectValidation = {
  name: {
    required: true,
    minLength: 1,
    maxLength: 255
  },
  description: {
    required: false,
    maxLength: 1000
  },
  icon: {
    required: false,
    maxLength: 255
  }
} as const; 