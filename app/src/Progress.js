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


function ShowProgressFunc() {

  const [progresses, setProgresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progressId, setProgressId] = useState(0);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const fetchProgresses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/progress/getAll');
        setProgresses(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProgresses();
  }, []);

  const handleEnrol = async (progressId) => {
    console.log(typeof progressId)
    try {
      const response = await axios.post(`http://localhost:8080/api/progress/${progressId}/enrol`, null, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="centered-container">
    <h1 className="table-heading">Progress Overview</h1>
    <table border="1" cellPadding="10" cellSpacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Duration</th>
          <th>Actions</th> {/* Actions column for the button */}
        </tr>
      </thead>
      <tbody>
        {progresses.map(progress => (
          <tr key={progress.id}>
            <td>{progress.id}</td>
            <td>{progress.progressType}</td>
            <td>{progress.duration}</td>
            <td>
              <button onClick={() => handleEnrol(progress.id)}>
                Enroll
              </button>
            </td>
          
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );

}

export {ShowProgressFunc};