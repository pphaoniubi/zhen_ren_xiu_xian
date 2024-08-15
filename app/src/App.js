import React from 'react';
import Header from './Header';
import './App.css';
import Registration from './Registration';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./Home"
import Login from "./Login"
import  AddProgress  from './Progress';


function App() {
  return (
        <>
        <Header />  
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/progress" element={<AddProgress />} />
        </Routes>
        </>

  );
}

export default App;