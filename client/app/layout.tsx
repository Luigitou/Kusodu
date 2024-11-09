import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
