import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginForm.css';

// TOKEN
import useToken from './useToken'

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {token, setToken} = useToken()

  const handleSubmit = (event) => {
    event.preventDefault();  // Prevent default form submission
  
    axios.get('http://localhost:8000/login', {
      params: {
        user: username,  // Use the username and password from the state
        pwd: password
      }
    })
    .then((response) => {
      // Assuming the token is returned in response.data.token
      setToken(response.data.token);  // Pass only the token, not the entire response
      console.log(response.data.token);  // Check that the token is being received correctly
    })
    .catch((error) => {
      console.error(error);
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