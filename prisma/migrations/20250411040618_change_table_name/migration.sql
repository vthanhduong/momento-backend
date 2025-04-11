/*
  Warnings:

  - You are about to drop the `FriendRelationships` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Moments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `FriendRelationships` DROP FOREIGN KEY `FriendRelationships_friendId_fkey`;

-- DropForeignKey
ALTER TABLE `FriendRelationships` DROP FOREIGN KEY `FriendRelationships_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Moments` DROP FOREIGN KEY `Moments_userId_fkey`;

-- DropTable
DROP TABLE `FriendRelationships`;

-- DropTable
DROP TABLE `Moments`;

-- DropTable
DROP TABLE `Users`;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `nickname` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Moment` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FriendRelationship` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `friendId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Moment` ADD CONSTRAINT `Moment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FriendRelationship` ADD CONSTRAINT `FriendRelationship_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FriendRelationship` ADD CONSTRAINT `FriendRelationship_friendId_fkey` FOREIGN KEY (`friendId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
