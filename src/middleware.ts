import { authMiddleware } from '@clerk/nextjs'
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default authMiddleware({
  afterAuth(auth, req) {
    const url = new URL(req.url)
    const path = url.pathname

    // Handle authenticated requests
    if (auth.userId) {
      // Se estiver na raiz, redireciona para /dashboard
      if (path === "/") {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }

      // Para todas as outras rotas autenticadas, permite o acesso
      return NextResponse.next()
    }

    // Handle non-authenticated requests
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(new URL("/sign-in", req.url))
    }

    return NextResponse.next()
  },
  publicRoutes: ["/sign-in", "/sign-up", "/"],
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
