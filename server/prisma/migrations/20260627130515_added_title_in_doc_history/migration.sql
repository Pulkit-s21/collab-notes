-- AlterTable
ALTER TABLE "DocumentHistory" ADD COLUMN     "title" TEXT,
ALTER COLUMN "content" DROP NOT NULL;
