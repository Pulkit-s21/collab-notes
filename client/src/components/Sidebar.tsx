import "./Sidebar.css"
import { useEffect, useState } from "react"
import { getDocuments, getDocument } from "../api/document"
import CreateDoc from "./CreateDoc"

export default function Sidebar({ setDoc }) {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    const fetchDocs = async () => {
      const res = await getDocuments()
      setDocuments(res)
    }
    fetchDocs()
  }, [])

  const handleDocCreated = (doc: { id: string; title: string }) => {
    setDocuments((prev) => [...prev, doc])
  }

  const handleGetDoc = async (id: string) => {
    const res = await getDocument(id)
    setDoc(res)
  }

  return (
    <aside className="sidebar">
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
      </div>

      <div className="sidebar-body">
        <p className="sidebar-section-label">Documents</p>

        {documents.map((doc: { id: string; title: string }) => (
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
          </div>
        ))}
      </div>

      <CreateDoc onCreated={handleDocCreated} />
    </aside>
  )
}
