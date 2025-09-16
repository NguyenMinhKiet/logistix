function DriversSkeleton({ displayType }: { displayType: 'grid' | 'list' }) {
    const skeletons = Array.from({ length: 6 }); // render 6 placeholder

    return displayType === 'grid' ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3 mt-3 animate-pulse">
            {skeletons.map((_, i) => (
                <div key={i} className="flex flex-col bg-white/50 shadow-md rounded-xl p-4 gap-2">
                    <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                    <div className="h-10 w-full bg-gray-200 rounded mt-2"></div>
                </div>
            ))}
        </div>
    ) : (
        <div className="flex flex-col gap-3 mt-3 animate-pulse">
            {skeletons.map((_, i) => (
                <div key={i} className="flex items-center justify-between bg-white/50 shadow-md rounded-xl p-4 gap-2">
                    <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
                    <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
                    <div className="h-4 w-1/5 bg-gray-300 rounded"></div>
                </div>
            ))}
        </div>
    );
}
export default DriversSkeleton;
