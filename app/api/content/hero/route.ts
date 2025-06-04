import { NextRequest, NextResponse } from 'next/server';
import { dbHelpers, prisma } from '../../../lib/database';

export async function GET() {
  try {
    const heroContent = await dbHelpers.getHeroContent();
    return NextResponse.json(heroContent);
  } catch (error) {
    console.error('Error fetching hero content:', error);
    return NextResponse.json({ error: 'Failed to fetch hero content' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    
    const heroContent = await prisma.heroContent.upsert({
      where: { id: data.id || 'default' },
      update: {
        heading: data.heading,
        subheading: data.subheading,
        description: data.description,
        customerCount: data.customerCount,
        orderCount: data.orderCount,
        satisfaction: data.satisfaction,
        ctaText: data.ctaText,
        ctaLink: data.ctaLink,
        active: data.active ?? true
      },
      create: {
        heading: data.heading,
        subheading: data.subheading,
        description: data.description,
        customerCount: data.customerCount,
        orderCount: data.orderCount,
        satisfaction: data.satisfaction,
        ctaText: data.ctaText,
        ctaLink: data.ctaLink,
        active: data.active ?? true
      }
    });

    return NextResponse.json(heroContent);
  } catch (error) {
    console.error('Error updating hero content:', error);
    return NextResponse.json({ error: 'Failed to update hero content' }, { status: 500 });
  }
} 