import express from "express"
import documentRoutes from "./routes/document.routes"
import { createServer } from "node:http"
import { Server } from "socket.io"
import { scheduleDocumentSave } from "./socket/debounce"

const PORT = process.env.PORT

const app = express()
const server = createServer(app)

// creating socket io server

// Remember:
// Express
//       ↓
// HTTP Server
//       ↓
// Socket.io

// Socket.io doesn't attach to Express.
// It attaches to the HTTP server because the initial WebSocket handshake is an HTTP request.

const io = new Server(server, {
  cors: {
    origin: "*",
  },
})

io.on("connection", (socket) => {
  socket.on("join-document", (documentId: string) => {
    socket.join(documentId)
  })

  socket.on("document:update", ({ documentId, content }) => {
    // Broadcast directly
    socket.to(documentId).emit("document:updated", {
      documentId,
      content,
    })

    // Save after debounce
    scheduleDocumentSave(documentId, content)
  })

  socket.on("disconnect", () => {
    console.log(`User disconnected on: ${socket.id}`)
  })
})

app.use(express.json())

app.use("/documents", documentRoutes)

server.listen(PORT, () => {
  console.log(`Collab Notes Server running on port ${PORT}`)
})
