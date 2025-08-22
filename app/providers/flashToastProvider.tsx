'use client';

import { Toaster } from 'react-hot-toast';
import { useFlashToast } from '@/app/hooks/useFlashToast';

export function FlashToastProvider() {
    useFlashToast();
    return <Toaster position="top-right" reverseOrder={false} />;
}
