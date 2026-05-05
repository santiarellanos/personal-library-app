import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainLayout from "../components/layout/MainLayout";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5001";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${API_URL}/api/auth/register`,
        { username, email, password },
        { withCredentials: true }
      );
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user?.username) {
        localStorage.setItem("username", data.user.username);
      }
      setMessage("Account created. You are signed in.");
      navigate("/");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Registration failed. Please try again.";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Creating account…" : "Register"}
          </button>
        </form>
        {message ? <p role="status">{message}</p> : null}
        <p>
          <Link to="/login">Already have an account? Log in</Link>
        </p>
      </div>
    </MainLayout>
  );
}
