import { verifySession } from '@/app/lib/dataAccessLayer';

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
