import React, { useState } from 'react';
import { questions, options, severity } from '../logic/phq9Logic';

export default function Phq9Form({ onComplete }) {
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [error, setError] = useState('');

  function handleChange(index, value) {
    const next = [...answers];
    next[index] = value;
    setAnswers(next);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (answers.some(a => a === '')) {
      setError('Please answer all questions.');
      return;
    }
    setError('');
    const scores = answers.map(a => parseInt(a, 10));
    const total = scores.reduce((a, b) => a + b, 0);
    const sev = severity(total);
    onComplete({ scores, total, sev });
  }

  return (
    <div className="auth-card">
      <h2>PHQ-9 Questionnaire</h2>
      <p>Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>
      <form onSubmit={handleSubmit}>
        {questions.map((q, i) => (
          <div className="qblock" key={i}>
            <label>{i + 1}. {q}</label>
            <select
              required
              value={answers[i]}
              onChange={e => handleChange(i, e.target.value)}
            >
              <option value="">--Choose--</option>
              {options.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}
        {error && <p className="form-msg">{error}</p>}
        <button type="submit" className="btn primary">Submit</button>
      </form>
    </div>
  );
}
