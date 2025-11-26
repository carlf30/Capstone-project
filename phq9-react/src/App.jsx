import React, { useState } from 'react';
import './capstone.css';

import MissionStatement from './components/MissionStatement';
import AuthCard from './components/AuthCard';
import Phq9Form from './components/Phq9Form';
import ResultsView from './components/ResultsView';

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('mission'); // 'mission' | 'phq' | 'results'
  const [result, setResult] = useState(null);

  function handleLogout() {
    setUser(null);
    setResult(null);
    setView('mission');
  }

  function handleCompletePhq({ scores, total, sev }) {
    setResult({ scores, total, sev });
    setView('results');
  }

  return (
    <div className="auth-wrapper">
      <div style={{ maxWidth: 900, width: '100%', display: 'flex', gap: 24 }}>
        {/* Left side: mission / info panel */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {user ? (
            <div className="auth-card">
              <h2>Welcome, {user.name}</h2>
              <p className="subtitle">
                Use the navigation on the right to complete the PHQ-9 and
                download your encrypted results.
              </p>
            </div>
          ) : (
            <MissionStatement />
          )}
        </div>

        {/* Right side: auth / app panel */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {!user && (
            <AuthCard
              onLogin={u => {
                setUser(u);
                setView('phq');
              }}
            />
          )}

          {user && (
            <>
              <div className="auth-card" style={{ marginBottom: 12 }}>
                <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <button className="btn ghost" onClick={() => setView('mission')}>
                      Mission
                    </button>
                    <button
                      className="btn ghost"
                      style={{ marginLeft: 8 }}
                      onClick={() => setView('phq')}
                    >
                      PHQ-9
                    </button>
                  </div>
                  <button className="btn secondary" onClick={handleLogout}>
                    Logout
                  </button>
                </nav>
              </div>

              {view === 'mission' && <MissionStatement />}
              {view === 'phq' && <Phq9Form onComplete={handleCompletePhq} />}
              {view === 'results' && result && (
                <ResultsView
                  user={user}
                  scores={result.scores}
                  total={result.total}
                  sev={result.sev}
                  onRetake={() => {
                    setResult(null);
                    setView('phq');
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
