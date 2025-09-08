import SideNav from '@/app/ui/dashboard/sidenav';
import clsx from 'clsx';
import { Metadata } from 'next';

export const experimental_ppr = true;

export const metadata: Metadata = {
    title: {
        template: '%s | Dashboard',
        default: 'Dashboard',
    },
    description: 'The official Next.js Learn Dashboard built with App Router.',
    metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col md:flex-row transition-all duration-500 ease-in-out relative overflow-auto">
            <div className={clsx(` flex-none md:h-full w-full md:w-64`)}>
                <SideNav />
            </div>
            <div className="flex-grow md:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {children}
            </div>
        </div>
    );
}
