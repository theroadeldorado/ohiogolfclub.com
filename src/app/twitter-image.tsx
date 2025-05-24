// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Ohio Golf Club indoor facility with putting green';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/jpeg';

// Image generation
export default function Image() {
  // The twitter-image.jpg file will be used instead
  return new Response(null, { status: 204 });
}
