# Tutor Types Documentation

## Overview
This document provides documentation and usage examples for the tutor-related types defined in `src/types/tutor-types.ts`.

## Type Definitions
The following types are available:

- `TutorBasicInfo`: Basic tutor information
- `TutorEducation`: Education entry for a tutor
- `TutorExperience`: Experience entry for a tutor
- `TutorSubject`: Subject with category and price
- `TutorProfileResponse`: Complete tutor profile response
- `UpdateTutorProfileRequest`: Tutor profile update request
- `BaseResponse<T>`: Base response type for API calls
- `ErrorResponse`: Error response type for API calls

## Usage Examples

### 1. Importing Types
```typescript
import { 
  TutorBasicInfo,
  TutorEducation,
  TutorExperience,
  TutorSubject,
  TutorProfileResponse,
  UpdateTutorProfileRequest,
  TutorProfileValidation,
  BaseResponse,
  ErrorResponse
} from '../types/tutor-types';
```

### 2. Using Types in Components
```typescript
interface TutorProfileProps {
  profile: TutorProfileResponse;
  onUpdate: (data: UpdateTutorProfileRequest) => Promise<void>;
}

const TutorProfile: React.FC<TutorProfileProps> = ({ profile, onUpdate }) => {
  // Component implementation
};
```

### 3. API Integration
```typescript
async function fetchTutorProfile(): Promise<TutorProfileResponse> {
  const response = await fetch('/api/tutor/profile', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const data: BaseResponse<TutorProfileResponse> = await response.json();
  if (!response.ok) {
    const error: ErrorResponse = data;
    throw new Error(error.message);
  }
  
  return data.data;
}

async function updateTutorProfile(
  updateData: UpdateTutorProfileRequest
): Promise<TutorProfileResponse> {
  const response = await fetch('/api/tutor/profile', {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  });
  
  const data: BaseResponse<TutorProfileResponse> = await response.json();
  return data.data;
}
```

### 4. Form Validation
```typescript
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  // Basic Info
  firstName: Yup.string()
    .required(TutorProfileValidation.basicInfo.firstName.required)
    .min(TutorProfileValidation.basicInfo.firstName.minLength),
  lastName: Yup.string()
    .required(TutorProfileValidation.basicInfo.lastName.required)
    .min(TutorProfileValidation.basicInfo.lastName.minLength),
  email: Yup.string()
    .required(TutorProfileValidation.basicInfo.email.required)
    .email(TutorProfileValidation.basicInfo.email.format === 'email'),
  phone: Yup.string().optional(),
  bio: Yup.string().optional(),
  contactInfo: Yup.string().optional(),
  
  // Education
  education: Yup.array().of(
    Yup.object().shape({
      institution: Yup.string()
        .required(TutorProfileValidation.education.institution.required)
        .min(TutorProfileValidation.education.institution.minLength),
      fieldOfStudy: Yup.string()
        .required(TutorProfileValidation.education.fieldOfStudy.required)
        .min(TutorProfileValidation.education.fieldOfStudy.minLength),
      degree: Yup.string()
        .required(TutorProfileValidation.education.degree.required)
        .min(TutorProfileValidation.education.degree.minLength),
      startDate: Yup.date()
        .required(TutorProfileValidation.education.startDate.required),
      endDate: Yup.date().optional()
    })
  ),
  
  // Experience
  experience: Yup.array().of(
    Yup.object().shape({
      institution: Yup.string()
        .required(TutorProfileValidation.experience.institution.required)
        .min(TutorProfileValidation.experience.institution.minLength),
      title: Yup.string()
        .required(TutorProfileValidation.experience.title.required)
        .min(TutorProfileValidation.experience.title.minLength),
      startDate: Yup.date()
        .required(TutorProfileValidation.experience.startDate.required),
      endDate: Yup.date().optional()
    })
  ),
  
  // Subjects
  subjects: Yup.array().of(
    Yup.object().shape({
      subjectId: Yup.string()
        .required(TutorProfileValidation.subjects.subjectId.required)
        .uuid(TutorProfileValidation.subjects.subjectId.format === 'uuid'),
      categoryId: Yup.string()
        .required(TutorProfileValidation.subjects.categoryId.required)
        .uuid(TutorProfileValidation.subjects.categoryId.format === 'uuid'),
      price: Yup.number()
        .required(TutorProfileValidation.subjects.price.required)
        .min(TutorProfileValidation.subjects.price.min)
    })
  )
});

const TutorProfileForm = () => (
  <Formik
    initialValues={{
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      bio: '',
      contactInfo: '',
      education: [],
      experience: [],
      subjects: []
    }}
    validationSchema={validationSchema}
    onSubmit={async (values: UpdateTutorProfileRequest) => {
      try {
        await updateTutorProfile(values);
      } catch (error) {
        // Handle error
      }
    }}
  >
    {/* Form implementation */}
  </Formik>
);
```

### 5. Date Handling
```typescript
import { format, parseISO } from 'date-fns';

// Converting ISO string to display format
const formatDate = (isoDate: ISODateString): string => {
  return format(parseISO(isoDate), 'MMM dd, yyyy');
};

// Format date range
const formatDateRange = (
  startDate: ISODateString,
  endDate: ISODateString | null
): string => {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : 'Present';
  return `${start} - ${end}`;
};

// In your component
const TutorEducationCard: React.FC<{ education: TutorEducation }> = ({ education }) => (
  <div>
    <h3>{education.institution}</h3>
    <p>{education.degree} in {education.fieldOfStudy}</p>
    <p>{formatDateRange(education.startDate, education.endDate)}</p>
  </div>
);
```

### 6. Type Guards
```typescript
function isTutorProfileResponse(data: unknown): data is TutorProfileResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'user' in data &&
    'education' in data &&
    'experiences' in data &&
    'subjects' in data
  );
}

function isTutorEducation(data: unknown): data is TutorEducation {
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

// Usage
const data = await fetchTutorProfile();
if (isTutorProfileResponse(data)) {
  // TypeScript knows data is TutorProfileResponse
  console.log(data.user.firstName);
  
  // Type guard for education entries
  data.education.forEach(edu => {
    if (isTutorEducation(edu)) {
      console.log(edu.institution);
    }
  });
}
```

### 7. Error Handling
```typescript
class TutorProfileError extends Error {
  constructor(
    message: string,
    public readonly errors?: ErrorResponse['errors']
  ) {
    super(message);
    this.name = 'TutorProfileError';
  }
}

async function handleProfileUpdate(
  updateData: UpdateTutorProfileRequest
): Promise<void> {
  try {
    const response = await fetch('/api/tutor/profile', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new TutorProfileError(
        data.message,
        (data as ErrorResponse).errors
      );
    }
    
    // Handle success
  } catch (error) {
    if (error instanceof TutorProfileError) {
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
- Use proper null checking for optional fields (avatarUrl, bio, phone, contactInfo)
- Consider implementing proper loading states when fetching/updating data
- Use proper error boundaries in React components
- Implement proper caching strategies for profile data
- Consider implementing optimistic updates for better UX
- Handle atomic updates properly (all changes succeed or fail together)
- Validate UUIDs before sending to the API
- Implement proper price formatting (2 decimal places)
- Handle recurring vs non-recurring categories appropriately
- Implement proper date range validation (end date after start date)
- Consider implementing proper data transformation layers
- Use proper state management for complex forms
- Implement proper loading and error states for each section
- Consider implementing proper data prefetching
- Use proper memoization for expensive computations
- Implement proper accessibility features
- Consider implementing proper internationalization
- Use proper testing strategies (unit, integration, e2e) 