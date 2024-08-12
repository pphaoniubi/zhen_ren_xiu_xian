import React, { useState } from 'react';
import './Popup.css'; // Import CSS for styling (optional)

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

const PlayerList = () => {
  const [players] = useState([
    { id: 1, name: 'Player One' },
    { id: 2, name: 'Player Two' },
    { id: 3, name: 'Player Three' }
  ]);

  return (
    <div className="player-list">
      <ul>
        {players.map(player => (
          <li key={player.id} className="player-item">
            {player.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Popup;