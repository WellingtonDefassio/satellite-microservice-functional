/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `DeviceGateway` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `DeviceGateway_name_key` ON `DeviceGateway`(`name`);
