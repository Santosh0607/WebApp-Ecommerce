import { PrismaClient } from '../app/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create site settings
  const siteSettings = await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteName: 'SS Garment',
      tagline: 'Custom Design Studio',
      description: 'Create stunning custom T-shirts with our intuitive design studio. Upload images, remove backgrounds, and design unique apparel with ease.',
      email: 'ssgarment@gmail.com',
      phone: '+977 999999999',
      address: 'Pokhara Bastolathar, Nepal',
      facebook: 'https://facebook.com/ssgarment',
      instagram: 'https://instagram.com/ssgarment',
      twitter: 'https://twitter.com/ssgarment'
    }
  });

  // Create hero content
  const heroContent = await prisma.heroContent.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      heading: 'Create Unique T-Shirts Your Way',
      subheading: 'Express yourself with custom designs',
      description: 'Upload your logo, remove backgrounds with AI, and create stunning t-shirts in minutes. Simple, fast, and beautiful.',
      customerCount: '15,000+',
      orderCount: '25,000+',
      satisfaction: '4.9★',
      ctaText: 'Start Designing',
      ctaLink: '/design'
    }
  });

  // Create about content
  const aboutContent = await prisma.aboutContent.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      title: 'About SS Garment',
      content: `SS Garment was founded with a vision to revolutionize custom T-shirt design in Nepal. Located in the beautiful city of Pokhara, we combine traditional Nepali craftsmanship with modern technology to create unique, high-quality apparel.

Our mission is to make custom design accessible to everyone while supporting local artisans and sustainable practices. Since our establishment, we've served thousands of customers across Nepal and beyond, helping them express their creativity through personalized clothing.

We take pride in our eco-friendly printing processes and commitment to fair trade practices. Every t-shirt tells a story, and we're here to help you tell yours.`,
      mission: 'To democratize custom apparel design through innovative technology while preserving traditional Nepali craftsmanship',
      vision: 'To become Nepal\'s leading sustainable custom apparel platform, inspiring creativity worldwide',
      values: ['Quality Excellence', 'Innovation', 'Sustainability', 'Customer Focus', 'Local Pride', 'Ethical Practices'],
      founderName: 'Santosh Kumar',
      founderTitle: 'Founder & Chief Designer',
      founderMessage: 'Starting SS Garment was a dream to merge traditional Nepali artistry with modern design technology. Every piece we create tells a story of innovation, quality, and cultural pride.',
      founderImage: '/api/placeholder/300/400',
      ceoName: 'Priya Sharma',
      ceoTitle: 'Chief Executive Officer',
      ceoMessage: 'At SS Garment, we believe that everyone deserves to express their unique style. Our commitment to quality, sustainability, and customer satisfaction drives everything we do.',
      ceoImage: '/api/placeholder/300/400',
      foundedYear: 2020,
      teamSize: 25,
      teamDescription: 'Our diverse team of designers, developers, and craftspeople work together to bring your creative visions to life with precision and care.',
      historyText: 'Founded in 2020 during the global pandemic, SS Garment emerged as a beacon of creativity and entrepreneurship in Nepal. Starting with just 3 people and a small workshop in Pokhara, we have grown into a trusted name in custom apparel.',
      achievementsText: 'Over 15,000 satisfied customers, 25,000+ custom designs created, Winner of Nepal Startup Award 2023, Carbon-neutral operations since 2022, Partnership with 50+ local artisans'
    }
  });

  // Create sample categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Classic T-Shirts' },
      update: {},
      create: {
        name: 'Classic T-Shirts',
        description: 'Comfortable everyday wear with timeless appeal',
        active: true
      }
    }),
    prisma.category.upsert({
      where: { name: 'Premium Collection' },
      update: {},
      create: {
        name: 'Premium Collection',
        description: 'High-quality fabric with superior finish',
        active: true
      }
    }),
    prisma.category.upsert({
      where: { name: 'Casual Wear' },
      update: {},
      create: {
        name: 'Casual Wear',
        description: 'Relaxed fit for everyday comfort',
        active: true
      }
    })
  ]);

  // Create sample products with variants and pricing
  const products = await Promise.all([
    prisma.product.upsert({
      where: { sku: 'CLASSIC-RN-001' },
      update: {},
      create: {
        name: 'Classic Round Neck T-Shirt',
        description: 'Comfortable 100% cotton round neck T-shirt perfect for custom designs',
        price: 499,
        originalPrice: 599,
        stock: 50,
        sku: 'CLASSIC-RN-001',
        active: true,
        featured: true,
        tags: ['cotton', 'round-neck', 'classic'],
        categoryId: categories[0].id,
        variants: {
          create: [
            {
              color: 'Black',
              size: 'S',
              type: 'round-neck',
              price: 499,
              stock: 10,
              sku: 'CLASSIC-RN-001-S-BK'
            },
            {
              color: 'Black',
              size: 'M',
              type: 'round-neck',
              price: 499,
              stock: 15,
              sku: 'CLASSIC-RN-001-M-BK'
            },
            {
              color: 'Black',
              size: 'L',
              type: 'round-neck',
              price: 499,
              stock: 20,
              sku: 'CLASSIC-RN-001-L-BK'
            },
            {
              color: 'White',
              size: 'S',
              type: 'round-neck',
              price: 499,
              stock: 12,
              sku: 'CLASSIC-RN-001-S-WH'
            },
            {
              color: 'White',
              size: 'M',
              type: 'round-neck',
              price: 499,
              stock: 18,
              sku: 'CLASSIC-RN-001-M-WH'
            },
            {
              color: 'White',
              size: 'L',
              type: 'round-neck',
              price: 499,
              stock: 25,
              sku: 'CLASSIC-RN-001-L-WH'
            }
          ]
        }
      }
    }),
    prisma.product.upsert({
      where: { sku: 'PREMIUM-CT-002' },
      update: {},
      create: {
        name: 'Premium Cotton Tee',
        description: 'Premium quality cotton T-shirt with superior fabric and finish',
        price: 799,
        originalPrice: 999,
        stock: 30,
        sku: 'PREMIUM-CT-002',
        active: true,
        featured: true,
        tags: ['premium', 'cotton', 'quality'],
        categoryId: categories[1].id,
        variants: {
          create: [
            {
              color: 'Navy',
              size: 'M',
              type: 'round-neck',
              price: 799,
              stock: 8,
              sku: 'PREMIUM-CT-002-M-NV'
            },
            {
              color: 'Navy',
              size: 'L',
              type: 'round-neck',
              price: 799,
              stock: 12,
              sku: 'PREMIUM-CT-002-L-NV'
            },
            {
              color: 'Gray',
              size: 'M',
              type: 'round-neck',
              price: 799,
              stock: 10,
              sku: 'PREMIUM-CT-002-M-GR'
            }
          ]
        }
      }
    })
  ]);

  // Updated T-shirt images using actual user images and additional colors
  console.log('🖼️ Creating T-shirt images...');
  
  // First, delete existing t-shirt images to avoid duplicates
  await prisma.tshirtImage.deleteMany({});

  const tshirtImages = [
    // White T-shirts
    { name: 'White Round Neck', url: '/uploads/white-tshirt.png', color: 'white', type: 'round-neck', order: 1, active: true },
    { name: 'White V-Neck', url: '/uploads/white-tshirt.png', color: 'white', type: 'v-neck', order: 2, active: true },
    
    // Black T-shirts  
    { name: 'Black Round Neck', url: '/uploads/black-tshirt.png', color: 'black', type: 'round-neck', order: 3, active: true },
    { name: 'Black V-Neck', url: '/uploads/black-tshirt.png', color: 'black', type: 'v-neck', order: 4, active: true },
    
    // Red T-shirts (using black as base for now)
    { name: 'Red Round Neck', url: '/uploads/black-tshirt.png', color: 'red', type: 'round-neck', order: 5, active: true },
    { name: 'Red V-Neck', url: '/uploads/black-tshirt.png', color: 'red', type: 'v-neck', order: 6, active: true },
    
    // Navy T-shirts (using black as base for now)
    { name: 'Navy Round Neck', url: '/uploads/black-tshirt.png', color: 'navy', type: 'round-neck', order: 7, active: true },
    { name: 'Navy V-Neck', url: '/uploads/black-tshirt.png', color: 'navy', type: 'v-neck', order: 8, active: true },
    
    // Gray T-shirts (using white as base for now)
    { name: 'Gray Round Neck', url: '/uploads/white-tshirt.png', color: 'gray', type: 'round-neck', order: 9, active: true },
    { name: 'Gray V-Neck', url: '/uploads/white-tshirt.png', color: 'gray', type: 'v-neck', order: 10, active: true },
    
    // Polo styles
    { name: 'White Polo', url: '/uploads/white-tshirt.png', color: 'white', type: 'polo', order: 11, active: true },
    { name: 'Black Polo', url: '/uploads/black-tshirt.png', color: 'black', type: 'polo', order: 12, active: true },
    
    // Hoodie styles  
    { name: 'Black Hoodie', url: '/uploads/black-tshirt.png', color: 'black', type: 'hoodie', order: 13, active: true },
    { name: 'White Hoodie', url: '/uploads/white-tshirt.png', color: 'white', type: 'hoodie', order: 14, active: true },
  ]

  await prisma.tshirtImage.createMany({
    data: tshirtImages,
    skipDuplicates: true
  })

  // Create sample admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@ssgarment.com' },
    update: {},
    create: {
      email: 'admin@ssgarment.com',
      name: 'Admin User',
      phone: '+977 999999999',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE'
    }
  });

  // Create sample regular users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'ram.sharma@gmail.com' },
      update: {},
      create: {
        email: 'ram.sharma@gmail.com',
        name: 'Ram Sharma',
        phone: '+977 9841234567',
        role: 'USER',
        status: 'ACTIVE'
      }
    }),
    prisma.user.upsert({
      where: { email: 'sita.gurung@yahoo.com' },
      update: {},
      create: {
        email: 'sita.gurung@yahoo.com',
        name: 'Sita Gurung',
        phone: '+977 9851234567',
        role: 'USER',
        status: 'ACTIVE'
      }
    }),
    prisma.user.upsert({
      where: { email: 'hari.thapa@hotmail.com' },
      update: {},
      create: {
        email: 'hari.thapa@hotmail.com',
        name: 'Hari Thapa',
        phone: '+977 9861234567',
        role: 'USER',
        status: 'ACTIVE'
      }
    })
  ]);

  // Create sample designs
  const designs = await Promise.all([
    prisma.design.create({
      data: {
        name: 'SS Garment Official Logo',
        description: 'Official SS Garment logo design',
        imageUrl: '/images/logo/ss-logo.png',
        userId: adminUser.id,
        designData: JSON.stringify({
          objects: [
            {
              type: 'image',
              src: '/images/logo/ss-logo.png',
              left: 100,
              top: 100,
              scaleX: 0.5,
              scaleY: 0.5
            }
          ],
          background: 'transparent'
        }),
        isPublic: true,
        isTemplate: true,
        tags: ['logo', 'official', 'brand']
      }
    }),
    prisma.design.create({
      data: {
        name: 'Custom Nepal Design',
        description: 'Made in Nepal text design',
        imageUrl: '/api/placeholder/300/300',
        userId: users[0].id,
        designData: JSON.stringify({
          objects: [
            {
              type: 'text',
              text: 'Made in Nepal',
              left: 50,
              top: 50,
              fontSize: 24,
              fill: '#B91C3C'
            }
          ],
          background: 'white'
        }),
        isPublic: true,
        isTemplate: false,
        tags: ['nepal', 'text', 'patriotic']
      }
    })
  ]);

  console.log('✅ Database seeding completed!');
  console.log(`📊 Created:`);
  console.log(`   - ${categories.length} categories`);
  console.log(`   - ${products.length} products`);
  console.log(`   - ${users.length + 1} users (including admin)`);
  console.log(`   - ${designs.length} sample designs`);
  console.log(`   - ${tshirtImages.length} t-shirt images`);
  console.log(`   - Site settings and content`);
  console.log('');
  console.log('🔑 Admin credentials:');
  console.log('   Email: admin@ssgarment.com');
  console.log('   Note: Use admin1/admin1 for admin panel access');
  console.log('');
  console.log('🌐 Visit: http://localhost:3000/admin');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 