import React from 'react';

export default function MissionStatement() {
  return (
    <div className="auth-card">
      <h2>About this tool</h2>
      <p>
        The PHQ-9 is a brief, evidence-based questionnaire used to screen for
        symptoms of depression. It is not a diagnosis by itself, but it can
        help you understand how your mood has been over the last two weeks.
      </p>
      <p>
        This web application lets you complete the PHQ-9 privately at home.
        Your responses stay in your browser and any exported PDF is encrypted
        with a password you choose.
      </p>
      <p>
        If your score is high or you have thoughts of self-harm, please contact
        a mental health professional or emergency services right away. Online
        tools are not a substitute for professional care.
      </p>
    </div>
  );
}
