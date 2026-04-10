import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Minimal middleware - only check if user has auth token
// Actual auth verification happens server-side in admin layouts/pages
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Only protect /admin routes
  if (pathname.startsWith("/admin")) {
    // This is a simple check - actual auth verification happens in the admin layout
    // The middleware just redirects to login if no session token exists
    const sessionToken = request.cookies.get("next-auth.session-token")?.value ||
                         request.cookies.get("__Secure-next-auth.session-token")?.value;

    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
