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

/**
 * USAGE INSTRUCTIONS
 * =================
 * 
 * 1. Importing Types
 * -----------------
 * Import the types you need in your components/services:
 * 
 * ```typescript
 * import { 
 *   StudentBasicInfo,
 *   StudentOrder,
 *   StudentReview,
 *   StudentProfileResponse,
 *   UpdateStudentProfileRequest,
 *   StudentProfileValidation,
 *   BaseResponse,
 *   ErrorResponse
 * } from '../types/student-types';
 * ```
 * 
 * 2. Using Types in Components
 * ---------------------------
 * Example of using types in a React component:
 * 
 * ```typescript
 * interface StudentProfileProps {
 *   profile: StudentProfileResponse;
 *   onUpdate: (data: UpdateStudentProfileRequest) => Promise<void>;
 * }
 * 
 * const StudentProfile: React.FC<StudentProfileProps> = ({ profile, onUpdate }) => {
 *   // Component implementation
 * };
 * ```
 * 
 * 3. API Integration
 * ----------------
 * Example of using types with API calls:
 * 
 * ```typescript
 * async function fetchStudentProfile(): Promise<StudentProfileResponse> {
 *   const response = await fetch('/api/student/profile', {
 *     headers: {
 *       'Authorization': `Bearer ${token}`
 *     }
 *   });
 *   
 *   const data: BaseResponse<StudentProfileResponse> = await response.json();
 *   if (!response.ok) {
 *     const error: ErrorResponse = data;
 *     throw new Error(error.message);
 *   }
 *   
 *   return data.data;
 * }
 * 
 * async function updateStudentProfile(
 *   updateData: UpdateStudentProfileRequest
 * ): Promise<StudentBasicInfo> {
 *   const response = await fetch('/api/student/profile', {
 *     method: 'PATCH',
 *     headers: {
 *       'Authorization': `Bearer ${token}`,
 *       'Content-Type': 'application/json'
 *     },
 *     body: JSON.stringify(updateData)
 *   });
 *   
 *   const data: BaseResponse<StudentBasicInfo> = await response.json();
 *   return data.data;
 * }
 * ```
 * 
 * 4. Form Validation
 * ----------------
 * Using the validation rules with a form library (e.g., Formik):
 * 
 * ```typescript
 * import { Formik } from 'formik';
 * import * as Yup from 'yup';
 * 
 * const validationSchema = Yup.object().shape({
 *   firstName: Yup.string()
 *     .required(StudentProfileValidation.firstName.required)
 *     .min(StudentProfileValidation.firstName.minLength),
 *   lastName: Yup.string()
 *     .required(StudentProfileValidation.lastName.required)
 *     .min(StudentProfileValidation.lastName.minLength),
 *   email: Yup.string()
 *     .required(StudentProfileValidation.email.required)
 *     .email(StudentProfileValidation.email.format === 'email'),
 *   phone: Yup.string().optional(),
 *   bio: Yup.string().optional()
 * });
 * 
 * const StudentProfileForm = () => (
 *   <Formik
 *     initialValues={{
 *       firstName: '',
 *       lastName: '',
 *       email: '',
 *       phone: '',
 *       bio: ''
 *     }}
 *     validationSchema={validationSchema}
 *     onSubmit={async (values: UpdateStudentProfileRequest) => {
 *       try {
 *         await updateStudentProfile(values);
 *       } catch (error) {
 *         // Handle error
 *       }
 *     }}
 *   >
 *     {/* Form implementation */}
 *   </Formik>
 * );
 * ```
 * 
 * 5. Date Handling
 * --------------
 * For handling ISO dates in the UI:
 * 
 * ```typescript
 * import { format, parseISO } from 'date-fns';
 * 
 * // Converting ISO string to display format
 * const formatDate = (isoDate: ISODateString): string => {
 *   return format(parseISO(isoDate), 'MMM dd, yyyy');
 * };
 * 
 * // In your component
 * const StudentOrderCard: React.FC<{ order: StudentOrder }> = ({ order }) => (
 *   <div>
 *     <h3>{order.title}</h3>
 *     <p>Created: {formatDate(order.createdAt)}</p>
 *     {/* Other order details */}
 *   </div>
 * );
 * ```
 * 
 * 6. Type Guards
 * ------------
 * Creating type guards for runtime type checking:
 * 
 * ```typescript
 * function isStudentProfileResponse(data: unknown): data is StudentProfileResponse {
 *   return (
 *     typeof data === 'object' &&
 *     data !== null &&
 *     'user' in data &&
 *     'studentOrders' in data &&
 *     'studentReviews' in data
 *   );
 * }
 * 
 * // Usage
 * const data = await fetchStudentProfile();
 * if (isStudentProfileResponse(data)) {
 *   // TypeScript knows data is StudentProfileResponse
 *   console.log(data.user.firstName);
 * }
 * ```
 * 
 * 7. Error Handling
 * ---------------
 * Example of comprehensive error handling:
 * 
 * ```typescript
 * class StudentProfileError extends Error {
 *   constructor(
 *     message: string,
 *     public readonly errors?: ErrorResponse['errors']
 *   ) {
 *     super(message);
 *     this.name = 'StudentProfileError';
 *   }
 * }
 * 
 * async function handleProfileUpdate(
 *   updateData: UpdateStudentProfileRequest
 * ): Promise<void> {
 *   try {
 *     const response = await fetch('/api/student/profile', {
 *       method: 'PATCH',
 *       headers: {
 *         'Authorization': `Bearer ${token}`,
 *         'Content-Type': 'application/json'
 *       },
 *       body: JSON.stringify(updateData)
 *     });
 *     
 *     const data = await response.json();
 *     
 *     if (!response.ok) {
 *       throw new StudentProfileError(
 *         data.message,
 *         (data as ErrorResponse).errors
 *       );
 *     }
 *     
 *     // Handle success
 *   } catch (error) {
 *     if (error instanceof StudentProfileError) {
 *       // Handle validation errors
 *       error.errors?.forEach(err => {
 *         console.error(`Error in ${err.path.join('.')}: ${err.message}`);
 *       });
 *     } else {
 *       // Handle other errors
 *       console.error('Unexpected error:', error);
 *     }
 *   }
 * }
 * ```
 * 
 * 8. Best Practices
 * ---------------
 * - Always use type annotations when declaring variables that will hold these types
 * - Use type guards when dealing with data from external sources
 * - Implement proper error handling for all API calls
 * - Use the validation rules consistently across your application
 * - Keep ISO date strings for API calls, convert to display format only in UI
 * - Use proper null checking for optional fields (avatarUrl, bio, phone)
 * - Consider implementing proper loading states when fetching/updating data
 * - Use proper error boundaries in React components
 * - Implement proper caching strategies for profile data
 * - Consider implementing optimistic updates for better UX
 */ 