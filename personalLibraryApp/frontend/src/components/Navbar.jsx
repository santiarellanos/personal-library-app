import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="pl-navbar">
      <Link className="pl-navlink" to="/">
        Home
      </Link>
      <Link className="pl-navlink" to="/library">
        My Library
      </Link>
      <Link className="pl-navlink" to="/login">
        Login
      </Link>
      <Link className="pl-navlink" to="/register">
        Register
      </Link>
      <Link className="pl-navlink" to="/search">
        Search
      </Link>
    </nav>
  );
}
