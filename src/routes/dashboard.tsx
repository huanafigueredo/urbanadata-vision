import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard, Building2, BarChart3, Settings, TrendingUp, Users,
  MousePointerClick, Timer, Croissant, Coffee, Dog, Pill, Dumbbell, Laptop,
  Download, FileText, MapPin, Loader2, ArrowUpRight, MessageCircle, Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard B2B — UrbanaData" },
      { name: "description", content: "Painel de inteligência urbana para imobiliárias, proprietários e planejadores." },
    ],
  }),
  component: DashboardView,
});

const navItems = [
  { id: "overview", label: "Visão Geral", icon: LayoutDashboard },
  { id: "properties", label: "Imóveis Ativos", icon: Building2 },
  { id: "reports", label: "Relatórios", icon: BarChart3 },
  { id: "settings", label: "Configurações", icon: Settings },
];

const metrics = [
  { label: "Votos Capturados", value: "12.487", delta: "+18.2%", icon: Users, accent: "emerald" },
  { label: "Categoria mais pedida", value: "Padaria", delta: "42% dos votos", icon: Croissant, accent: "electric" },
  { label: "Conversão Leads/QR", value: "34.8%", delta: "+5.4%", icon: MousePointerClick, accent: "emerald" },
  { label: "Locação estimada", value: "27 dias", delta: "−9 dias", icon: Timer, accent: "electric" },
];

const distribution = [
  { label: "Padaria", pct: 42, icon: Croissant },
  { label: "Café", pct: 28, icon: Coffee },
  { label: "Pet Shop", pct: 15, icon: Dog },
  { label: "Farmácia", pct: 9, icon: Pill },
  { label: "Academia", pct: 4, icon: Dumbbell },
  { label: "Coworking", pct: 2, icon: Laptop },
];

const feedback = [
  { msg: "Sinto muita falta de um café aconchegante para trabalhar.", when: "há 2 min", tag: "Café" },
  { msg: "Padaria de verdade, com pão quente de manhã!", when: "há 8 min", tag: "Padaria" },
  { msg: "Pet shop com banho e tosa seria ótimo.", when: "há 14 min", tag: "Pet Shop" },
  { msg: "Coworking 24h ajudaria os freelancers da região.", when: "há 22 min", tag: "Coworking" },
  { msg: "Farmácia 24h, por favor.", when: "há 31 min", tag: "Farmácia" },
];

