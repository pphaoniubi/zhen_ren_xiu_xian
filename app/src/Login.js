import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = {
            username: username,
            password: password
        };

        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
            
            if (!response.ok) {
                console.log(response.status)
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            console.log(response.status)

            // Store the JWT token
            localStorage.setItem('token', data.token);

            // Redirect to the dashboard
            
        } catch (error) {
            console.log("in error")
            setError("error: " + error.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <div className="error-message">{error}</div>}
            <Logout />
        </div>
    );
}

function Logout() {
    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/users/logout', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });
            
            if (!response.ok) {
                console.log(response.status)
                throw new Error('Log out failed');
            }


            console.log(response.status)


            // Redirect to the dashboard
            
        } catch (error) {
            console.log("in error")
        }
    };

    return (
        <div>
            <button onClick={handleClick}>
                Log Out
            </button>
        </div>
    );
}


export default Login;
