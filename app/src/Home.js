import React, { useState, useEffect  } from 'react';
import { startProgress } from './Progress';
import Header from './Header';
import './App.css';
import Popup from './Popup'
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

  const [percentage, setPercentage] = useState(0);
  const [progressStarted, setProgressStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [progresses, setProgresses] = useState(null);
  const [progressType , setProgressType] = useState(null);
  let bar_lst = [];

  
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
        setProgresses(data);
        console.log(data[0]);
        const currentTime = new Date();
        const startTime = new Date(data[0].startTime);
        const timeElapsed = currentTime - startTime;
        const totalDays = data[0].duration * 24 * 60 * 60 * 1000;

        const percentageElapsed = (timeElapsed / totalDays) * 100;
        console.log(percentageElapsed); 

        for (var i = 0; i < data.length; i++) {
          const startTime = new Date(data[i].startTime);
          const timeElapsed = currentTime - startTime;
          const totalDays = data[i].duration * 24 * 60 * 60 * 1000;

          const percentageElapsed = (timeElapsed / totalDays) * 100;
          console.log(data.length); 
          bar_lst.push(<div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${percentageElapsed}%` }}
            >
              {percentageElapsed}%
            </div>
          </div>);
        }
        console.log(bar_lst); 
        
        setPercentage(percentageElapsed);

      } catch (error) {
        console.error('Error fetching server time:', error);
      }
    };
    
    const debouncedFetchServerTime = debounce(fetchServerTime, 6000);

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



  return (

    <div className="App">
    <h1>{progressType}</h1>
    
    <ul>{bar_lst}</ul>

    <button onClick={handleProgressStart} disabled={progressStarted}>
        Start Progress
    </button>

    <OpenPopup />
    </div>

  );
}

export default Home;