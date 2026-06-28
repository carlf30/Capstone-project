# PHQ-9 Self-Assessment Tool

A privacy-focused web application that allows users to complete the PHQ-9 depression screening questionnaire, view an automatically calculated severity score, read a mission statement about the tool’s purpose, and export their results as a password-protected PDF.

> **Important:** This project is for educational and portfolio purposes only. It is not a diagnostic tool and does not replace care from a licensed medical or mental health professional.

## Live Demo

Add your deployed link here:

```text
Live Demo: https://carlf30.github.io/YOUR_REPO_NAME/
```

## Features

- Login/register demo flow
- Mission statement page after login
- PHQ-9 questionnaire with all 9 items
- Required-answer validation
- Automatic score calculation
- Severity interpretation
- Results screen
- Password-protected PDF export
- Back-to-mission navigation
- Responsive dark-themed UI
- Local browser storage for demo accounts

## Tech Stack

### Static Version
- HTML
- CSS
- JavaScript
- localStorage
- Web Crypto API
- pdfmake

### React Upgrade Version
- React
- Vite
- React Router
- Component-based architecture
- Persistent session state
- pdfmake

## PHQ-9 Scoring

| Score | Severity |
|---:|---|
| 0–4 | Minimal |
| 5–9 | Mild |
| 10–14 | Moderate |
| 15–19 | Moderately Severe |
| 20–27 | Severe |

## Application Flow

```text
Login/Register
      ↓
Mission Statement
      ↓
PHQ-9 Questionnaire
      ↓
Score + Severity Results
      ↓
Encrypted PDF Export
```

## Screenshots

Add screenshots in an `/assets/screenshots` folder:

```text
assets/screenshots/login.png
assets/screenshots/mission.png
assets/screenshots/questionnaire.png
assets/screenshots/results.png
assets/screenshots/pdf-export.png
```

## Local Installation

### Static Version

Open `index.html` directly in a browser.

### React Version

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

## Deployment

See `DEPLOYMENT.md`.

## API Design Roadmap

Current version is front-end only. A future full-stack version could include:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users/me`
- `POST /api/phq9/assessments`
- `GET /api/phq9/assessments`
- `GET /api/phq9/assessments/:id`
- `POST /api/phq9/assessments/:id/pdf`

See `docs/API_DESIGN.md`.

## Security Notes

This project uses localStorage for demo authentication. That is acceptable for a portfolio prototype but not for production health data.

For production:
- Use a secure backend.
- Hash passwords server-side with bcrypt or Argon2.
- Use HTTPS.
- Use proper session management.
- Encrypt sensitive data at rest and in transit.
- Avoid storing PHI in localStorage.
- Add audit logging.
- Use hosting vendors that sign a BAA if handling PHI.

## Portfolio Highlights

This project demonstrates:

- Front-end form workflows
- Client-side validation
- Health-related UX considerations
- Score calculation logic
- File generation and export
- Authentication design concepts
- React component planning
- API endpoint planning
- Security and privacy awareness

## Future Improvements

- React component migration
- Backend API with Node.js/Express
- MongoDB or PostgreSQL database
- Assessment history
- User dashboard
- Score trend charts
- Role-based clinician view
- Accessibility improvements
- Unit tests for scoring logic
- Integration tests for assessment flow
- Full OpenAPI documentation

## Disclaimer

The PHQ-9 is a screening instrument. This application does not provide a diagnosis, medical advice, treatment recommendations, or emergency services. If you are in crisis or thinking about self-harm, contact emergency services or a crisis hotline immediately.
