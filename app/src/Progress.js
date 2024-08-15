import React, {useState} from 'react';
import './Progress.css'; // Import the CSS file for styling
import axios from "axios";


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



function AddProgressFunc() {

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [progressType, setProgressType] = useState("");
  const [progressValue, setProgressValue] = useState(0);

  const handleClick = async () => {
    setLoading(true);
  
    try {
      const response = await axios.post("http://localhost:8080/api/addProgress", {
        taskName: "New Progress Task", // Replace with actual data
      });
  
      setResponseMessage("Progress created successfully!");
      console.log("Success:", response.data);
    } catch (error) {
      setResponseMessage("Failed to create progress");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="add_button">
      <button className="centered-button"
              onClick={handleClick}
              disabled={loading}>
      {loading ? "Loading..." : "Add Progress"}
      </button>
    </div>
  )

}

export default AddProgressFunc;