import { PhoneIcon, ShieldCheck, ShieldX } from 'lucide-react';
import ButtonAction from './buttons/ButtonAction';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import clsx from 'clsx';
import { wrapper } from '../styles/classes';
import { DriverBadge } from '@prisma/client';

type UserCardProps = {
    image: string;
    name: string;
    badge: DriverBadge;
    phone: string;
};

function UserCard({ image, name, badge = DriverBadge.FREE, phone }: UserCardProps) {
    return (
        <div className={clsx(`${wrapper} flex flex-col p-3 border border-gray-200`)}>
            <div className="relative w-[70px] h-[70px] mx-auto">
                <Image
                    src={image}
                    alt="User Image"
                    width={70}
                    height={70}
                    className={clsx(
                        `w-[70px] h-[70px] object-cover rounded-full border-2  p-1`,
                        badge === 'FREE' ? 'border-green-500' : 'border-amber-500',
                    )}
                />
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5">
                    {badge === 'FREE' ? (
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                    ) : (
                        <ShieldX className="w-4 h-4 text-amber-500" />
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between gap-3">
                <h2 className="text-bold font-semibold">{name}</h2>
                <div className="flex items-center justify-between gap-2">
                    <span
                        className={clsx(
                            `border w-[50px] text-center  p-1 rounded-md  text-sm`,
                            badge === 'BUSY'
                                ? 'border-amber-500 bg-amber-50 text-amber-500'
                                : 'border-green-500 bg-green-50 text-green-500',
                        )}
                    >
                        {badge}
                    </span>
                    <ButtonAction Icon={EllipsisHorizontalIcon} />
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-3">
                <div className="flex gap-3 items-center">
                    <PhoneIcon className="w-5 h-5" />
                    <span className="text-sm text-gray-500">phone</span>
                    <span className="">{phone}</span>
                </div>
            </div>
        </div>
    );
}

export default UserCard;
