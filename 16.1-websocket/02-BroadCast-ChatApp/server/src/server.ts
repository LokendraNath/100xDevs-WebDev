import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let connectedUsers: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (msg) => {
    const messageData = JSON.parse(msg.toString());

    if (messageData.type === "join") {
      connectedUsers.push({
        socket,
        room: messageData.payload.roomId,
      });
    }

    if (messageData.type === "chat") {
      const senderRoomId = connectedUsers.find(
        (s) => s.socket === socket,
      )?.room;

      connectedUsers.forEach((user) => {
        if (user.room === senderRoomId) {
          user.socket.send(messageData.payload.message);
        }
      });
    }
  });

  socket.on("close", () => {
    connectedUsers = connectedUsers.filter((u) => u.socket !== socket);
  });
});
