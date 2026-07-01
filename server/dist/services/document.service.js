"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentHistory = exports.updateDocumentTitle = exports.updateDocumentContent = exports.getDocument = exports.getDocuments = exports.createDocument = void 0;
const prisma_1 = require("../lib/prisma");
const createDocument = async (title) => {
    return prisma_1.prisma.document.create({
        data: {
            title,
            content: "",
        },
    });
};
exports.createDocument = createDocument;
const getDocuments = async () => {
    return prisma_1.prisma.document.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getDocuments = getDocuments;
const getDocument = async (documentId) => {
    return prisma_1.prisma.document.findUnique({
        where: { id: documentId },
    });
};
exports.getDocument = getDocument;
const updateDocumentContent = async (documentId, content) => {
    return prisma_1.prisma.$transaction(async (tx) => {
        // 1: Find doc
        const document = await tx.document.findUnique({
            where: { id: documentId },
        });
        // 2: Doc not found
        if (!document) {
            throw new Error("Document not found");
        }
        // 3: Save Doc version in DocHistory
        await tx.documentHistory.create({
            data: {
                documentId,
                title: document.title,
                content: document.content,
                version: document.version,
            },
        });
        // 4: Update doc
        const updatedDoc = await tx.document.update({
            where: { id: documentId },
            data: { content: content, version: { increment: 1 } },
        });
        return updatedDoc;
    });
};
exports.updateDocumentContent = updateDocumentContent;
const updateDocumentTitle = async (documentId, title) => {
    return prisma_1.prisma.$transaction(async (tx) => {
        // 1: Find doc
        const document = await tx.document.findUnique({
            where: { id: documentId },
        });
        // 2: Doc not found
        if (!document) {
            throw new Error("Document not found");
        }
        // 3: Save Doc version in DocHistory
        await tx.documentHistory.create({
            data: {
                documentId,
                title: document.title,
                content: document.content,
                version: document.version,
            },
        });
        // 4: Update doc
        const updatedDoc = await tx.document.update({
            where: { id: documentId },
            data: { title: title, version: { increment: 1 } },
        });
        return updatedDoc;
    });
};
exports.updateDocumentTitle = updateDocumentTitle;
const getDocumentHistory = async (documnetId) => {
    return prisma_1.prisma.documentHistory.findMany({
        where: { documentId: documnetId },
        select: {
            id: true,
            title: true,
            content: true,
            version: true,
            createdAt: true,
        },
        orderBy: { version: "desc" },
    });
};
exports.getDocumentHistory = getDocumentHistory;
