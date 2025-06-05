# Guide: Implementing "Update Student Profile" for Students

## Overview

This guide explains how to implement the "Update Student Profile" feature for students in a Node.js backend using Express, Prisma, and Zod. It covers:

- API Route
- Request/Response Types
- Validation
- Controller Logic
- Example Request

---

## 1. API Route

**Endpoint:**  
`PUT /student/profile`

**Description:**  
Allows an authenticated student to update their profile information.

---

## 2. Request & Response Types

### Request Body

```json5
{
  "firstName": "string (required)",
  "lastName": "string (required)",
  "email": "string (valid email, required)",
  "phone": "string (optional)",
  "bio": "string (optional)"
}
```

### Response (Success)

```json5
{
  "success": true,
  "message": "Student profile updated successfully",
  "data": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string | null",
    "bio": "string | null",
    "updatedAt": "ISO8601 timestamp"
  }
}
```

### Response (Error)

```json5
{
  "success": false,
  "message": "Error message",
  "errors": [ /* optional, for validation errors */ ]
}
```

---

## 3. Validation Schema

Using [Zod](https://zod.dev/):

```ts
import { z } from 'zod';

export const updateProfileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  bio: z.string().optional()
});
```

---

## 4. Types

### Authenticated Request Type

```ts
import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    // ...other user fields
  };
}
```

### User Model (Prisma Example)

```prisma
model User {
  id         String   @id @default(uuid())
  email      String   @unique
  firstName  String
  lastName   String
  phone      String?
  bio        String?
  role       String
  updatedAt  DateTime @updatedAt
  createdAt  DateTime @default(now())
  // ...other fields
}
```

---

## 5. Controller Logic

### Controller Method

```ts
public updateStudentProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  if (!userId) {
    this.throwError('Unauthorized', 401);
  }

  // Verify user is a student
  const user = await this.prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.role !== 'STUDENT') {
    this.throwError('User is not a student', 403);
  }

  // Validate input
  const validatedData = updateProfileSchema.parse(req.body);

  // Update user data
  const updatedUser = await this.prisma.user.update({
    where: { id: userId },
    data: {
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      phone: validatedData.phone,
      bio: validatedData.bio
    }
  });

  this.sendSuccess(res, {
    id: updatedUser.id,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    email: updatedUser.email,
    phone: updatedUser.phone,
    bio: updatedUser.bio,
    updatedAt: updatedUser.updatedAt
  }, 'Student profile updated successfully');
};
```

---

## 6. Route Registration

In your Express router:

```ts
import { Router } from 'express';
import { studentProfileController } from '../controllers/studentProfile.controller';
import { authenticate } from '../middleware/authenticate'; // Your auth middleware

const router = Router();

router.put(
  '/student/profile',
  authenticate, // Ensure user is authenticated
  studentProfileController.updateStudentProfile
);

export default router;
```

---

## 7. Example Request

**cURL:**

```bash
curl -X PUT http://localhost:3000/student/profile \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "bio": "I love math and science."
  }'
```

---

## 8. Error Handling

- **401 Unauthorized:** If the user is not authenticated.
- **403 Forbidden:** If the user is not a student.
- **400 Bad Request:** If validation fails (Zod will throw). 