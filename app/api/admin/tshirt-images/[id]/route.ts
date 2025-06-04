import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/database';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    
    const image = await prisma.tshirtImage.update({
      where: { id: params.id },
      data: {
        name: data.name,
        url: data.url,
        color: data.color,
        type: data.type,
        active: data.active,
        order: data.order
      }
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error('Error updating t-shirt image:', error);
    return NextResponse.json({ error: 'Failed to update t-shirt image' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.tshirtImage.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting t-shirt image:', error);
    return NextResponse.json({ error: 'Failed to delete t-shirt image' }, { status: 500 });
  }
} 