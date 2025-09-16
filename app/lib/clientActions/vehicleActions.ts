import { Vehicle } from '@/app/types';

export const vehicleApi = {
    getVehicles: async () => {
        const response = await fetch('/api/vehicles');
        return response.json();
    },

    addVehicle: async (vehicle: Vehicle) => {
        const response = await fetch('/api/vehicles', {
            method: 'POST',
            body: JSON.stringify(vehicle),
        });
        return response.json();
    },

    updateVehicle: async (vehicle: Vehicle) => {
        const response = await fetch(`/api/vehicles/${vehicle.id}`, {
            method: 'PUT',
            body: JSON.stringify(vehicle),
        });
        return response.json();
    },

    deleteVehicle: async (id: string) => {
        await fetch(`/api/vehicles/${id}`, {
            method: 'DELETE',
        });
    },
};
