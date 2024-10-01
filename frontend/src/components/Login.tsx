// Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:3000/auth/login', { username, password });
        console.log('Login successful');
        if (response.data.token) {
        console.log('Login successful');
            localStorage.setItem('token', response.data.token);
        } else if (response.data.error) {
            alert('Invalid credentials');
            return;
        }
        console.log('Login successful');
        navigate('/home');
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login. Please try again.');
    }
};

  const handleSignUpRedirect = () => {
    navigate('/register');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Not registered? <button onClick={handleSignUpRedirect}>Sign Up</button>
      </p>
    </div>
  );
};

export default Login;
