import ShipmentDashboardPage from '@/app/ui/pages/ShipmentDashboardPage';
import { Suspense } from 'react';

async function Page() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <ShipmentDashboardPage />
        </Suspense>
    );
}

export default Page;
