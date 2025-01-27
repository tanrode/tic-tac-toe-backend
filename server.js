const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow requests from your frontend
    methods: ["GET", "POST"],
  },
});

// Listen for connection events
io.on("connection", (socket) => {
  console.log("A user connected");

  // Emit a message to the client when the game starts
  socket.on("game-start", (data) => {
    io.emit("game-start", data);
  });

  // Listen for player moves and broadcast it to others
  socket.on("player-move", (data) => {
    io.emit("player-move", data);
  });

  // Listen for player win and broadcast it to others
  socket.on("player-win", (data) => {
    io.emit("player-win", data);
  });

  // Reset the game
  socket.on("reset-game", (data) => {
    io.emit("reset-game", data);
  });

  // Handle Player name changes
  socket.on("player-name-change", (data) => {
    io.emit("player-name-change", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(4000, () => {
  console.log("WebSocket server is running on http://localhost:4000");
});
