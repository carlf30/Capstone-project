import React, { useState } from 'react';
import { registerUser, loginUser } from '../logic/phq9Logic';

export default function AuthCard({ onLogin }) {
  const [activeTab, setActiveTab] = useState('login');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMsg, setLoginMsg] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regMsg, setRegMsg] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setLoginMsg('');
    try {
      const user = await loginUser(loginEmail, loginPassword);
      onLogin(user);
    } catch (err) {
      setLoginMsg(err.message);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setRegMsg('');
    try {
      await registerUser(regName.trim(), regEmail.trim(), regPassword);
      setRegMsg('Registered successfully! Please login.');
      setActiveTab('login');
    } catch (err) {
      setRegMsg(err.message);
    }
  }

  return (
    <div className="auth-card">
      <header className="auth-header">
        <h1>Mood Assessment At Home</h1>
        <p className="subtitle">A Secure &amp; Private Screening using the PHQ-9 Tool</p>
        <div className="tabbar">
          <button
            type="button"
            className={`tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={`tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>
      </header>

      <main className="auth-main">
        {activeTab === 'login' ? (
          <section className="pane fade in">
            <form onSubmit={handleLogin}>
              <label htmlFor="loginEmail">Email</label>
              <input
                id="loginEmail"
                type="email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                required
              />

              <label htmlFor="loginPassword">Password</label>
              <input
                id="loginPassword"
                type="password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                required
              />

              <button type="submit" className="btn primary">Login</button>
              <p className="form-msg">{loginMsg}</p>
            </form>
          </section>
        ) : (
          <section className="pane fade in">
            <form onSubmit={handleRegister}>
              <label htmlFor="regName">Full name</label>
              <input
                id="regName"
                type="text"
                value={regName}
                onChange={e => setRegName(e.target.value)}
                required
              />

              <label htmlFor="regEmail">Email</label>
              <input
                id="regEmail"
                type="email"
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
                required
              />

              <label htmlFor="regPassword">Password</label>
              <input
                id="regPassword"
                type="password"
                minLength={8}
                value={regPassword}
                onChange={e => setRegPassword(e.target.value)}
                required
              />

              <button type="submit" className="btn primary">Register</button>
              <p className="form-msg">{regMsg}</p>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}
