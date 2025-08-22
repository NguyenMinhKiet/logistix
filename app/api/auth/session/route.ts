import { verifySession } from '@/app/lib/clientSession';

export async function GET() {
    const session = await verifySession();
    return Response.json(session);
}
