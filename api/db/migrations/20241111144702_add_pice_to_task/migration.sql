-- AlterTable
ALTER TABLE "task" ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "task_history" ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;
