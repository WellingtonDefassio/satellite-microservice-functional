-- AddForeignKey
ALTER TABLE `SendMessagesOrbcomm` ADD CONSTRAINT `SendMessagesOrbcomm_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `Devices`(`deviceId`) ON DELETE RESTRICT ON UPDATE CASCADE;
