import "./App.css"
const Sidebar = lazy(() => import("./components/Sidebar"))
const Editor = lazy(() => import("./components/Editor"))
import { lazy, useState } from "react"
import { useDocumentSocket } from "./hooks/useDocumentSocket"

type Document = { id: string; title: string; content?: string }

function App() {
  const [doc, setDoc] = useState<Document | null>(null)

  useDocumentSocket(doc, setDoc)

  return (
    <div className="app-layout">
      <Sidebar setDoc={setDoc} />
      <main className="app-main">
        {doc ? (
          <Editor key={doc.id} doc={doc} setDoc={setDoc} />
        ) : (
          <div className="doc-area-placeholder">
            <svg
              className="doc-area-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            <span className="doc-area-label">Select or create a document</span>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
