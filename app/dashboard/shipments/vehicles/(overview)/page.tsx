import CarPage from '@/app/ui/pages/CarPage';
import { Suspense } from 'react';

async function Page() {
    return (
        <Suspense>
            <CarPage />
        </Suspense>
    );
}

export default Page;
