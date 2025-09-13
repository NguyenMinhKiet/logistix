import { getCurrentUser } from '@/app/lib/session';
import ShipmentDashboard from '@/app/ui/dashboard/ShipmentDashboard';
import { Suspense } from 'react';

async function Page() {
    const user = await getCurrentUser();
    return (
        <Suspense fallback={<p>Đang tải tài nguyên...</p>}>
            <ShipmentDashboard user={user} />
        </Suspense>
    );
}

export default Page;
