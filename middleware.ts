import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { useNotificationStore } from './app/store/notificationStore';

// Middleware chính
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Ví dụ: nếu chưa login mà vào dashboard thì redirect về /login
    const isLoggedIn = request.cookies.get('session'); // giả sử session được lưu trong cookie
    if (!isLoggedIn && pathname.startsWith('/dashboard')) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('error', 'unauthorized');
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next(); // cho đi tiếp
}

// Cấu hình matcher → chọn route nào áp dụng middleware
export const config = {
    matcher: ['/dashboard/:path*'], // áp dụng cho /dashboard và các nhánh con
};
