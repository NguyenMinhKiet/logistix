import { DriverProvider } from '@/app/context/DriverContext';
import { getDrivers } from '@/app/lib/actions/driverActions';
import DriverPage from '@/app/ui/pages/DriverPage';
import { Suspense } from 'react';

async function Page() {
    const drivers = await getDrivers();

    return (
        <DriverProvider initialDrivers={drivers}>
            <Suspense fallback={<p>Đang tải tài nguyên...</p>}>
                <DriverPage />
            </Suspense>
        </DriverProvider>
    );
}

export default Page;
