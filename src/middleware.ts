import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-change-me"
);

// Pages that bypass the password reset redirect
const RESET_EXEMPT_PATHS = ["/admin/login", "/admin/reset-password"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("dahab-admin-token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);

      // Force password reset redirect — admin must change default password
      if (
        payload.mustResetPassword === true &&
        !RESET_EXEMPT_PATHS.includes(pathname) &&
        !pathname.startsWith("/api/admin/change-password")
      ) {
        return NextResponse.redirect(
          new URL("/admin/reset-password", request.url)
        );
      }

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
