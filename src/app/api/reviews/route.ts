import { NextResponse } from 'next/server';

const PLACE_ID = 'ChIJp_9WNUjbMIgR4Se2SiFdqIw';
const API_KEY = process.env.GOOGLE_API_KEY;

export async function GET() {
  try {
    if (!API_KEY) {
      console.error('Google API key not found');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total,reviews&key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error('Google Places API error:', response.status, response.statusText);
      return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('Google Places API returned error:', data.status, data.error_message);
      return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }

    // Return only the reviews array
    return NextResponse.json(data.result.reviews || []);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
