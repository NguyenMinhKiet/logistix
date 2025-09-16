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
import { DriverBadge } from '@prisma/client';
import { useDrivers } from '@/app/context/DriverContext';

function CarPage() {
    const { drivers } = useDrivers();

    const [searchBtn, setSearchBtn] = useState('');
    const [displayType, setDisplayType] = useState<'grid' | 'list'>('list');

    const [showAddDriverModal, setShowAddDriverModal] = useState(false);
    const [showSortFilter, setShowSortFilter] = useState(false);

    const [sortBy, setSortBy] = useState<'name' | 'badge' | ''>('name');
    const [filterBy, setFilterBy] = useState<('name' | 'phone' | 'badge')[]>(['name', 'phone', 'badge']);

    const [countFreeDriver, setCountFreeDriver] = useState(0);
    const [countBusyDriver, setCountBusyDriver] = useState(0);
    const [countTotalDriver, setCountTotalDriver] = useState(0);
    const [countOfflineDriver, setCountOfflineDriver] = useState(0);

    useEffect(() => {
        setCountTotalDriver(drivers.length);
        setCountBusyDriver(drivers.filter((driver) => driver.badge === DriverBadge.BUSY).length);
        setCountFreeDriver(drivers.filter((driver) => driver.badge === DriverBadge.FREE).length);
        setCountOfflineDriver(drivers.filter((driver) => driver.badge === DriverBadge.OFFLINE).length);
    }, [drivers]);

    // Filter + Search
    const filteredDrivers = drivers.filter((driver) => {
        const searchLower = searchBtn.toLowerCase();
        return driver.name.toLowerCase().includes(searchLower) || driver.phone.toLowerCase().includes(searchLower);
    });

    // Sort
    const sortedDrivers = [...filteredDrivers].sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'badge') return a.badge.localeCompare(b.badge);
        return 0;
    });

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchBtn(e.target.value);
    };
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
                        {/* Total Drivers */}
                        <div className="flex flex-col shadow-md rounded-xl p-2 px-3 w-52 bg-white/50 text-black">
                            <h1 className="text-gray-700">Total Drivers</h1>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-xl">{countTotalDriver}</span>
                                <div className="flex items-center justify-center rounded-full border border-white p-2 bg-white">
                                    <UsersIcon className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                        {/* Busy */}
                        <div className="flex flex-col shadow-md rounded-xl p-2 px-3 w-52 bg-white/50 text-black">
                            <h1 className="text-gray-700">Busy</h1>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-xl">{countBusyDriver}</span>
                                <div className="flex items-center justify-center rounded-full border border-white p-2 bg-white">
                                    <UsersIcon className="w-5 h-5 text-amber-500" />
                                </div>
                            </div>
                        </div>
                        {/* Free */}
                        <div className="flex flex-col shadow-md rounded-xl p-2 px-3 w-52 bg-white/50 text-black">
                            <h1 className="text-gray-700">Free</h1>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-xl">{countFreeDriver}</span>
                                <div className="flex items-center justify-center rounded-full border border-white p-2 bg-white">
                                    <UsersIcon className="w-5 h-5 text-green-500" />
                                </div>
                            </div>
                        </div>
                        {/* Offline */}
                        <div className="flex flex-col shadow-md rounded-xl p-2 px-3 w-52 bg-white/50 text-black">
                            <h1 className="text-gray-700">Offline</h1>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-xl">{countOfflineDriver}</span>
                                <div className="flex items-center justify-center rounded-full border border-white p-2 bg-white">
                                    <UsersIcon className="w-5 h-5 text-red-500" />
                                </div>
                            </div>
                        </div>
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
                            value={searchBtn}
                            onChange={handleSearch}
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

export default CarPage;
