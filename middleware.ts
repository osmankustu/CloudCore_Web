// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  //console.log("middleware")

  if (!token) {
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(new URL(`/signin?callbackUrl=${callbackUrl}`, req.url));
  }

  // // istersen burada verify endpointine de sorabilirsin
  // const verifyRes = await fetch("https://senin-backend.com/api/auth/verify", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ token }),
  // });

  // if (verifyRes.status !== 200) {
  //   console.log("token geçersiz → login e atılıyor");
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/account/:path*",
    "/services/:path*",
    "/personel-management/:path*",
    "/customers/:path*",
  ], // korumalı sayfalar
};
