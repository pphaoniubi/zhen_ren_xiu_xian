import React, {useState, useEffect} from 'react';
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
  const [duration, setDuration] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);
  
    try {
      const response = await axios.post("http://localhost:8080/api/progress/add", {
        progressType: progressType, // Replace with actual data
        duration: duration
      });
      console.log(response)
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
      <form onSubmit={handleSubmit}>
        <label>
          Progress Type:
          <br />
            <input
              type="text"
              value={progressType}
              onChange={(e) => setProgressType(e.target.value)} // Update progressType state
              required
            />
        </label>
        <br />
        <br />
        <label>
          duration:
          <br />
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)} // Update progressType state
              required
            />
        </label>
        <br />
        <br />
        <button className="centered-button"
                type="submit"
                disabled={loading}>
        {loading ? "Loading..." : "Add Progress"}
        </button>
      {responseMessage && <p>{responseMessage}</p>}
      </form>
    </div>
  )

}

function ShowProgressFunc() {

  const [progresses, setProgresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgresses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/progress/all');
        setProgresses(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProgresses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <h1>Progress List</h1>
      <ul>
        {progresses.map(progress => (
          <li key={progress.id}>
            <p>Type: {progress.progressType}</p>
            <p>Duration: {progress.duration} mins</p>
          </li>
        ))}
      </ul>
    </div>
  );

}

export {AddProgressFunc, ShowProgressFunc};