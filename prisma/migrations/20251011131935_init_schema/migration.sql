/*
  Warnings:

  - Added the required column `type` to the `Technology` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TechnologyType" AS ENUM ('CoreWeb', 'Backend', 'Database', 'ToolsInfra', 'UIDesign', 'MachineLearning', 'GameDev', 'Cloud', 'AI', 'Language', 'Others', 'SoftSkills', 'Testing');

-- AlterTable
ALTER TABLE "Technology" ADD COLUMN     "type" "TechnologyType" NOT NULL;
