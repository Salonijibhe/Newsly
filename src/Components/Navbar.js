import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);

  return (
    <>
      <style>{`
        .nav-link {
          padding: 8px 20px;
          margin: 6px 8px;
          border-radius: 11px;
          color: #333;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .nav-link:hover {
          background-color: #d4edda;
          color: #000;
        }

        .active-tab {
          background-color: #198754 !important;
          color: #fff !important;
          font-weight: bold;
        }

        /* Additional spacing for desktop/laptop screens */
        @media (min-width: 992px) {
          .nav-item {
            margin-right: 12px;
          }
        }

        @media (max-width: 991.98px) {
          .navbar-collapse {
            position: absolute;
            top: 8px;
            right: 10px;
            width: auto;
            min-width: 220px;
            background-color: #f8f9fa;
            box-shadow: 0 0 10px rgba(0,0,0,0.15);
            border-radius: 8px;
            padding: 1rem;
            z-index: 1000;
          }

          .navbar-nav {
            flex-direction: column;
            align-items: flex-start;
          }

          .nav-item {
            margin: 6px 0;
          }

          .nav-link {
            padding: 6px 10px;
            width: 100%;
            text-align: left;
            white-space: nowrap;
          }

          .close-btn {
            position: absolute;
            top: 8px;
            right: 12px;
            font-size: 24px;
            background: none;
            border: none;
            color: #333;
            cursor: pointer;
          }
        }
      `}</style>

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
