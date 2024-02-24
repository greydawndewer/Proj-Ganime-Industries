import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import client from "../utils/axiosClient";
import '../utils/bootstrap.min.css';
import './style1.css';
import BlurLoadingComponent from './L'; // Import the BlurLoadingComponent

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when starting the registration process

    try {
      const response = await client.post("/auth/register", {
        username,
        password
      });

      setUserData(response.data);
      localStorage.setItem('access_token', response.data.token);
      // Simulate a delay before redirecting, replace with actual logic if needed
      setTimeout(() => {
        setIsLoading(false); // Set loading to false when registration is successful
        navigate('/');
      }, 2000);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        setError('User already exists.');
      } else if (error.response && error.response.status === 402) {
        setError('Please provide all fields.');
      } else {
        setError('An error occurred while processing your request.');
      }
      setIsLoading(false); // Set loading to false when there's an error
    }
  };
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      {isLoading ? (
        <BlurLoadingComponent onLoadingComplete={handleLoadingComplete}/>
      ) : (
        <form autoComplete="off" className="form-horizontal">
          <h1 className="mb-4 text-center">Sign Up</h1>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!!error && <div className="alert alert-danger">{error}</div>}
          <button onClick={handleRegister} className="btn btn-primary w-100" type="button">
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
};

export default Register;