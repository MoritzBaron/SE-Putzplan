import React, { useState } from "react";
import authService from "../services/authService";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authService.login(email, password);
      console.log("Login successful:", response);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label> Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label> Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit"> Login </button>
    </form>
  );
}
