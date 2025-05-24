import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

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
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} antialiased bg-black`}>{children}</body>
    </html>
  );
}
