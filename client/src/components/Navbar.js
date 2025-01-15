import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout, toggleTheme, theme, cartItemCount }) => {
  const navbarTheme = theme === 'light' ? 'navbar-light bg-light' : 'navbar-dark bg-dark';

  return (
    <nav className={`navbar navbar-expand-lg ${navbarTheme} fixed-top`}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          Sklepik Szkolny
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-3 mt-3 mt-lg-0">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    Witaj, <strong>{user.firstName} {user.lastName}</strong>
                  </span>
                </li>
                {user.role === 'admin' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin-dashboard">
                      Panel Admina
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button className="btn btn-outline-danger ms-3" onClick={onLogout}>
                    Wyloguj
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Logowanie
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Rejestracja
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="btn btn-outline-primary" to="/cart">
                🛒 Koszyk ({cartItemCount})
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-outline-secondary"
                onClick={toggleTheme}
              >
                {theme === 'light' ? 'Tryb ciemny' : 'Tryb jasny'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;