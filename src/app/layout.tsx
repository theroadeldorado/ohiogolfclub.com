import type { Metadata } from 'next';
import { fontVariables } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ohio Golf Club | Premier Indoor Golf Experience',
  description: "Experience Ohio's finest indoor golf center with private lessons, elite memberships, indoor leagues, and a world-class short game area.",
  keywords: 'indoor golf, golf lessons, golf memberships, golf leagues, Ohio golf',
  openGraph: {
    title: 'Ohio Golf Club | Premier Indoor Golf Experience',
    description: "Experience Ohio's finest indoor golf center with private lessons, elite memberships, indoor leagues, and a world-class short game area.",
    url: 'https://ohiogolfclubindoor.com',
    siteName: 'Ohio Golf Club',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="antialiased bg-black">{children}</body>
    </html>
  );
}
