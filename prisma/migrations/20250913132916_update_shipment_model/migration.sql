-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."ShipmentStatus" ADD VALUE 'PICKED_UP';
ALTER TYPE "public"."ShipmentStatus" ADD VALUE 'CANCELLED';

-- AlterTable
ALTER TABLE "public"."Shipment" ADD COLUMN     "etaEnd" TIMESTAMP(3),
ADD COLUMN     "etaStart" TIMESTAMP(3);
