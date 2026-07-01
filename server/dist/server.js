"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const document_routes_1 = __importDefault(require("./routes/document.routes"));
const cors_1 = __importDefault(require("cors"));
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const debounce_1 = require("./socket/debounce");
const PORT = process.env.PORT;
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
// creating socket io server
// Remember:
// Express
//       ↓
// HTTP Server
//       ↓
// Socket.io
// Socket.io doesn't attach to Express.
// It attaches to the HTTP server because the initial WebSocket handshake is an HTTP request.
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("join-document", (documentId) => {
        socket.join(documentId);
    });
    socket.on("document:content:update", ({ documentId, content }) => {
        // Broadcast directly
        socket.to(documentId).emit("document:content:updated", {
            documentId,
            content,
        });
        // Save after debounce
        (0, debounce_1.scheduleDocumentSave)(documentId, content);
    });
    socket.on("document:title:update", ({ documentId, title }) => {
        // Broadcast directly
        socket.to(documentId).emit("document:title:updated", {
            documentId,
            title,
        });
        // Save after debounce
        (0, debounce_1.scheduleDocumentTitleSave)(documentId, title);
    });
    socket.on("disconnect", () => {
        console.log(`User disconnected on: ${socket.id}`);
    });
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/documents", document_routes_1.default);
server.listen(PORT, () => {
    console.log(`Collab Notes Server running on port ${PORT}`);
});
