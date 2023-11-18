import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
 
export default authMiddleware({
  afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      if (
        req.nextUrl.pathname === "/sign-in" ||
        req.nextUrl.pathname === "/sign-up"
      ) {
        const url = new URL("/", req.url);
        return NextResponse.redirect(url);
      }
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },
    publicRoutes: ['/']
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};