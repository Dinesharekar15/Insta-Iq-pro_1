import React, { useState } from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h2>Forgot Password</h2>
      {submitted ? (
        <div style={{ color: "green", marginTop: 20 }}>
          If an account with that email exists, a password reset link has been sent.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ width: 320, maxWidth: "90%", marginTop: 20 }}>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: 8 }}>Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
              placeholder="Enter your email"
              required
            />
          </div>
          {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
          <button type="submit" style={{ width: "100%", padding: 10, background: "#ffb600", color: "#222", border: "none", borderRadius: 4, fontWeight: 600 }}>
            Send Reset Link
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgetPassword; 