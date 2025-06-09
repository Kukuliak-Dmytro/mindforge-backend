 # Saved Orders & Saved Tutors API

This document describes the API endpoints for saving orders as a tutor and saving tutors as a student, as well as retrieving and removing these saved items.

---

## Table of Contents
- [Saved Orders (for Tutors)](#saved-orders-for-tutors)
  - [Save an Order](#save-an-order)
  - [Unsave an Order](#unsave-an-order)
  - [Get Saved Orders](#get-saved-orders)
- [Saved Tutors (for Students)](#saved-tutors-for-students)
  - [Save a Tutor](#save-a-tutor)
  - [Unsave a Tutor](#unsave-a-tutor)
  - [Get Saved Tutors](#get-saved-tutors)
- [Types](#types)
- [Authentication](#authentication)

---

## Saved Orders (for Tutors)

### Save an Order
- **Endpoint:** `POST /tutor/saved-orders`
- **Auth:** Tutor only (JWT required)
- **Body:**
```json
{
  "orderId": "ORDER_UUID"
}
```
- **Response:**
```json
{
  "id": "SAVED_ORDER_UUID",
  "tutorId": "TUTOR_UUID",
  "orderId": "ORDER_UUID",
  "createdAt": "2024-06-02T12:34:56.789Z"
}
```

### Unsave an Order
- **Endpoint:** `DELETE /tutor/saved-orders`
- **Auth:** Tutor only (JWT required)
- **Body:**
```json
{
  "orderId": "ORDER_UUID"
}
```
- **Response:**
```json
{}
```

### Get Saved Orders
- **Endpoint:** `GET /tutor/saved-orders`
- **Auth:** Tutor only (JWT required)
- **Response:**
```json
[
  {
    "id": "SAVED_ORDER_UUID",
    "tutorId": "TUTOR_UUID",
    "orderId": "ORDER_UUID",
    "createdAt": "2024-06-02T12:34:56.789Z",
    "order": {
      "id": "ORDER_UUID",
      "title": "Order Title",
      "description": "Order description...",
      "status": "PENDING",
      "totalPrice": 100,
      "sessionsCount": 1,
      "sessionsCompleted": 0,
      "createdAt": "2024-06-02T12:34:56.789Z",
      "student": {
        "id": "STUDENT_UUID",
        "firstName": "John",
        "lastName": "Doe",
        "avatarUrl": null
      },
      "subject": {
        "id": "SUBJECT_UUID",
        "name": "Math"
      },
      "category": {
        "id": "CATEGORY_UUID",
        "name": "One-time",
        "isRecurring": false
      }
    }
  }
]
```

---

## Saved Tutors (for Students)

### Save a Tutor
- **Endpoint:** `POST /student/saved-tutors`
- **Auth:** Student only (JWT required)
- **Body:**
```json
{
  "tutorId": "TUTOR_UUID"
}
```
- **Response:**
```json
{
  "id": "SAVED_TUTOR_UUID",
  "studentId": "STUDENT_UUID",
  "tutorId": "TUTOR_UUID",
  "createdAt": "2024-06-02T12:34:56.789Z"
}
```

### Unsave a Tutor
- **Endpoint:** `DELETE /student/saved-tutors`
- **Auth:** Student only (JWT required)
- **Body:**
```json
{
  "tutorId": "TUTOR_UUID"
}
```
- **Response:**
```json
{}
```

### Get Saved Tutors
- **Endpoint:** `GET /student/saved-tutors`
- **Auth:** Student only (JWT required)
- **Response:**
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

## Types

### SavedOrder
```typescript
interface SavedOrder {
  id: string;
  tutorId: string;
  orderId: string;
  createdAt: string;
  order?: Order; // Populated in GET /tutor/saved-orders
}

interface Order {
  id: string;
  title: string;
  description?: string;
  status: string;
  totalPrice: number;
  sessionsCount: number;
  sessionsCompleted: number;
  createdAt: string;
  student: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
  subject: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
    isRecurring: boolean;
  };
}
```

### SavedTutor
```typescript
interface SavedTutor {
  id: string;
  studentId: string;
  tutorId: string;
  createdAt: string;
  tutor?: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
}
```

---

## Authentication
All endpoints require a valid JWT in the `Authorization` header:
```
Authorization: Bearer <token>
```

---

## Example cURL

### Save an Order (Tutor)
```bash
curl -X POST https://your-api-url/tutor/saved-orders \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "orderId": "ORDER_UUID" }'
```

### Save a Tutor (Student)
```bash
curl -X POST https://your-api-url/student/saved-tutors \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "tutorId": "TUTOR_UUID" }'
```
