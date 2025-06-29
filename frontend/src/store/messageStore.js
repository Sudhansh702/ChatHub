import { create } from 'zustand'
import toast from 'react-hot-toast'
import axiosInstance from '../lib/axios'
import useAuthStore from './useAuth';


const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,
  addingUser: false,

  getuser: async () => {
    set({ isUserLoading: true });
    try {
      console.log("Fetching users...");
      const res = await axiosInstance.get("/connections/getuser");
      set({ users: res.data })
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      set({ isUserLoading: false });
    }
  },
  searchuser: async (fullname) => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/connections/searchuser/" + fullname);
      return res.data;
    } catch (error) {
      console.error("Error searching users:", error);
      toast.error("Failed to search users");
    } finally {
      set({ isUserLoading: false });
    }
  },
  addUser: async (id) => {
    set({ addingUser: true });
    try {
      const res = await axiosInstance.post("/connections/adduser/" + id);
      if (res.status === 200) {
        toast.success("User added successfully");
      }
    } catch (error) {
      toast.error("Failed to search users");
    } finally {
      set({ addingUser: false });
    }
  },

  sendMessage: async (message, userId) => {
    const { messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${userId}`, message);
      if (res.status === 200) {
        set({ messages: [...messages, res.data] });
      } else { throw new Error("Failed to send message"); }
    } catch (error) {
      toast.error("Failed to send message");
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/getmessages/${userId}`);
      console.log("Messages fetched:", res.data);
        set({ messages: res.data });
    } catch (error) {
      toast.error("Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // socket

  listenToMessage: (friend) => {
    if (!friend) {
      return;
    }
    console.log("Listening to messages...");
    const socket = useAuthStore.getState().socket;

    socket.on('getMessage', (data) => {
      console.log("New message received:", data);
      set({ messages: [...get().messages, data] });
    });
  },
  notListenToMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket.off('getMessage');
  },

}))

export default useChatStore;