import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ['/', '/transactions', '/categories'];
const publicRoutes = ['/login', '/signup'];

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const token = req.cookies.get('token')?.value;

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    if (isPublicRoute && token) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    return NextResponse.next();
}