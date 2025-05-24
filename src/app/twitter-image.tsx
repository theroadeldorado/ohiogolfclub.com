import { ImageResponse } from 'next/og';

// Metadata for the Twitter image
export const alt = 'Ohio Golf Club indoor facility with putting green';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/jpeg';

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
