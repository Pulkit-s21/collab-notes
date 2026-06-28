import { useEffect, useState } from "react"
import { getDocuments } from "../api/document"

export default function Sidebar() {
  const [documents, setDocuments] = useState([{ id: 1, title: "Hello" }])

  useEffect(() => {
    const fetchDocs = async () => {
      const res = await getDocuments()
      setDocuments(res)
    }
    fetchDocs()
  }, [])

  return (
    <div>
      <ul>
        {documents.map((doc) => {
          return <li key={doc.id}>{doc.title}</li>
        })}
      </ul>
    </div>
  )
}
