'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export function useFlashToast() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const status = searchParams.get('status');
        const message = searchParams.get('message');

        if (status && message) {
            if (status === 'success') {
                toast.success(message, { duration: 2000 });
            } else if (status === 'error') {
                toast.error(message, { duration: 4000 });
            } else if (status === 'loading') {
                toast.loading(message, { duration: Infinity, id: 'loading-toast' });
            } else {
                toast(message, { duration: 3000 });
            }

            const newParams = new URLSearchParams(searchParams.toString());
            newParams.delete('status');
            newParams.delete('message');
            router.replace(window.location.pathname + (newParams.toString() ? `?${newParams.toString()}` : ''));
        }
    }, [searchParams, router]);
}
