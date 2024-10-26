// src/components/Login.js
import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ username, password });
      navigate('/movies'); // Navigate to the accordion menu
    } catch {
      alert('Invalid login credentials');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <input type="text" placeholder="Username" className="input-field" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="btn">Login</button>
        <button onClick={() => navigate('/register')} className="btn mt-2">Register</button>
      </form>
    </div>
  );
};

export default Login;
