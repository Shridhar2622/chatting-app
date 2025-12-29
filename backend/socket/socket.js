module.exports = function (io) {
  
  // Here we will add JWT auth later
  // io.use(...)

  io.on("connection", (socket) => {
    console.log("A user connected");

    // Here we will attach user info later
    // socket.user = ...

    // Here we will handle private messages
    // socket.on("sendMessage", ...)

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
