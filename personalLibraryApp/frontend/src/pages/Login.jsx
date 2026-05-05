import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainLayout from "../components/layout/MainLayout";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5001";

export default function Login() {
  const navigate = useNavigate();
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
        `${API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user?.username) {
        localStorage.setItem("username", data.user.username);
      }
      setMessage("Signed in successfully.");
      navigate("/");
    } catch (err) {
      const status = err.response?.status;
      const msg =
        err.response?.data?.message ||
        (status === 401 ? "Invalid email or password." : "Login failed. Please try again.");
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div>
        <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Log in"}
          </button>
        </form>
        {message ? <p role="status">{message}</p> : null}
        <p>
          <Link to="/register">Need an account? Register</Link>
        </p>
      </div>
    </MainLayout>
  );
}
