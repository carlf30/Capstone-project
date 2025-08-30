// ===== Utilities =====
const storeKey = 'phq9_demo_users';
const el = id => document.getElementById(id);

async function sha256(input){
  const enc = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2,'0')).join('');
}
function loadUsers(){ try { return JSON.parse(localStorage.getItem(storeKey)) || []; } catch { return []; } }
function saveUsers(list){ localStorage.setItem(storeKey, JSON.stringify(list)); }
async function registerUser(name, email, password){
  email = email.trim().toLowerCase();
  const users = loadUsers();
  if(users.some(u => u.email === email)) throw new Error('Email already registered');
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const saltHex = Array.from(salt).map(b=>b.toString(16).padStart(2,'0')).join('');
  const hash = await sha256(password + ':' + saltHex);
  const user = { name, email, salt: saltHex, hash };
  users.push(user); saveUsers(users);
  return user;
}
async function loginUser(email,password){
  email = email.trim().toLowerCase();
  const users = loadUsers();
  const u = users.find(x=>x.email===email);
  if(!u) throw new Error("User not found");
  const hash = await sha256(password+':'+u.salt);
  if(hash !== u.hash) throw new Error("Invalid password");
  return u;
}

// ===== Tabs =====
const tabLogin = el('tab-login');
const tabRegister = el('tab-register');
const paneLogin = el('pane-login');
const paneRegister = el('pane-register');
const appPane = el('app');

function showPane(paneToShow, paneToHide, tabToActivate, tabToDeactivate) {
  if(tabToActivate && tabToDeactivate){
    tabToActivate.classList.add('active');
    tabToDeactivate.classList.remove('active');
  }
  paneToHide.classList.remove('in');
  setTimeout(()=>{
    paneToHide.classList.add('hidden');
    paneToShow.classList.remove('hidden');
    setTimeout(()=> paneToShow.classList.add('in'), 20);
  }, 300);
}

tabLogin.addEventListener('click', e => {
  e.preventDefault();
  showPane(paneLogin, paneRegister, tabLogin, tabRegister);
});
tabRegister.addEventListener('click', e => {
  e.preventDefault();
  showPane(paneRegister, paneLogin, tabRegister, tabLogin);
});

// ===== Register form =====
el('registerForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const name = el('regName').value.trim();
  const email = el('regEmail').value.trim();
  const password = el('regPassword').value;
  try{
    await registerUser(name,email,password);
    el('registerMsg').textContent = 'Registered successfully! Please login.';
    tabLogin.click();
  }catch(err){
    el('registerMsg').textContent = err.message;
  }
});
el('toLogin').addEventListener('click', e=>{
  e.preventDefault();
  tabLogin.click();
});

// ===== Login form =====
el('loginForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const email = el('loginEmail').value.trim();
  const password = el('loginPassword').value;
  try{
    const user = await loginUser(email,password);
    el('loginMsg').textContent = '';
    startPhq9(user);
  }catch(err){
    el('loginMsg').textContent = err.message;
  }
});


// ===== PHQ-9 =====
const questions = [
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
const options = [
  {label:"Not at all", value:0},
  {label:"Several days", value:1},
  {label:"More than half the days", value:2},
  {label:"Nearly every day", value:3}
];

function startPhq9(user){
  document.querySelector('.auth-wrapper').classList.add('hidden');
  appPane.classList.remove('hidden');
  appPane.classList.add('in');
  renderPhq9(user);
}

function renderPhq9(user){
  let html = `<div class="auth-card">
    <h2>PHQ-9 Questionnaire</h2>
    <p>Answer all 9 questions based on the last 2 weeks.</p>
    <form id="phqForm">`;

  questions.forEach((q,i)=>{
    html += `<div class="qblock">
      <label>${i+1}. ${q}</label>
      <select name="q${i}" required>
        <option value="">--Choose--</option>`;
    options.forEach(opt=>{
      html += `<option value="${opt.value}">${opt.label}</option>`;
    });
    html += `</select></div>`;
  });

  html += `<button type="submit" class="btn primary">Submit</button></form></div>`;
  appPane.innerHTML = html;

  document.getElementById('phqForm').addEventListener('submit', e=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const scores = questions.map((_,i)=> parseInt(formData.get('q'+i)));
    const total = scores.reduce((a,b)=>a+b,0);
    showResults(user,scores,total);
  });
}

function severity(total){
  if(total<=4) return "Minimal";
  if(total<=9) return "Mild";
  if(total<=14) return "Moderate";
  if(total<=19) return "Moderately Severe";
  return "Severe";
}

function showResults(user,scores,total){
  const sev = severity(total);
  appPane.innerHTML = `<div class="auth-card">
    <h2>Results</h2>
    <p>Total Score: <strong>${total}</strong></p>
    <p>Severity: <strong>${sev}</strong></p>
    <button id="downloadPdf" class="btn primary">Download Encrypted PDF</button>
  </div>`;

  el('downloadPdf').addEventListener('click', ()=>{
    const password = prompt("Set a password for your PDF:");
    if(!password) return;
    generatePdf(user,scores,total,sev,password);
  });
}

// ===== PDF generation with pdfmake =====
function generatePdf(user,scores,total,sev,password){
  const docDef = {
    content: [
      { text: 'PHQ-9 Self-Assessment', style:'header' },
      { text: `Name: ${user.name}`, margin:[0,10,0,0] },
      { text: `Email: ${user.email}`, margin:[0,0,0,10] },
      {
        table: {
          headerRows: 1,
          widths: ['*','auto'],
          body: [
            ['Question','Score'],
            ...questions.map((q,i)=> [q, scores[i]]),
            [{text:'Total',bold:true}, total],
            [{text:'Severity',bold:true}, sev]
          ]
        }
      }
    ],
    styles: { header:{fontSize:18,bold:true,margin:[0,0,0,10]} },
    userPassword: password,
    ownerPassword: password,
    permissions: { printing:'highResolution', modifying:false, copying:false }
  };
  pdfMake.createPdf(docDef).download('phq9_result.pdf');
}

// ===== Self Tests =====
(function selfTests(){
  console.log("Running PHQ-9 self-tests...");
  const tests = [
    {score:3, expected:"Minimal"},
    {score:7, expected:"Mild"},
    {score:12, expected:"Moderate"},
    {score:17, expected:"Moderately Severe"},
    {score:23, expected:"Severe"}
  ];
  tests.forEach(t=>{
    const got = severity(t.score);
    console.assert(got===t.expected, `Expected ${t.expected}, got ${got}`);
  });
})();
