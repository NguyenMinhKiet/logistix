import { Driver } from '@/app/types';
import DriverSearch from './DriverSearch';

type DriverSearchListProps = {
    drivers: Driver[];
};
function DriverSearchList({ drivers }: DriverSearchListProps) {
    return (
        <div className="block max-h-60 overflow-y-auto">
            {drivers.length > 0 &&
                drivers.map((driver) => (
                    <DriverSearch key={driver.id} image={'/nguyenminhkiet.JPG'} name={driver.name} />
                ))}
        </div>
    );
}

export default DriverSearchList;
