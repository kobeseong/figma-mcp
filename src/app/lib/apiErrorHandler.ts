import { NextResponse } from 'next/server';

interface ApiErrorResponse {
  success: false;
  error: string;
  timestamp: string;
}

export function apiErrorHandler(errorMessage: string): NextResponse {
  const response: ApiErrorResponse = {
    success: false,
    error: errorMessage,
    timestamp: new Date().toISOString(),
  };

  console.error('[API ERROR]', errorMessage);

  return NextResponse.json(response, { status: 400 });
}

export function apiSuccessHandler(
  message: string,
  data?: unknown,
): NextResponse {
  const response: Record<string, unknown> = {
    success: true,
    message,
    timestamp: new Date().toISOString(),
  };

  if (data) {
    response.data = data;
  }

  return NextResponse.json(response);
}
