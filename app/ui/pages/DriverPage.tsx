'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import Breadcrumb from '@/app/ui/common/Breadcrumb';
import ButtonAction from '@/app/ui/buttons/ButtonAction';
import ButtonInput from '@/app/ui/buttons/ButtonInput';
import AddDriverModal from '../modals/AddDriverModal';
import DriverTable from '../DriverTable';
import DriverCard from '../DriverCard';
import clsx from 'clsx';
import { FilterIcon, Grid2X2, PlusIcon } from 'lucide-react';
import { Bars3Icon, CheckIcon, MagnifyingGlassIcon, UsersIcon } from '@heroicons/react/24/outline';
import { wrapper } from '@/app/styles/classes';
import { useDrivers } from '@/app/context/DriverContext';
import { useDriverStats } from '@/app/hooks/driverHooks/useDriverStats';
import { useDriverFilters } from '@/app/hooks/driverHooks/useDriverFilters';
import { StatsCard } from '../dashboard/StatsCard';

function DriverPage() {
    const { drivers } = useDrivers();
    const stats = useDriverStats(drivers);
    const { searchTerm, setSearchTerm, sortBy, setSortBy, filterBy, setFilterBy, sortedDrivers } =
        useDriverFilters(drivers);

    const [displayType, setDisplayType] = useState<'grid' | 'list'>('list');
    const [showAddDriverModal, setShowAddDriverModal] = useState(false);
    const [showSortFilter, setShowSortFilter] = useState(false);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    useEffect(() => {
        console.log('Drivers: ', drivers);
    }, [drivers]);

    return (
        <>
            {/* Header */}
            <div className="h-40 mb-3 grid grid-cols-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
                {/* Breadcrumb */}
                <Breadcrumb
                    preList={[
                        { name: 'Dashboard', link: '/dashboard' },
                        { name: 'Shipments', link: '/dashboard/shipments' },
                    ]}
                    current="Drivers"
                />

                <div className="flex flex-col p-5 justify-end items-end">
                    <div className="flex gap-3">
                        <StatsCard title="Total Drivers" count={stats.total} />
                        <StatsCard title="Busy" count={stats.busy} color="amber-500" />
                        <StatsCard title="Free" count={stats.free} color="green-500" />
                        <StatsCard title="Offline" count={stats.offline} color="red-500" />
                    </div>
                </div>
            </div>

            {/* Main */}
            <main className="flex flex-col px-3 relative">
                {/* NavBar */}
                <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center gap-2">
                        <div className="flex justify-center items-center gap-2 bg-gray-100 rounded-xl space-y px-3">
                            <button
                                onClick={() => setDisplayType('grid')}
                                className={clsx(
                                    'cursor-pointer my-1 hover:bg-white hover:border hover:border-gray-400 text-gray-600 font-semibold rounded-xl p-2',
                                    displayType === 'grid' ? 'border border-gray-400 bg-white' : '',
                                )}
                            >
                                <Grid2X2 className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setDisplayType('list')}
                                className={clsx(
                                    'cursor-pointer my-1 hover:bg-white hover:border hover:border-gray-400 text-gray-600 font-semibold rounded-xl p-2',
                                    displayType === 'list' ? 'border border-gray-400 bg-white' : '',
                                )}
                            >
                                <Bars3Icon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        {/* Search */}
                        <ButtonInput
                            Icon={MagnifyingGlassIcon}
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeHolder="Tìm kiếm..."
                        />
                        {/* Filter */}
                        <div className="relative">
                            <ButtonAction
                                Icon={FilterIcon}
                                label="Sort & Filter"
                                variant="outlineDark"
                                onClick={() => setShowSortFilter(!showSortFilter)}
                            />
                            {showSortFilter && (
                                <div
                                    className={clsx(
                                        'absolute top-12 right-0 bg-white border border-gray-300 p-3 z-10 flex flex-col gap-2',
                                        wrapper,
                                    )}
                                >
                                    <h1 className="mb-2 font-semibold">Sort By</h1>
                                    <div className="flex gap-2 items-center">
                                        <ButtonAction
                                            Icon={CheckIcon}
                                            label="name"
                                            variant={sortBy === 'name' ? 'outlineSuccess' : 'secondary'}
                                            onClick={() => setSortBy('name')}
                                        />
                                        <ButtonAction
                                            Icon={CheckIcon}
                                            label="badge"
                                            variant={sortBy === 'badge' ? 'outlineSuccess' : 'secondary'}
                                            onClick={() => setSortBy('badge')}
                                        />
                                        <ButtonAction label="clear" variant="textDark" onClick={() => setSortBy('')} />
                                    </div>

                                    <h1 className="mb-2 font-semibold">Filter By</h1>
                                    <div className="flex gap-2 items-center">
                                        {['name', 'phone', 'badge'].map((field) => (
                                            <ButtonAction
                                                key={field}
                                                Icon={CheckIcon}
                                                label={field.charAt(0).toUpperCase() + field.slice(1)}
                                                variant={
                                                    filterBy.includes(field as any) ? 'outlineSuccess' : 'secondary'
                                                }
                                                onClick={() =>
                                                    setFilterBy((prev) =>
                                                        prev.includes(field as any)
                                                            ? prev.filter((f) => f !== field)
                                                            : [...prev, field as any],
                                                    )
                                                }
                                            />
                                        ))}
                                        <ButtonAction
                                            label="clear"
                                            variant="textDark"
                                            onClick={() => setFilterBy([])}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Add New */}
                        <ButtonAction
                            Icon={PlusIcon}
                            label="Add New"
                            variant="mainColor"
                            onClick={() => setShowAddDriverModal(true)}
                        />
                    </div>
                </div>

                {/* Content */}
                <div
                    className={clsx(
                        `gap-3 mt-3`,
                        displayType === 'grid'
                            ? 'grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'
                            : 'flex flex-col',
                    )}
                >
                    {displayType === 'grid' ? (
                        sortedDrivers.map((driver) => <DriverCard key={driver.id} driver={driver} />)
                    ) : (
                        <DriverTable drivers={sortedDrivers} filterBy={filterBy} />
                    )}
                </div>

                {/* Add Driver Modal */}
                {showAddDriverModal && (
                    <AddDriverModal isModalOpen={showAddDriverModal} onClose={() => setShowAddDriverModal(false)} />
                )}
            </main>
        </>
    );
}

export default DriverPage;
