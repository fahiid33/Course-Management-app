
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


interface RegisterProps {
    setIsauth: (isauth: boolean) => void;
}

const Register: React.FC <RegisterProps>= ({setIsauth}) => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/auth/register', { username, password });
      setIsauth(true);
      navigate('/login');
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          placeholder="username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
