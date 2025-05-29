# SS Garment - Custom T-Shirt E-commerce Platform

A comprehensive e-commerce platform for custom T-shirt design, built with Next.js 14, Prisma, and Supabase.

## 🌟 Live Demo

[View Live Demo](https://your-deployment-url.vercel.app) - *Coming Soon*

## 🌟 Features

### Customer Features
- **Custom T-Shirt Design Studio**: Fabric.js powered design canvas
- **AI Background Removal**: PhotoRoom API integration for professional designs
- **Real-time T-Shirt Preview**: See your design on actual product images
- **Multiple T-Shirt Types**: Round neck, V-neck, Polo shirts
- **Color & Size Selection**: Wide variety of colors and sizes
- **Shopping Cart**: Add to cart, quantity management, GST calculation
- **User Authentication**: Login/register system with session management
- **Order Tracking**: Complete order management system

### Admin Features
- **Real-time Dashboard**: Live analytics and statistics from database
- **User Management**: View, edit, delete user accounts
- **Content Management**: Edit hero section, site settings, about page
- **Order Management**: Track and manage customer orders
- **T-Shirt Image Management**: Upload and manage product images
- **Analytics Tracking**: Comprehensive user activity tracking

### Technical Features
- **Database-Driven**: All content managed through Supabase PostgreSQL
- **Real-time Analytics**: Automatic data collection and reporting
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI/UX**: Framer Motion animations and beautiful interface
- **Nepal-Focused**: Local currency (NPR), address, and cultural elements

## 🚀 Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Database**: Supabase (PostgreSQL), Prisma ORM
- **Styling**: Tailwind CSS, Framer Motion
- **Design Canvas**: Fabric.js
- **Image Processing**: PhotoRoom API
- **State Management**: React Context API
- **Notifications**: React Hot Toast
- **Icons**: React Icons (Feather)

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn
- Supabase account
- PhotoRoom API key (for background removal)

## 🛠️ Quick Setup (Development)

### 1. Clone & Install
```bash
git clone https://github.com/Santosh0607/WebApp-Ecommerce.git
cd WebApp-Ecommerce
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL` - Your Supabase database URL
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `PHOTOROOM_API_KEY` - PhotoRoom API key for background removal

### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Deploy schema to Supabase
npx prisma db push

# Seed database with initial data
npm run db:seed
```

### 4. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the website.

## 🚀 Deployment Guide

### Option 1: Vercel (Recommended for Next.js)

1. **Fork this repository** to your GitHub account

2. **Sign up for Vercel** at [vercel.com](https://vercel.com)

3. **Connect your GitHub repo** to Vercel:
   - Click "New Project"
   - Import your forked repository
   - Vercel will detect it's a Next.js project

4. **Add Environment Variables** in Vercel dashboard:
   ```
   DATABASE_URL=your_supabase_database_url
   DIRECT_URL=your_supabase_direct_url
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   PHOTOROOM_API_KEY=your_photoroom_api_key
   NEXTAUTH_SECRET=your_secret_key
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```

5. **Deploy**: Vercel will automatically deploy your app

### Option 2: Netlify

1. Fork this repository
2. Connect to Netlify
3. Add environment variables
4. Deploy

### Option 3: Railway/Heroku

Perfect for full-stack apps with databases.

## 🔑 Admin Access

- **URL**: `/admin`
- **Username**: `admin1`
- **Password**: `admin1`

## 📊 Database Schema

The database includes the following main entities:

### Core Tables
- **Users**: Customer accounts with roles and status
- **Products**: T-shirt products with variants (color, size, type)
- **Orders**: Complete order management with payment tracking
- **Designs**: User-created designs with public templates
- **Categories**: Product categorization

### Content Management
- **SiteSettings**: Website configuration (name, contact, SEO)
- **HeroContent**: Homepage hero section content
- **AboutContent**: About page content

### Analytics
- **Analytics**: User activity tracking and website statistics

## 🎨 Design Features

### T-Shirt Design Studio
- **Canvas Tools**: Text, shapes, image upload
- **Background Removal**: AI-powered background removal
- **Real-time Preview**: See design on actual T-shirt images
- **Save & Share**: Save designs and share with others
- **Templates**: Pre-made design templates

### Product Customization
- **Types**: Round neck, V-neck, Polo
- **Colors**: Black, White, Red, Navy, Gray, and more
- **Sizes**: XS to XXL
- **Real Images**: Actual product photography

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Perfect tablet experience
- **Desktop**: Full-featured desktop interface

## 🌍 Nepal-Specific Features

- **Currency**: Nepalese Rupee (NPR)
- **Address**: Pokhara Bastolathar, Nepal
- **Contact**: +977 999999999
- **Local Focus**: Nepal-centric content and examples

## 📈 Analytics & Tracking

The platform automatically tracks:
- Page views and user sessions
- Design creation and interactions
- Order placement and completion
- User registration and login
- Product views and cart actions

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio
```

## 🔒 Security Notes

- All sensitive data is in `.env` files (not committed to Git)
- Database credentials are secured through environment variables
- API keys are protected and not exposed to client-side
- User authentication is handled securely

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- **Email**: ssgarment@gmail.com
- **Phone**: +977 999999999
- **Address**: Pokhara Bastolathar, Nepal

---

**SS Garment** - Create Unique T-Shirts Your Way 🎨 