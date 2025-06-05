# Guide: Creating an Order

This guide explains how to create an order in the Mind Forge backend using the API. It covers the endpoint, request/response types, and usage example.

---

## Endpoint

**POST** `/orders`

Requires authentication (JWT in `Authorization` header).

---

## Request Body

Send a JSON object with the following fields:

| Field         | Type    | Required | Description                |
|---------------|---------|----------|----------------------------|
| title         | string  | Yes      | Title of the order         |
| description   | string  | No       | Description of the order   |
| subjectId     | string  | Yes      | Subject UUID               |
| categoryId    | string  | Yes      | Category UUID              |
| tutorId       | string  | No       | Tutor UUID (optional)      |
| totalPrice    | number  | Yes      | Total price for the order  |
| sessionsCount | number  | Conditionally | Required **only** if the category is recurring. Ignored for non-recurring categories. |

**Rules:**
- If the selected category is **not recurring**, you do **not** need to send `sessionsCount` (it will be set to 1 automatically).
- If the category **is recurring**, you **must** provide `sessionsCount` (must be > 0).

**Example (non-recurring category):**
```json
{
  "title": "Math Tutoring for Algebra",
  "description": "Need help with algebra homework.",
  "subjectId": "b1a2c3d4-e5f6-7890-abcd-1234567890ef",
  "categoryId": "c2b3a4d5-e6f7-8901-bcda-2345678901fe",
  "tutorId": "d3c4b5a6-f7e8-9012-cdab-3456789012ef",
  "totalPrice": 100
}
```

**Example (recurring category):**
```json
{
  "title": "Weekly Math Tutoring",
  "description": "Need help with algebra every week.",
  "subjectId": "b1a2c3d4-e5f6-7890-abcd-1234567890ef",
  "categoryId": "c2b3a4d5-e6f7-8901-bcda-2345678901fe",
  "tutorId": "d3c4b5a6-f7e8-9012-cdab-3456789012ef",
  "totalPrice": 400,
  "sessionsCount": 4
}
```

---

## Response

On success, returns HTTP 201 and the created order object:

```json
{
  "id": "e4d5c6b7-a8f9-0123-dcba-4567890123ef",
  "title": "Math Tutoring for Algebra",
  "description": "Need help with algebra homework.",
  "subjectId": "b1a2c3d4-e5f6-7890-abcd-1234567890ef",
  "categoryId": "c2b3a4d5-e6f7-8901-bcda-2345678901fe",
  "tutorId": "d3c4b5a6-f7e8-9012-cdab-3456789012ef",
  "studentId": "YOUR_USER_ID",
  "status": "PENDING",
  "totalPrice": 100,
  "sessionsCount": 1,
  "sessionsCompleted": 0,
  "createdAt": "2024-06-02T12:34:56.789Z"
}
```

On error, returns HTTP 400 with a message:
```json
{
  "message": "Error details here."
}
```

---

## TypeScript Types

**Request Type:**
```typescript
interface CreateOrderRequest {
  title: string;
  description?: string;
  subjectId: string;
  categoryId: string;
  tutorId?: string;
  totalPrice: number;
  sessionsCount?: number; // Only for recurring categories
}
```

**Response Type:**
```typescript
interface Order {
  id: string;
  title: string;
  description?: string;
  subjectId: string;
  categoryId: string;
  tutorId?: string;
  studentId: string;
  status: string;
  totalPrice: number;
  sessionsCount: number;
  sessionsCompleted: number;
  createdAt: string;
}
```

---

## Example: cURL

```bash
curl -X POST https://your-api-url/orders \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Math Tutoring for Algebra",
    "description": "Need help with algebra homework.",
    "subjectId": "b1a2c3d4-e5f6-7890-abcd-1234567890ef",
    "categoryId": "c2b3a4d5-e6f7-8901-bcda-2345678901fe",
    "tutorId": "d3c4b5a6-f7e8-9012-cdab-3456789012ef",
    "totalPrice": 100
  }'
```

---

## Notes
- The authenticated user is automatically set as the student for the order.
- The order status is set to `PENDING` by default.
- For non-recurring categories, `sessionsCount` is always 1.
- For recurring categories, you must provide `sessionsCount` > 0.
- All fields except `description`, `tutorId`, and (for non-recurring) `sessionsCount` are required. 