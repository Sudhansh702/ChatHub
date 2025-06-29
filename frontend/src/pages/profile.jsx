import React, { useState } from "react";
import useAuthStore from "../store/useAuth";
import defaultImg from "../assets/user.svg"

const Profile = () => {
  const { authUser, logout, uploadProfile, isSigningUp } = useAuthStore();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload= async ()=>{
        const base64 = reader.result;
        setSelectedFile(base64);

      }
    }
  };

  const handleUpload = async() => {
    await uploadProfile({profilePic: selectedFile});
    setSelectedFile(null)
  };

  return (
    <div className="w-full h-full mx-auto p-8 mt-12">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <img
            src={
              selectedFile || authUser?.profilePic || defaultImg
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-700 shadow-lg transition-all duration-300"
          />
          <label className="absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-700 p-2 rounded-full cursor-pointer shadow-md transition-colors duration-200">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2a2.828 2.828 0 11-4-4 2.828 2.828 0 014 4zM19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2h2l2 2h4a2 2 0 012 2v12a2 2 0 01-2 2z"
              />
            </svg>
            <input type="file" accept="image/*" onChange={handleFileChange} hidden />
          </label>
        </div>
        {selectedFile && (
          <button
            onClick={handleUpload}
            disabled={isSigningUp}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full shadow-md transition-colors duration-200"
          >{
              !isSigningUp?
              ("Upload"):("Loading...")
          }
          </button>
        )}

        <div className="text-center mt-2">
          <h2 className="text-2xl font-bold">{authUser?.fullname}</h2>
          <p className="text-sm text-gray-400">{authUser?.email}</p>
        </div>

        <button
          onClick={logout}
          className="mt-8 bg-gray-600 hover:bg-gray-700 text-white px-8 py-2 rounded-full shadow-lg transition-colors duration-200 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
