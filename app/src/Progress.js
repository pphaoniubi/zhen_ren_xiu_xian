import React from 'react';
import './Progress.css'; // Import the CSS file for styling


// api.js
export const startProgress = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/progress/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to start progress: ${response.statusText}`);
    }

    const data = await response.json();
    return data.startTime; // Return the actual start time
  } catch (error) {
    console.error('Error starting progress:', error);
    throw error; // Re-throw error to handle it in the component
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



export default ProgressBar;