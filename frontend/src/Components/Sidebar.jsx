import React, { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { User } from 'lucide-react';

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } =
    useChatStore();
  
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    getUsers(); // Fetch users on component mount
  }, [getUsers]);

  // Add a fallback to loading state
  if (isUserLoading) return <div>Loading...</div>;

  return (
    <aside className="h-full w-20 border-r lg:w-72 border-base-200 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-3">
          <User className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => {
          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-5 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                selectedUser?._id === user._id
                  ? 'bg-base-300 ring-1 ring-base-300'
                  : ''
              }`}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || '/avatar.webp'}
                  alt={user.name}
                  className="w-12 h-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 ring-2 ring-zinc-900 rounded-full bg-green-500" />
                )}
              </div>
              <div className="hidden lg:block min-w-8 text-left">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? 'online' : 'offline'}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
