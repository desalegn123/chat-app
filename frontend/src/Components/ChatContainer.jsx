import React from 'react';

const ChatContainer = () => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-gray-100 p-4 border-b">
        <h2 className="text-lg font-semibold">Chat with User</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <p className="text-gray-600">Chat messages will appear here...</p>
      </div>
      <div className="p-4 border-t flex items-center">
        <input 
          type="text" 
          placeholder="Type a message..." 
          className="flex-1 p-2 border rounded-lg outline-none"
        />
        <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">Send</button>
      </div>
    </div>
  );
};

export default ChatContainer;
