// Static metadata for the OpenGraph image file
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

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 48,
          background: 'black',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 48,
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 'bold', marginBottom: 40 }}>OHIO GOLF CLUB</div>
        <div style={{ fontSize: 36 }}>Premier Indoor Golf Experience</div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
