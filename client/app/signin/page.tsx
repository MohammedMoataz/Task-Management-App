"use client";
import { useState } from "react";
import { signin } from "../api/api";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Handle the form submission for sign in.
   *
   * @param {React.FormEvent} e - The form submission event.
   * @return {Promise<void>} - A promise that resolves when the function completes.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Call the signin API endpoint with the provided email and password
    const tokens = await signin({
      email,
      password,
    });

    localStorage.setItem("token", tokens.access_token);
    console.log(tokens);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "300px" }}
      >
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
