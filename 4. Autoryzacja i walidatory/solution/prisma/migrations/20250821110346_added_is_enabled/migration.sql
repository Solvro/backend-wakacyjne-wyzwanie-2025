/*
  Warnings:

  - Added the required column `isEnabled` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Participant" ADD COLUMN     "isEnabled" BOOLEAN NOT NULL;
