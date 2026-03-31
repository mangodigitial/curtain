import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip admin, API, and static file routes
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check for redirects
  try {
    const baseUrl = request.nextUrl.origin;
    const res = await fetch(`${baseUrl}/api/redirects/lookup?path=${encodeURIComponent(pathname)}`, {
      headers: { "x-middleware-request": "1" },
    });

    if (res.ok) {
      const data = await res.json();
      if (data.redirect) {
        const url = request.nextUrl.clone();
        url.pathname = data.redirect.toPath;
        return NextResponse.redirect(url, data.redirect.type);
      }
    }
  } catch {
    // If the redirect lookup fails (e.g., DB not ready), continue normally
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
