// src/components/ForgotPassword.jsx

import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement password reset logic here (e.g., API call)
    setMessage(
      "If an account with that email exists, a password reset link has been sent."
    );
  };

  return (
    <section className="container">
      <form id="form" className="form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <p>
          Please enter your Email Address. you will <br />
          receive a link to create a new password via Email
        </p>
        <div className="control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <input type="submit" className="button" value="Submit" />
        {message && <p>{message}</p>}
      </form>
    </section>
  );
};

export default ForgotPassword;
