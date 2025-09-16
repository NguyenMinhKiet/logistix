function BreadcrumbSkeleton() {
    return (
        <div className="flex flex-col justify-end p-5 space-y-2 animate-pulse">
            {/* Breadcrumb links */}
            <div className="flex gap-2 items-center">
                {/* Skeleton cho các link trước */}
                <div className="flex items-center gap-2">
                    <div className="h-4 w-16 bg-gray-700 rounded"></div>
                    <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-4 w-12 bg-gray-700 rounded"></div>
                    <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
                </div>
                {/* Skeleton cho current */}
                <div className="h-4 w-20 bg-gray-600 rounded"></div>
            </div>

            {/* Skeleton cho title */}
            <div className="h-10 w-1/3 bg-gray-700 rounded"></div>
        </div>
    );
}

export default BreadcrumbSkeleton;
