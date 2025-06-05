# How to Update Tutor Experience, Education, and Subjects

This guide explains how to update a tutor's experience, education, and subjects using the API. It includes endpoint details, request/response examples, types, and validation rules.

---

## Base Information
- **Base URL:** `/tutor`
- **Authentication:** Bearer token required in Authorization header
- **Common Response Type:** `BaseResponse<T>`
- **Common Error Type:** `ErrorResponse`

---

## Type Definitions

```typescript
// Common types
export type UUID = string; // Format: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
export type ISODateString = string; // Format: "YYYY-MM-DDTHH:mm:ss.sssZ"

export interface TutorEducation {
  id: UUID;
  institution: string;
  fieldOfStudy: string;
  degree: string;
  startDate: ISODateString;
  endDate: ISODateString | null;
}

export interface TutorExperience {
  id: UUID;
  institution: string;
  title: string;
  startDate: ISODateString;
  endDate: ISODateString | null;
}

export interface TutorSubject {
  id: UUID;
  subjectId: UUID;
  categoryId: UUID;
  price: number;
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

export interface TutorProfileResponse {
  user: {
    id: UUID;
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
    bio: string | null;
    phone: string | null;
    updatedAt: ISODateString;
    createdAt: ISODateString;
  };
  education: TutorEducation[];
  experiences: TutorExperience[];
  subjects: TutorSubject[];
}

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
    remove?: UUID[];
  };

  // Experience updates
  experience?: {
    add?: Array<{
      institution: string;
      title: string;
      startDate: ISODateString;
      endDate?: ISODateString;
    }>;
    remove?: UUID[];
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

---

## Endpoint: Update Tutor Profile

- **Path:** `PATCH /api/tutor/profile`
- **Authentication:** Required (Bearer token)
- **Request Body:** `UpdateTutorProfileRequest`
- **Response:** `BaseResponse<TutorProfileResponse>`

### Example Request

Add and remove education, experience, and subjects in a single request:

```json
{
  "education": {
    "add": [
      {
        "institution": "Example University",
        "fieldOfStudy": "Physics",
        "degree": "PhD",
        "startDate": "2015-09-01T00:00:00.000Z",
        "endDate": "2020-06-30T00:00:00.000Z"
      }
    ],
    "remove": ["existing-education-uuid-1"]
  },
  "experience": {
    "add": [
      {
        "institution": "Science Academy",
        "title": "Physics Tutor",
        "startDate": "2020-09-01T00:00:00.000Z",
        "endDate": null
      }
    ],
    "remove": ["existing-experience-uuid-1"]
  },
  "subjects": {
    "add": [
      {
        "subjectId": "subject-uuid-1",
        "categoryId": "category-uuid-1",
        "price": 75.00
      }
    ],
    "remove": [
      { "subjectId": "subject-uuid-2", "categoryId": "category-uuid-2" }
    ]
  }
}
```

### Example Response

```json
{
  "message": "Tutor profile updated successfully",
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
        "id": "new-education-uuid",
        "institution": "Example University",
        "fieldOfStudy": "Physics",
        "degree": "PhD",
        "startDate": "2015-09-01T00:00:00.000Z",
        "endDate": "2020-06-30T00:00:00.000Z"
      }
    ],
    "experiences": [
      {
        "id": "new-experience-uuid",
        "institution": "Science Academy",
        "title": "Physics Tutor",
        "startDate": "2020-09-01T00:00:00.000Z",
        "endDate": null
      }
    ],
    "subjects": [
      {
        "id": "new-tutorsubject-uuid",
        "subjectId": "subject-uuid-1",
        "categoryId": "category-uuid-1",
        "price": 75.00,
        "subject": {
          "id": "subject-uuid-1",
          "name": "Physics"
        },
        "category": {
          "id": "category-uuid-1",
          "name": "One-on-One",
          "isRecurring": true
        }
      }
    ]
  }
}
```

---

## Validation Rules

### Education
- `institution`: Required, minimum length 1
- `fieldOfStudy`: Required, minimum length 1
- `degree`: Required, minimum length 1
- `startDate`: Required, must be valid ISO date
- `endDate`: Optional, must be valid ISO date if provided

### Experience
- `institution`: Required, minimum length 1
- `title`: Required, minimum length 1
- `startDate`: Required, must be valid ISO date
- `endDate`: Optional, must be valid ISO date if provided

### Subjects
- `subjectId`: Required, must be valid UUID
- `categoryId`: Required, must be valid UUID
- `price`: Required, must be a positive number

---

## Notes
- You can add and remove multiple items in a single request.
- All updates are atomic (all succeed or all fail).
- You must be authenticated as a tutor to use this endpoint.
- The endpoint also supports updating basic profile info in the same request.
- If you try to add a subject or category that does not exist, you will get a 404 error.
- All date strings must be in ISO 8601 format. 