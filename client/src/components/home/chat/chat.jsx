import React from 'react';
import ChatHeader from './chat_header_container';
import ChatList from './chat_list/chat_list_container';

const Chat = ({socket}) => {
  return (
    <section id="chat-view-container">
      <ChatHeader />
      <ChatList socket={socket}/>
    </section>
  );
};

export default Chat;
