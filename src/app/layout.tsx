import type { Metadata } from 'next';
import Script from 'next/script';
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
  twitter: {
    card: 'summary_large_image',
    title: 'Ohio Golf Club | Premier Indoor Golf Experience',
    description: "Experience Ohio's finest indoor golf center with private lessons, elite memberships, indoor leagues, and a world-class short game area.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17667696396"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17667696396');
          `}
        </Script>
      </head>
      <body className="antialiased bg-black">{children}</body>
    </html>
  );
}
