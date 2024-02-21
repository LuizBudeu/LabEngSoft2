import React from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
      </ul>
    </div>
  );
};
