import React, { useEffect, useState } from 'react';
import './SidebarChat.css';
import { Avatar } from '@mui/material';
import db from '../firebase';
import { Link } from 'react-router-dom';

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if(id) {
      db.collection('rooms')
      .doc(id)
      .collection('message')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => 
        setMessages(snapshot.docs.map((doc) =>doc.data()))
      );
    }
  }, []);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Enter room name");

    if (roomName) {
      //do some db stuff;
      db.collection('rooms').add({
        name: roomName
      });
    }
  };

  return !addNewChat ? (
    <Link to={ `/rooms/${id}`}>
      <div className='sidebarChat'>
        <Avatar src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`} />
        <div className='sidebarChat_info'>
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ): (
    <div onClick={createChat} className='sidebarChat'>
      <h2>Add New Chat</h2>
    </div>
  )
}

export default SidebarChat;
