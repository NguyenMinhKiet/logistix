import { Driver } from '@/app/types';
import { ApiResponse } from '@/app/types';

const BASE_URL = 'http://localhost:3000';
export const driverApi = {
    getDrivers: async (): Promise<ApiResponse<Driver[]>> => {
        try {
            const response = await fetch('/api/drivers');
            const data = await response.json();
            return {
                success: true,
                data: data as Driver[],
            };
        } catch (error) {
            return {
                success: false,
                error: 'Không thể tải danh sách tài xế',
            };
        }
    },

    addDriver: async (driver: Omit<Driver, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Driver>> => {
        try {
            const response = await fetch(`${BASE_URL}/api/drivers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(driver),
            });
            const data = await response.json();
            return {
                success: true,
                data: data as Driver,
            };
        } catch (error) {
            return {
                success: false,
                error: 'Không thể thêm tài xế',
            };
        }
    },

    updateDriver: async (driver: Partial<Driver>): Promise<ApiResponse<Driver>> => {
        try {
            const response = await fetch(`/api/drivers/${driver.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(driver),
            });
            const data = await response.json();
            return {
                success: true,
                data: data as Driver,
            };
        } catch (error) {
            return {
                success: false,
                error: 'Không thể cập nhật tài xế',
            };
        }
    },

    deleteDriver: async (id: string): Promise<ApiResponse<void>> => {
        try {
            await fetch(`/api/drivers/${id}`, {
                method: 'DELETE',
            });
            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                error: 'Không thể xóa tài xế',
            };
        }
    },
};
