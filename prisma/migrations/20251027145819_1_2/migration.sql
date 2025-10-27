/*
  Warnings:

  - You are about to drop the column `followed` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "followed";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "customerId" INTEGER,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Default product name',
ALTER COLUMN "rating" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
