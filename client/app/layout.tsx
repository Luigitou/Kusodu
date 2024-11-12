import type { Metadata } from 'next';
import './globals.css';
import { Header, Sidebar } from '@/ui';

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
    <html lang='en'>
      <body className={'flex h-dvh w-dvw flex-col bg-dark text-white'}>
        <header className={'m-4 mb-2'}>
          <Header />
        </header>
        <div className={'flex grow'}>
          <aside className={'m-4 mr-2 mt-2 hidden md:block'}>
            <Sidebar isMobile={false} />
          </aside>
          <main className={'m-4 ml-2 mt-2 grow rounded-xl bg-background p-4'}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
