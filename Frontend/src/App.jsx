import React from 'react';
import { Route, Routes,Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Layout from './pages/user/Layout';
import Dashboard from './pages/Dashboard';
import AddBlog from './pages/user/AddBlog';
import ListBlog from './pages/user/ListBlog';
import Comments from './pages/user/Comments';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUserManagement from './pages/admin/UserManagement';
import AdminListBlog from './pages/admin/AdminListBlog';
import AdminComments from './pages/admin/CommentManage';
import Login from './pages/Login';
import Register from './pages/Register'; // ✅ added import
import 'quill/dist/quill.snow.css';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext';
import RequireAdmin from './components/RequireAdmin';



const App = () => {
  const { token } = useAppContext();

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/login' element={<Login />} /> {/* ✅ optional: direct login */}
        <Route path='/register' element={<Register />} /> {/* ✅ added register route */}

        {/* User Routes (Protected) */}
        <Route path='/user' element={token ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path='addBlog' element={<AddBlog />} />
          <Route path='listBlog' element={<ListBlog />} />
          <Route path='comments' element={<Comments />} />
          
        </Route>

<Route
  path="/admin/*"
  element={
    <RequireAdmin>
      <AdminLayout />
    </RequireAdmin>
  }
>
  <Route index element={<AdminDashboard />} />
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path='users' element={<AdminUserManagement />} />
  <Route path="listBlog" element={<AdminListBlog />} />
  <Route path="comments" element={<AdminComments />} />
</Route>


      </Routes>
    </div>
  );
};

export default App;
