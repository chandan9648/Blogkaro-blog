import React from 'react';

const UserCard = ({ user, onDelete }) => {
  const { name, email, role } = user;

  return (
    <div className="w-full rounded-lg overflow-hidden shadow bg-white p-5 flex flex-col justify-between">
      <div>
        <h5 className="text-gray-900 font-medium text-base">{name || 'Unnamed User'}</h5>
        <p className="text-xs text-gray-600">{email}</p>
        <span className="inline-block mt-1 px-2 py-0.5 bg-primary/20 text-primary text-[10px] rounded-full">
          {role}
        </span>
      </div>

      <button
        onClick={onDelete}
        className="mt-4 text-xs text-red-500 hover:underline self-start"
      >
        Delete
      </button>
    </div>
  );
};

export default UserCard;
