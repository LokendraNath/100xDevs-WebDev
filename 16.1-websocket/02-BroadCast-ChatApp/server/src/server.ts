import { v4 as uuidv4 } from "uuid";
import { WebSocketServer, WebSocket } from "ws";
import express from "express";
import cors from "cors";

import mongoose from "mongoose";
//@ts-ignore
import { Group } from "./models/groupModel";

const app = express();
const wss = new WebSocketServer({ port: 8080 });

app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

interface User {
  socket: WebSocket;
  room: string;
}

mongoose
  .connect("mongodb://localhost:27017/chatAppWS")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.post("/createGroup", async (req, res) => {
  const { groupName } = req.body;
  const groupExist = await Group.findOne({ name: groupName });
  if (groupExist)
    return res.json({
      message: "Group already exists, Please Try Something Diffrent .",
    });

  const group = await Group.create({
    id: uuidv4(),
    name: groupName,
  });

  res.json({ groupId: group.id });
});

// wss.on("connection", (socket) => {
//   socket.on("message", (msg) => {
//     const messageData = JSON.parse(msg.toString());

//     if (messageData.type === "join") {
//       connectedUsers.push({
//         socket,
//         room: messageData.payload.roomId,
//       });
//     }

//     if (messageData.type === "chat") {
//       const senderRoomId = connectedUsers.find(
//         (s) => s.socket === socket,
//       )?.room;

//       connectedUsers.forEach((user) => {
//         if (user.room === senderRoomId) {
//           user.socket.send(messageData.payload.message);
//         }
//       });
//     }
//   });

//   socket.on("close", () => {
//     connectedUsers = connectedUsers.filter((u) => u.socket !== socket);
//   });
// });

app.listen(3030, () => console.log("App Listen On 3030"));
