'use client';

import { formatDate, formatNumber } from '@/app/helpers/format';
import ButtonAction from '@/app/ui/buttons/ButtonAction';
import ButtonInput from '@/app/ui/buttons/ButtonInput';
import Card from '@/app/ui/dashboard/Card';
import { CardSkeleton } from '@/app/ui/dashboard/skeleton';
import TrendIndicator from '@/app/ui/dashboard/TrendIndicator';
import {
    ArchiveBoxArrowDownIcon,
    ArrowUpTrayIcon,
    CalendarDateRangeIcon,
    ChevronRightIcon,
    ClockIcon,
    MagnifyingGlassIcon,
    MapPinIcon,
    PlusIcon,
    TruckIcon,
    UsersIcon,
    WalletIcon,
} from '@heroicons/react/24/outline';
import { Suspense, useEffect, useState } from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Legend,
    Bar,
} from 'recharts';
import Image from 'next/image';
import CardWrapper from '@/app/ui/dashboard/CardWrapper';
import clsx from 'clsx';
import { shipmentStatusColors, wrapper } from '@/app/styles/classes';
import Breadcrumb from '@/app/ui/common/Breadcrumb';
import { useDrivers } from '@/app/context/DriverContext';
import { EDriverStatus, EShipmentStatus } from '@/app/types';
import { SelectInput } from '../buttons/SelectInput';

