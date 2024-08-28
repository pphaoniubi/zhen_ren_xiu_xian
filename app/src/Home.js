import React, { useState, useEffect  } from 'react';
import { startProgress } from './Progress';
import Header from './Header';
import './App.css';
//import Popup from './Popup'
import axios from "axios";
import './Popup.css';


function Home() {

  const [progresses, setProgresses] = useState([]);
  const [progressType , setProgressType] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [progressId, setProgressId] = useState(1);

  const getUserData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/progress/${id}/getUsersById`, null, {
        headers: {
          'Content-Type': 'application/json',
        }, 
      withCredentials: true,
    });
      setUsers(response.data);
      console.log(users)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false);
    }
  };


    
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
    getUserData(progressId);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const PlayerList = () => {

    return (
      <div className="player-list">
        <ul>
          {users.map(user => (
            <li key={user.id} className="player-item">
              {user.username}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  
const Popup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Users you are competing</h3>
        <PlayerList />
        <button onClick={onClose} className="close-popup-btn">Close</button>
      </div>
    </div>
  );
};
  
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
        setProgressId(data[0].id);
        const currentTime = new Date();


        console.log(data);
        const updatedProgresses = data.map((progress) => {
          const startTime = new Date(progress.startTime);
          const timeElapsed = currentTime - startTime;
          const totalDays = progress.duration * 24 * 60 * 60 * 1000;
          const percentageElapsed = (timeElapsed / totalDays) * 100;
          return {
            ...progress,
            percentageElapsed,
          };
        });
        
        setProgresses(updatedProgresses);
        
        

      } catch (error) {
        console.error('Error fetching server time:', error);
      }
    };
    


    useEffect(() => {
      fetchServerTime();
    }, []);


  return (

    <div className="App">
    <h1>{progressType}</h1>
    
    <ul>
        {progresses.map((progress, index) => (
          <li key={index}>
            <div className="progress-bar-container">
              <h2>{progress.progressType}</h2>
              <div className="progress-bar" style={{ width: `${progress.percentageElapsed}%` }}>
                {progress.percentageElapsed.toFixed(2)}%
              </div>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={handleOpenPopup}>Open Popup</button>
      {isPopupOpen && (
        <Popup onClose={handleClosePopup} data={users} loading={loading} />
      )}
    </div>

  );
}

export default Home;