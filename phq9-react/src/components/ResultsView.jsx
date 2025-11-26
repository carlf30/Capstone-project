import React from 'react';
import { generatePdf } from '../logic/phq9Logic';

export default function ResultsView({ user, scores, total, sev, onRetake }) {
  function handleDownload() {
    const password = window.prompt('Set a password for your PDF:');
    if (!password) return;
    generatePdf({ user, scores, total, sev, password });
  }

  return (
    <div className="auth-card">
      <h2>Results</h2>
      <p>Total Score: <strong>{total}</strong></p>
      <p>Severity: <strong>{sev}</strong></p>
      <button className="btn primary" onClick={handleDownload}>
        Download Encrypted PDF
      </button>
      <button className="btn secondary" style={{ marginTop: '8px' }} onClick={onRetake}>
        Retake PHQ-9
      </button>
    </div>
  );
}
