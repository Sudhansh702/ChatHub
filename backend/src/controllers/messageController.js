const Message = require('../models/Messages')

const User = require('../models/User')
const cloudinary = require('../utils/cloudinary')

const getmessages = async (req, res) => {
  try {
    const myId = req.user._id;
    const friendId = req.params.id;
    
    const latestChat = await Message.find({ 
      $or :[
        { senderId: myId, reciverId: friendId },
        { senderId: friendId, reciverId: myId }
      ]
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json(latestChat);
  } catch (error) {
    console.log("Error in getFriendsController", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
const sendmsg = async (req, res) => {
  try {
    const myId = req.user._id;
    const friendId = req.params.id;
    const {text,image} = req.body;
    let imageUrl;
    if(image){
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMsg = await Message.create({ senderId: myId, reciverId: friendId, text ,imageUrl });
    // todo Socket.io

    res.status(200).json(newMsg);
  } catch (error) {
    console.log("Error in getFriendsController", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}



module.exports = {
  getmessages,
  sendmsg
}