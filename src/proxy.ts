import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function proxy(req) {
        const token = req.nextauth.token;
        const pathname = req.nextUrl.pathname;

        if (pathname.startsWith("/api/razorpay/webhook")) {
            // allow unauthenticated requests to the webhook endpoint
            return NextResponse.next();
        }

        // Handle API routes - return JSON error for unauthenticated requests
        if (pathname.startsWith("/api/") && !pathname.startsWith("/api/auth")) {
            if (!token) {
                return NextResponse.json(
                    { error: "Unauthorized" },
                    { status: 401 }
                );
            }
        }

        // Handle /dashboard routes - require authentication
        if (pathname.startsWith("/dashboard")) {
            if (!token) {
                const authUrl = new URL("/auth/meta", req.url);
                return NextResponse.redirect(authUrl);
            }
        }

        // Handle /onboarding routes
        if (pathname.startsWith("/onboarding")) {
            // Block query params - redirect to clean URL
            const hasQueryParams = req.nextUrl.search.length > 0;
            if (hasQueryParams) {
                const cleanUrl = new URL(pathname, req.url);
                return NextResponse.redirect(cleanUrl);
            }

            // If not authenticated, redirect to /auth/meta with role query param
            if (!token) {
                let role = "campaigner"; // default
                if (pathname.includes("/promoter")) {
                    role = "promoter";
                }
                const authUrl = new URL("/auth/meta", req.url);
                authUrl.searchParams.set("role", role);
                return NextResponse.redirect(authUrl);
            }
        }

        // Additional proxy logic can be added here
        // For example, role-based access control

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const pathname = req.nextUrl.pathname;

                // Define public routes that don't require authentication
                const publicRoutes = ["/", "/auth"];
                const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

                // Allow access to public routes
                if (isPublicRoute) {
                    return true;
                }

                // /onboarding routes require authentication (no query params allowed - handled in proxy function)
                if (pathname.startsWith("/onboarding")) {
                    return !!token;
                }

                // For API routes, we'll handle the response in the proxy function
                // Return true here to let the proxy function handle the response
                if (pathname.startsWith("/api/") && !pathname.startsWith("/api/auth")) {
                    return true;
                }

                // Protected page routes require authentication
                // Return true if user has a valid token
                return !!token;
            },
        },
        pages: {
            signIn: "/auth/meta", // Redirect to your login page
        },
    }
);

// Configure which routes to protect
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api/auth (NextAuth routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc.)
         */
        "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};

