import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default function customAuthMiddleware(req) {
  if (req.nextUrl.pathname === "/factor-one") {
    // Construct the redirect URL from the request
    const redirectUrl = new URL("/sign-in/factor-one", req.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }

  // Call Clerk's authMiddleware for all other routes
  return authMiddleware({
    publicRoutes: ["/", "/profile", "/register", "test"],
  })(req);
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
