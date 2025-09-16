'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Driver } from '@/app/types';

interface DriverContextType {
    drivers: Driver[];
    isLoading: boolean;
    error: string | null;
    refreshDrivers: (newDrivers: Driver[]) => void;
    addDriver: (driver: Driver) => void;
    updateDriver: (driver: Driver) => void;
    deleteDriver: (id: string) => void;
}

const DriverContext = createContext<DriverContextType | undefined>(undefined);

interface DriverProviderProps {
    children: ReactNode;
    initialDrivers: Driver[];
}

export const DriverProvider = ({ children, initialDrivers }: DriverProviderProps) => {
    const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
    const [isLoading] = useState(false); // giữ structure cho đồng bộ
    const [error] = useState<string | null>(null);

    // chỉ nhận dữ liệu mới từ ngoài (API/Server action) và set vào state
    const refreshDrivers = useCallback((newDrivers: Driver[]) => {
        setDrivers(newDrivers);
    }, []);

    const addDriver = useCallback((driver: Driver) => {
        setDrivers((prev) => [driver, ...prev]);
    }, []);

    const updateDriver = useCallback((driver: Driver) => {
        setDrivers((prev) => prev.map((d) => (d.id === driver.id ? driver : d)));
    }, []);

    const deleteDriver = useCallback((id: string) => {
        setDrivers((prev) => prev.filter((driver) => driver.id !== id));
    }, []);

    const value = {
        drivers,
        isLoading,
        error,
        refreshDrivers,
        addDriver,
        updateDriver,
        deleteDriver,
    };

    return <DriverContext.Provider value={value}>{children}</DriverContext.Provider>;
};

export const useDrivers = () => {
    const context = useContext(DriverContext);
    if (!context) {
        throw new Error('useDrivers must be used within DriverProvider');
    }
    return context;
};
