import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
  setIsAuth: (isauth: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ setIsAuth }) => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    console.log('hanaananana');
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/register', { username, password });
      console.log('token about to be generateddd:', response.data);
      if (response.data.access_token) {
        console.log('token generateddd:', response.data.access_token);
        localStorage.setItem('access_token', response.data.access_token);
        setIsAuth(true);
        navigate('/home')
      }
      if (response.data.error) {
        alert('username already exists');
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
