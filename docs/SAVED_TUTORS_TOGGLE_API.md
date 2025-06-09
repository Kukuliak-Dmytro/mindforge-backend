# Saved Tutors Toggle API (Student)

This guide documents the API for students to toggle (save/unsave) tutors, including endpoint details, request/response structure, types, and usage examples.

---

## Endpoint

**POST** `/student/saved-tutors`

- **Authentication:** Required (JWT, student role)
- **Purpose:** Toggles the saved state of a tutor for the authenticated student. If the tutor is not saved, it will be saved. If already saved, it will be unsaved.

---

## Request

**Body:**
```json
{
  "tutorId": "TUTOR_UUID"
}
```

---

## Response

**Returns:**
```json
{
  "saved": true
}
```
Or
```json
{
  "saved": false
}
```
- `saved: true` — The tutor is now saved for the student.
- `saved: false` — The tutor is now unsaved for the student.

---

## Example Usage

### cURL
```bash
curl -X POST https://your-api-url/student/saved-tutors \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "tutorId": "TUTOR_UUID" }'
```

### JavaScript (fetch)
```js
const response = await fetch('/student/saved-tutors', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <token>',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ tutorId: 'TUTOR_UUID' })
});
const data = await response.json();
if (data.saved) {
  // Show as saved
} else {
  // Show as unsaved
}
```

---

## TypeScript Types

```typescript
interface ToggleSaveTutorRequest {
  tutorId: string;
}

interface ToggleSaveTutorResponse {
  saved: boolean;
}
```

---

## Notes
- This endpoint is **idempotent**: you can call it multiple times, and it will always toggle the saved state.
- The student must be authenticated and have the `STUDENT` role.
- To get the full list of saved tutors, use:
  - **GET** `/student/saved-tutors`

---

## Example: Get All Saved Tutors

**GET** `/student/saved-tutors`

**Response:**
```json
[
  {
    "id": "SAVED_TUTOR_UUID",
    "studentId": "STUDENT_UUID",
    "tutorId": "TUTOR_UUID",
    "createdAt": "2024-06-02T12:34:56.789Z",
    "tutor": {
      "id": "TUTOR_UUID",
      "firstName": "Jane",
      "lastName": "Smith",
      "avatarUrl": null
    }
  }
]
```

---

## Summary
- Use **POST** `/student/saved-tutors` to toggle save/unsave a tutor.
- Use **GET** `/student/saved-tutors` to get all saved tutors.
- The response to the toggle endpoint tells you the new state. 