# PHQ-9 Mood Assessment Web App

This project implements a secure, browser-based version of the **PHQ-9** depression screening questionnaire, with:

- User registration & login
- Local, salted SHA-256 password hashing
- PHQ-9 scoring and severity classification
- Encrypted PDF export of results
- A mission statement page describing the purpose and limitations of the tool

The project exists in **two forms**:

1. An original **vanilla HTML/CSS/JavaScript** version  
2. A refactored **React** single-page application in [`phq9-react/`](./phq9-react)

---

## 1. Project Overview

The goal of this web app is to let a user:

1. Create an account and log in
2. Complete the PHQ-9 questionnaire privately
3. See their total score and severity category
4. Download an **encrypted PDF** of their responses, secured with a password they choose


> ⚠️ **Important Disclaimer**  
> This tool is for **educational and demonstration purposes only**.  
> It does **not** provide a medical diagnosis and is **not** a substitute for professional evaluation or treatment.  
> If you are in crisis, or have thoughts of self-harm, please contact a qualified mental health professional or emergency services immediately.

---

## 2. Tech Stack

### Vanilla version (root)

- HTML5
- CSS3
- JavaScript (ES6+)


### React version (`phq9-react/`)

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/) (build tool / dev server)
- Client-side crypto APIs:
  - `crypto.getRandomValues` for per-user salts
  - `crypto.subtle.digest('SHA-256', ...)` for password hashing
- [pdfMake](https://pdfmake.github.io/docs/) for PDF generation and encryption

---
## Backend Repository

This capstone project uses a separate backend repository for the Next.js + MongoDB API:

**Backend repo:** https://github.com/carlf30/phq9-next

The backend implements:
- `GET /api/assessments?email={userEmail}` – list stored assessments
- `POST /api/assessments` – save a new PHQ-9 result
- `GET /api/assessments/:id`, `PUT`, `DELETE` – single assessment CRUD

## 3. Project Structure

At a high level:

```text
Capstone-project/
  Capstone.html        # Original static version (HTML/CSS/JS)
  App.js
  capstone.css

  phq9-react/          # React SPA version (Vite)
    index.html
    package.json
    vite.config.js
    src/
      main.jsx
      App.jsx
      capstone.css     # Shared styling, adapted for React
      logic/
        phq9Logic.js   # PHQ-9 questions, scoring, auth, PDF logic
      components/
        MissionStatement.jsx
        AuthCard.jsx
        Phq9Form.jsx
        ResultsView.jsx

