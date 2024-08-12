import React, { useState, useEffect  } from 'react';
import ProgressBar, { startProgress } from './Progress';
import Header from './Header';
import './App.css';
import Registration from './Registration';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./Home"


function App() {
  return (
    <router>
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        </Routes>

    </router>
  );
}

export default App;