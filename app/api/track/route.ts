import { NextRequest, NextResponse } from 'next/server';
import { analytics } from '../../lib/analytics';

export async function POST(request: NextRequest) {
  try {
    const { event, data, userId, path } = await request.json();
    
    const userAgent = request.headers.get('user-agent') || undefined;
    const referrer = request.headers.get('referer') || undefined;
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     request.ip || undefined;

    switch (event) {
      case 'page_view':
        await analytics.trackPageView(path || '/', userAgent, userId, referrer, ipAddress);
        break;
      case 'design_created':
        await analytics.trackDesignCreated(userId, data.designId, data.designName);
        break;
      case 'order_placed':
        await analytics.trackOrderPlaced(userId, data.orderId, data.amount);
        break;
      case 'user_registered':
        await analytics.trackUserRegistration(userId, data.email);
        break;
      case 'user_login':
        await analytics.trackUserLogin(userId, data.email);
        break;
      case 'product_view':
        await analytics.trackProductView(data.productId, userId);
        break;
      case 'cart_action':
        await analytics.trackCartAction(data.action, data.productId, userId);
        break;
      default:
        return NextResponse.json({ error: 'Unknown event type' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking analytics:', error);
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
  }
} 