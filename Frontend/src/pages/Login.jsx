import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { axios, setToken } = useAppContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

  console.log("Login form submitted"); // 🔍 Debug line

    try {
      const { data } = await axios.post('/api/user/login', { email, password });

      console.log("Login response:", data); // 🔍 Debug line

      if (data.token) {
         setToken(data.token);
         localStorage.setItem('token', data.token);
         axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
         toast.success('Login successful!');
         localStorage.setItem('token', data.token);
         localStorage.setItem('user', JSON.stringify(data.user));
         if (data.user?.role === 'admin'){
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      }



    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">Login to your account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-md outline-none border-gray-300 focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border rounded-md outline-none border-gray-300 focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded-md cursor-pointer font-semibold hover:bg-primary/90 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
