/*
  Warnings:

  - Added the required column `isInvitation` to the `FriendRelationship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FriendRelationship` ADD COLUMN `isInvitation` TINYINT NOT NULL;
