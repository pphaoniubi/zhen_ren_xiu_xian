// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Optional, make sure this file exists
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
    <App />
    </Router>
    
  </React.StrictMode>
);