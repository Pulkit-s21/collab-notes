import { useEffect, type Dispatch, type SetStateAction } from "react"
import { socket } from "../socket/socket"
import { joinDocument } from "../socket/document.events"

type Document = { id: string; title: string; content?: string }

export const useDocumentSocket = (
  doc: Document | null,
  setDoc: Dispatch<SetStateAction<Document | null>>,
) => {
  useEffect(() => {
    socket.connect()

    socket.on("connect", () => {
      console.log("Socket Connected")
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!doc) return

    joinDocument(doc.id)
  }, [doc])

  useEffect(() => {
    socket.on("document:content:updated", (updatedDocument) => {
      setDoc((prev) => {
        if (!prev) return prev

        if (prev.id !== updatedDocument.documentId) {
          return prev
        }

        return {
          ...prev,
          content: updatedDocument.content,
        }
      })
    })

    return () => {
      socket.off("document:content:updated")
    }
  }, [])

  useEffect(() => {
    socket.on("document:title:updated", (updatedTitle) => {
      setDoc((prev) => {
        if (!prev) return prev

        if (prev.id !== updatedTitle.documentId) {
          return prev
        }

        return {
          ...prev,
          title: updatedTitle.title,
        }
      })
    })

    return () => {
      socket.off("document:title:updated")
    }
  }, [])
}
