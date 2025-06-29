import FrndCard from './frndCard';
import SearchCard from './searchcard';
import appIcon from '../assets/app-icon.png';
import profile from '../assets/user.svg';
import { Link } from 'react-router-dom'
import Profile from '../pages/profile'
import curve from '../assets/curve.svg';

import { useState, useRef, useEffect } from 'react'
import useAuthStore from '../store/useAuth';
import useChatStore from '../store/messageStore';

export default function Sidebar() {
  const [showProfile, setShowProfile] = useState('false');
  const { authUser } = useAuthStore();
  const { searchuser, users ,isUserLoading,getuser  } = useChatStore();
  const ref = useRef(null);

  useEffect(() => {
    getuser();
  }, [getuser]);

  let friends = (!users || users.length === 0 || isUserLoading) ?
    (
      <div className="flex-1/3 h-screen flex items-center justify-center flex-col">
        <p className="text-gray-500">You currently don't have any connections.</p>
        <p className="text-gray-500">Try searching for friends to connect with.</p>
      </div>
    ) : (
      users.map((curr) => {
        return (
          <FrndCard
            key={curr._id}
            id={curr._id}
            name={curr.fullname}
            lastMsg={curr.lastMsg}
            lastMsgTime={curr.lastMsgTime}
            profilePic={curr.profilePic}
            msgSeen={curr.msgSeen}
          />
        )
      }))

  var [showResults,setShowResults] = useState(false);


  var [search,setSearch] = useState([]);
  const handleSearch =async (e) => {
    e.preventDefault();
    const searchValue = ref.current.value;
    const searchResults = await searchuser(searchValue || "anything");
    setSearch(searchResults.map((user) => {
      return (
        <SearchCard
          key={user._id}
          id={user._id}
          name={user.fullname}
          profilePic={user.profilePic}
          email={user.email}
        />
      )
    }));
    ref.current.value = ''; 
    // console.log(search);
  }
  return (
    <>
      <div className="flex-1/3 h-screen" onClick={() =>{ setShowResults(false); setSearch([])} }>
        <div className="flex flex-col items-center p-4 bg-[url('./assets/bg-gradient.svg')] bg-cover text-white h-screen overflow-y-scroll" >
          <div className="w-full flex gap justify-between items-center  p-1.5 border-b border-gray-600" >
            <Link to="/" className='flex'>
              <img src={appIcon} alt="ChatHub Logo" className="w-8 h-8 rounded" />
              <h1 className="text-2xl font-bold ">ChatHub</h1>
            </Link>
            <button onClick={() => { setShowProfile((showProfile) => !showProfile) }}>
              <img src={authUser?.profilePic ? authUser.profilePic : profile} alt="profile" className="w-8 h-8 hover:bg-gray-600 rounded-full cursor-pointer" />
            </button>
          </div>

          <form onSubmit={handleSearch} onClick={(e)=>{e.stopPropagation(); setShowResults(true)}} className="w-full mt-4 relative">
            <input
              ref={ref}
              type="text"
              placeholder="Search..."
              className="w-full p-2 rounded-t bg-gray-700 text-white focus:outline-none pr-10"
            />
            <button
              type="submit"
              className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              tabIndex={-1}
            >
              <i className="fas fa-search"></i>
            </button>
            {search.length > 0 && showResults &&
            <div className='rounded-b p-2 bg-gray-700 w-full absolute'>
              {search}
            </div>}
          </form>

          <div className="flex flex-col gap-4 w-full mt-2">
            {showProfile ? friends : <Profile />}
          </div>
        </div>
      </div>
    </>
  )
}