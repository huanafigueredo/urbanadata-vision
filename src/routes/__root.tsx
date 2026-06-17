import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { MapPin, LayoutDashboard } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center glass rounded-3xl p-10">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">Esta página não existe.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center glass rounded-3xl p-10">
        <h1 className="text-xl font-semibold">Algo deu errado</h1>
        <p className="mt-2 text-sm text-muted-foreground">Tente novamente em instantes.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
            Tentar novamente
          </button>
          <a href="/" className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium hover:bg-white/5 transition">Início</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "UrbanaData — Inteligência Urbana Phygital" },
      { name: "description", content: "Plataforma Phygital de mapeamento de demanda imobiliária comercial." },
      { name: "theme-color", content: "#0B0F19" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function TopNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="mx-auto max-w-7xl glass-strong rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 min-w-0">
          <div className="relative h-8 w-8 shrink-0 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center">
            <MapPin className="h-4 w-4 text-primary-foreground" />
            <div className="absolute inset-0 rounded-xl bg-primary/40 blur-md -z-10 animate-pulse-glow" />
          </div>
          <div className="min-w-0">
            <div className="font-bold tracking-tight truncate">UrbanaData</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground hidden sm:block">Phygital Intelligence</div>
          </div>
        </Link>

        <nav className="glass rounded-full p-1 flex items-center text-sm">
          <Link to="/" className={`px-3 sm:px-4 py-1.5 rounded-full transition flex items-center gap-1.5 ${!isDashboard ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"}`}>
            <MapPin className="h-3.5 w-3.5" />
            <span className="hidden xs:inline sm:inline">Eleitor</span>
          </Link>
          <Link to="/dashboard" className={`px-3 sm:px-4 py-1.5 rounded-full transition flex items-center gap-1.5 ${isDashboard ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"}`}>
            <LayoutDashboard className="h-3.5 w-3.5" />
            <span className="hidden xs:inline sm:inline">Dashboard</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <TopNav />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </QueryClientProvider>
  );
}
