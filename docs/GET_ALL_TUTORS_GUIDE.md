# Guide: Fetching All Tutors

This guide explains how to fetch all tutors from the Mind Forge backend using the API. It covers the endpoint, response types, and usage example.

---

## Endpoint

**GET** `/user/tutors`

No authentication required (unless you want to restrict it).

---

## Request

No request body or query parameters are required.

---

## Response

On success, returns HTTP 200 and an array of tutor objects:

```json
[
  {
    "id": "d3c4b5a6-f7e8-9012-cdab-3456789012ef",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "avatarUrl": "https://example.com/avatar.jpg",
    "bio": "Experienced math tutor."
  },
  {
    "id": "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "avatarUrl": null,
    "bio": "Physics and chemistry specialist."
  }
]
```

On error, returns HTTP 500 with a message:
```json
{
  "message": "Error details here."
}
```

---

## TypeScript Types

**Response Type:**
```typescript
interface Tutor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
}
```

---

## Example: cURL

```bash
curl -X GET https://your-api-url/user/tutors
```

---

## Notes
- This endpoint returns all users with the role `TUTOR`.
- Only public tutor profile fields are returned.
- If you want to restrict access, add authentication middleware to the route. 