import { Router } from "express"
import {
  createDocumentController,
  deleteDocumentController,
  getDocumentHistoryController,
  getDocumentsController,
  getUniqueDocumentController,
  updateDocumentContentController,
  updateDocumentTitleController,
} from "../controllers/document.controller"

const router = Router()

router.post("/", createDocumentController)
router.get("/", getDocumentsController)
router.get("/:documentId", getUniqueDocumentController)
router.patch("/:documentId/content", updateDocumentContentController)
router.patch("/:documentId/title", updateDocumentTitleController)
router.get("/:documentId/history", getDocumentHistoryController)
router.delete("/:documentId", deleteDocumentController)

export default router
