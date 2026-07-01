import { createDocument } from "../api/document"

type CreateDocProps = {
  onCreated: (doc: { id: string; title: string }) => void
}

export default function CreateDoc({ onCreated }: CreateDocProps) {
  const handleCreateDoc = async () => {
    const doc = await createDocument("Untitle Document")
    onCreated(doc)
  }

  return (
    <div className="sidebar-footer">
      <button onClick={() => handleCreateDoc()} className="sidebar-new-btn">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        New Document
      </button>
    </div>
  )
}
