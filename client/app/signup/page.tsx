"use client";
import { useState } from "react";
import { signUp } from "../api/api";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  /**
   * Handle the form submission for sign up.
   *
   * @param {React.FormEvent} e - The form submission event.
   * @return {Promise<void>} - A promise that resolves when the function completes.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Make a request to the sign up API endpoint
    const tokens = await signUp({
      id: "",
      name,
      email,
      password,
      linkedin_url: "",
      picture: "",
      title: "",
      about: "",
    });

    console.log(tokens);
    localStorage.setItem("token", tokens.access_token); // Save the access token to local storage
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
        <label htmlFor="name">Name:</label>
        <input
          type="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <label htmlFor="linkedinUrl">Linkedin URL:</label>
        <input
          type="text"
          id="linkedinUrl"
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
