'use client';
import Breadcrumb from '@/app/ui/Breadcrumb';
import ButtonAction from '@/app/ui/buttons/ButtonAction';
import ButtonInput from '@/app/ui/buttons/ButtonInput';
import { Bars3Icon, CheckIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { FilterIcon, Grid2X2, UsersIcon } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import UserCard from '@/app/ui/UserCard';
import UserTable from '@/app/ui/DriverTable';
import { Driver, DriverBadge } from '@/app/types';
import { wrapper } from '@/app/styles/classes';

function Page() {
    const [searchBtn, setSearchBtn] = useState('');
    const [displayType, setDisplayType] = useState<'grid' | 'list'>('list');

    const drivers: Driver[] = [
        {
            id: 'd1',
            name: 'Nguyễn Minh Kiệt',
            imageUrl: '/nguyenminhkiet.JPG',
            phone: '+84 932667135',
            license: 'B2-123456',
            badge: DriverBadge.FREE,
            vehicle: undefined,
            vehicleId: 'v1',
            shipments: [],
            createdAt: new Date('2024-09-01T10:00:00Z'),
            updatedAt: new Date('2024-09-10T15:00:00Z'),
        },
        {
            id: 'd2',
            name: 'Trần Văn A',
            imageUrl: '/nguyenminhkiet.JPG',
            phone: '+84 912345678',
            license: 'C-654321',
            badge: DriverBadge.BUSY,
            vehicle: undefined,
            vehicleId: 'v2',
            shipments: [],
            createdAt: new Date('2024-08-15T08:30:00Z'),
            updatedAt: new Date('2024-09-05T12:00:00Z'),
        },
        {
            id: 'd3',
            name: 'Lê Thị B',
            imageUrl: '/nguyenminhkiet.JPG',
            phone: '+84 987654321',
            license: 'B2-789456',
            badge: DriverBadge.BUSY,
            vehicle: undefined,
            vehicleId: 'v3',
            shipments: [],
            createdAt: new Date('2024-07-20T09:15:00Z'),
            updatedAt: new Date('2024-08-28T18:45:00Z'),
        },
        {
            id: 'd4',
            name: 'Phạm Văn C',
            imageUrl: '/nguyenminhkiet.JPG',
            phone: '+84 934567890',
            license: 'C-112233',
            badge: DriverBadge.FREE,
            vehicle: undefined,
            vehicleId: 'v4',
            shipments: [],
            createdAt: new Date('2024-06-05T07:00:00Z'),
            updatedAt: new Date('2024-07-01T11:30:00Z'),
        },
        {
            id: 'd5',
            name: 'Hoàng Thị D',
            imageUrl: '/nguyenminhkiet.JPG',
            phone: '+84 911223344',
            license: 'B2-998877',
            badge: DriverBadge.BUSY,
            vehicle: undefined,
            vehicleId: 'v5',
            shipments: [],
            createdAt: new Date('2024-05-12T14:00:00Z'),
            updatedAt: new Date('2024-06-20T09:20:00Z'),
        },
    ];
    const [data, setData] = useState(drivers as unknown as Driver[]);
    const [showSortFilter, setShowSortFilter] = useState(false);
    const [sortBy, setSortBy] = useState<'name' | 'badge' | ''>('name');
    const [filterBy, setFilterBy] = useState<('name' | 'phone' | 'badge' | '')[]>(['name', 'phone', 'badge']);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setSearchBtn(value);
        const filteredDrivers = drivers.filter(
            (driver) => driver.name.toLowerCase().includes(value) || driver.phone.toLowerCase().includes(value),
        );
        setData(filteredDrivers as unknown as Driver[]);
    };

    useEffect(() => {
        if (sortBy) {
            if (sortBy === 'name') {
                setData([...data].sort((a, b) => a.name.localeCompare(b.name)));
            } else {
                setData([...data].sort((a, b) => a.badge.localeCompare(b.badge)));
            }
        }
    }, [sortBy]);
    return (
        <>
            {/* Header */}
            <div className="h-40 mb-3 grid grid-cols-2 bg-gradient-to-r from-blue-400 to-indigo-500  text-white">
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
                        {/* Card */}
                        <div className="flex flex-col shadow-md rounded-xl p-2 px-3 w-52 bg-white/50 text-black">
                            <h1 className="text-gray-700">Total Drivers</h1>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-xl">{drivers.length ?? 0}</span>
                                <div className="flex items-center justify-center rounded-full border border-white p-2 bg-white">
                                    <UsersIcon className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                        {/* Card */}
                        <div className="flex flex-col shadow-md rounded-xl p-2 px-3 w-52 bg-white/50 text-black">
                            <h1 className="text-gray-700">Busy</h1>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-xl">
                                    {drivers.filter((driver) => driver.badge === DriverBadge.BUSY).length ?? 0}
                                </span>
                                <div className="flex items-center justify-center rounded-full border border-white p-2 bg-white">
                                    <UsersIcon className="w-5 h-5 text-amber-500" />
                                </div>
                            </div>
                        </div>
                        {/* Card */}
                        <div className="flex flex-col shadow-md rounded-xl p-2 px-3 w-52 bg-white/50 text-black">
                            <h1 className="text-gray-700">Free</h1>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-xl">
                                    {drivers.filter((driver) => driver.badge === DriverBadge.FREE).length ?? 0}
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
            <main className="flex flex-col px-3">
                {/* NavBar */}
                <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center gap-2">
                        <div className="flex justify-center items-center gap-2 bg-gray-100 rounded-xl space-y px-3">
                            <button
                                onClick={() => setDisplayType('grid')}
                                className={clsx(
                                    'cursor-pointer my-1  hover:bg-white hover:border hover:border-gray-400 text-gray-600 font-semibold rounded-xl p-2',
                                    displayType === 'grid' ? 'border  border-gray-400  bg-white' : '',
                                )}
                            >
                                <Grid2X2 className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setDisplayType('list')}
                                className={clsx(
                                    'cursor-pointer my-1  hover:bg-white hover:border hover:border-gray-400 text-gray-600 font-semibold rounded-xl p-2',
                                    displayType === 'list' ? 'border  border-gray-400  bg-white' : '',
                                )}
                            >
                                <Bars3Icon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        {/* SearchButton */}
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
                                    <div className=" flex gap-2 items-center">
                                        <ButtonAction
                                            Icon={CheckIcon}
                                            label="name"
                                            variant={sortBy.includes('name') ? 'outlineSuccess' : 'secondary'}
                                            onClick={() => setSortBy('name')}
                                        />
                                        <ButtonAction
                                            Icon={CheckIcon}
                                            label="badge"
                                            variant={sortBy.includes('badge') ? 'outlineSuccess' : 'secondary'}
                                            onClick={() => setSortBy('badge')}
                                        />
                                        <ButtonAction label="clear" variant="textDark" onClick={() => setSortBy('')} />
                                    </div>
                                    <h1 className="mb-2 font-semibold">Filter By</h1>
                                    <div className=" flex gap-2 items-center">
                                        <ButtonAction
                                            Icon={CheckIcon}
                                            label="Name"
                                            variant={filterBy.includes('name') ? 'outlineSuccess' : 'secondary'}
                                            onClick={() =>
                                                setFilterBy((prev) =>
                                                    prev.includes('name')
                                                        ? prev.filter((f) => f !== 'name')
                                                        : [...prev, 'name'],
                                                )
                                            }
                                        />
                                        <ButtonAction
                                            Icon={CheckIcon}
                                            label="Phone"
                                            variant={filterBy.includes('phone') ? 'outlineSuccess' : 'secondary'}
                                            onClick={() =>
                                                setFilterBy((prev) =>
                                                    prev.includes('phone')
                                                        ? prev.filter((f) => f !== 'phone')
                                                        : [...prev, 'phone'],
                                                )
                                            }
                                        />
                                        <ButtonAction
                                            Icon={CheckIcon}
                                            label="Badge"
                                            variant={filterBy.includes('badge') ? 'outlineSuccess' : 'secondary'}
                                            onClick={() =>
                                                setFilterBy((prev) =>
                                                    prev.includes('badge')
                                                        ? prev.filter((f) => f !== 'badge')
                                                        : [...prev, 'badge'],
                                                )
                                            }
                                        />
                                        <ButtonAction
                                            label="clear"
                                            variant="textDark"
                                            onClick={() => setFilterBy([])}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Button Add */}
                        <ButtonAction Icon={PlusIcon} label="Add New" variant="mainColor" />
                    </div>
                </div>
                {/* Content */}
                <div
                    className={clsx(
                        ` gap-3 mt-3`,
                        displayType === 'grid'
                            ? 'grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'
                            : 'flex flex-col',
                    )}
                >
                    {/* Card Driver */}

                    {displayType === 'grid' ? (
                        data.map((driver) => (
                            <UserCard
                                key={driver.id}
                                image={driver.imageUrl ?? '/nguyenminhkiet.JPG'}
                                name={driver.name}
                                phone={driver.phone}
                                badge={driver.badge}
                            />
                        ))
                    ) : (
                        <UserTable drivers={data} filterBy={filterBy} />
                    )}
                </div>
            </main>
        </>
    );
}

export default Page;
