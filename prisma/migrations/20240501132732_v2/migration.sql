/*
  Warnings:

  - You are about to drop the column `number` on the `card` table. All the data in the column will be lost.
  - Added the required column `fav` to the `CardUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `card` DROP COLUMN `number`,
    ADD COLUMN `actor` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `carduser` ADD COLUMN `fav` BOOLEAN NOT NULL;
