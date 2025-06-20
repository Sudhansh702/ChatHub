import {useParams , Link} from 'react-router-dom';
import UserImg from './assets/user.svg';


export default function chat({friends}){

  const { id } = useParams();
  const friend = friends.find(friend => String(friend.id) === String(id));


  const handleSend = (e) => {
    e.preventDefault();
    // You can add logic to send the message here
    alert('Send button clicked!');
  };

  return (
    <section aria-label="Chat conversation" className="bg-[#1f2433]  w-full h-full flex flex-col p-5 text-gray-300">
      <header className="flex items-center gap-3 mb-5">
        <Link to="/" aria-label="Back" className="text-gray-400 text-lg">
          <i className="fas fa-arrow-left">
          </i>
        </Link>
        <img 
          alt="Profile picture of Desirae Carder, a woman with short hair and glasses" 
          className="rounded-full w-10 h-10 object-cover" 
          height="40" 
          loading="lazy" 
          src={friend?.profilePic ? friend?.profilePic : UserImg}  
          width="40" />
        <div className="flex-1">
          <p className="text-white font-semibold">
            {friend?.name}
          </p>
        </div>

        <button aria-label="Call" className="text-purple-600 text-xl">
          <i className="fas fa-phone">
          </i>
        </button>
        <button aria-label="Video call" className="text-purple-600 text-xl">
          <i className="fas fa-video">
          </i>
        </button>

      </header>

      
      <main className="flex-1 overflow-y-auto space-y-6 w-full">
        <article className="flex justify-end max-w-[100%]">
          <div className="bg-gray-600 rounded-xl p-3 text-xs text-white leading-tight max-w-full">
            Wow Great !!😍
          </div>
        </article>

        <article className="flex space-y-1  max-w-[80%]">
          <div className="bg-[#2a2f42] rounded-xl p-3 text-xs text-gray-300 leading-tight max-w-full">
            <p className="text-xs text-pink-600 font-semibold">
              Marilyn,
            </p>
            !!
          </div>
        </article>
      </main>

      {/* Footer  */}
      <footer className="flex items-center gap-3 mt-5">
        {/* <button aria-label="Add" className="text-pink-600 text-2xl">
          <i className="fas fa-plus-circle">
          </i>
        </button> */}
        <input aria-label="Type a message" className="flex-1 rounded-full bg-[#2a2f42] py-2 px-4 text-gray-300 text-sm placeholder-gray-500 focus:outline-none" placeholder="Aa" type="text" />
        {/* <button aria-label="Emoji" className="text-gray-400 text-xl">
          <i className="far fa-smile">
          </i>
        </button>
        <button aria-label="Camera" className="text-gray-400 text-xl">
          <i className="fas fa-camera">
          </i>
        </button> */}
        <button aria-label="Send" className="text-purple-600 text-xl ml-2 cursor-pointer" onClick={handleSend}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </footer>
    </section>
  )
}