function DriverNavbarSkeleton({ displayType }: { displayType: 'grid' | 'list' }) {
    return (
        <div className="flex justify-between items-center animate-pulse">
            {/* Toggle grid/list */}
            <div className="flex gap-2 bg-gray-100 rounded-xl p-2">
                <div className="h-8 w-8 bg-gray-300 rounded"></div>
                <div className="h-8 w-8 bg-gray-300 rounded"></div>
            </div>

            {/* Search + Filter + Add */}
            <div className="flex gap-3">
                <div className="h-8 w-48 bg-gray-300 rounded"></div> {/* search input */}
                <div className="h-8 w-32 bg-gray-300 rounded"></div> {/* filter button */}
                <div className="h-8 w-32 bg-gray-300 rounded"></div> {/* add new */}
            </div>
        </div>
    );
}
export default DriverNavbarSkeleton;
