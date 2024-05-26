import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
   const token = request.cookies.get('token');
   const { pathname } = request.nextUrl;

   if (!token && pathname !== '/auth/sign-in') {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
   }

   if (token && pathname === '/auth/sign-in') {
      return NextResponse.redirect(new URL('/', request.url));
   }

   return NextResponse.next();
}

export const config = {
   matcher: ['/((?!auth).*)', '/auth/:path*'],
};
