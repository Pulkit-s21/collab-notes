import { prisma } from "../lib/prisma"

export const createDocument = async (title: string) => {
  return prisma.document.create({
    data: {
      title,
      content: "",
    },
  })
}

export const getDocuments = async () => {
  return prisma.document.findMany({
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export const getDocument = async (documentId: string) => {
  return prisma.document.findUnique({
    where: { id: documentId },
  })
}

export const updateDocumentContent = async (
  documentId: string,
  content: string,
) => {
  return prisma.$transaction(async (tx) => {
    // 1: Find doc
    const document = await tx.document.findUnique({
      where: { id: documentId },
    })

    // 2: Doc not found
    if (!document) {
      throw new Error("Document not found")
    }

    // 3: Save Doc version in DocHistory
    await tx.documentHistory.create({
      data: {
        documentId,
        title: document.title,
        content: document.content,
        version: document.version,
      },
    })

    // 4: Update doc
    const updatedDoc = await tx.document.update({
      where: { id: documentId },
      data: { content: content, version: { increment: 1 } },
    })

    return updatedDoc
  })
}

export const updateDocumentTitle = async (
  documentId: string,
  title: string,
) => {
  return prisma.$transaction(async (tx) => {
    // 1: Find doc
    const document = await tx.document.findUnique({
      where: { id: documentId },
    })

    // 2: Doc not found
    if (!document) {
      throw new Error("Document not found")
    }

    // 3: Save Doc version in DocHistory
    await tx.documentHistory.create({
      data: {
        documentId,
        title: document.title,
        content: document.content,
        version: document.version,
      },
    })

    // 4: Update doc
    const updatedDoc = await tx.document.update({
      where: { id: documentId },
      data: { title: title, version: { increment: 1 } },
    })

    return updatedDoc
  })
}

export const getDocumentHistory = async (documnetId: string) => {
  return prisma.documentHistory.findMany({
    where: { documentId: documnetId },
    select: {
      id: true,
      title: true,
      content: true,
      version: true,
      createdAt: true,
    },
    orderBy: { version: "desc" },
  })
}
