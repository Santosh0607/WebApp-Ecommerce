# Security Setup Guide

This document provides a comprehensive guide to setting up security for the SS Garment e-commerce platform.

## 🔒 Security Issues Fixed

### 1. Supabase Row Level Security (RLS) 
**Issue**: Table `public.order_items` and other tables were public without RLS enabled.

**Solution**: Created comprehensive RLS policies in `supabase-rls-setup.sql`

### 2. Exposed API Keys
**Issue**: API keys were hardcoded in the source code as fallback values.

**Files Fixed**:
- `app/api/remove-background/route.ts` - Removed exposed PhotoRoom sandbox key
- `app/lib/database.ts` - Removed Supabase fallback URLs

## 🚀 Setup Instructions

### Step 1: Apply RLS Policies

1. Go to your Supabase Dashboard
2. Navigate to the SQL Editor
3. Copy the contents of `supabase-rls-setup.sql`
4. Execute the SQL script
5. Verify all tables have RLS enabled

### Step 2: Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Fill in all required environment variables:

- `DATABASE_URL` - Your Supabase database URL
- `DIRECT_URL` - Your Supabase direct URL (for migrations)
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `PHOTOROOM_API_KEY` - Your PhotoRoom API key for background removal

### Step 3: Verify Security Setup

Run the following checks:

1. **RLS Status Check**:
   ```sql
   SELECT schemaname, tablename, rowsecurity 
   FROM pg_tables 
   WHERE schemaname = 'public' 
   AND rowsecurity = false;
   ```
   This should return no results if RLS is properly enabled.

2. **Policy Check**:
   ```sql
   SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
   FROM pg_policies 
   WHERE schemaname = 'public';
   ```

3. **Test API Endpoints**: Ensure all API endpoints require proper authentication.

## 🛡️ Security Features Implemented

### User Authentication & Authorization
- Role-based access control (USER, ADMIN, SUPER_ADMIN)
- User-specific data access policies
- Admin-only operations protection

### Data Protection
- **Users**: Can only view/edit their own profile
- **Orders**: Users can only access their own orders
- **Order Items**: Users can only view items from their own orders
- **Cart Items**: Users can only manage their own cart
- **Designs**: Users can access public designs and their own private designs
- **Reviews**: Users can manage their own reviews, public can view approved reviews

### Admin Privileges
- Full access to all data for administrative users
- Content management capabilities
- User management features
- Analytics access

### Public Access
- Product catalog (active products only)
- Product images and variants
- Approved reviews
- Site settings and content

## 🔧 Testing Security

### Test User Access
1. Create a test user account
2. Try to access other users' data (should fail)
3. Try to access admin-only endpoints (should fail)

### Test Admin Access
1. Create an admin user account
2. Verify admin can access all necessary data
3. Test admin-only operations

### Test Public Access
1. Test without authentication
2. Verify only public data is accessible

## 📝 Security Best Practices

1. **Environment Variables**: Never commit `.env` files to git
2. **API Keys**: Use environment variables for all sensitive keys
3. **Database Access**: Always use RLS policies
4. **Authentication**: Implement proper session management
5. **Validation**: Validate all inputs on both client and server
6. **HTTPS**: Use HTTPS in production
7. **Regular Updates**: Keep dependencies updated

## 🚨 Security Checklist

- [ ] RLS enabled on all tables
- [ ] Policies created for all tables
- [ ] No hardcoded API keys in source code
- [ ] Environment variables properly configured
- [ ] Database migrations secure
- [ ] API endpoints protected
- [ ] User roles properly implemented
- [ ] Admin access restricted
- [ ] Input validation implemented
- [ ] Error handling doesn't expose sensitive data

## 🔄 Maintenance

### Regular Security Tasks
1. Review and update RLS policies
2. Audit user permissions
3. Monitor for security vulnerabilities
4. Update dependencies regularly
5. Review access logs

### Emergency Procedures
If you suspect a security breach:
1. Immediately change all API keys
2. Review access logs
3. Check for unauthorized data access
4. Update all user passwords if necessary
5. Review and update security policies

## 📞 Support

For security-related issues:
- Review this documentation
- Check Supabase RLS documentation
- Contact the development team
- Consider security audit if needed 