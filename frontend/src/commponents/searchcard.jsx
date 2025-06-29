import { Link } from 'react-router-dom';
import useChatStore from '../store/messageStore';
import UserImg from '../assets/user.svg';

export default function searchCard({ id, name,email, profilePic }) {
  const { addUser ,getuser } = useChatStore();
  return (
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
          <p className="text-xs text-gray-400">
            {email}
          </p>
        </div>
        <div onClick={() => addUser(id).then(getuser())} className="flex items-center justify-center w-8 h-8 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors cursor-pointer">
          <i className="fas fa-plus text-gray-400"></i>
        </div>
      </article>
  );
}