import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let connectedUsers: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (msg) => {
    let messageData = JSON.parse(msg.toString());

    if (messageData.type === "join") {
      connectedUsers.push({
        socket,
        room: messageData.payload.roomId,
      });
    }

    if (messageData.type === "chat") {
      // check the user room for send the msg
      let senderRoomId = connectedUsers.find((s) => s.socket == socket)?.room;

      for (let i = 0; i < connectedUsers.length; i++) {
        if (connectedUsers[i]?.room == senderRoomId) {
          connectedUsers[i]?.socket.send(messageData.payload.msg);
        }
      }
    }
  });
});
