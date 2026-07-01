import { socket } from "./socket"

export const joinDocument = (documentId: string) => {
  socket.emit("join-document", documentId)
}

export const updateDocumentContent = (documentId: string, content: string) => {
  socket.emit("document:content:update", {
    documentId,
    content,
  })
}

export const updateDocumentTitle = (documentId: string, title: string) => {
  socket.emit("document:title:update", {
    documentId,
    title,
  })
}
