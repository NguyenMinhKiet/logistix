import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

type PreItem = {
    name: string;
    link: string;
};

export default function Breadcrumb({ preList, current }: { preList?: PreItem[]; current: string }) {
    return (
        <div className="flex flex-col justify-end p-5 space-y-2">
            <div className="flex gap-2 items-center ">
                {preList &&
                    preList.map((item, index) => (
                        <div className="flex items-center gap-2 justify-center" key={index}>
                            <Link href={item.link} className="text-gray-200 hover:text-white font-semibold">
                                {item.name}
                            </Link>
                            <ChevronRightIcon className="w-3 h-3" />
                        </div>
                    ))}
                <span className="font-semibold text-white">{`${current}`}</span>
            </div>
            <h1 className="text-3xl font-semibold text-white">{`${current}`}</h1>
        </div>
    );
}
