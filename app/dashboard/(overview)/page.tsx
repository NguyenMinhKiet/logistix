import { verifySession } from '@/app/lib/dataAccessLayer';
import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';

export default async function DashboardPage() {
    const session = await verifySession();
    const userRole = session?.userRole;
    console.log('Role: ', userRole);
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p>Chào mừng bạn đến trang Dashboard 🚀</p>
        </div>
    );
}
