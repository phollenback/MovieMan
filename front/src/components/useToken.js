import { useState } from 'react';

function useToken() {
  // Retrieve token from localStorage and parse it
  const getToken = () => {
    try {
      const tokenString = localStorage.getItem('token');
      return tokenString ? JSON.parse(tokenString) : null;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  };

  const [token, setToken] = useState(getToken());

  // Save token to localStorage and update state
  const saveToken = (userToken) => {
    try {
      localStorage.setItem('token', JSON.stringify(userToken));
      setToken(userToken);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  return {
    setToken: saveToken,
    token
  };
}

export default useToken;