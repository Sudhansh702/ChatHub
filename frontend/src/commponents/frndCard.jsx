import { Link } from 'react-router-dom';
import UserImg from '../assets/user.svg';

export default function frndCard({id ,name ,lastMsg , lastMsgTime, profilePic, msgSeen }) {
  return (
    <Link to={`/chat/${id}`} className="">
      <article className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg transition-colors">
      <img 
      alt="Profile picture" 
      className="rounded-full w-10 h-10 object-cover" 
      height="40" 
      loading="lazy" 
      src={profilePic ? profilePic : UserImg} 
      width="40" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">
          {name}
        </p>
        <p className="text-xs text-gray-400 flex items-center gap-1">
        {!msgSeen && (
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2 align-middle" title="New message"></span>
        )}
          {lastMsg}
        </p>
      </div>
      <time className="text-xs text-gray-500 select-none" dateTime="2023-06-17T23:59">
        {lastMsgTime}
      </time> 
    </article>
    </ Link>
  );
}