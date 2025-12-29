const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const db = require("./config/db");
const authRoutes = require("./routes/userAuth");
const socketHandler = require("./socket/socket");

dotenv.config();

const app = express();
app.use(express.json());

// connect database
db();

// API routes
app.use("/chat/api", authRoutes);

// create http server
const server = http.createServer(app);

// create socket server
const io = new Server(server, {
  cors: { origin: "*" }
});

// plug socket logic
socketHandler(io);   // 👈 we will build this later

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
