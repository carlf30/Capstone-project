# Deployment Guide

## GitHub Pages — Static HTML/CSS/JS Version

Use this if your project contains:

```text
index.html
styles.css
script.js
```

### Steps

```bash
git add .
git commit -m "Add PHQ-9 assessment tool"
git push origin main
```

Then:

1. Open your GitHub repository.
2. Go to **Settings**.
3. Go to **Pages**.
4. Source: `Deploy from a branch`.
5. Branch: `main`.
6. Folder: `/root`.
7. Save.
8. Add the generated URL to your README.

Example:

```text
https://carlf30.github.io/phq9-assessment-tool/
```

## Vercel — React/Vite Version

Use this if your project contains:

```text
package.json
src/
```

Steps:

1. Push the React project to GitHub.
2. Go to Vercel.
3. Import the repository.
4. Confirm:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Deploy.
6. Add the Vercel URL to your README.

## Post-Deployment Checklist

- Login tab works.
- Register tab works.
- Demo login works.
- Mission page appears after login.
- Begin assessment button works.
- All 9 PHQ-9 questions render.
- Required-answer validation works.
- Score is calculated correctly.
- Severity category is correct.
- PDF download works.
- PDF requires password.
- Mobile layout is usable.
- README has the live demo link.
