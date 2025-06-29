import User from '../models/User.js';

const getuser = async (req,res) =>{
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)
      .populate({ path: 'friends', select: 'fullname email profilePic' });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const friends = user.friends;
   
    res.status(200).json(friends)
  } catch (error) {
    console.log("Error in getFriendsController",error.message);
    res.status(500).json({error:"Internal server error"});
  }
}
const searchUser = async (req,res) =>{
  try { 
    var user ;
    const fullname = req.params.fullname;
    if (fullname === "anything" ){
      user = await User.find({_id: { $ne: req.user._id }}).limit(10).select("fullname email profilePic");
    }else{
      user = await User.
      find({
        _id :{$ne : req.user._id} ,
        fullname: { $regex: fullname, $options: 'i' } }).limit(30)
        .select("fullname email profilePic");
      }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }   
    // console.log("user",user);
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getFriendsController",error.message);
    res.status(500).json({error:"Internal server error"});
  }
}
const adduser = async (req,res) =>{
  try {
    const friendId = req.params.id;
    const userId = req.user._id;
    if(friendId === userId){
      return res.status(400).json("Cann't add friend");
    }
    const friend = await User.findByIdAndUpdate(
      friendId,
      { $addToSet: { friends: userId } },
      { new: true }
    ).select("-passwordHash");
    if(!friend){
      return res.status(404).json({ error: "User not found" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    ).select("-passwordHash");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }   
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getFriendsController",error.message);
    res.status(500).json({error:"Internal server error"});
  }
}

export { getuser, searchUser, adduser };