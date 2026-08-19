// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("gster_auth_token");
  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");

  // Si intenta entrar al dashboard sin sesión activa, se redirige inmediatamente al login
  if (isDashboardRoute && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};