function CustomTooltip({ active, payload, label }: any) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 rounded-lg shadow border text-sm">
                <p className="font-medium">{label}</p>
                {payload.map((item: any) => (
                    <p key={item.dataKey} className="text-gray-600">
                        <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: item.stroke }} />
                        {item.name}: {item.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
}

export default function ShipmentDashboardPage() {
    const { drivers } = useDrivers();

    const [countFreeDriver, setCountFreeDriver] = useState(0);
    const [countBusyDriver, setCountBusyDriver] = useState(0);
    const [countTotalDriver, setCountTotalDriver] = useState(0);
    const [countOfflineDriver, setCountOfflineDriver] = useState(0);

    useEffect(() => {
        setCountTotalDriver(drivers.length);
        setCountBusyDriver(drivers.filter((driver) => driver.badge === EDriverStatus.BUSY).length);
        setCountFreeDriver(drivers.filter((driver) => driver.badge === EDriverStatus.FREE).length);
        setCountOfflineDriver(drivers.filter((driver) => driver.badge === EDriverStatus.OFFLINE).length);
    }, [drivers]);

    const [searchBtn, setSearchBtn] = useState('');

    // Time
    const dateNow = new Date();
    // Month
    const currentMonth = `${dateNow.getFullYear()}-${String(dateNow.getMonth() + 1).padStart(2, '0')}`;
    // YYYY-MM-DD
    const currentDate = `${dateNow.getFullYear()}-${String(dateNow.getMonth() + 1).padStart(2, '0')}-${String(
        dateNow.getDate(),
    ).padStart(2, '0')}`;

    const [date, setDate] = useState(currentDate);
    const [monthShipmentAnalytics, setMonthShipmentAnalytics] = useState(currentMonth);
    const [monthCarTable, setMonthCarTable] = useState(currentMonth);

    const data = [
        { date: 'Nov 1', delivery: 100, onDelivery: 500 },
        { date: 'Nov 2', delivery: 80, onDelivery: 400 },
        { date: 'Nov 3', delivery: 60, onDelivery: 300 },
        { date: 'Nov 4', delivery: 500, onDelivery: 600 },
        { date: 'Nov 5', delivery: 480, onDelivery: 550 },
        { date: 'Nov 6', delivery: 450, onDelivery: 700 },
        { date: 'Nov 7', delivery: 470, onDelivery: 650 },
        { date: 'Nov 8', delivery: 520, onDelivery: 800 },
        { date: 'Nov 9', delivery: 600, onDelivery: 900 },
    ];

    const monthlyData = [
        { month: 'Jan', Delivered: 120, OnDelivery: 30, Pending: 10 },
        { month: 'Feb', Delivered: 150, OnDelivery: 25, Pending: 5 },
        { month: 'Mar', Delivered: 180, OnDelivery: 40, Pending: 15 },
        { month: 'Apr', Delivered: 200, OnDelivery: 35, Pending: 12 },
        { month: 'May', Delivered: 220, OnDelivery: 50, Pending: 20 },
        { month: 'Jun', Delivered: 250, OnDelivery: 60, Pending: 18 },
        { month: 'Jul', Delivered: 270, OnDelivery: 55, Pending: 25 },
        { month: 'Aug', Delivered: 300, OnDelivery: 65, Pending: 22 },
        { month: 'Sep', Delivered: 280, OnDelivery: 45, Pending: 10 },
        { month: 'Oct', Delivered: 320, OnDelivery: 70, Pending: 30 },
        { month: 'Nov', Delivered: 340, OnDelivery: 75, Pending: 28 },
        { month: 'Dec', Delivered: 400, OnDelivery: 80, Pending: 35 },
    ];

    const steps: string[] = Object.values(EShipmentStatus);

    const cardData = [
        {
            id: 'DEMO-C548783',
            status: { label: 'In Transit', color: 'green' },
            route: 'Circleville, US → Contern, LU',
            eta: 'Nov 15 - Dec 20',
            image: '/truckLoaded.png',
            currentStep: 'In Transit',
        },
        {
            id: 'DEMO-C982134',
            status: { label: 'Out for Delivery', color: 'blue' },
            route: 'Hamburg, DE → Paris, FR',
            eta: 'Dec 1 - Dec 10',
            image: '/truckLoaded.png',
            currentStep: 'Out of Delivery',
        },
        {
            id: 'DEMO-C762910',
            status: { label: 'Delivered', color: 'gray' },
            route: 'Milan, IT → Madrid, ES',
            eta: 'Nov 1 - Nov 5',
            image: '/truckLoaded.png',
            currentStep: 'Delivered',
        },
    ];

    const shipmentsData = [
        {
            id: 'SHIP-001',
            orderId: 'ORDER-001',
            driverId: 'DRIVER-001',
            vehicleId: 'VEHICLE-001',
            routeId: 'ROUTE-001',
            status: EShipmentStatus.PENDING,
            tracking: 'TRACK-001',
            etaStart: new Date('2025-09-15T08:00:00'),
            etaEnd: new Date('2025-09-20T18:00:00'),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 'SHIP-002',
            orderId: 'ORDER-002',
            driverId: 'DRIVER-002',
            vehicleId: 'VEHICLE-002',
            routeId: 'ROUTE-002',
            status: EShipmentStatus.PICKED_UP,
            tracking: 'TRACK-002',
            etaStart: new Date('2025-09-16T09:00:00'),
            etaEnd: new Date('2025-09-21T18:00:00'),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 'SHIP-003',
            orderId: 'ORDER-003',
            driverId: 'DRIVER-003',
            vehicleId: 'VEHICLE-003',
            routeId: 'ROUTE-003',
            status: EShipmentStatus.IN_TRANSIT,
            tracking: 'TRACK-003',
            etaStart: new Date('2025-09-14T10:00:00'),
            etaEnd: new Date('2025-09-19T18:00:00'),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 'SHIP-004',
            orderId: 'ORDER-004',
            driverId: 'DRIVER-004',
            vehicleId: 'VEHICLE-004',
            routeId: 'ROUTE-004',
            status: EShipmentStatus.DELIVERED,
            tracking: 'TRACK-004',
            etaStart: new Date('2025-09-10T08:00:00'),
            etaEnd: new Date('2025-09-15T16:00:00'),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 'SHIP-005',
            orderId: 'ORDER-005',
            driverId: 'DRIVER-005',
            vehicleId: 'VEHICLE-005',
            routeId: 'ROUTE-005',
            status: EShipmentStatus.DELIVERED,
            tracking: 'TRACK-005',
            etaStart: new Date('2025-09-05T08:00:00'),
            etaEnd: new Date('2025-09-12T18:00:00'),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 'SHIP-006',
            orderId: 'ORDER-006',
            driverId: 'DRIVER-006',
            vehicleId: 'VEHICLE-006',
            routeId: 'ROUTE-006',
            status: EShipmentStatus.FAILED,
            tracking: 'TRACK-006',
            etaStart: new Date('2025-09-07T08:00:00'),
            etaEnd: new Date('2025-09-10T18:00:00'),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    const [carSelected, setCarSelected] = useState(cardData[0].id);

    const totalDelivery = data.reduce((sum, item) => sum + item.delivery, 0);
    const totalOnDelivery = data.reduce((sum, item) => sum + item.onDelivery, 0);

    return (
        <>
            {/* Header */}
            <div className="h-40 mb-3 grid grid-cols-2 bg-gradient-to-r from-blue-400 to-indigo-500  text-white">
                {/* Breadcrumb */}
                <Breadcrumb preList={[{ name: 'Dashboard', link: '/dashboard' }]} current="Shipments" />

                <div className="flex flex-col p-5 justify-end items-end">
                    <div className="flex gap-3">
                        {/* Card */}
                        <div className="flex flex-col shadow-md rounded-xl p-2 px-3 w-52 bg-white/50 text-black">
                            <h1 className="text-gray-700">Total Drivers</h1>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-xl">{countTotalDriver}</span>
                                <div className="flex items-center justify-center rounded-full border border-white p-2 bg-white">
                                    <UsersIcon className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                        {/* Card */}
                        <div className="flex flex-col shadow-md rounded-xl p-2 px-3 w-52 bg-white/50 text-black">
                            <h1 className="text-gray-700">Busy</h1>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-xl">{countBusyDriver}</span>
                                <div className="flex items-center justify-center rounded-full border border-white p-2 bg-white">
                                    <UsersIcon className="w-5 h-5 text-amber-500" />
                                </div>
                            </div>
                        </div>
                        {/* Card */}
                        <div className="flex flex-col shadow-md rounded-xl p-2 px-3 w-52 bg-white/50 text-black">
                            <h1 className="text-gray-700">Free</h1>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-xl">{countFreeDriver}</span>
                                <div className="flex items-center justify-center rounded-full border border-white p-2 bg-white">
                                    <UsersIcon className="w-5 h-5 text-green-500" />
                                </div>
                            </div>
                        </div>
                        {/* Card */}
                        <div className="flex flex-col shadow-md rounded-xl p-2 px-3 w-52 bg-white/50 text-black">
                            <h1 className="text-gray-700">Offline</h1>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-xl">{countOfflineDriver}</span>
                                <div className="flex items-center justify-center rounded-full border border-white p-2 bg-white">
                                    <UsersIcon className="w-5 h-5 text-green-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full px-5">
                <h1 className="text-2xl font-medium">Overview</h1>
                <div className="flex gap-3">
                    <ButtonInput
                        Icon={MagnifyingGlassIcon}
                        type="text"
                        value={searchBtn}
                        onChange={(e) => setSearchBtn(e.target.value)}
                    />

                    {/* Calculate Box */}
                    <ButtonInput
                        type="date"
                        placeHolder="Tìm kiếm..."
                        Icon={CalendarDateRangeIcon}
                        borderColor="border-gray-300"
                        bgColor="bg-white"
                        iconColor="text-gray-500"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    {/* Add Shipment Button */}
                    <ButtonAction Icon={PlusIcon} label="Add Shipment" variant="mainColor" />
                </div>
            </div>
            <div className="mt-3 p-5 rounded-xl shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                    <Suspense fallback={<CardSkeleton />}>
                        <Card
                            title="Total Shipments"
                            Icon={TruckIcon}
                            iconColor="text-red-600"
                            bgColor="bg-red-50"
                            value={6.522}
                            change={1.3}
                        />
                    </Suspense>
                    <Suspense fallback={<CardSkeleton />}>
                        <Card
                            title="Total Order"
                            Icon={ArchiveBoxArrowDownIcon}
                            iconColor="text-green-600"
                            bgColor="bg-green-50"
                            value={26.522}
                            change={1.3}
                            isPositive={false}
                        />
                    </Suspense>
                    <Suspense fallback={<CardSkeleton />}>
                        <Card
                            title="Revenue"
                            Icon={WalletIcon}
                            iconColor="text-blue-600"
                            bgColor="bg-blue-50"
                            value={'$26.522'}
                            change={1.3}
                        />
                    </Suspense>
                    <Suspense fallback={<CardSkeleton />}>
                        <Card
                            title="Delivered"
                            Icon={TruckIcon}
                            iconColor="text-yellow-600"
                            bgColor="bg-yellow-50"
                            value={1.502}
                            change={1.3}
                        />
                    </Suspense>
                </div>

                <div className="grid grid-cols-1 md:flex gap-5 mt-5 ">
                    <div className="shadow-sm rounded-xl p-3 md:flex-1">
                        <div className="flex justify-between">
                            <h1 className="text-xl font-medium">Shipment Analytics</h1>
                            <SelectInput
                                Icon={CalendarDateRangeIcon}
                                value={monthShipmentAnalytics}
                                onChange={(val) => setMonthShipmentAnalytics(val)}
                                options={[
                                    { label: 'Monthly', value: 'month' },
                                    { label: 'Weekly', value: 'week' },
                                ]}
                            />
                        </div>
                        <div className="flex gap-5">
                            <div className="flex gap-3 items-center">
                                <h2>Total Delivery:</h2>
                                <span className="font-[600]">{formatNumber(totalDelivery)}</span>

                                <Suspense>
                                    <TrendIndicator
                                        isPositive={true}
                                        change={1.3}
                                        outline={false}
                                        bgColor="bg-green-50"
                                    />
                                </Suspense>
                            </div>

                            <div className="flex gap-3 items-center">
                                <h2>On Delivery:</h2>
                                <span className="font-[600]">{formatNumber(totalOnDelivery)}</span>
                                <Suspense>
                                    <TrendIndicator
                                        isPositive={true}
                                        change={1.3}
                                        outline={false}
                                        bgColor="bg-green-50"
                                    />
                                </Suspense>
                            </div>
                        </div>
                        {/* Chart */}
                        <div className="h-80 mt-3">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line
                                        type="monotone"
                                        dataKey="delivery"
                                        stroke="#16a34a"
                                        strokeWidth={2}
                                        dot={false}
                                        name="Delivery"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="onDelivery"
                                        stroke="#16a34a"
                                        strokeDasharray="5 5"
                                        strokeWidth={2}
                                        dot={false}
                                        name="On Delivery"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="shadow-sm rounded-xl p-3 md:w-170">
                        <div className="flex justify-between">
                            <h1 className="text-xl font-medium">Monthly Shipment Status</h1>
                            <ButtonAction
                                Icon={ArrowUpTrayIcon}
                                label="Export"
                                // onClick={exportToCSV}
                                variant="secondary"
                            />
                        </div>

                        <div className="flex h-96 items-center mt-5">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Delivered" fill="#82ca9d" />
                                    <Bar dataKey="OnDelivery" fill="#8884d8" />
                                    <Bar dataKey="Pending" fill="#ffc658" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <div className={clsx(`${wrapper} grid grid-cols-3 gap-4 p-4`)}>
                        {/* Left Column */}
                        <div className="col-span-2">
                            {/* Tabs */}
                            <div className="grid grid-cols-4 mb-4">
                                <button className="cursor-pointer pb-2 border-b-2 border-green-500 text-green-600 hover:border-green-500 hover:text-green-600">
                                    Followed Shipment
                                </button>
                                <button className="cursor-pointer pb-2 border-b-2 border-gray-200 text-gray-500 hover:border-green-500 hover:text-green-600">
                                    Delay Shipment
                                </button>
                                <button className="cursor-pointer pb-2 border-b-2 border-gray-2    00 text-gray-500 hover:border-green-500 hover:text-green-600">
                                    Last Update
                                </button>
                                <div className="flex justify-end">
                                    <SelectInput
                                        Icon={CalendarDateRangeIcon}
                                        value={monthCarTable}
                                        onChange={(val) => setMonthCarTable(val)}
                                        options={[
                                            { label: 'Monthly', value: 'month' },
                                            { label: 'Weekly', value: 'week' },
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* Card Shipment */}
                            <div className="flex flex-col gap-3  max-h-[800px] overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                {shipmentsData.map((card) => {
                                    const stepIndex = steps.indexOf(card.status);
                                    const progress = (stepIndex / (steps.length - 1)) * 100;

                                    return (
                                        <CardWrapper
                                            key={card.id}
                                            status={carSelected === card.id ? 'success' : undefined}
                                            onClick={() => setCarSelected(card.id)}
                                        >
                                            <div className="p-4 cursor-pointer hover:bg-gray-100 rounded-xl">
                                                <div className="flex items-center justify-between">
                                                    {/* Left info */}
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-3">
                                                            <h3 className="font-semibold">{card.id}</h3>
                                                            <span
                                                                className={`flex items-center gap-1 text-sm px-2 py-0.5 rounded bg-${
                                                                    shipmentStatusColors[card.status]
                                                                }-100 text-${shipmentStatusColors[card.status]}-600`}
                                                            >
                                                                <span
                                                                    className={`w-2 h-2 rounded-full bg-${
                                                                        shipmentStatusColors[card.status]
                                                                    }-600`}
                                                                />
                                                                {card.status}
                                                            </span>
                                                        </div>

                                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                                            <div className="flex items-center gap-1">
                                                                <MapPinIcon className="w-4 h-4" />
                                                                {card.routeId}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <ClockIcon className="w-4 h-4" />
                                                                ETA: {formatDate(card.etaStart)} -
                                                                {formatDate(card.etaEnd)}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <Image
                                                        alt="Truck"
                                                        src={'/truckLoaded.png'}
                                                        width={160}
                                                        height={80}
                                                        className="object-contain"
                                                    />
                                                </div>

                                                {/* Progress */}
                                                <div className="mt-4">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-500">Shipment Progress</span>
                                                        <span className="text-sm font-medium">
                                                            {Math.round(progress)}%
                                                        </span>
                                                    </div>
                                                    <div className="w-full h-2 bg-gray-200 rounded mt-1">
                                                        <div
                                                            className="h-2 bg-blue-500 rounded"
                                                            style={{ width: `${progress}%` }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Steps */}
                                                <div className="flex justify-between text-xs mt-4 text-gray-500">
                                                    {steps.map((step, idx) => (
                                                        <span
                                                            key={idx}
                                                            className={
                                                                idx <= stepIndex ? 'text-blue-600 font-medium' : ''
                                                            }
                                                        >
                                                            {step}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardWrapper>
                                    );
                                })}
                            </div>
                        </div>
                        {/* Cột phải: Map View */}
                        <div className="col-span-1 border rounded-xl shadow-sm">
                            <div className="h-full w-full">
                                {/* Bản đồ nhúng (Google Maps hoặc Mapbox) */}
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=..."
                                    className="w-full h-full rounded-xl"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
