# Student Types Usage Guide

This document provides comprehensive usage instructions for the student types defined in `src/types/student-types.ts`.

## Table of Contents
1. [Importing Types](#importing-types)
2. [Using Types in Components](#using-types-in-components)
3. [API Integration](#api-integration)
4. [Form Validation](#form-validation)
5. [Date Handling](#date-handling)
6. [Type Guards](#type-guards)
7. [Error Handling](#error-handling)
8. [Best Practices](#best-practices)

## Importing Types

Import the types you need in your components/services:

```typescript
import { 
  StudentBasicInfo,
  StudentOrder,
  StudentReview,
  StudentProfileResponse,
  UpdateStudentProfileRequest,
  StudentProfileValidation,
  BaseResponse,
  ErrorResponse
} from '../types/student-types';
```

## Using Types in Components

Example of using types in a React component:

```typescript
interface StudentProfileProps {
  profile: StudentProfileResponse;
  onUpdate: (data: UpdateStudentProfileRequest) => Promise<void>;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ profile, onUpdate }) => {
  // Component implementation
};
```

## API Integration

Example of using types with API calls:

```typescript
async function fetchStudentProfile(): Promise<StudentProfileResponse> {
  const response = await fetch('/api/student/profile', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const data: BaseResponse<StudentProfileResponse> = await response.json();
  if (!response.ok) {
    const error: ErrorResponse = data;
    throw new Error(error.message);
  }
  
  return data.data;
}

async function updateStudentProfile(
  updateData: UpdateStudentProfileRequest
): Promise<StudentBasicInfo> {
  const response = await fetch('/api/student/profile', {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  });
  
  const data: BaseResponse<StudentBasicInfo> = await response.json();
  return data.data;
}
```

## Form Validation

Using the validation rules with a form library (e.g., Formik):

```typescript
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required(StudentProfileValidation.firstName.required)
    .min(StudentProfileValidation.firstName.minLength),
  lastName: Yup.string()
    .required(StudentProfileValidation.lastName.required)
    .min(StudentProfileValidation.lastName.minLength),
  email: Yup.string()
    .required(StudentProfileValidation.email.required)
    .email(StudentProfileValidation.email.format === 'email'),
  phone: Yup.string().optional(),
  bio: Yup.string().optional()
});

const StudentProfileForm = () => (
  <Formik
    initialValues={{
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      bio: ''
    }}
    validationSchema={validationSchema}
    onSubmit={async (values: UpdateStudentProfileRequest) => {
      try {
        await updateStudentProfile(values);
      } catch (error) {
        // Handle error
      }
    }}
  >
    {/* Form implementation */}
  </Formik>
);
```

## Date Handling

For handling ISO dates in the UI:

```typescript
import { format, parseISO } from 'date-fns';

// Converting ISO string to display format
const formatDate = (isoDate: ISODateString): string => {
  return format(parseISO(isoDate), 'MMM dd, yyyy');
};

// In your component
const StudentOrderCard: React.FC<{ order: StudentOrder }> = ({ order }) => (
  <div>
    <h3>{order.title}</h3>
    <p>Created: {formatDate(order.createdAt)}</p>
    {/* Other order details */}
  </div>
);
```

## Type Guards

Creating type guards for runtime type checking:

```typescript
function isStudentProfileResponse(data: unknown): data is StudentProfileResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'user' in data &&
    'studentOrders' in data &&
    'studentReviews' in data
  );
}

// Usage
const data = await fetchStudentProfile();
if (isStudentProfileResponse(data)) {
  // TypeScript knows data is StudentProfileResponse
  console.log(data.user.firstName);
}
```

## Error Handling

Example of comprehensive error handling:

```typescript
class StudentProfileError extends Error {
  constructor(
    message: string,
    public readonly errors?: ErrorResponse['errors']
  ) {
    super(message);
    this.name = 'StudentProfileError';
  }
}

async function handleProfileUpdate(
  updateData: UpdateStudentProfileRequest
): Promise<void> {
  try {
    const response = await fetch('/api/student/profile', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new StudentProfileError(
        data.message,
        (data as ErrorResponse).errors
      );
    }
    
    // Handle success
  } catch (error) {
    if (error instanceof StudentProfileError) {
      // Handle validation errors
      error.errors?.forEach(err => {
        console.error(`Error in ${err.path.join('.')}: ${err.message}`);
      });
    } else {
      // Handle other errors
      console.error('Unexpected error:', error);
    }
  }
}
```

## Best Practices

- Always use type annotations when declaring variables that will hold these types
- Use type guards when dealing with data from external sources
- Implement proper error handling for all API calls
- Use the validation rules consistently across your application
- Keep ISO date strings for API calls, convert to display format only in UI
- Use proper null checking for optional fields (avatarUrl, bio, phone)
- Consider implementing proper loading states when fetching/updating data
- Use proper error boundaries in React components
- Implement proper caching strategies for profile data
- Consider implementing optimistic updates for better UX
- Handle token expiration and refresh flows appropriately
- Implement proper form validation matching the backend validation rules
- Use proper number formatting for prices (e.g., 2 decimal places)
- Implement proper date formatting for display while maintaining ISO format for API calls 