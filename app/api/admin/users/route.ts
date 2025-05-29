import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/database';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        orders: {
          select: {
            id: true,
            orderNumber: true,
            totalAmount: true,
            status: true,
            createdAt: true
          }
        },
        designs: {
          select: {
            id: true,
            name: true,
            isPublic: true,
            createdAt: true
          }
        },
        _count: {
          select: {
            orders: true,
            designs: true,
            reviews: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        phone: data.phone,
        role: data.role || 'USER',
        status: data.status || 'ACTIVE'
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
} 