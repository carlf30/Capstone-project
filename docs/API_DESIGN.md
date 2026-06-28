# API Design for Future Full-Stack PHQ-9 Tool

## Base URL

```text
https://your-api-domain.com/api
```

## Authentication

### POST /auth/register

Request:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "StrongPassword123!"
}
```

Response:

```json
{
  "message": "User registered successfully"
}
```

### POST /auth/login

Request:

```json
{
  "email": "jane@example.com",
  "password": "StrongPassword123!"
}
```

Response:

```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_123",
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

## User Management

### GET /users/me

Returns the authenticated user's profile.

Headers:

```text
Authorization: Bearer <token>
```

## PHQ-9 Assessments

### POST /phq9/assessments

Request:

```json
{
  "answers": [0, 1, 2, 1, 0, 2, 1, 0, 0]
}
```

Response:

```json
{
  "id": "assessment_123",
  "score": 7,
  "severity": "Mild",
  "createdAt": "2026-06-28T16:00:00Z"
}
```

### GET /phq9/assessments

Returns assessment history.

### GET /phq9/assessments/:id

Returns one assessment in detail.

## PDF Export

### POST /phq9/assessments/:id/pdf

Request:

```json
{
  "password": "PDFPassword123!"
}
```

Response:

```text
Content-Type: application/pdf
Content-Disposition: attachment; filename="phq9_result.pdf"
```

## Front-End Fetch Example

```js
async function submitAssessment(answers, token) {
  const response = await fetch("/api/phq9/assessments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ answers })
  });

  if (!response.ok) {
    throw new Error("Failed to submit assessment");
  }

  return response.json();
}
```

## Security Requirements

- Use HTTPS.
- Validate request bodies.
- Store passwords using bcrypt or Argon2.
- Use JWT or secure HttpOnly cookie sessions.
- Never store PHI in localStorage.
- Apply role-based access control.
- Add audit logging.
- Encrypt data at rest.
