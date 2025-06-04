import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/database';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    
    const user = await prisma.user.update({
      where: { id: params.id },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        status: data.status
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Use a transaction to delete all related records first
    await prisma.$transaction(async (tx) => {
      // Delete user's designs first
      await tx.design.deleteMany({
        where: { userId: params.id }
      });

      // Delete user's orders (and related order items due to cascade)
      await tx.order.deleteMany({
        where: { userId: params.id }
      });

      // Delete user's analytics records
      await tx.analytics.deleteMany({
        where: { userId: params.id }
      });

      // Finally delete the user
      await tx.user.delete({
        where: { id: params.id }
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
} 