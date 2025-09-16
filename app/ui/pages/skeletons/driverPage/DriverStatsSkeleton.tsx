function DriverStatsSkeleton() {
    return (
        <div className="flex flex-col p-5 justify-end items-end animate-pulse">
            <div className="flex gap-3">
                {/* Skeleton Card */}
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col shadow-md rounded-xl p-2 px-3 w-52 bg-white/50 text-black"
                    >
                        {/* Skeleton title */}
                        <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
                        {/* Skeleton number + icon */}
                        <div className="flex justify-between items-center">
                            <div className="h-6 w-12 bg-gray-400 rounded"></div>
                            <div className="flex items-center justify-center rounded-full border border-white p-2 bg-white">
                                <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DriverStatsSkeleton;
