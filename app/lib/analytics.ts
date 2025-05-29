import { prisma } from './database';

export const analytics = {
  // Track page views
  async trackPageView(
    path: string,
    userAgent?: string,
    userId?: string,
    referrer?: string,
    ipAddress?: string
  ) {
    try {
      await prisma.analytics.create({
        data: {
          event: 'page_view',
          data: { path },
          userAgent,
          userId,
          referrer,
          ipAddress
        }
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  },

  // Track design creation
  async trackDesignCreated(userId: string, designId: string, designName: string) {
    try {
      await prisma.analytics.create({
        data: {
          event: 'design_created',
          data: { designId, designName },
          userId
        }
      });
    } catch (error) {
      console.error('Error tracking design creation:', error);
    }
  },

  // Track order placement
  async trackOrderPlaced(userId: string, orderId: string, amount: number) {
    try {
      await prisma.analytics.create({
        data: {
          event: 'order_placed',
          data: { orderId, amount },
          userId
        }
      });
    } catch (error) {
      console.error('Error tracking order placement:', error);
    }
  },

  // Track user registration
  async trackUserRegistration(userId: string, email: string) {
    try {
      await prisma.analytics.create({
        data: {
          event: 'user_registered',
          data: { email },
          userId
        }
      });
    } catch (error) {
      console.error('Error tracking user registration:', error);
    }
  },

  // Track user login
  async trackUserLogin(userId: string, email: string) {
    try {
      await prisma.analytics.create({
        data: {
          event: 'user_login',
          data: { email },
          userId
        }
      });

      // Update last login time
      await prisma.user.update({
        where: { id: userId },
        data: { lastLogin: new Date() }
      });
    } catch (error) {
      console.error('Error tracking user login:', error);
    }
  },

  // Track product view
  async trackProductView(productId: string, userId?: string) {
    try {
      await prisma.analytics.create({
        data: {
          event: 'product_view',
          data: { productId },
          userId
        }
      });
    } catch (error) {
      console.error('Error tracking product view:', error);
    }
  },

  // Track cart actions
  async trackCartAction(action: 'add' | 'remove' | 'update', productId: string, userId?: string) {
    try {
      await prisma.analytics.create({
        data: {
          event: `cart_${action}`,
          data: { productId },
          userId
        }
      });
    } catch (error) {
      console.error('Error tracking cart action:', error);
    }
  },

  // Get real-time stats for website
  async getWebsiteStats() {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [
        totalPageViews,
        todayPageViews,
        totalUsers,
        activeUsers,
        totalOrders,
        totalRevenue,
        todayOrders
      ] = await Promise.all([
        prisma.analytics.count({
          where: { event: 'page_view' }
        }),
        prisma.analytics.count({
          where: {
            event: 'page_view',
            createdAt: { gte: today }
          }
        }),
        prisma.user.count(),
        prisma.user.count({
          where: { status: 'ACTIVE' }
        }),
        prisma.order.count(),
        prisma.order.aggregate({
          _sum: { totalAmount: true },
          where: { status: 'DELIVERED' }
        }),
        prisma.order.count({
          where: {
            createdAt: { gte: today }
          }
        })
      ]);

      return {
        pageViews: {
          total: totalPageViews,
          today: todayPageViews
        },
        users: {
          total: totalUsers,
          active: activeUsers
        },
        orders: {
          total: totalOrders,
          today: todayOrders
        },
        revenue: {
          total: totalRevenue._sum.totalAmount || 0
        }
      };
    } catch (error) {
      console.error('Error getting website stats:', error);
      return null;
    }
  }
}; 