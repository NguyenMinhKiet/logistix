'use client';

import { useNotificationStore } from '../store/notificationStore';
import { useEffect } from 'react';

function ToastContainer() {
    const { notifications, removeNotification } = useNotificationStore();

    useEffect(() => {
        if (notifications.length > 0) {
            const timer = setTimeout(() => {
                removeNotification(notifications[0].id);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notifications, removeNotification]);

    return (
        <div className="fixed top-4 right-4 space-y-2 z-50">
            {notifications.map((n) => (
                <div
                    key={n.id}
                    className={`px-4 py-2 rounded shadow text-white ${
                        n.type === 'success' ? 'bg-green-600' : n.type === 'error' ? 'bg-red-600' : 'bg-blue-600'
                    }`}
                >
                    {n.message}
                </div>
            ))}
        </div>
    );
}

export default ToastContainer;
