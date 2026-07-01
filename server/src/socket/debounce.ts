import {
  updateDocumentContent,
  updateDocumentTitle,
} from "../services/document.service"

const contentDebounceTimers = new Map<string, NodeJS.Timeout>()
const titleDebounceTimers = new Map<string, NodeJS.Timeout>()

export const scheduleDocumentSave = (documentId: string, content: string) => {
  const existingTimer = contentDebounceTimers.get(documentId)

  if (existingTimer) {
    clearTimeout(existingTimer)
  }

  const timer = setTimeout(async () => {
    try {
      console.log(`Saving ${documentId}`)

      await updateDocumentContent(documentId, content)

      console.log(`Saved: ${documentId}}`)
    } catch (err) {
      console.error(`Error: ${err}`)
    } finally {
      contentDebounceTimers.delete(documentId)
    }
  }, 1000)

  contentDebounceTimers.set(documentId, timer)
}

export const scheduleDocumentTitleSave = (
  documentId: string,
  title: string,
) => {
  const existingTimer = titleDebounceTimers.get(documentId)

  if (existingTimer) {
    clearTimeout(existingTimer)
  }

  const timer = setTimeout(async () => {
    try {
      console.log(`Saving ${documentId}`)

      await updateDocumentTitle(documentId, title)

      console.log(`Saved: ${documentId}}`)
    } catch (err) {
      console.error(`Error: ${err}`)
    } finally {
      titleDebounceTimers.delete(documentId)
    }
  }, 1000)

  titleDebounceTimers.set(documentId, timer)
}
