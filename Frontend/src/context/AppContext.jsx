// src/context/AppContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => {
  try {
    const storedUser = localStorage.getItem('user');
    return storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null;
  } catch (err) {
    console.log(err)
    return null;
  }
});
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState('');

  const customAxios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
  });

  // ✅ Automatically attach token to all requests
  customAxios.interceptors.request.use((config) => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      config.headers.Authorization = `Bearer ${savedToken}`;
    }
    return config;
  });

  const loginUser = async (email, password) => {
    try {
      const { data } = await customAxios.post('/api/auth/login', { email, password });

      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        toast.success('Login successful');
        navigate(data.user.role === 'admin' ? '/admin' : '/user');
      } else {
        toast.error('Invalid login response');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    toast.success('Logged out');
    navigate('/login');
  };

  const fetchBlogs = async () => {
    try {
      const { data } = await customAxios.get('/api/blog/all');
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

useEffect(() => {
  const savedToken = localStorage.getItem('token');
  const savedUser = localStorage.getItem('user');

  if (savedToken) {
    setToken(savedToken);
    customAxios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
  }

  try {
    if (savedUser && savedUser !== 'undefined') {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  } catch (err) {
    setUser(null); // fallback in case of malformed JSON
  }

  fetchBlogs();
}, []);


  const value = {
    axios: customAxios,
    navigate,
    token,
    setToken,
    user,
    setUser,
    blogs,
    setBlogs,
    input,
    setInput,
    fetchBlogs,
    loginUser,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
