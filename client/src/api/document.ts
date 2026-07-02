import { api } from "./axios"

export const getDocuments = async () => {
  const res = await api.get("/documents")
  return res.data
}

export const getDocument = async (id: string) => {
  const res = await api.get(`/documents/${id}`)
  return res.data
}

export const createDocument = async (title: string) => {
  const res = await api.post("/documents", {
    title,
  })

  return res.data
}

export const deleteDocument = async (id: string) => {
  const res = await api.delete(`/documents/${id}`)

  return res.data
}

export const updateContent = async (id: string, content: string) => {
  const res = await api.patch(`/documents/${id}/content`, {
    content,
  })

  return res.data
}

export const updateTitle = async (id: string, title: string) => {
  const res = await api.patch(`/documents/${id}/title`, {
    title,
  })

  return res.data
}

export const getDocHistory = async (id: string) => {
  const res = await api.get(`/documents/${id}/history`)
  return res.data
}
