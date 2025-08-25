/*
  Warnings:

  - You are about to drop the column `aboutMe` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `isEnabled` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Participant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Participant" DROP COLUMN "aboutMe",
DROP COLUMN "isEnabled",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "role";

-- CreateTable
CREATE TABLE "public"."User" (
    "email" TEXT NOT NULL,
    "aboutMe" TEXT,
    "password" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "isEnabled" BOOLEAN NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- AddForeignKey
ALTER TABLE "public"."Participant" ADD CONSTRAINT "Participant_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
