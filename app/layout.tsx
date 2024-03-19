import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/app/_ui';

export const metadata: Metadata = {
    title: 'Kusodu',
    description: 'The modern way to sudoku !',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body
                className={
                    'bg-brighter flex h-screen w-full gap-4 p-4 font-sans'
                }
            >
                <Sidebar />
                {children}
            </body>
        </html>
    );
}
