// Metadata for the OpenGraph image
export const alt = 'Ohio Golf Club indoor facility with putting green';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/jpeg';

// Image metadata
export const metadata = {
  metadataBase: new URL('https://ohiogolfclubindoor.com'),
  openGraph: {
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ohio Golf Club indoor facility with putting green',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/twitter-image.jpg'],
  },
};

// This default export is required for Next.js to recognize this file
export default function OpenGraphImage() {
  return null;
}
