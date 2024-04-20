import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./navbar.css";
const NavBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  console.log(user);
  const handleLogout = () => {
    logout();

    // Perform logout logic here

    // Navigate to the "/login" route
    navigate("/login");
  };

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        EMPLOYEE MANAGEMENT
      </Link>
      <ul>
        {user ? (
          <>
            <li>
              <span className="username">Logged in as {user.user_name}</span>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
