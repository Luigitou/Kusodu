import type { Metadata } from 'next';
import './globals.css';
import { Header, Sidebar } from '@/app/components';

export const metadata: Metadata = {
  title: 'Kusodu',
  description: 'The brand new multiplayer sudoku !',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'flex flex-col bg-dark h-dvh w-dvw text-white'}>
        <header className={'m-4 mb-2'}>
          <Header />
        </header>
        <div className={'flex grow '}>
          <aside className={'m-4 mt-2'}>
            <Sidebar />
          </aside>
          <main className={'bg-background grow rounded-xl m-4 mt-2 p-4'}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
