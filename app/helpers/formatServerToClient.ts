import { Driver as PrismaDriver } from '@prisma/client';
import { Driver } from '../types';

// Define base type for entities with dates
interface WithDates {
    createdAt: Date;
    updatedAt: Date;
}

// Generic type that ensures input has dates
export const formatServerToClient = <T extends WithDates>(serverData: T) => ({
    ...serverData,
    createdAt: serverData.createdAt.toISOString(),
    updatedAt: serverData.updatedAt.toISOString(),
});

// Helper for formatting arrays
export const formatArrayServerToClient = <T extends WithDates>(serverData: T[]) => serverData.map(formatServerToClient);
