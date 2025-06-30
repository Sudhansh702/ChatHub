import SignInPage from './authentication/signIn.jsx';
import SignUpPage from './authentication/signUp.jsx';
import SidebarAuth from './authentication/sidebar.jsx';
import Sidebar from './commponents/sidebar.jsx';
import Chat from './chat.jsx';

import SocialImg from './assets/chat-bg.svg'

import { BrowserRouter as Router, Route, Routes, useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast';


import useAuthStore from './store/useAuth.js';
import useChatStore from './store/messageStore.js';

export default function App() {
  console.log("App component rendered");

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const {getuser,users} = useChatStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }


  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              authUser ? (
                <div className='flex h-screen'>
                  <Sidebar  />
                  <main className="flex-2/3 h-screen bg-gray-100 p-4 bg-[url('./assets/chat-bg.svg')] bg-cover portrait:hidden"></main>
                </div>) :
                (<Navigate to="/signin" />)
            }
          />
          <Route
            path="/chat/:id"
            element={
              authUser ? (
                <div className='flex h-screen'>
                    <Sidebar  />
                    <Chat  />
                </div>) :
                (<Navigate to="/signin" />)
            }
          />
          <Route
            path="/signin"
            element={
              !authUser ? (
                <div className="flex bg-white not-landscape:block">
                    {/* <SidebarAuth /> */}
                    <SignInPage />
                </div>) :
                (<Navigate to="/" />)
            }
          />
          <Route
            path="/signup"
            element={
              !authUser ? (
                <div className="flex bg-white not-landscape:block">
                    {/* <SidebarAuth /> */}
                    <SignUpPage />
                </div>) :
                (<Navigate to="/" />)
            }
          />
        </Routes>
      </Router>

      <Toaster />
    </>
  )
}