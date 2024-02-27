import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
// import { useState } from 'react';
import Login from './components/Login';
import { useStateValue } from './StateProvider';



function App() {
  const [{user}, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login/>
      ): (
        <div className='app_body'>
          <BrowserRouter>
            <Sidebar/>
              <Routes>
                <Route path='/rooms/:roomId' element= { <Chat/>} />
                <Route path='/' element= {<Chat/>}/>
              </Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;
