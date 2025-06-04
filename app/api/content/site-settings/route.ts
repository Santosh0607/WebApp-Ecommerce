import { NextRequest, NextResponse } from 'next/server';
import { dbHelpers, prisma } from '../../../lib/database';

export async function GET() {
  try {
    const siteSettings = await dbHelpers.getSiteSettings();
    return NextResponse.json(siteSettings);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json({ error: 'Failed to fetch site settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    
    const siteSettings = await prisma.siteSettings.upsert({
      where: { id: data.id || 'default' },
      update: {
        siteName: data.siteName,
        tagline: data.tagline,
        description: data.description,
        logo: data.logo,
        favicon: data.favicon,
        address: data.address,
        phone: data.phone,
        email: data.email,
        facebook: data.facebook,
        instagram: data.instagram,
        twitter: data.twitter,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords || []
      },
      create: {
        siteName: data.siteName,
        tagline: data.tagline,
        description: data.description,
        logo: data.logo,
        favicon: data.favicon,
        address: data.address,
        phone: data.phone,
        email: data.email,
        facebook: data.facebook,
        instagram: data.instagram,
        twitter: data.twitter,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords || []
      }
    });

    return NextResponse.json(siteSettings);
  } catch (error) {
    console.error('Error updating site settings:', error);
    return NextResponse.json({ error: 'Failed to update site settings' }, { status: 500 });
  }
} 