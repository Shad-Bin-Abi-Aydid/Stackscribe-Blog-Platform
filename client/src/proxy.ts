import { NextRequest, NextResponse } from "next/server";
import { userServices } from "./services/user.services";
import { Role } from "./constants/roles";

export async function proxy(request: NextRequest) {
  let isAdmin = false;
  let isAuthenticated = false;

  const pathName = request.nextUrl.pathname;

  const { data } = await userServices.getSession();

  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === Role.admin;
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
