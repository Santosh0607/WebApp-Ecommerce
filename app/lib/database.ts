import { PrismaClient } from '../generated/prisma';
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Prisma configuration
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Database helper functions
export const dbHelpers = {
  // User analytics
  async getUserStats() {
    const totalUsers = await prisma.user.count();
    const activeUsers = await prisma.user.count({
      where: { status: 'ACTIVE' }
    });
    const newUsersThisMonth = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    });
    
    return { totalUsers, activeUsers, newUsersThisMonth };
  },

  // Order analytics
  async getOrderStats() {
    const totalOrders = await prisma.order.count();
    const completedOrders = await prisma.order.count({
      where: { status: 'DELIVERED' }
    });
    const pendingOrders = await prisma.order.count({
      where: { status: { in: ['PENDING', 'CONFIRMED', 'PROCESSING'] } }
    });
    
    const totalRevenue = await prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: 'DELIVERED' }
    });

    const ordersThisMonth = await prisma.order.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    });
    
    return { 
      totalOrders, 
      completedOrders, 
      pendingOrders, 
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      ordersThisMonth
    };
  },

  // Design analytics
  async getDesignStats() {
    const totalDesigns = await prisma.design.count();
    const publicDesigns = await prisma.design.count({
      where: { isPublic: true }
    });
    const templateDesigns = await prisma.design.count({
      where: { isTemplate: true }
    });
    
    return { totalDesigns, publicDesigns, templateDesigns };
  },

  // Product analytics
  async getProductStats() {
    const totalProducts = await prisma.product.count();
    const activeProducts = await prisma.product.count({
      where: { active: true }
    });
    const outOfStock = await prisma.product.count({
      where: { stock: 0 }
    });
    
    return { totalProducts, activeProducts, outOfStock };
  },

  // Website content
  async getSiteSettings() {
    let settings = await prisma.siteSettings.findFirst();
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {}
      });
    }
    return settings;
  },

  async getHeroContent() {
    let hero = await prisma.heroContent.findFirst({
      where: { active: true }
    });
    if (!hero) {
      hero = await prisma.heroContent.create({
        data: {}
      });
    }
    return hero;
  },

  async getAboutContent() {
    let about = await prisma.aboutContent.findFirst();
    if (!about) {
      about = await prisma.aboutContent.create({
        data: {}
      });
    }
    return about;
  }
}; 