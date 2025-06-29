import { useParams, Link } from 'react-router-dom';
import UserImg from './assets/user.svg';
import useChatStore from './store/messageStore';

import { useState, useRef, useEffect, ref } from 'react';
import toast from 'react-hot-toast';


export default function chat() {
  const { users, sendMessage, messages, getMessages } = useChatStore();
  const { id } = useParams();
  const friend = users.find(users => String(users._id) === String(id));
  useEffect(() => {
    if (friend) {
      getMessages(friend._id);
    }
  }, [friend]);

  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [fullscreenImg, setFullscreenImg] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.'); return;
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const removeImage = () => {
    setImagePreview(null);
    fileInputRef.current.value = null;
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    let image = imagePreview;
    let tex = text.trim();
    setText('');
    setImagePreview(null);

    try {
      await sendMessage({
        text: tex,
        image: image,
      }, id)
      setText('');
      fileInputRef.current.value = null;
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    }
  }

  // scroll to bottom when messages change
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="flex-2/3 h-screen bg-gray-100">
      {/* Fullscreen image modal */}
      {fullscreenImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setFullscreenImg(null)}
        >
          <img
            src={fullscreenImg}
            alt="Full view"
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={() => setFullscreenImg(null)}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
      )}
      
      <section aria-label="Chat conversation" className="bg-[#0d121c]  w-full h-full flex flex-col text-gray-300">
        <header className="flex items-center gap-3 my-3 m-5">
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
              {friend?.fullname}
            </p>
            <p className="text-gray-500 text-sm font-semibold">
              {friend?.email}
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

        <main className="flex flex-col flex-1 justify-end overflow-y-scroll space-y-4 w-full  bg-[url('./assets/chat-bg.svg')] bg-cover p-5">
          {messages.map((message, index) => (
            <article key={index} className={`flex ${message.senderId === id ? 'justify-start' : 'justify-end'} max-w-[100%]`}>
              <div className={`rounded-xl p-3 text-xs leading-tight max-w-full ${message.senderId === id ? 'bg-blue-900 text-white' : 'bg-gray-600 text-gray-300'
                }`}>
                {message.imageUrl && (
                  <img
                    src={message.imageUrl}
                    alt="Message attachment"
                    className="rounded-lg w-100 object-cover p-2 cursor-pointer"
                    onClick={() => setFullscreenImg(message.imageUrl)}
                  />
                )}
                {message.text}
              </div>
            </article>
          ))}
          <div ref={messagesEndRef} />
        </main>

        {/* Footer  */}
        <footer className="flex items-center gap-3 p-5 py-3 relative">
          {imagePreview && (
            <div className="m-3 flex item-center gap-2 absolute bottom-full left-0">
              <div className='w-20 h-20'>
                <img src={imagePreview} alt="Image preview" className="w-20 h-20 object-cover rounded-xl relative" />
                <button onClick={removeImage} className="absolute top-[-5px] right-[-5px] text-gray-400 hover:text-purple-600 cursor-pointer">
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          )}

          {/* input */}
          <form onSubmit={handleSendMessage} className='flex items-center gap-2 w-full'>
            <input
              aria-label="Type a message"
              className="flex-1 rounded-full bg-[#2a2f42] py-2 px-4 text-gray-300 text-sm placeholder-gray-500 focus:outline-none"
              placeholder="type a message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
            />
            <button type='button' aria-label="Add" className={`hidden sm:flex btn btn-circle ${imagePreview ? 'btn-error' : 'btn-primary'} text-white cursor-pointer`}
              onClick={() => fileInputRef.current?.click()}>
              <i className="fas fa-images"></i>
            </button>
            <button aria-label="Send" disabled={!text.trim() && !imagePreview} className={`${!imagePreview && !text.trim() ? "text-gray-600" : "text-purple-600"} text-xl ml-2 cursor-pointer`} onClick={handleSendMessage}>
              <i className="fas fa-paper-plane"></i>
            </button>

          </form>

        </footer>
      </section>
    </main>
  )
}