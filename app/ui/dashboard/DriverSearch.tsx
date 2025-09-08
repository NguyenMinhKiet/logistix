import { Driver } from '@/app/types';
import Image from 'next/image';

type DriverSearchProps = {
    image: string;
    name: string;
};
function DriverSearch({ image, name }: DriverSearchProps) {
    return (
        <div className="flex items-center p-3">
            <Image src={image} alt="ava" width={25} height={50} className="w-[25px] h-auto object-cover" />
            <span className="ml-3 whitespace-nowrap">{name}</span>
        </div>
    );
}

export default DriverSearch;
