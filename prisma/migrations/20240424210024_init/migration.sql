/*
  Warnings:

  - The primary key for the `card` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `card` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - Added the required column `card_id` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_carduser` DROP FOREIGN KEY `_CardUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_carduser` DROP FOREIGN KEY `_CardUser_B_fkey`;

-- AlterTable
ALTER TABLE `card` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `card_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`card_id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`user_id`);

-- AddForeignKey
ALTER TABLE `_CardUser` ADD CONSTRAINT `_CardUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Card`(`card_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CardUser` ADD CONSTRAINT `_CardUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
