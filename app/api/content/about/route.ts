import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/database';

export async function GET() {
  try {
    const about = await prisma.aboutContent.findFirst({
      where: { id: 'default' }
    });

    return NextResponse.json(about);
  } catch (error) {
    console.error('Error fetching about content:', error);
    return NextResponse.json({ error: 'Failed to fetch about content' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    
    const about = await prisma.aboutContent.upsert({
      where: { id: 'default' },
      update: {
        title: data.title,
        content: data.content,
        mission: data.mission,
        vision: data.vision,
        values: data.values,
        founderName: data.founderName,
        founderTitle: data.founderTitle,
        founderMessage: data.founderMessage,
        founderImage: data.founderImage,
        ceoName: data.ceoName,
        ceoTitle: data.ceoTitle,
        ceoMessage: data.ceoMessage,
        ceoImage: data.ceoImage,
        foundedYear: data.foundedYear,
        teamSize: data.teamSize,
        teamDescription: data.teamDescription,
        historyText: data.historyText,
        achievementsText: data.achievementsText
      },
      create: {
        id: 'default',
        title: data.title || 'About SS Garment',
        content: data.content,
        mission: data.mission,
        vision: data.vision,
        values: data.values || [],
        founderName: data.founderName,
        founderTitle: data.founderTitle,
        founderMessage: data.founderMessage,
        founderImage: data.founderImage,
        ceoName: data.ceoName,
        ceoTitle: data.ceoTitle,
        ceoMessage: data.ceoMessage,
        ceoImage: data.ceoImage,
        foundedYear: data.foundedYear,
        teamSize: data.teamSize,
        teamDescription: data.teamDescription,
        historyText: data.historyText,
        achievementsText: data.achievementsText
      }
    });

    return NextResponse.json(about);
  } catch (error) {
    console.error('Error updating about content:', error);
    return NextResponse.json({ error: 'Failed to update about content' }, { status: 500 });
  }
} 