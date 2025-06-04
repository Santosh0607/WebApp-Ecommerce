import { NextRequest, NextResponse } from 'next/server';

const PHOTOROOM_API_KEY = process.env.PHOTOROOM_API_KEY || 'sandbox_sk_pr_c05fdbfe2911e9085fecae4d9f0d56e98d22f326';
const PHOTOROOM_API_URL = 'https://sdk.photoroom.com/v1/segment';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    // Prepare form data for PhotoRoom API
    const photoRoomFormData = new FormData();
    photoRoomFormData.append('image_file', imageFile);
    photoRoomFormData.append('bg_color', 'transparent');
    photoRoomFormData.append('format', 'PNG');
    photoRoomFormData.append('crop', 'false');

    // Call PhotoRoom API
    const response = await fetch(PHOTOROOM_API_URL, {
      method: 'POST',
      headers: {
        'x-api-key': PHOTOROOM_API_KEY,
      },
      body: photoRoomFormData,
    });

    if (!response.ok) {
      console.error('PhotoRoom API error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('PhotoRoom error response:', errorText);
      
      return NextResponse.json(
        { error: 'Failed to remove background. Please check your API key or try again.' },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    if (!data.result_b64) {
      return NextResponse.json(
        { error: 'No processed image returned from API' },
        { status: 500 }
      );
    }

    // Return the processed image as base64 data URL
    const processedImageUrl = `data:image/png;base64,${data.result_b64}`;
    
    return NextResponse.json({ 
      success: true, 
      imageUrl: processedImageUrl 
    });

  } catch (error) {
    console.error('Background removal error:', error);
    return NextResponse.json(
      { error: 'Failed to remove background. Please try again.' },
      { status: 500 }
    );
  }
} 