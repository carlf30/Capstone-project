// src/logic/phq9Logic.js

export const storeKey = 'phq9_demo_users';

export const questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling/staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself in some way"
];

export const options = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 }
];

// --- crypto / storage helpers ---
export async function sha256(input) {
  const enc = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(storeKey)) || [];
  } catch {
    return [];
  }
}

export function saveUsers(list) {
  localStorage.setItem(storeKey, JSON.stringify(list));
}

export async function registerUser(name, email, password) {
  email = email.trim().toLowerCase();
  const users = loadUsers();
  if (users.some(u => u.email === email)) {
    throw new Error('Email already registered');
  }

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const saltHex = Array.from(salt)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  const hash = await sha256(password + ':' + saltHex);

  const user = { name, email, salt: saltHex, hash };
  users.push(user);
  saveUsers(users);
  return user;
}

export async function loginUser(email, password) {
  email = email.trim().toLowerCase();
  const users = loadUsers();
  const u = users.find(x => x.email === email);
  if (!u) throw new Error('User not found');
  const hash = await sha256(password + ':' + u.salt);
  if (hash !== u.hash) throw new Error('Invalid password');
  return u;
}

export function severity(total) {
  if (total <= 4) return "Minimal";
  if (total <= 9) return "Mild";
  if (total <= 14) return "Moderate";
  if (total <= 19) return "Moderately Severe";
  return "Severe";
}

export function generatePdf({ user, scores, total, sev, password }) {
  const docDef = {
    content: [
      { text: 'PHQ-9 Self-Assessment', style: 'header' },
      { text: `Name: ${user.name}`, margin: [0, 10, 0, 0] },
      { text: `Email: ${user.email}`, margin: [0, 0, 0, 10] },
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto'],
          body: [
            ['Question', 'Score'],
            ...questions.map((q, i) => [q, scores[i]]),
            [{ text: 'Total', bold: true }, total],
            [{ text: 'Severity', bold: true }, sev]
          ]
        }
      }
    ],
    styles: { header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] } },
    userPassword: password,
    ownerPassword: password,
    permissions: { printing: 'highResolution', modifying: false, copying: false }
  };

  window.pdfMake.createPdf(docDef).download('phq9_result.pdf');
}
