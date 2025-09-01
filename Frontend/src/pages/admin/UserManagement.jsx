import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';
import UserCard from '../../components/admin/UserCard'; // ✅ Adjust path as needed

const AdminUserManagement = () => {
  const { axios } = useAppContext();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/api/admin/users');
      console.log("Fetched users:", data);
      setUsers(data.users);
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error(error);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`/api/admin/users/${userId}`);
      toast.success('User deleted');
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      toast.error('Failed to delete user');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">User Management</h2>
      {users.length === 0 ? (
        <p className="text-gray-500 text-center">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              onDelete={() => handleDelete(user._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;
