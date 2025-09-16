/*
  Warnings:

  - The `badge` column on the `Driver` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `ProductInstance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Shipment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `method` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."ERole" AS ENUM ('ADMIN', 'MANAGER', 'STAFF', 'USER');

-- CreateEnum
CREATE TYPE "public"."ETransactionType" AS ENUM ('IMPORT', 'EXPORT', 'TRANSFER');

-- CreateEnum
CREATE TYPE "public"."EInstanceStatus" AS ENUM ('IN_STOCK', 'TRANSFERRED', 'SOLD', 'RETURNED');

-- CreateEnum
CREATE TYPE "public"."EOrderStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "public"."EPaymentMethod" AS ENUM ('CASH', 'BANK_TRANSFER', 'CREDIT_CARD');

-- CreateEnum
CREATE TYPE "public"."EShipmentStatus" AS ENUM ('PENDING', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED', 'RETURNED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."EDriverStatus" AS ENUM ('BUSY', 'FREE', 'OFFLINE');

-- AlterTable
ALTER TABLE "public"."Driver" DROP COLUMN "badge",
ADD COLUMN     "badge" "public"."EDriverStatus" NOT NULL DEFAULT 'FREE';

-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "status",
ADD COLUMN     "status" "public"."EOrderStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "public"."Payment" DROP COLUMN "method",
ADD COLUMN     "method" "public"."EPaymentMethod" NOT NULL;

-- AlterTable
ALTER TABLE "public"."ProductInstance" DROP COLUMN "status",
ADD COLUMN     "status" "public"."EInstanceStatus" NOT NULL DEFAULT 'IN_STOCK';

-- AlterTable
ALTER TABLE "public"."Shipment" DROP COLUMN "status",
ADD COLUMN     "status" "public"."EShipmentStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "public"."Transaction" DROP COLUMN "type",
ADD COLUMN     "type" "public"."ETransactionType" NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "role",
ADD COLUMN     "role" "public"."ERole" NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "public"."DriverBadge";

-- DropEnum
DROP TYPE "public"."InstanceStatus";

-- DropEnum
DROP TYPE "public"."OrderStatus";

-- DropEnum
DROP TYPE "public"."PaymentMethod";

-- DropEnum
DROP TYPE "public"."Role";

-- DropEnum
DROP TYPE "public"."ShipmentStatus";

-- DropEnum
DROP TYPE "public"."TransactionType";
