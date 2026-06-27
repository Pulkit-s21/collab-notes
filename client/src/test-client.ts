import { io } from "socket.io-client"

const socket = io("http://localhost:3000")

socket.on("connect", () => {
  console.log("Connected")
  socket.emit("join-document", "52194d90-7bda-4f33-8511-0e753257639f")
  socket.emit("document:update", {
    documentId: "52194d90-7bda-4f33-8511-0e753257639f",
    content: "Testing if content changed in db",
  })
})
