import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // For routing (optional)
import './Header.css'; // For styling

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
      const checkAuth = async () => {
      const response = await fetch('http://localhost:8080/api/users/isAuthenticated',{
                method: 'GET',
                credentials: 'include',   //if dont include, spring boot treat as anonymous
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
      });
      if (!response.ok) {
        throw new Error('Failed to check authentication');
      }
      const data = await response.json();
      setIsAuthenticated(data);
    }
    checkAuth();
  }, [])


  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/progress">Progress</Link>
          </li>
          <li className="nav-item">
            <Link to="/user">User</Link>
          </li>
          <li class="nav-item">
          {!isAuthenticated && (<Link to="/register">
            Register
          </Link>)}
          </li>
          <li class="nav-item">
          {!isAuthenticated && (<Link to="/login">
            Login
          </Link>)}
          </li>
        </ul>
      </nav>
    </header>
  );
};


export default Header;