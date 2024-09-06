import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/LoginForm.css';

function LoginForm({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (event) => {
    event.preventDefault();  // Prevent default form submission
  
    axios.post('http://localhost:8000/login', {
      user: username,  // Use the username and password from the state
      pwd: password
    })
    .then((response) => {
      // Assuming the token is returned in response.data.token
      setToken(response.data.token);  // Store the token
      console.log(response.data.token);  // Check that the token is being received correctly
      
      // Navigate to /dashboard upon successful login
      navigate('/dashboard');
    })
    .catch((error) => {
      console.error('Axios error:', error.response ? error.response.data : error.message);
    });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;