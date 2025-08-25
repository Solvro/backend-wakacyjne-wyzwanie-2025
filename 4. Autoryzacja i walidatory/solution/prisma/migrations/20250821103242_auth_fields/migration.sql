/*
  Warnings:

  - Added the required column `aboutMe` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Participant" ADD COLUMN     "aboutMe" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;
