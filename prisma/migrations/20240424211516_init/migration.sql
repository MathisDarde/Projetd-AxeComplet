-- CreateTable
CREATE TABLE `CardUser` (
    `userId` INTEGER NOT NULL,
    `cardId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `cardId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CardUser` ADD CONSTRAINT `CardUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CardUser` ADD CONSTRAINT `CardUser_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `Card`(`card_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
