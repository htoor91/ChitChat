import React from 'react';
import ChatHeader from './chat_header_container';
import ChatList from './chat_list/chat_list_container';

const Chat = () => {
  return (
    <section id="chat-view-container">
      <ChatHeader />
      <ChatList />
    </section>
  );
};

export default Chat;
