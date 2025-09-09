'use client';
// DriverContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Driver } from '@/app/types';
import { getDrivers } from '../lib/actions/driverActions';

interface DriverContextType {
    drivers: Driver[];
    setDrivers: (drivers: Driver[]) => void;
    addDriver: (driver: Driver) => Promise<void>;
    refreshDrivers: () => void;
}

const DriverContext = createContext<DriverContextType | undefined>(undefined);

export const DriverProvider = ({ children }: { children: ReactNode }) => {
    const [drivers, setDrivers] = useState<Driver[]>([]);

    const refreshDrivers = async () => {
        const res = await getDrivers();
        setDrivers(res);
    };
    useEffect(() => {
        refreshDrivers();
    }, []);

    const addDriver = async (driver: Driver) => {
        setDrivers((prev) => [driver, ...prev]); // tạo array mới
        console.log('drivers: ', drivers.length);
    };

    return (
        <DriverContext.Provider value={{ drivers, refreshDrivers, setDrivers, addDriver }}>
            {children}
        </DriverContext.Provider>
    );
};

export const useDrivers = () => {
    const context = useContext(DriverContext);
    if (!context) throw new Error('useDrivers must be used inside DriverProvider');
    return context;
};
