import { updateDocumentContent } from "../services/document.service"

const debounceTimers = new Map<string, NodeJS.Timeout>()

export const scheduleDocumentSave = (documentId: string, content: string) => {
  const existingTimer = debounceTimers.get(documentId)

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
      debounceTimers.delete(documentId)
    }
  }, 500)

  debounceTimers.set(documentId, timer)
}
