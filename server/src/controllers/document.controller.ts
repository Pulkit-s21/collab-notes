import { Request, Response } from "express"
import {
  createDocument,
  getDocument,
  getDocumentHistory,
  getDocuments,
  updateDocumentContent,
  updateDocumentTitle,
} from "../services/document.service"

type DocumentParams = {
  documentId: string
}

export const createDocumentController = async (req: Request, res: Response) => {
  try {
    const { title } = req.body
    const document = await createDocument(title)

    return res.status(201).json(document)
  } catch (err) {
    console.error(`Error: ${err}`)

    return res.status(500).json({ message: "Something went wrong" })
  }
}

export const getDocumentsController = async (req: Request, res: Response) => {
  try {
    const documents = await getDocuments()

    return res.status(200).json(documents)
  } catch (err) {
    console.error(`Error: ${err}`)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

export const getUniqueDocumentController = async (
  req: Request<DocumentParams>,
  res: Response,
) => {
  try {
    const { documentId } = req.params

    if (!documentId) {
      return res.status(404).json({ message: "No ID was provided" })
    }

    const document = await getDocument(documentId)

    return res.status(200).json(document)
  } catch (err) {
    console.error(`Error: ${err}`)
    return res.status(500).json({ message: "Something went wrong" })
  }
}

export const updateDocumentContentController = async (
  req: Request<DocumentParams>,
  res: Response,
) => {
  try {
    const { documentId } = req.params
    const { content } = req.body

    if (!documentId)
      return res.status(404).json({ message: "No ID was provided" })

    const doc = await updateDocumentContent(documentId, content)

    return res.status(201).json(doc)
  } catch (err) {
    console.error(`Error: ${err}`)

    return res.status(500).json({ message: "Something went wrong" })
  }
}

export const updateDocumentTitleController = async (
  req: Request<DocumentParams>,
  res: Response,
) => {
  try {
    const { documentId } = req.params
    const { title } = req.body

    if (!documentId)
      return res.status(404).json({ message: "No ID was provided" })

    const doc = await updateDocumentTitle(documentId, title)

    return res.status(201).json(doc)
  } catch (err) {
    console.error(`Error: ${err}`)

    return res.status(500).json({ message: "Something went wrong" })
  }
}

export const getDocumentHistoryController = async (
  req: Request<DocumentParams>,
  res: Response,
) => {
  try {
    const { documentId } = req.params

    if (!documentId)
      return res.status(404).json({ message: "No ID was provided" })

    const documentHistory = await getDocumentHistory(documentId)

    if (!documentHistory.length)
      return res
        .status(200)
        .json({ message: "No history found for this document" })

    return res.status(200).json(documentHistory)
  } catch (err) {
    console.error(`Error: ${err}`)

    return res.status(500).json({ message: "Something went wrong" })
  }
}
