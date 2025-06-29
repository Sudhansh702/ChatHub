import { Link } from 'react-router-dom';
import UserImg from '../assets/user.svg';
import authStore from '../store/useAuth';
import { useEffect, useState } from 'react';
import useChatStore from '../store/messageStore';

export default function frndCard({ id, name, lastMsg, lastMsgTime, profilePic, msgSeen }) {


  const { onlineUsers } = authStore();
  const [isOnline,setIsOnline] = useState(false);
  useEffect(() => {
    setIsOnline(onlineUsers.includes(id));
  },[onlineUsers]);

  return (
    <Link to={`/chat/${id}`} className="">
      <article className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg transition-colors">
        <div className='relative'>
          <img
            alt="Profile picture"
            className="rounded-full w-10 h-10 object-cover"
            height="40"
            loading="lazy"
            src={profilePic ? profilePic : UserImg}
            width="40" />
          {isOnline && (
            <span className="w-3 h-3 bg-blue-500 rounded-full absolute right-0 bottom-0" title="New message"></span>
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">
            {name}
          </p>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            {isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
        <time className="text-xs text-gray-500 select-none" dateTime="2023-06-17T23:59">
          {lastMsgTime}
        </time>
      </article>
    </ Link>
  );
}