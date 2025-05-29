import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const databaseUrl = process.env.DATABASE_URL;

    return NextResponse.json({
      success: true,
      env_check: {
        supabase_url_exists: !!supabaseUrl,
        supabase_key_exists: !!supabaseKey,
        database_url_exists: !!databaseUrl,
        supabase_url_value: supabaseUrl ? supabaseUrl.substring(0, 30) + '...' : 'NOT_SET',
        node_env: process.env.NODE_ENV
      }
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 