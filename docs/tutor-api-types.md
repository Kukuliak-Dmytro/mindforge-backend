# Profile API Documentation

## Base Types

```typescript
// Common types used across the API
type UUID = string; // Format: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

interface BaseResponse<T> {
  message: string;
  data: T;
}

interface ErrorResponse {
  message: string;
  errors?: Array<{
    path: string[];
    message: string;
  }>;
}

// Date strings should be in ISO 8601 format: "YYYY-MM-DDTHH:mm:ss.sssZ"
type ISODateString = string;
```

## Tutor Profile Types

```typescript
// Basic tutor information
interface TutorBasicInfo {
  id: UUID;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  bio: string | null;
  phone: string | null;
  contactInfo: string | null;
  updatedAt: ISODateString;
  createdAt: ISODateString;
}

// Education entry
interface TutorEducation {
  id: UUID;
  institution: string;
  fieldOfStudy: string;
  degree: string;
  startDate: ISODateString;
  endDate: ISODateString | null; // null indicates current education
}

// Experience entry
interface TutorExperience {
  id: UUID;
  institution: string;
  title: string;
  startDate: ISODateString;
  endDate: ISODateString | null; // null indicates current position
}

// Subject with category and price
interface TutorSubject {
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

// Complete tutor profile response
interface TutorProfileResponse {
  user: TutorBasicInfo;
  education: TutorEducation[];
  experiences: TutorExperience[];
  subjects: TutorSubject[];
}

// Tutor profile update request
interface UpdateTutorProfileRequest {
  // Basic profile info (all fields optional)
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bio?: string;
  contactInfo?: string;
  
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
```

## Student Profile Types

```typescript
// Basic student information
interface StudentBasicInfo {
  id: UUID;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  bio: string | null;
  phone: string | null;
  contactInfo: string | null;
  updatedAt: ISODateString;
  createdAt: ISODateString;
}

// Order information
interface StudentOrder {
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

// Review information
interface StudentReview {
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

// Complete student profile response
interface StudentProfileResponse {
  user: StudentBasicInfo;
  studentOrders: StudentOrder[];
  studentReviews: StudentReview[];
}

// Student profile update request
interface UpdateStudentProfileRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
  contactInfo?: string;
}
```

## API Endpoints

### Tutor Endpoints

#### 1. Get Tutor Profile
```typescript
// Endpoint: GET /api/tutor/profile
// Authentication: Required (Bearer token)
// Response: BaseResponse<TutorProfileResponse>

// Example Response:
{
  "message": "Tutor profile retrieved successfully",
  "data": {
    "user": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "tutor@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "avatarUrl": "https://example.com/avatar.jpg",
      "bio": "Experienced math tutor",
      "phone": "+1234567890",
      "contactInfo": "Available on weekends",
      "updatedAt": "2024-03-20T10:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "education": [
      {
        "id": "123e4567-e89b-12d3-a456-426614174001",
        "institution": "University of Example",
        "fieldOfStudy": "Mathematics",
        "degree": "Bachelor of Science",
        "startDate": "2018-09-01T00:00:00.000Z",
        "endDate": "2022-06-30T00:00:00.000Z"
      }
    ],
    "experiences": [
      {
        "id": "123e4567-e89b-12d3-a456-426614174002",
        "institution": "Math Academy",
        "title": "Senior Math Tutor",
        "startDate": "2022-07-01T00:00:00.000Z",
        "endDate": null
      }
    ],
    "subjects": [
      {
        "id": "123e4567-e89b-12d3-a456-426614174003",
        "subjectId": "123e4567-e89b-12d3-a456-426614174004",
        "categoryId": "123e4567-e89b-12d3-a456-426614174005",
        "price": 50.00,
        "subject": {
          "id": "123e4567-e89b-12d3-a456-426614174004",
          "name": "Calculus"
        },
        "category": {
          "id": "123e4567-e89b-12d3-a456-426614174005",
          "name": "One-on-One",
          "isRecurring": true
        }
      }
    ]
  }
}
```

#### 2. Update Tutor Profile
```typescript
// Endpoint: PATCH /api/tutor/profile
// Authentication: Required (Bearer token)
// Request Body: UpdateTutorProfileRequest
// Response: BaseResponse<TutorProfileResponse>

// Example Request:
{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Updated bio",
  "education": {
    "add": [
      {
        "institution": "New University",
        "fieldOfStudy": "Computer Science",
        "degree": "Master's",
        "startDate": "2023-09-01T00:00:00.000Z",
        "endDate": null
      }
    ],
    "remove": ["123e4567-e89b-12d3-a456-426614174001"]
  },
  "experience": {
    "add": [
      {
        "institution": "Tech Academy",
        "title": "Programming Tutor",
        "startDate": "2023-01-01T00:00:00.000Z",
        "endDate": null
      }
    ]
  },
  "subjects": {
    "add": [
      {
        "subjectId": "123e4567-e89b-12d3-a456-426614174006",
        "categoryId": "123e4567-e89b-12d3-a456-426614174007",
        "price": 60.00
      }
    ],
    "remove": [
      {
        "subjectId": "123e4567-e89b-12d3-a456-426614174004",
        "categoryId": "123e4567-e89b-12d3-a456-426614174005"
      }
    ]
  }
}
```

### Student Endpoints

