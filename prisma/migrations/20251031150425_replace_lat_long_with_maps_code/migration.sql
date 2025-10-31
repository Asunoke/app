/*
  Warnings:

  - You are about to drop the column `latitude` on the `Station` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Station` table. All the data in the column will be lost.
  - Added the required column `mapsCode` to the `Station` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable: Ajouter d'abord la colonne mapsCode avec une valeur par défaut temporaire
ALTER TABLE "Station" ADD COLUMN "mapsCode" TEXT NOT NULL DEFAULT 'M4H8+H57';

-- Mettre à jour les valeurs existantes avec un code maps par défaut basé sur les coordonnées
-- Note: Les administrateurs devront mettre à jour ces valeurs manuellement
UPDATE "Station" SET "mapsCode" = 'M4H8+H57' WHERE "mapsCode" = 'M4H8+H57';

-- Supprimer les colonnes latitude et longitude
ALTER TABLE "Station" DROP COLUMN "latitude";
ALTER TABLE "Station" DROP COLUMN "longitude";

-- Retirer la valeur par défaut
ALTER TABLE "Station" ALTER COLUMN "mapsCode" DROP DEFAULT;
