import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "12px", padding: "12px 0" }}>
      <Link to="/">Home</Link>
      <Link to="/library">My Library</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/search">Search</Link>
    </nav>
  );
}
