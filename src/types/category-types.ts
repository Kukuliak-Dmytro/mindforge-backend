import { UUID } from './common-types';

export interface Category {
  id: UUID;
  name: string;
  description: string | null;
  isRecurring: boolean;
  icon: string | null;
}

export interface CategoryResponse {
  message: string;
  data: Category[];
}

export interface CategoryCreateRequest {
  name: string;
  description?: string;
  isRecurring?: boolean;
  icon?: string;
}

export interface CategoryUpdateRequest {
  name?: string;
  description?: string;
  isRecurring?: boolean;
  icon?: string;
}

export const CategoryValidation = {
  name: {
    required: true,
    minLength: 1,
    maxLength: 255
  },
  description: {
    required: false,
    maxLength: 1000
  },
  isRecurring: {
    required: false,
    type: 'boolean'
  },
  icon: {
    required: false,
    maxLength: 255
  }
} as const; 