

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import client from "../utils/axiosClient";
import '../utils/bootstrap.min.css';
import './style1.css';


const Login = () => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      
      const response = await client.post("/auth/login", {
        username,
        password
      });
    
      setUserData(response.data);
      localStorage.setItem('access_token', response.data.token)
      navigate('/');
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 402) {
        setError('Invalid Username, Retry!');
      } else if (error.response && error.response.status === 401) {
        setError('Please provide all fields.');
      } else if (error.response && error.response.status === 403) {
        setError('Invalid Password, Retry!');  
      } else {
        setError('An error occurred while processing your request.');
      }
    }

  };


  return (

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    <form autoComplete="off" className="form-horizontal">
      <h1 className="mb-4 text-center">Log In</h1>
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
      <button onClick={handleLogin} className="btn btn-primary w-100" type="button">
        Login
      </button>
    </form>
  </div>

  
  );
};

export default Login;

