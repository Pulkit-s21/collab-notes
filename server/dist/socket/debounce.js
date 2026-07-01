"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleDocumentTitleSave = exports.scheduleDocumentSave = void 0;
const document_service_1 = require("../services/document.service");
const contentDebounceTimers = new Map();
const titleDebounceTimers = new Map();
const scheduleDocumentSave = (documentId, content) => {
    const existingTimer = contentDebounceTimers.get(documentId);
    if (existingTimer) {
        clearTimeout(existingTimer);
    }
    const timer = setTimeout(async () => {
        try {
            console.log(`Saving ${documentId}`);
            await (0, document_service_1.updateDocumentContent)(documentId, content);
            console.log(`Saved: ${documentId}}`);
        }
        catch (err) {
            console.error(`Error: ${err}`);
        }
        finally {
            contentDebounceTimers.delete(documentId);
        }
    }, 1000);
    contentDebounceTimers.set(documentId, timer);
};
exports.scheduleDocumentSave = scheduleDocumentSave;
const scheduleDocumentTitleSave = (documentId, title) => {
    const existingTimer = titleDebounceTimers.get(documentId);
    if (existingTimer) {
        clearTimeout(existingTimer);
    }
    const timer = setTimeout(async () => {
        try {
            console.log(`Saving ${documentId}`);
            await (0, document_service_1.updateDocumentTitle)(documentId, title);
            console.log(`Saved: ${documentId}}`);
        }
        catch (err) {
            console.error(`Error: ${err}`);
        }
        finally {
            titleDebounceTimers.delete(documentId);
        }
    }, 1000);
    titleDebounceTimers.set(documentId, timer);
};
exports.scheduleDocumentTitleSave = scheduleDocumentTitleSave;
