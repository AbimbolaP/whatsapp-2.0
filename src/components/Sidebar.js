import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@mui/material';
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@mui/icons-material';
import SidebarChat from '../components/SidebarChat';
import { db,  auth } from "../firebase";
import { useStateValue } from '../StateProvider';


function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot(snapshot=>(
      setRooms(
        snapshot.docs.map((doc)=>({
        id: doc.id,
        data: doc.data(),
      })))
    ));
    return () => {
      unsubscribe();
    }
  }, []);


  return (
    <div className='sidebar'>
      <div className='sidebar_header'>
        <Avatar  src={user?.photoURL}  onClick={() => auth.signOut()}  style={{cursor : "pointer"}} />
        <div className='sidebar_headerRight'>
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>         
        </div>
      </div>

      <div className='sidebar_search'>
        <div className='sidebar_searchContainer'>
          <SearchOutlined />
          <input type='text' placeholder='Search or start a new chat' />
        </div>
      </div>

      <div className='sidebar_chats'>
        < SidebarChat addNewChat />
        {rooms.map(room => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  )
}

export default Sidebar;
