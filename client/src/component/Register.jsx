import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [userData, setUserData] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/auth/register", {
        username,
        password,
      });

      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form>
      {userData != null && (
        <div>
          logged in as:
          <p>{JSON.stringify(userData, null, 2)}</p>
        </div>
      )}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button onClick={(e) => handleRegister(e)}>Register</button>
    </form>
  );
};

export default Register;
