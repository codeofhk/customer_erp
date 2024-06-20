import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(''); // Clear any previous messages

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, { username, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('billing_no', data.billing_no);
        navigate('/dashboard');
        //else if(data.permission === 'billing') {navigate('/billing');}
      } else {
        setMessage(data.message || 'Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'>
        <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>Login</h1>
        <form onSubmit={handleLogin} className='space-y-4'>
          <div>
            <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-1'>
              Email
            </label>
            <input
              id="email"
              name='email'
              type='text'
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder='Enter your email'
              required
            />
          </div>
          <div>
            <label htmlFor="password" className='block text-sm font-medium text-gray-700 mb-1'>
              Password
            </label>
            <input
              id="password"
              name='password'
              type='password'
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder='Enter your password'
              required
            />
          </div>
          {message && <p className='text-red-500 text-center'>{message}</p>}
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition-colors duration-200'
            >
              Login
            </button>
          </div>
          <div className='text-center'>
            <button
              type='button'
              className='text-blue-500 hover:text-blue-700 focus:outline-none'
              onClick={() => {
                // Handle forgot password logic here
              }}
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;