import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ToastContainer from './ui/ToastContainer';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: {
        template: '%s | Logistix Solution',
        default: 'Logistix Solution',
    },
    description:
        'Tối ưu vận hành logistics với Logistix: quản lý đơn hàng, vận tải, tài xế và kho bãi trên một nền tảng duy nhất.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {children}
                <ToastContainer />
            </body>
        </html>
    );
}
