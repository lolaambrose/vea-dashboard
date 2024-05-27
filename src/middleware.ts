import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
   const token = request.cookies.get('token');

   if (token && request.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.next();
   }

   if (token && request.nextUrl.pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/admin/default', request.url));
   }

   if (!token && request.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
   }

   return NextResponse.next();
}

export const config = {
   matcher: ['/admin/:path*', '/auth/:path*'],
};
