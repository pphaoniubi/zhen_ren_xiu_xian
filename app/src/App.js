import React from 'react';
import Header from './Header';
import './App.css';
import Registration from './Registration';
import {Route, Routes } from 'react-router-dom';
import Home from "./Home"
import Login from "./Login"
import  {AddProgressFunc, ShowProgressFunc}  from './Progress';


function App() {
  return (
        <>
        <Header />  
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/progress" element={<ShowProgressFunc />} />
        <Route path="/progress" element={<AddProgressFunc />} />
        </Routes>
        </>

  );
}

export default App;