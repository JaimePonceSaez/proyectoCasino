import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404</h1>
      <p>Oops! Page not found.</p>
      <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
        Return to Home
      </Link>
    </div>
  );
}
