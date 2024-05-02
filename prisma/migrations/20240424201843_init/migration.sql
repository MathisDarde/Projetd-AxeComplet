/*
  Warnings:

  - You are about to drop the column `cardId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_cardId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `cardId`;

-- CreateTable
CREATE TABLE `_CardUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CardUser_AB_unique`(`A`, `B`),
    INDEX `_CardUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CardUser` ADD CONSTRAINT `_CardUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Card`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CardUser` ADD CONSTRAINT `_CardUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
