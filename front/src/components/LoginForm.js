import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
  
    axios.post('http://localhost:8000/login', {
      user: username,  // Use the username and password from the state
      pwd: password
    })
    .then((response) => {
      console.log('Response data:', response.data); // Check the whole response
      const token = response.data.token;
      if (token) {
        setToken(token);  // Pass only the token
        console.log('Token:', token);
        navigate('/dashboard');
      } else {
        console.error('Token is undefined');
      }
    })
    .catch((error) => {
      console.error('Axios error:', error.response ? error.response.data : error.message);
    });
  };
  
  const handleSignUp = (event) => {
    event.preventDefault(); // Prevent default form submission

    axios.post('http://localhost:8000/sign-up', {
      user: username,  // Use the sign-up username and password from the state
      pwd: password
    })
    .then((response) => {
      console.log('Response data:', response.data); // Check the whole response
      const token = response.data.token;
      if (token) {
        setToken(token);  // Pass only the token
        console.log('Token:', token);
        navigate('/dashboard');
      }
    })
    .catch((error) => {
      console.error('Axios error:', error.response ? error.response.data : error.message);
    });
  };

  return (
    <div className="form-holder">
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
      <form onSubmit={handleSignUp}>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default LoginForm;