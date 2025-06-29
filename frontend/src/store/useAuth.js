import {create} from 'zustand'
import axiosInstance  from '../lib/axios'
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.MODE === 'development' ? "http://localhost:5000" : "/";

const useAuthStore = create((set,get) => ({
  authUser : null,
  isSigningUp: false,
  isLoggingUp: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  socket: null,
  onlineUsers: [],

  checkAuth: async() =>{
    try {
      const res = await axiosInstance.get('/auth/check');
      // console.log(res.data)
      set({authUser: res.data});
      get().connectSocket();
    } catch (error) {
      set({authUser: null});      
    }finally{
      set({isCheckingAuth: false});
    }
  },
  signup: async(data) =>{
    set({isSigningUp: true})
    try {
      const res = await axiosInstance.post("auth/signup" , data);
      set({authUser: res.data.user})
      if(res){
        toast.success("Account Created Successfully")
      }
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message )
    }finally{
      set({isSigningUp: false})
    }
  },
  signin: async(data) =>{
    set({isSigningUp: true})
    try {
      const res = await axiosInstance.post("auth/login" , data);
      // console.log(res.data.user)
      set({authUser: res.data.user});
      if(res){
        toast.success("Logged In Successfully")
      }
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message )
    }finally{
      set({isSigningUp: false})
    }
  },
  logout: async() =>{
    try {
      const res = await axiosInstance.post("auth/logout");
      set({ authUser: null })
      if (res) {
        toast.success("Logged Out Successfully")
      }
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message)
    } 
  },
  uploadProfile: async({profilePic}) =>{
    set({isSigningUp: true})
    try {
      const res = await axiosInstance.put("auth/update-profilepic",{picture : profilePic});
      set({authUser: res.data})
      if (res) {
        toast.success("Updated Successfully")
      }
    } catch (error) {
      toast.error(error.response.data.message)
      set({ isSigningUp: false })
    } 
  },
  // socket 

  connectSocket: () => {
    const authUser = get().authUser;
    if(!authUser || get().socket?.connected) return ;

    const socket = io(SOCKET_URL,{
      query:{
        userId: authUser._id
      }
    });
    socket.connect();
    set({socket: socket});

    socket.on('getOnlineUsers',(userIds)=>{
      set({onlineUsers: userIds});
    })

  },
  disconnectSocket: () => {
    if(get().socket.connected) get().socket.disconnect();
  }

}));

export default useAuthStore