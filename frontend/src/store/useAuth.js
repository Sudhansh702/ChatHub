import {create} from 'zustand'
import axiosInstance  from '../lib/axios'
import toast from 'react-hot-toast';

const useAuthStore = create((set) => ({
  authUser : null,
  isSigningUp: false,
  isLoggingUp: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async() =>{
    try {
      const res = await axiosInstance.get('/auth/check');
      // console.log(res.data)
      set({authUser: res.data});
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
      set({authUser: res.data.user})
      if(res){
        toast.success("Logged In Successfully")
      }
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
  }

}));

export default useAuthStore