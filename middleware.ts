// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

type TokenPayload = {
  [key: string]: any;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
};

// Helper: token’dan rolleri al ve normalize et
function getRoleClaims(token: string): string[] {
  try {
    const payload = jwt.decode(token) as TokenPayload;
    const roles = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (!roles) return [];
    if (Array.isArray(roles)) return roles.map(r => r.toLowerCase());
    if (typeof roles === "string") return [roles.toLowerCase()];
    return [];
  } catch (err) {
    return [];
  }
}

// Path → gerekli roller mapping (isteğe göre genişlet)
const roleMap: Record<string, string[]> = {
  "/management/services": ["tenant.admin", "service.read", "service.*"], // management sayfası için gerekli roller
  "/management/customers/": ["tenant.admin", "customer.read", "customer.*"],
  "/management/employees/": ["tenant.admin", "employee.read"],
  "/management/my-business": ["tenant.admin", "tenant.manager"],
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // 1️⃣ Token yoksa login sayfasına yönlendir
  if (!token) {
    const callbackUrl = encodeURIComponent(pathname + req.nextUrl.search);
    return NextResponse.redirect(new URL(`/signin?callbackUrl=${callbackUrl}`, req.url));
  }

  // 2️⃣ Token varsa rolleri al
  const roles = getRoleClaims(token);
  //console.log("Kullanıcının rolleri:", roles);

  // 3️⃣ Role kontrolü (roleMap üzerinden)
  const requiredRoles = Object.entries(roleMap).find(([path]) => pathname.startsWith(path))?.[1];

  if (requiredRoles && !requiredRoles.some(role => roles.includes(role.toLowerCase()))) {
    return NextResponse.redirect(new URL("/management/forbidden-403", req.url)); // yetkisiz sayfa
  }

  // 4️⃣ Her şey tamam → sayfayı render et
  return NextResponse.next();
}

export const config = {
  matcher: ["/management/:path*"], // korumalı sayfalar
};

// Açıklama: Bu middleware, yönetim paneli sayfalarına erişimi kontrol eder.
