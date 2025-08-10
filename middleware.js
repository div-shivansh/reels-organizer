import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken ({
        req, secret: process.env.NEXTAUTH_SECRET,
    })

    const path = req.nextUrl.pathname

    const mustlogin = ["/profile", "/submission", "/dashboard"]
    const protect = mustlogin.some((p) => path.startsWith(p))

    if(protect && !token) {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    return NextResponse.next()
    
}

export const config = {
    matcher: ["/profile/:path*", "/submission/:path*", "/dashboard/:path*"]
}