function DashboardView() {
  const [active, setActive] = useState("overview");
  const [loading, setLoading] = useState(false);

  const downloadReport = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2200);
  };

  return (
    <div className="px-4 pb-12 pt-6">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-5">
        {/* Sidebar */}
        <aside className="glass-strong rounded-2xl p-3 lg:sticky lg:top-24 lg:self-start">
          <div className="px-3 pt-2 pb-3">
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Painel</div>
            <div className="text-sm font-semibold mt-0.5">B2B & GovTech</div>
          </div>
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition whitespace-nowrap ${
                    isActive ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                  {isActive && <ArrowUpRight className="h-3.5 w-3.5 ml-auto text-primary hidden lg:block" />}
                </button>
              );
            })}
          </nav>

          <div className="mt-3 mx-1 p-3 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <div className="text-xs font-semibold mt-2">Plano Pro</div>
            <div className="text-[11px] text-muted-foreground">8 imóveis ativos</div>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 space-y-5">
          {/* Header */}
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Visão Geral</div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight truncate">Av. Central, 1280</h1>
              <div className="text-sm text-muted-foreground">Centro · Araranguá/SC · Últimos 30 dias</div>
            </div>
            <div className="glass rounded-full px-3 py-1.5 text-xs flex items-center gap-2 shrink-0">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
              <span className="hidden sm:inline">Coletando</span>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
            {metrics.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="glass rounded-2xl p-4 relative overflow-hidden group">
                  <div className={`absolute -top-10 -right-10 h-28 w-28 rounded-full blur-2xl opacity-40 ${m.accent === "emerald" ? "bg-primary" : "bg-accent"}`} />
                  <div className="flex items-start justify-between relative">
                    <div className={`h-9 w-9 rounded-xl grid place-items-center ${m.accent === "emerald" ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"}`}>
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <TrendingUp className={`h-4 w-4 ${m.accent === "emerald" ? "text-primary" : "text-accent"}`} />
                  </div>
                  <div className="mt-4 text-[11px] uppercase tracking-wider text-muted-foreground">{m.label}</div>
                  <div className="mt-1 text-2xl font-bold tracking-tight">{m.value}</div>
                  <div className={`text-xs mt-0.5 ${m.accent === "emerald" ? "text-primary" : "text-accent"}`}>{m.delta}</div>
                </div>
              );
            })}
          </div>

          {/* Analytics row */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
            {/* Distribution */}
            <div className="lg:col-span-3 glass rounded-2xl p-5">
              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="font-semibold">Distribuição da Demanda</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Categorias mais votadas neste imóvel</p>
                </div>
                <span className="text-[11px] text-muted-foreground">12.487 votos</span>
              </div>
              <div className="mt-5 space-y-3.5">
                {distribution.map((d, i) => {
                  const Icon = d.icon;
                  return (
                    <div key={d.label}>
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="font-medium truncate">{d.label}</span>
                        </div>
                        <span className="font-mono text-xs text-muted-foreground shrink-0">{d.pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${i === 0 ? "bg-gradient-to-r from-primary to-emerald-glow" : "bg-gradient-to-r from-accent/70 to-electric-glow/70"}`}
                          style={{ width: `${d.pct}%`, transition: "width 1s ease-out" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Feedback feed */}
            <div className="lg:col-span-2 glass rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Feedback Recente</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Comentários anônimos da comunidade</p>
                </div>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-5 space-y-3 max-h-[320px] overflow-y-auto pr-1">
                {feedback.map((f, i) => (
                  <div key={i} className="rounded-xl bg-foreground/[0.03] border border-foreground/5 p-3">
                    <p className="text-sm leading-snug">"{f.msg}"</p>
                    <div className="flex items-center justify-between mt-2 text-[11px]">
                      <span className="text-primary font-medium">{f.tag}</span>
                      <span className="text-muted-foreground">{f.when}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map + Report */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
            <div className="lg:col-span-3 glass rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Mapa de Calor — Zona Comercial</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Hotspots de votos no raio de 800m</p>
                </div>
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div className="mt-4 relative h-72 rounded-xl overflow-hidden border border-foreground/5 bg-gradient-to-br from-secondary to-white">
                {/* Grid */}
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.05) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                {/* Vector "streets" */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                  <path d="M0,140 Q200,80 400,160" stroke="rgba(15,23,42,0.18)" strokeWidth="2" fill="none" />
                  <path d="M80,0 L120,300" stroke="rgba(15,23,42,0.15)" strokeWidth="2" fill="none" />
                  <path d="M260,0 L300,300" stroke="rgba(15,23,42,0.15)" strokeWidth="2" fill="none" />
                  <path d="M0,220 L400,210" stroke="rgba(15,23,42,0.1)" strokeWidth="1" fill="none" />
                </svg>
                {/* Heat blobs */}
                <div className="absolute left-[40%] top-[35%] h-40 w-40 rounded-full bg-primary/40 blur-3xl animate-pulse-glow" />
                <div className="absolute left-[55%] top-[55%] h-28 w-28 rounded-full bg-accent/40 blur-3xl" />
                <div className="absolute left-[25%] top-[65%] h-20 w-20 rounded-full bg-primary/30 blur-2xl" />
                {/* Pin */}
                <div className="absolute left-[48%] top-[44%]">
                  <div className="relative">
                    <div className="h-3 w-3 rounded-full bg-primary glow-emerald" />
                    <div className="absolute inset-0 h-3 w-3 rounded-full bg-primary animate-ping" />
                  </div>
                </div>
                {/* Legend */}
                <div className="absolute bottom-3 left-3 glass rounded-lg px-2.5 py-1.5 text-[10px] flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Alta demanda
                  <span className="h-1.5 w-1.5 rounded-full bg-accent ml-2" /> Média
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 glass-strong rounded-2xl p-5 relative overflow-hidden flex flex-col">
              <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
              <div className="relative">
                <div className="h-10 w-10 rounded-xl bg-primary/20 grid place-items-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mt-4">Relatório Completo de Demanda</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  PDF executivo com perfil demográfico, projeção de viabilidade e ranking de categorias por zona.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                {[
                  { v: "32p", l: "páginas" },
                  { v: "8", l: "gráficos" },
                  { v: "PDF", l: "formato" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl bg-white/5 py-2.5">
                    <div className="text-sm font-bold">{s.v}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={downloadReport}
                disabled={loading}
                className="mt-auto pt-5"
              >
                <span className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-semibold py-3 text-sm hover:opacity-95 transition disabled:opacity-80">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Gerando relatório...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" /> Baixar Relatório PDF
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
