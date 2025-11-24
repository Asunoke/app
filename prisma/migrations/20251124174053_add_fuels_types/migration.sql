-- AlterTable
ALTER TABLE "Station" ADD COLUMN     "fuels" TEXT[] DEFAULT ARRAY[]::TEXT[];