#### 1. Get Student Profile
```typescript
// Endpoint: GET /api/student/profile
// Authentication: Required (Bearer token)
// Response: BaseResponse<StudentProfileResponse>

// Example Response:
{
  "message": "Student profile retrieved successfully",
  "data": {
    "user": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "student@example.com",
      "firstName": "Jane",
      "lastName": "Smith",
      "avatarUrl": "https://example.com/avatar.jpg",
      "bio": "Computer Science student",
      "phone": "+1234567890",
      "contactInfo": "Available evenings",
      "updatedAt": "2024-03-20T10:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "studentOrders": [
      {
        "id": "123e4567-e89b-12d3-a456-426614174008",
        "title": "Calculus Tutoring",
        "description": "Need help with derivatives",
        "status": "IN_PROGRESS",
        "totalPrice": 200.00,
        "sessionsCount": 4,
        "sessionsCompleted": 2,
        "createdAt": "2024-03-15T10:00:00.000Z",
        "subject": {
          "id": "123e4567-e89b-12d3-a456-426614174004",
          "name": "Calculus"
        },
        "category": {
          "id": "123e4567-e89b-12d3-a456-426614174005",
          "name": "One-on-One",
          "isRecurring": true
        },
        "tutor": {
          "id": "123e4567-e89b-12d3-a456-426614174009",
          "firstName": "John",
          "lastName": "Doe",
          "avatarUrl": "https://example.com/tutor-avatar.jpg"
        }
      }
    ],
    "studentReviews": [
      {
        "id": "123e4567-e89b-12d3-a456-426614174010",
        "rating": 5,
        "comment": "Great tutor, very helpful!",
        "createdAt": "2024-03-18T15:00:00.000Z",
        "tutor": {
          "id": "123e4567-e89b-12d3-a456-426614174009",
          "firstName": "John",
          "lastName": "Doe",
          "avatarUrl": "https://example.com/tutor-avatar.jpg"
        }
      }
    ]
  }
}
```

#### 2. Update Student Profile
```typescript
// Endpoint: PATCH /api/student/profile
// Authentication: Required (Bearer token)
// Request Body: UpdateStudentProfileRequest
// Response: BaseResponse<StudentBasicInfo>

// Example Request:
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "phone": "+1234567890",
  "bio": "Updated bio",
  "contactInfo": "Available on weekends"
}

// Example Response:
{
  "message": "Student profile updated successfully",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "phone": "+1234567890",
    "bio": "Updated bio",
    "contactInfo": "Available on weekends",
    "updatedAt": "2024-03-20T11:00:00.000Z"
  }
}
```

## Validation Rules

### Tutor Profile Validation

1. Basic Profile Info:
   - `firstName`: Required if provided, minimum length 1
   - `lastName`: Required if provided, minimum length 1
   - `email`: Required if provided, must be valid email format
   - `phone`: Optional, no format validation
   - `bio`: Optional, no length restrictions
   - `contactInfo`: Optional, no length restrictions

2. Education:
   - `institution`: Required, minimum length 1
   - `fieldOfStudy`: Required, minimum length 1
   - `degree`: Required, minimum length 1
   - `startDate`: Required, must be valid ISO date
   - `endDate`: Optional, must be valid ISO date if provided

3. Experience:
   - `institution`: Required, minimum length 1
   - `title`: Required, minimum length 1
   - `startDate`: Required, must be valid ISO date
   - `endDate`: Optional, must be valid ISO date if provided

4. Subjects:
   - `subjectId`: Required, must be valid UUID
   - `categoryId`: Required, must be valid UUID
   - `price`: Required, must be positive number

### Student Profile Validation

1. Basic Profile Info:
   - `firstName`: Required, minimum length 1
   - `lastName`: Required, minimum length 1
   - `email`: Required, must be valid email format
   - `phone`: Optional, no format validation
   - `bio`: Optional, no length restrictions
   - `contactInfo`: Optional, no length restrictions

## Important Notes

1. All endpoints require authentication via Bearer token in the Authorization header:
   ```
   Authorization: Bearer <token>
   ```

2. The tutor profile update endpoint (PATCH /api/tutor/profile) is atomic - all changes succeed or fail together.

3. When removing tutor education or experience entries, only provide the IDs of entries that belong to the tutor.

4. When adding tutor subjects, both subjectId and categoryId must exist in the database.

5. The price for tutor subjects should be a positive number representing the cost per session.

6. All dates should be provided in ISO 8601 format.

7. The API will return:
   - 401 for unauthorized requests
   - 403 if the user is not of the correct role (tutor/student)
   - 404 if referenced resources don't exist
   - 400 for validation errors
   - 500 for internal server errors

8. The response will always include the complete updated profile, even if only a single field was changed.

## Best Practices for Frontend Implementation

1. Always validate dates before sending to ensure they're in ISO format.

2. When updating multiple fields, consider batching changes to reduce API calls.

3. Implement proper error handling for validation errors, showing specific error messages to users.

4. Cache the profile data and implement optimistic updates for better UX.

5. Use TypeScript for type safety and better development experience.

6. Implement proper loading states for all API calls.

7. Handle token expiration and refresh flows appropriately.

8. Implement proper form validation matching the backend validation rules.

9. Use proper number formatting for prices (e.g., 2 decimal places).

10. Implement proper date formatting for display while maintaining ISO format for API calls. 