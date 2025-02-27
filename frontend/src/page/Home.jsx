import React from 'react';
import { useChatStore } from '../store/useChatStore';
import Sidebar from '../Components/Sidebar';
import NoSelectedUser from '../Components/NoSelectedChat';
import ChatContainer from '../Components/ChatContainer';

const Home = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center px-4 pt-20">
        <div className="bg-base-100 max-w-6xl rounded-lg w-full shadow-cl h-[cal(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar/>
            {selectedUser ?<NoSelectedUser/>:<ChatContainer/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
