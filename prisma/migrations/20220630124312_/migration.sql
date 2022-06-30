/*
  Warnings:

  - You are about to drop the column `device_id` on the `devicegateway` table. All the data in the column will be lost.
  - You are about to drop the column `device_id` on the `devices` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[deviceId]` on the table `Devices` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deviceId` to the `DeviceGateway` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceId` to the `Devices` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Devices_device_id_key` ON `devices`;

-- AlterTable
ALTER TABLE `devicegateway` DROP COLUMN `device_id`,
    ADD COLUMN `deviceId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `devices` DROP COLUMN `device_id`,
    ADD COLUMN `deviceId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Devices_deviceId_key` ON `Devices`(`deviceId`);
