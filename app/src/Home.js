import React, { useState, useEffect  } from 'react';
import ProgressBar, { startProgress } from './Progress';
import Header from './Header';
import './App.css';
import Popup from './Popup'
import Registration from './Registration';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


const OpenPopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div>
    <button onClick={openPopup}>openPopup</button>
    {isPopupOpen && <Popup onClose={closePopup} />}
    </div>
  )
};

function Home() {

  const totalDays = 21;
  const startDate = new Date('2024-08-01')
  const [progress, setProgress] = useState(0);
  const [progressStarted, setProgressStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const fetchServerTime = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/current-time'); // Replace with your actual API endpoint
        const data = await response.json();
        const serverTime = new Date(data.currentTime);
        const timeDifference = serverTime - startDate;
        const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const calculatedProgress = Math.min((daysPassed / totalDays) * 100, 100);
        setProgress(calculatedProgress);
      } catch (error) {
        console.error('Error fetching server time:', error);
      }
    };

    fetchServerTime();
    console.log(progress)
    const interval = setInterval(fetchServerTime, 1000 * 60 * 60 * 24);
    return () => clearInterval(interval);

  }, [startDate, totalDays]);


  const handleProgressStart = async () => {
    try {
      const startTime = await startProgress(); // Await the result of the async function
      setStartTime(startTime);
      setProgressStarted(true); // Update state to indicate that progress has started
    } catch (error) {
      console.error('Error starting progress:', error);
    }
  };

  


  return (

    <div className="App">
    <h1>Progress Bar</h1>
    <Header />
    <ProgressBar progress={progress} />

    <button onClick={handleProgressStart} disabled={progressStarted}>
        Start Progress
    </button>

    {progressStarted && startTime && (
        <ProgressBar startTime={startTime} />
    )}
    <OpenPopup />
    </div>

  );
}

export default Home;