import { sessionService } from '@/app/services/sessionService';
import { cookies } from 'next/headers';

export async function verifySession() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session')?.value;
    return sessionService.verifySession(sessionToken);
}
