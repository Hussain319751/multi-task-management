import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

const Header = () => {
  const authContext = useAuth();
  const isAuth = authContext.isAuth;

  const logout = () => {
    authContext.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          MyApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left-aligned nav */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              {isAuth && (
                <Link className="nav-link" to="/">
                  Home
                </Link>
              )}
            </li>
            <li className="nav-item">
              {isAuth && (
                <Link className="nav-link" to="/todos">
                  Todos
                </Link>
              )}
            </li>
          </ul>

          {/* Right-aligned nav */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {!isAuth && (
                <Link className="nav-link" to="/Login">
                  Login
                </Link>
              )}
            </li>
            <li className="nav-item">
              {isAuth && (
                <Link className="nav-link" onClick={logout} to="/Logout">
                  Logout
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
