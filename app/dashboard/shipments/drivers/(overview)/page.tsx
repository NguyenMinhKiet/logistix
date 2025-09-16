import DriverPage from '@/app/ui/pages/DriverPage';
import { Suspense } from 'react';

async function Page() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <DriverPage />
        </Suspense>
    );
}

export default Page;
