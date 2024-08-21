import React, { useState, useEffect  } from 'react';
import { startProgress } from './Progress';
import Header from './Header';
import './App.css';
import Popup from './Popup'
import throttle  from 'lodash/throttle';
import debounce  from 'lodash/debounce';


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

  const [progress, setProgress] = useState(0);
  const [progressStarted, setProgressStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);

  
    const fetchServerTime = async () => {
      try {
          const response = await fetch('http://localhost:8080/api/users/getProgressByUser', {
          method: 'GET',
          credentials: 'include',   //if dont include, spring boot treat as anonymous
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
        }})
        
        const data = await response.json();
        console.log(data);
        const currentTime = new Date();
        const startTime = new Date(data[0].startTime);
        const timeElapsed = currentTime - startTime;
        const totalDays = data[0].duration * 24 * 60 * 60 * 1000;

        const percentageElapsed = (timeElapsed / totalDays) * 100;
        console.log(percentageElapsed); 
        
        setProgress(percentageElapsed);

      } catch (error) {
        console.error('Error fetching server time:', error);
      }
    };
    
    const debouncedFetchServerTime = debounce(fetchServerTime, 10000);

    useEffect(() => {
      debouncedFetchServerTime();
    });



  const handleProgressStart = async () => {
    try {
      const startTime = await startProgress(); // Await the result of the async function
      setStartTime(startTime);
      setProgressStarted(true); // Update state to indicate that progress has started
    } catch (error) {
      console.error('Error starting progress:', error);
    }
  };

  
const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${progress}%` }}
      >
        {progress}%
      </div>
    </div>
  );
};


  return (

    <div className="App">
    <h1>Progress Bar</h1>
    
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