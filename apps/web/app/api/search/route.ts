import { NextResponse } from 'next/server';
import { getAllPostsMeta } from '@/lib/mdx/mdx.service';

export const revalidate = 3600;

export async function GET() {
  const posts = getAllPostsMeta();
  return NextResponse.json({ posts });
}
