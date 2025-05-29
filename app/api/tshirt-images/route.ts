import { NextResponse } from 'next/server';
import { prisma } from '../../lib/database';

export async function GET() {
  try {
    const images = await prisma.tshirtImage.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        name: true,
        url: true,
        color: true,
        type: true,
        order: true
      }
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching t-shirt images:', error);
    return NextResponse.json({ error: 'Failed to fetch t-shirt images' }, { status: 500 });
  }
} 