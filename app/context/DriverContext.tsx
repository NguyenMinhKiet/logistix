'use client';
// DriverContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { deleteDriver, getDrivers } from '../lib/actions/driverActions';
import { Driver } from '@prisma/client';

interface DriverContextType {
    drivers: Driver[];
    setDrivers: (drivers: Driver[]) => void;
    addDriverContext: (driver: Driver) => Promise<void>;
    editDriverContext: (driver: Driver) => Promise<void>;
    deleteDriverContext: (id: string) => Promise<void>;
    refreshDrivers: () => void;
}

const DriverContext = createContext<DriverContextType | undefined>(undefined);

export const DriverProvider = ({ children }: { children: ReactNode }) => {
    const [drivers, setDrivers] = useState<Driver[]>([]);

    // Reset Data
    const refreshDrivers = async () => {
        const res = await getDrivers();
        setDrivers(res);
    };

    useEffect(() => {
        refreshDrivers();
    }, []);

    // Add Driver
    const addDriverContext = async (driver: Driver) => {
        setDrivers((prev) => [driver, ...prev]);
    };

    // Update Driver
    const editDriverContext = async (driver: Driver) => {
        setDrivers((prev) => prev.map((d) => (d.id === driver.id ? driver : d)));
    };

    // Delete Driver
    const deleteDriverContext = async (id: string) => {
        setDrivers((prev) => prev.filter((driver) => driver.id !== id));
        await deleteDriver(id);
    };

    return (
        <DriverContext.Provider
            value={{ drivers, refreshDrivers, setDrivers, addDriverContext, editDriverContext, deleteDriverContext }}
        >
            {children}
        </DriverContext.Provider>
    );
};

export const useDrivers = () => {
    const context = useContext(DriverContext);
    if (!context) throw new Error('useDrivers must be used inside DriverProvider');
    return context;
};
