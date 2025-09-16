import { useState, useMemo } from 'react';
import { Driver } from '@/app/types';

export const useDriverFilters = (drivers: Driver[]) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'badge' | ''>('name');
    const [filterBy, setFilterBy] = useState<('name' | 'phone' | 'badge')[]>(['name', 'phone', 'badge']);

    const filteredDrivers = useMemo(() => {
        if (!drivers) return [];
        return drivers.filter((driver) => {
            const searchLower = searchTerm.toLowerCase();
            return driver.name.toLowerCase().includes(searchLower) || driver.phone.toLowerCase().includes(searchLower);
        });
    }, [drivers, searchTerm]);

    const sortedDrivers = useMemo(() => {
        return [...filteredDrivers].sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'badge') return a.badge.localeCompare(b.badge);
            return 0;
        });
    }, [filteredDrivers, sortBy]);

    return {
        searchTerm,
        setSearchTerm,
        sortBy,
        setSortBy,
        filterBy,
        setFilterBy,
        sortedDrivers,
    };
};
