import type { Dispatch, SetStateAction } from "react"
import {
  updateDocumentContent,
  updateDocumentTitle,
} from "../socket/document.events"

type Document = { id: string; title: string; content?: string }

type EditorProps = {
  doc: Document
  setDoc: Dispatch<SetStateAction<Document | null>>
}

export default function Editor({ doc, setDoc }: EditorProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDoc((prev) => (prev ? { ...prev, title: value } : prev))

    updateDocumentTitle(doc.id, value)
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setDoc((prev) => (prev ? { ...prev, content: value } : prev))

    updateDocumentContent(doc.id, value)
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
    </>
  )
}
