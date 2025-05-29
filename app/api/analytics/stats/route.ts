import { NextResponse } from 'next/server';
import { dbHelpers } from '../../../lib/database';

export async function GET() {
  try {
    const [userStats, orderStats, designStats, productStats] = await Promise.all([
      dbHelpers.getUserStats(),
      dbHelpers.getOrderStats(),
      dbHelpers.getDesignStats(),
      dbHelpers.getProductStats()
    ]);

    return NextResponse.json({
      users: userStats,
      orders: orderStats,
      designs: designStats,
      products: productStats
    });
  } catch (error) {
    console.error('Error fetching analytics stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
} 