import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ "http://localhost:5173" ]
  }
});

const userMap = {};
function getReciversSoketId(userId) {
  return userMap[userId];
}

io.on('connection' , (socket)=>{
  console.log('A user connected:', socket.id);

  const userId = socket.handshake.query.userId;
  if(userId){
    userMap[userId] = socket.id;
    // console.log(`User ${userId} connected with socket ID: ${socket.id}`);
  }
  io.emit('getOnlineUsers',Object.keys(userMap));

  socket.on('disconnect', ()=>{
    console.log('A user disconnected:', socket.id);
    delete userMap[userId];
    io.emit('getOnlineUsers', Object.keys(userMap));
  })
})

export { io, server, app, getReciversSoketId };