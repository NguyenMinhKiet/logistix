import { create } from 'zustand';

type Notification = {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
};

type NotificationState = {
    notifications: Notification[];
    addNotification: (msg: string, type?: Notification['type']) => void;
    removeNotification: (id: number) => void;
};

let id = 0;

export const useNotificationStore = create<NotificationState>((set) => ({
    notifications: [],
    addNotification: (message, type = 'info') =>
        set((state) => ({
            notifications: [...state.notifications, { id: ++id, message, type }],
        })),
    removeNotification: (id) =>
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
        })),
}));
