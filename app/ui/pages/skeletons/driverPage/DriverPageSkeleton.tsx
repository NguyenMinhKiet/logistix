import BreadcrumbSkeleton from '../../../common/skeletons/BreadcrumbSkeleton';
import DriverStatsSkeleton from './DriverStatsSkeleton';
import DriverNavbarSkeleton from './DriverNavbarSkeleton';
import DriversSkeleton from './DriversSkeleton';

function DriverPageSkeleton() {
    return (
        <>
            {/* Header */}
            <div className="h-40 mb-3 grid grid-cols-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
                {/* Breadcrumb */}
                <BreadcrumbSkeleton />

                {/* Driver Stats */}
                <DriverStatsSkeleton />
            </div>

            {/* Main */}
            <main className="flex flex-col px-3 relative">
                {/* Navbar Skeleton */}
                <DriverNavbarSkeleton displayType="list" />

                {/* Content Skeleton */}
                <DriversSkeleton displayType="list" />
            </main>
        </>
    );
}

export default DriverPageSkeleton;
