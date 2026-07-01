"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentHistoryController = exports.updateDocumentTitleController = exports.updateDocumentContentController = exports.getUniqueDocumentController = exports.getDocumentsController = exports.createDocumentController = void 0;
const document_service_1 = require("../services/document.service");
const createDocumentController = async (req, res) => {
    try {
        const { title } = req.body;
        const document = await (0, document_service_1.createDocument)(title);
        return res.status(201).json(document);
    }
    catch (err) {
        console.error(`Error: ${err}`);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
exports.createDocumentController = createDocumentController;
const getDocumentsController = async (req, res) => {
    try {
        const documents = await (0, document_service_1.getDocuments)();
        return res.status(200).json(documents);
    }
    catch (err) {
        console.error(`Error: ${err}`);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
exports.getDocumentsController = getDocumentsController;
const getUniqueDocumentController = async (req, res) => {
    try {
        const { documentId } = req.params;
        if (!documentId) {
            return res.status(404).json({ message: "No ID was provided" });
        }
        const document = await (0, document_service_1.getDocument)(documentId);
        return res.status(200).json(document);
    }
    catch (err) {
        console.error(`Error: ${err}`);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
exports.getUniqueDocumentController = getUniqueDocumentController;
const updateDocumentContentController = async (req, res) => {
    try {
        const { documentId } = req.params;
        const { content } = req.body;
        if (!documentId)
            return res.status(404).json({ message: "No ID was provided" });
        const doc = await (0, document_service_1.updateDocumentContent)(documentId, content);
        return res.status(201).json(doc);
    }
    catch (err) {
        console.error(`Error: ${err}`);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
exports.updateDocumentContentController = updateDocumentContentController;
const updateDocumentTitleController = async (req, res) => {
    try {
        const { documentId } = req.params;
        const { title } = req.body;
        if (!documentId)
            return res.status(404).json({ message: "No ID was provided" });
        const doc = await (0, document_service_1.updateDocumentTitle)(documentId, title);
        return res.status(201).json(doc);
    }
    catch (err) {
        console.error(`Error: ${err}`);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
exports.updateDocumentTitleController = updateDocumentTitleController;
const getDocumentHistoryController = async (req, res) => {
    try {
        const { documentId } = req.params;
        if (!documentId)
            return res.status(404).json({ message: "No ID was provided" });
        const documentHistory = await (0, document_service_1.getDocumentHistory)(documentId);
        if (!documentHistory.length)
            return res
                .status(200)
                .json({ message: "No history found for this document" });
        return res.status(200).json(documentHistory);
    }
    catch (err) {
        console.error(`Error: ${err}`);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
exports.getDocumentHistoryController = getDocumentHistoryController;
