import { useEffect, useState } from 'react';

interface Session {
    name: string;
    role: string;
}

export function useSession() {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const res = await fetch('/api/auth/session');
                const data = await res.json();
                setSession(data);
            } catch (error) {
                console.error('Failed to fetch session:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSession();
    }, []);

    return { session, isLoading };
}
