import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8000 });

wss.on("connection", function (socket) {
  setInterval(() => {
    // send to the client
    socket.send(Math.random());
  }, 600);

  // if user send us message
  socket.on("message", function (e) {
    console.log(e.toString());
  });
});
