const express = require("express");
const app = express();
const io = require("socket.io");

const server = app.listen(3010, (err) => {
  console.log("back is running");
});

app.get("/", (req, res) => {
  res.send("hello my friend");
});

var socket = io(server, { cors: { origin: "*" } });
const mySocket = socket.of("/socket");

mySocket.on("connection", (socket) => {
  console.log("new user connected");

  socket.on("newMessage", (data) => {
    // console.log(data);
    data = {
      ...data,
      date: new Date().toLocaleString(),
      id: (Math.random() * 350 + 10).toFixed(2) + data.msg,
    };
    mySocket.emit("newMessage", data);
  });

  socket.on("deleteMessage", (data) => {
    // console.log(data);
    mySocket.emit("deleteMessage", data);
  });
  mySocket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
