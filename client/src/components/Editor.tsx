import { useState } from "react"
import { updateContent, updateTitle } from "../api/document"
import { socket } from "../socket/socket"

export default function Editor({ doc, setDoc }) {
  const [oldDoc, setOldDoc] = useState({
    title: doc.title,
    content: doc.content,
  })

  const handleSaveDoc = async (id: string, title: string, content: string) => {
    if (oldDoc.title !== title) {
      await updateTitle(id, title)
    }

    if (oldDoc.content !== content) {
      await updateContent(id, content)
    }

    setOldDoc({ title, content })
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setDoc((prev) =>
      prev
        ? {
            ...prev,
            title: value,
          }
        : prev,
    )

    socket.emit("document:title:update", {
      documentId: doc.id,
      title: value,
    })
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setDoc((doc) => ({ ...doc, content: value }))

    socket.emit("document:update", {
      documentId: doc.id,
      content: value,
    })
  }

  return (
    <>
      <div className="doc-editor">
        <span className="doc-editor-id">ID: {doc.id}</span>
        <input
          className="doc-editor-title"
          value={doc.title}
          onChange={handleTitleChange}
        />
        <textarea
          className="doc-editor-content"
          value={doc.content ?? ""}
          onChange={handleContentChange}
        />
      </div>

      <button
        disabled={
          !(oldDoc.title !== doc.title || oldDoc.content !== doc.content)
        }
        onClick={() => handleSaveDoc(doc.id, doc.title, doc.content)}
        style={{
          width: "fit-content",
          alignSelf: "end",
          paddingInline: "1rem",
        }}
      >
        Save
      </button>
    </>
  )
}
