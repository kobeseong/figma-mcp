import { NextResponse } from 'next/server';

// GET 요청 처리
export async function GET() {
  return NextResponse.json({
    message: 'Hello, World!',
    timestamp: new Date().toISOString(),
  });
}
