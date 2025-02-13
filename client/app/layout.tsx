import type { Metadata } from 'next';
import './globals.css';
import { Header, Sidebar } from '@/_ui';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InitState } from '@/_providers/InitState';

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
        <ToastContainer
          position={'bottom-right'}
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={true}
          theme='dark'
          draggable={false}
          pauseOnHover={false}
        />
        <header className={'m-4 mb-2'}>
          <Header />
        </header>
        <div className={'flex w-full grow p-2'}>
          <aside className={'m-4 mr-2 mt-2 hidden md:block'}>
            <Sidebar isMobile={false} />
          </aside>
          <main
            className={
              'flex w-full items-center justify-center rounded-xl bg-background p-2 md:p-4'
            }
          >
            <InitState>{children}</InitState>
          </main>
        </div>
      </body>
    </html>
  );
}
