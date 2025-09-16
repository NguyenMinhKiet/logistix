import { Driver, EDriverStatus } from '@/app/types';
import { useEffect, useState } from 'react';

export const useDriverStats = (drivers: Driver[]) => {
    const [stats, setStats] = useState({
        total: 0,
        busy: 0,
        free: 0,
        offline: 0,
    });

    useEffect(() => {
        setStats({
            total: drivers.length,
            busy: drivers.filter((driver) => driver.badge === EDriverStatus.BUSY).length,
            free: drivers.filter((driver) => driver.badge === EDriverStatus.FREE).length,
            offline: drivers.filter((driver) => driver.badge === EDriverStatus.OFFLINE).length,
        });
    }, [drivers]);

    return stats;
};
