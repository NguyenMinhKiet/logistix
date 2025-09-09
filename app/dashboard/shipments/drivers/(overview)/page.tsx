'use client';
import Breadcrumb from '@/app/ui/Breadcrumb';
import ButtonAction from '@/app/ui/buttons/ButtonAction';
import ButtonInput from '@/app/ui/buttons/ButtonInput';
import { Bars3Icon, CheckIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { FilterIcon, Grid2X2, UsersIcon } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import UserCard from '@/app/ui/UserCard';
import UserTable from '@/app/ui/DriverTable';
import { Driver } from '@/app/types';
import { wrapper } from '@/app/styles/classes';
import DriverModal from '@/app/ui/modals/DriverModal';
import { DriverBadge } from '@prisma/client';
import { useDrivers } from '@/app/context/DriverContext';

function Page() {
    const [searchBtn, setSearchBtn] = useState('');
    const [displayType, setDisplayType] = useState<'grid' | 'list'>('list');

    const { drivers } = useDrivers(); // luôn lấy từ context
    const [showAddDriverModal, setShowAddDriverModal] = useState(false);
    const [showSortFilter, setShowSortFilter] = useState(false);

    const [sortBy, setSortBy] = useState<'name' | 'badge' | ''>('name');
    const [filterBy, setFilterBy] = useState<('name' | 'phone' | 'badge')[]>(['name', 'phone', 'badge']);

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
                                <span className="font-semibold text-xl">{drivers.length}</span>
                                <div className="flex items-center justify-center rounded-full border border-white p-2 bg-white">
                                    <UsersIcon className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                        {/* Busy */}
                        <div className="flex flex-col shadow-md rounded-xl p-2 px-3 w-52 bg-white/50 text-black">
                            <h1 className="text-gray-700">Busy</h1>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-xl">
                                    {drivers.filter((driver) => driver.badge === DriverBadge.BUSY).length}
                                </span>
                                <div className="flex items-center justify-center rounded-full border border-white p-2 bg-white">
                                    <UsersIcon className="w-5 h-5 text-amber-500" />
                                </div>
                            </div>
                        </div>
                        {/* Free */}
                        <div className="flex flex-col shadow-md rounded-xl p-2 px-3 w-52 bg-white/50 text-black">
                            <h1 className="text-gray-700">Free</h1>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-xl">
                                    {drivers.filter((driver) => driver.badge === DriverBadge.FREE).length}
                                </span>
                                <div className="flex items-center justify-center rounded-full border border-white p-2 bg-white">
                                    <UsersIcon className="w-5 h-5 text-green-500" />
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
                        sortedDrivers.map((driver) => (
                            <UserCard
                                key={driver.id}
                                image={driver.imageUrl ?? '/nguyenminhkiet.JPG'}
                                name={driver.name}
                                phone={driver.phone}
                                badge={driver.badge}
                            />
                        ))
                    ) : (
                        <UserTable drivers={sortedDrivers} filterBy={filterBy} />
                    )}
                </div>

                {/* Add Driver Modal */}
                {showAddDriverModal && (
                    <div
                        className={clsx(
                            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 p-5 bg-white border',
                            wrapper,
                        )}
                    >
                        <DriverModal isModalOpen={showAddDriverModal} onClose={() => setShowAddDriverModal(false)} />
                    </div>
                )}
            </main>
        </>
    );
}

export default Page;
