import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);

  return (
    <>

      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light px-3">
        <div className="container-fluid">
          {/* Logo */}
          <Link className="navbar-brand me-3" to="/">
            <img
              src="/images/favicon.png"
              alt="Newsly"
              width="100"
              height="30"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/defaultlogo.png';
              }}
            />
          </Link>

          {/* Hamburger icon */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible nav items */}
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
            {/* Close button inside menu (mobile only) */}
            <button className="close-btn d-lg-none" onClick={closeNavbar}>
              &times;
            </button>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {[
                { path: '/', label: 'Home' },
                { path: '/business', label: 'Business' },
                { path: '/entertainment', label: 'Entertainment' },
                { path: '/general', label: 'General' },
                { path: '/health', label: 'Health' },
                { path: '/science', label: 'Science' },
                { path: '/sports', label: 'Sports' },
                { path: '/technology', label: 'Technology' },
              ].map(({ path, label }) => (
                <li className="nav-item" key={path}>
                  <Link
                    className={`nav-link ${location.pathname === path ? 'active-tab' : ''}`}
                    to={path}
                    onClick={closeNavbar}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
