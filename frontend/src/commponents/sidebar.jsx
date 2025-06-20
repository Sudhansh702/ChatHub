import FrndCard from './frndCard';
import appIcon from '../../public/app-icon.png';
import profile from '../assets/user copy.svg';

export default function Sidebar(props) {

  var friends = props.friends.map((curr) => {
    return (
      <FrndCard
        key={curr.id}
        id={curr.id}
        name={curr.name}
        lastMsg={curr.lastMsg}
        lastMsgTime={curr.lastMsgTime}
        profilePic={curr.profilePic}
        msgSeen={curr.msgSeen}
      />
    )
  })
  return (
    <>
      <div className="flex flex-col items-center p-4 bg-gray-800 text-white h-screen overflow-y-scroll">
        <div className="w-full flex gap justify-between items-center  p-1.5 border-b border-gray-600">
          <div className='flex'>
            <img src={appIcon} alt="ChatHub Logo" className="w-8 h-8 rounded" />
            <h1 className="text-2xl font-bold ">ChatHub</h1>
          </div>
          <img src={profile} alt="profile" className="w-8 h-8 hover:bg-gray-600 rounded-full cursor-pointer" />
        </div>
        <div className="w-full mt-4 mb-2 relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 pr-10"
          />
          <button
            type="submit"
            className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            tabIndex={-1}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="flex flex-col gap-4 w-full">
          {friends}
        </div>
      </div>
    </>
  )
}