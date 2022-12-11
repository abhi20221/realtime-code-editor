 const express = require("express");
 const app = express();
 const {Server} = require('socket.io');
 const http = require('http');
const path = require("path");
 
 const server = http.createServer(app);
 const io = new Server(server);
 const userSocketMap = {};

 app.use(express.static('build'));
 app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'build','index.html'));
 })
 function getAllConnectedClients(roomId){
    return Array.from(io.sockets.adapter.rooms.get(roomId)||[]).map((socketId)=>{
        return {
            socketId,
            username:userSocketMap[socketId]
        }
    });
}

 io.on('connection',(socket)=>{
    console.log('socket connected',socket.id);

    socket.on('join',({roomId,username})=>{
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        clients.forEach(({socketId})=>{
            io.to(socketId).emit('joined',{
                clients,
                username,
                socketId:socket.id,
            });
        })
    })

    socket.on('code-change',({roomId,code})=>{
        //sending code to all the users in room including the person who writes that code
        //io.to(roomId).emit("code-change",{code});
        //broadcast the code to all the user excluding us!!
        socket.in(roomId).emit("code-change",{code});
    })

    socket.on('sync-code',({socketId,code})=>{
        io.to(socketId).emit("code-change",{code});
    })

    socket.on('disconnecting',()=>{
        const rooms  = [...socket.rooms];
        rooms.forEach((roomId)=>{
            socket.in(roomId).emit('disconnected',{
                socketId : socket.id,
                username: userSocketMap[socket.id]
            });
        })
        delete userSocketMap[socket.id];
        socket.leave();
    })
 })
const PORT = process.env.PORT||5000;
server.listen(PORT,()=>{
    console.log(`Server is up on ${PORT}`);
})