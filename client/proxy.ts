import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
	// If auth server runs on a different origin (common in deploy and also in my case),
	// this app domain cannot read that cookie in middleware.
	// Let page-level auth checks handle redirects in that case.
	const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
	if (serverURL) {
		try {
			const serverOrigin = new URL(serverURL).origin;
			if (serverOrigin !== request.nextUrl.origin) {
				return NextResponse.next();
			}
		} catch {
			// Ignore malformed URL and continue with cookie check.
		}
	}

	const sessionCookie = getSessionCookie(request);

    // THIS IS NOT SECURE!
    // This is the recommended approach to optimistically redirect users
    // We recommend handling auth checks in each page/route
	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard"], // Specify the routes the middleware applies to
};

// Note for future me: This is not secure. I just want to redirect users to the dashboard if they are logged in.
