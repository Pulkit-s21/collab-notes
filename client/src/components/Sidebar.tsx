import "./Sidebar.css"
import { useEffect, useState } from "react"
import { getDocuments, getDocument, deleteDocument } from "../api/document"
import CreateDoc from "./CreateDoc"
import { Trash2 } from "lucide-react"

type Document = { id: string; title: string; content?: string }

type SidebarProps = {
  setDoc: (doc: Document) => void
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ setDoc, isOpen, onClose }: SidebarProps) {
  const [documents, setDocuments] = useState<Document[]>([])

  useEffect(() => {
    const fetchDocs = async () => {
      const res = await getDocuments()
      setDocuments(res)
    }
    fetchDocs()
  }, [])

  const handleDocCreated = (doc: Document) => {
    setDocuments((prev) => [...prev, doc])
  }

  const handleGetDoc = async (id: string) => {
    const res = await getDocument(id)
    setDoc(res)
    onClose()
  }

  const handleDeleteDoc = async (id: string) => {
    await deleteDocument(id)
    setDocuments((prev) => prev.filter((d) => d.id !== id))
  }

  return (
    <aside className={`sidebar${isOpen ? " sidebar-open" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Z"
            />
          </svg>
        </div>
        <span className="sidebar-title">collab-notes</span>
        <button
          className="sidebar-close-btn"
          onClick={onClose}
          aria-label="Close documents menu"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="sidebar-body">
        <p className="sidebar-section-label">Documents</p>

        {documents.map((doc) => (
          <div key={doc.id} className="sidebar-doc-item">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            <span
              onClick={() => {
                handleGetDoc(doc.id)
              }}
              className="sidebar-doc-name"
            >
              {doc.title}
            </span>

            <button onClick={() => handleDeleteDoc(doc.id)}>
              <Trash2 color="red" />
            </button>
          </div>
        ))}
      </div>

      <CreateDoc onCreated={handleDocCreated} />
    </aside>
  )
}
