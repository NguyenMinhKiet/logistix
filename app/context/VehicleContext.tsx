'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Vehicle } from '../types';
import { vehicleApi } from '../lib/clientActions/vehicleActions';

interface VehicleContextType {
    vehicles: Vehicle[];
    isLoading: boolean;
    error: string | null;
    refreshVehicles: () => Promise<void>;
    addVehicle: (vehicle: Vehicle) => Promise<void>;
    updateVehicle: (vehicle: Vehicle) => Promise<void>;
    deleteVehicle: (id: string) => Promise<void>;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const VehicleProvider = ({ children, initialVehicles }: { children: ReactNode; initialVehicles: Vehicle[] }) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refreshVehicles = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await vehicleApi.getVehicles();
            setVehicles(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addVehicle = useCallback(async (vehicle: Vehicle) => {
        try {
            setIsLoading(true);
            setError(null);
            await vehicleApi.addVehicle(vehicle);
            setVehicles((prev) => [vehicle, ...prev]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Không thể thêm xe');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateVehicle = useCallback(async (vehicle: Vehicle) => {
        try {
            setIsLoading(true);
            setError(null);
            await vehicleApi.updateVehicle(vehicle);
            setVehicles((prev) => prev.map((v) => (v.id === vehicle.id ? vehicle : v)));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Không thể cập nhật xe');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteVehicle = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            setError(null);
            await vehicleApi.deleteVehicle(id);
            setVehicles((prev) => prev.filter((v) => v.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Không thể xóa xe');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const value = {
        vehicles,
        isLoading,
        error,
        refreshVehicles,
        addVehicle,
        updateVehicle,
        deleteVehicle,
    };

    return <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>;
};

export const useVehicles = () => {
    const context = useContext(VehicleContext);
    if (!context) {
        throw new Error('useVehicles must be used within VehicleProvider');
    }
    return context;
};
