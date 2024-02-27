import React, { useEffect, useState } from 'react';
import "./Chat.css";
import { Avatar, IconButton } from '@mui/material';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import db from "../firebase"
import firebase from 'firebase/compat/app';
// import '@firebase/firestore' 
import { useStateValue } from "../StateProvider";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const [roomName, setroomName] = useState ("");
  const [messages, setMessages] = useState([]);
  const [ {user }, dispatch] = useStateValue();
  const {roomId} = useParams();

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => setroomName
        (snapshot.data().name));

      db.collection('rooms')
      .doc(roomId)
      .collection("message")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => 
        setMessages(snapshot.docs.map((doc) => 
        doc. data()))
      );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed ", input);

    db.collection('rooms').doc(roomId).collection('message').add({
      message:input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput("");
  };

  return (
    <div className='chat'>
      <div className='chat_header'>
        <Avatar src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`}/>

        <div className='chat_headerInfo'>
          <h3>{roomName}</h3>
          <p>
            Last seen {" "}
            {new Date(
              messages[messages.length - 1]?.
              timestamp?.toDate()
              ).toUTCString()
            }
          </p>
        </div>

        <div className='chat_headerRight'>
          <IconButton>
            <SearchOutlined/>
          </IconButton>
          <IconButton>
            <AttachFile/>
          </IconButton>
          <IconButton>
            <MoreVert/>
          </IconButton>
        </div>
      </div>

      <div className='chat_body'>
        {messages.map((message) =>(
       <p className={`chat_message ${message.name === user.displayName && 'chat_receiver'}`}>
        <span className='chat_name'>{message.name}</span> 
        {message.message}
        <span className='chat_timestamp'>
          {new Date(message.timestamp?.toDate()).toUTCString()}
        </span>
      </p>
      ))}
      </div>

      <div className='chat_footer'>
        <InsertEmoticon/>
        <form>
          <input value={input} onChange={e => setInput(e.target.value)} type='text' placeholder='Type a message'/>
          <button onClick={sendMessage} type='submit'>Send</button>
        </form>
        <Mic/>
      </div>
    </div>
  )
}

export default Chat;
