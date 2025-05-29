import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/database';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        variants: true,
        _count: {
          select: {
            variants: true,
            orderItems: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        originalPrice: data.originalPrice,
        stock: data.stock,
        sku: data.sku,
        active: data.active ?? true,
        featured: data.featured ?? false,
        tags: data.tags || [],
        categoryId: data.categoryId
      },
      include: {
        category: true,
        variants: true
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
} 