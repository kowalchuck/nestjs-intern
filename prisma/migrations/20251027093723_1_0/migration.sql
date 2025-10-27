-- DropForeignKey
ALTER TABLE "public"."Item" DROP CONSTRAINT "Item_categoryName_fkey";

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "categoryName" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE SET NULL ON UPDATE CASCADE;
