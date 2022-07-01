-- CreateTable
CREATE TABLE `SendMessagesOrbcomm` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sendMessageId` INTEGER NOT NULL,
    `deviceId` VARCHAR(191) NOT NULL,
    `fwrdMessageId` BIGINT NOT NULL,
    `statusOrbcomm` ENUM('SUBMITTED', 'RECEIVED', 'ERROR', 'DELIVERY_FAILED', 'TIMEOUT', 'CANCELLED', 'WAITING', 'INVALID', 'TRANSMITTED') NULL,
    `errorId` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SendMessagesOrbcomm_sendMessageId_key`(`sendMessageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SendMessagesOrbcomm` ADD CONSTRAINT `SendMessagesOrbcomm_sendMessageId_fkey` FOREIGN KEY (`sendMessageId`) REFERENCES `SendMessages`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
