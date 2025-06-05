# Tutor API Guide

## Base Information
- Base URL: `/api/tutor`
- Authentication: Bearer token required in Authorization header
- Common Response Type: `BaseResponse<T>`
- Common Error Type: `ErrorResponse`

## Type Definitions

```typescript
// Common types used across the API
type UUID = string; // Format: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
type ISODateString = string; // Format: "YYYY-MM-DDTHH:mm:ss.sssZ"

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

// Basic tutor information
interface TutorBasicInfo {
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
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bio?: string;
  
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
  
  experience?: {
    add?: Array<{
      institution: string;
      title: string;
      startDate: ISODateString;
      endDate?: ISODateString;
    }>;
    remove?: UUID[]; // Array of experience entry IDs to remove
  };
  
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

## Available Endpoints

### 1. Get Tutor Profile
```typescript
// Path: GET /api/tutor/profile
// Authentication: Required
// Response Type: BaseResponse<TutorProfileResponse>

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

### 2. Update Tutor Profile
```typescript
// Path: PATCH /api/tutor/profile
// Authentication: Required
// Request Type: UpdateTutorProfileRequest
// Response Type: BaseResponse<TutorProfileResponse>

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

## Validation Rules

### Basic Profile Info
- `firstName`: If provided, required and min length 1
- `lastName`: If provided, required and min length 1
- `email`: If provided, must be valid email format
- `phone`: Optional, no format validation
- `bio`: Optional, no length restrictions

### Education Entries
- `institution`: Required, min length 1
- `fieldOfStudy`: Required, min length 1
- `degree`: Required, min length 1
- `startDate`: Required, valid ISO date
- `endDate`: Optional, valid ISO date if provided

### Experience Entries
- `institution`: Required, min length 1
- `title`: Required, min length 1
- `startDate`: Required, valid ISO date
- `endDate`: Optional, valid ISO date if provided

### Subject Entries
- `subjectId`: Required, valid UUID
- `categoryId`: Required, valid UUID
- `price`: Required, positive number

## Error Handling

The API will return the following status codes:
- `401`: Unauthorized (missing or invalid token)
- `403`: Forbidden (user is not a tutor)
- `404`: Not Found (referenced resources don't exist)
- `400`: Bad Request (validation errors)
- `500`: Internal Server Error

Error response structure:
```typescript
{
  message: string;
  errors?: Array<{
    path: string[];
    message: string;
  }>;
}
```

## Implementation Guidelines

### 1. Authentication
- Always include the Bearer token in the Authorization header
- Format: `Authorization: Bearer <token>`
- Handle token expiration and refresh flows appropriately

### 2. Date Handling
- All dates must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
- Convert dates to local format for display
- Convert dates to ISO format for API calls
- Example: `"2024-03-20T10:00:00.000Z"`

### 3. UUID Handling
- All IDs are UUIDs in format: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
- Validate UUID format before sending to API
- Store UUIDs as strings
- Ensure UUIDs exist in the database before referencing

### 4. Price Handling
- Prices are decimal numbers
- Must be positive
- Use a decimal library for precise calculations
- Format prices to 2 decimal places when displaying
- Validate price is positive before sending

### 5. Update Operations
- The update endpoint is atomic - all changes succeed or fail together
- Only include fields that need to be updated
- When removing entries, only include IDs that belong to the tutor
- When adding subjects, ensure both subjectId and categoryId exist
- Validate all required fields before sending

### 6. Response Handling
- Always check the response status code
- Parse the response body according to the expected type
- Handle validation errors by displaying specific error messages
- Implement proper error recovery mechanisms
- Cache successful responses when appropriate

### 7. Best Practices
- Implement proper loading states for all API calls
- Cache profile data when appropriate
- Use optimistic updates for better UX
- Implement proper form validation matching backend rules
- Use TypeScript for type safety
- Handle network errors gracefully
- Implement retry logic for failed requests
- Use proper error boundaries in the UI
- Implement proper logging for debugging
- Follow REST API best practices

## Example Usage

### Fetching Tutor Profile
```typescript
async function fetchTutorProfile(token: string): Promise<TutorProfileResponse> {
  const response = await fetch('/api/tutor/profile', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data: BaseResponse<TutorProfileResponse> = await response.json();
  return data.data;
}
```

### Updating Tutor Profile
```typescript
async function updateTutorProfile(
  token: string,
  updates: UpdateTutorProfileRequest
): Promise<TutorProfileResponse> {
  const response = await fetch('/api/tutor/profile', {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data: BaseResponse<TutorProfileResponse> = await response.json();
  return data.data;
}
```

## Security Considerations

1. **Token Security**
   - Store tokens securely
   - Implement proper token refresh mechanisms
   - Never expose tokens in client-side code
   - Use secure HTTP-only cookies when possible

2. **Data Validation**
   - Validate all input data before sending to API
   - Sanitize user input
   - Implement proper CSRF protection
   - Use proper content security policies

3. **Error Handling**
   - Don't expose sensitive information in error messages
   - Implement proper logging
   - Handle errors gracefully
   - Implement proper retry mechanisms

4. **Rate Limiting**
   - Implement proper rate limiting
   - Handle rate limit errors gracefully
   - Implement proper backoff strategies

## Testing Guidelines

1. **Unit Tests**
   - Test all API calls
   - Test error handling
   - Test validation
   - Test data transformation

2. **Integration Tests**
   - Test complete flows
   - Test error scenarios
   - Test edge cases
   - Test performance

3. **End-to-End Tests**
   - Test complete user flows
   - Test real-world scenarios
   - Test error recovery
   - Test performance under load 