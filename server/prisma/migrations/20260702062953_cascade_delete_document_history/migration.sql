-- DropForeignKey
ALTER TABLE "DocumentHistory" DROP CONSTRAINT "DocumentHistory_documentId_fkey";

-- AddForeignKey
ALTER TABLE "DocumentHistory" ADD CONSTRAINT "DocumentHistory_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
