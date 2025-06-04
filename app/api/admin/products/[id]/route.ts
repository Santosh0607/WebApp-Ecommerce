import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/database';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        originalPrice: data.originalPrice,
        stock: data.stock,
        sku: data.sku,
        active: data.active,
        featured: data.featured,
        tags: data.tags,
        categoryId: data.categoryId
      },
      include: {
        category: true,
        variants: true
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.$transaction(async (tx) => {
      // Delete product variants first
      await tx.productVariant.deleteMany({
        where: { productId: params.id }
      });

      // Delete the product
      await tx.product.delete({
        where: { id: params.id }
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
} 