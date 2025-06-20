import SignInPage from './authentication/signIn.jsx';
import SignUpPage from './authentication/signUp.jsx';
import SidebarAuth from './authentication/sidebar.jsx';
import Sidebar from './commponents/sidebar.jsx';
import Chat from './chat.jsx';

import SocialImg from './assets/social-friends.svg'

import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import { useEffect, useState} from 'react';



import friendsData from './commponents/friends.js';

export default function App() {
  console.log("App component rendered");
  
  // Storing friends Data in a state
  const [friends , setfriends] = useState([]);

  useEffect(() => {
    setfriends(friendsData);
  }), [friends];



  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className='flex h-screen'>
              <div className="flex-1/3 h-screen">
                <Sidebar friends={friends}/>
              </div>
              <main className="flex-2/3 h-screen bg-gray-100 p-4">
                <div className="flex flex-col items-center justify-center h-full text-gray-600">
                  <h2 className="text-xl font-semibold">Welcome to ChatHub</h2>
                  <img src={SocialImg} alt="Chat" className=" w-xl mb-4" loading='lazy'/>
                  <p className="text-sm text-center mt-2">Select a conversation to start chatting.</p>
                </div>
              </main>
            </div>
          }
        />
        <Route
          path="/chat/:id"
          element={
            <div className='flex h-screen'>
              <div className="flex-1/3 h-screen">
                <Sidebar friends={friends} />
              </div>
              <main className="flex-2/3 h-screen bg-gray-100 ">
                <Chat friends={friends}/>
              </main>
            </div>
          }
        />
        <Route
          path="/signin"
          element={
            <div className="flex bg-white not-landscape:block">
              <div className="flex-2/5 not-landscape:hidden">
                <SidebarAuth />
              </div>
              <div className="flex-3/5">
                <SignInPage />
              </div>
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <div className="flex bg-white not-landscape:block">
              <div className="flex-2/5  not-landscape:hidden">
                <SidebarAuth />
              </div>
              <div className="flex-3/5">
                <SignUpPage />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  )
}