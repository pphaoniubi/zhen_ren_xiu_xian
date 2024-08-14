import React from 'react';
import { Link } from 'react-router-dom'; // For routing (optional)
import './Header.css'; // For styling

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/progresses">Progresses</Link>
          </li>
          <li className="nav-item">
            <Link to="/user">User</Link>
          </li>
          <li class="nav-item">
          <Link to="/register">
            Register
          </Link>
          </li>
          <li class="nav-item">
          <Link to="/login">
            Login
          </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;