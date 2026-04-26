import { NextRequest, NextResponse } from "next/server";
import { Role } from "./constants/roles";
import { env } from "./env";

export async function proxy(request: NextRequest) {
  let isAdmin = false;
  let isAuthenticated = false;

  const pathName = request.nextUrl.pathname;

  try {
    const res = await fetch(`${env.AUTH_URL}/get-session`, {
      headers: {
        Cookie: request.headers.get("cookie") || "",
      },
    });
    const data = await res.json();

    if (data && data.user) {
      isAuthenticated = true;
      isAdmin = data.user.role === Role.admin;
    }
  } catch {
    // if session fetch fails, treat as unauthenticated
  }

  // check if user not authenticate then send them to the login
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // check if user not Admin and try to go admin-dashboard
  // then redirect to the user dashboard
  if (!isAdmin && pathName.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // check if user is Admin and try to go dashboard
  // then redirect to the user admin-dashboard
  if (isAdmin && pathName.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
