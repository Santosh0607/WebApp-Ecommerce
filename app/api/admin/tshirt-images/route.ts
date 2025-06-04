import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/database';

export async function GET() {
  try {
    const images = await prisma.tshirtImage.findMany({
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching t-shirt images:', error);
    return NextResponse.json({ error: 'Failed to fetch t-shirt images' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const image = await prisma.tshirtImage.create({
      data: {
        name: data.name,
        url: data.url,
        color: data.color,
        type: data.type,
        active: data.active ?? true,
        order: data.order || 999
      }
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error('Error creating t-shirt image:', error);
    return NextResponse.json({ error: 'Failed to create t-shirt image' }, { status: 500 });
  }
} 