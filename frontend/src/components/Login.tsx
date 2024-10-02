import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
  setIsAuth: (isauth: boolean) => void;
}


const Login: React.FC<RegisterProps> = ({ setIsAuth }) => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    console.log('hanaananana');
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { username, password });
      console.log('token about to be generated:');
      console.log(response.data);
      
      if (response.data.access_token) {
        console.log('token generated:', response.data.token);
        localStorage.setItem('token', response.data.token);
        setIsAuth(true);
        console.log('Logged in, navigating to home');
        navigate('/home');
      } else if (response.data.error) {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button className="w-full p-3 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700">
            Login
          </button>
        </form>
        <p className="text-center">
          Not registered?{' '}
          <button
            onClick={handleSignUpRedirect}
            className="font-bold text-indigo-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
