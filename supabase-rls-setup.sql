-- Supabase RLS (Row Level Security) Setup
-- This file contains all the RLS policies needed for the SS Garment e-commerce platform

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tshirt_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid()::text = id);

CREATE POLICY "Admins can view all users" ON public.users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

CREATE POLICY "Admins can update any user" ON public.users
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

-- Categories table policies (public read, admin write)
CREATE POLICY "Anyone can view active categories" ON public.categories
    FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage categories" ON public.categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

-- Products table policies (public read, admin write)
CREATE POLICY "Anyone can view active products" ON public.products
    FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage products" ON public.products
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

-- Product images table policies
CREATE POLICY "Anyone can view product images" ON public.product_images
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage product images" ON public.product_images
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

-- Product variants table policies
CREATE POLICY "Anyone can view active product variants" ON public.product_variants
    FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage product variants" ON public.product_variants
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

-- T-shirt images table policies
CREATE POLICY "Anyone can view active tshirt images" ON public.tshirt_images
    FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage tshirt images" ON public.tshirt_images
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

-- Designs table policies
CREATE POLICY "Users can view public designs" ON public.designs
    FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view their own designs" ON public.designs
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can manage their own designs" ON public.designs
    FOR ALL USING (auth.uid()::text = user_id);

CREATE POLICY "Admins can view all designs" ON public.designs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

-- Cart items table policies
CREATE POLICY "Users can manage their own cart items" ON public.cart_items
    FOR ALL USING (auth.uid()::text = user_id);

-- Orders table policies
CREATE POLICY "Users can view their own orders" ON public.orders
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create their own orders" ON public.orders
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own pending orders" ON public.orders
    FOR UPDATE USING (
        auth.uid()::text = user_id 
        AND status IN ('PENDING', 'CONFIRMED')
    );

CREATE POLICY "Admins can view all orders" ON public.orders
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

CREATE POLICY "Admins can update any order" ON public.orders
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

-- Order items table policies (THIS IS THE MAIN SECURITY ISSUE)
CREATE POLICY "Users can view their own order items" ON public.order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.orders 
            WHERE id = order_id 
            AND user_id = auth.uid()::text
        )
    );

CREATE POLICY "Users can create order items for their own orders" ON public.order_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.orders 
            WHERE id = order_id 
            AND user_id = auth.uid()::text
        )
    );

CREATE POLICY "Admins can view all order items" ON public.order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

CREATE POLICY "Admins can manage all order items" ON public.order_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

-- Reviews table policies
CREATE POLICY "Anyone can view approved reviews" ON public.reviews
    FOR SELECT USING (approved = true);

CREATE POLICY "Users can view their own reviews" ON public.reviews
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create their own reviews" ON public.reviews
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own reviews" ON public.reviews
    FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Admins can manage all reviews" ON public.reviews
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

-- Site settings table policies (admin only)
CREATE POLICY "Anyone can view site settings" ON public.site_settings
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage site settings" ON public.site_settings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

-- Hero content table policies
CREATE POLICY "Anyone can view active hero content" ON public.hero_content
    FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage hero content" ON public.hero_content
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

-- About content table policies
CREATE POLICY "Anyone can view about content" ON public.about_content
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage about content" ON public.about_content
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

-- Analytics table policies
CREATE POLICY "Users can create analytics for themselves" ON public.analytics
    FOR INSERT WITH CHECK (
        user_id IS NULL OR auth.uid()::text = user_id
    );

CREATE POLICY "Admins can view all analytics" ON public.analytics
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

-- Create a function to check if user is admin (helper function)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid()::text 
        AND role IN ('ADMIN', 'SUPER_ADMIN')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;

-- Enable realtime for specific tables (optional)
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.order_items;
ALTER PUBLICATION supabase_realtime ADD TABLE public.analytics; 