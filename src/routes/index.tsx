import { createFileRoute, Link } from "@tanstack/react-router";
import {
  QrCode, MapPin, BarChart3, Sparkles, ArrowRight, ShieldCheck, Zap,
  Building2, Users, TrendingUp, FileText, Store, Landmark, Briefcase,
  Check, Star, ChevronRight, Croissant, Coffee, Dog, Pill,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UrbanaData — Inteligência urbana phygital para o varejo" },
      { name: "description", content: "Transforme imóveis comerciais vagos em laboratórios de demanda. Capture votos reais da comunidade e alugue mais rápido com dados." },
      { property: "og:title", content: "UrbanaData — Inteligência urbana phygital" },
      { property: "og:description", content: "QR no imóvel, voto da comunidade, dashboard de demanda. Locação inteligente para o varejo." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Logos />
      <HowItWorks />
      <Features />
      <Audiences />
      <LiveDemand />
      <Pricing />
      <FinalCta />
      <Footer />
    </div>
  );
}

/* -------------------- HERO -------------------- */
function Hero() {
  return (
    <section className="relative px-4 pt-12 sm:pt-20 pb-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Plataforma Phygital · Imóveis + Dados</span>
            </div>
            <h1 className="mt-5 text-4xl sm:text-6xl font-bold tracking-tight leading-[1.02]">
              <span className="text-gradient">A cidade vota.</span>{" "}
              <span className="text-gradient-brand">O comércio responde.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              UrbanaData transforma cada imóvel comercial vago em um sensor de demanda.
              Um QR Code na fachada, votos reais da comunidade, e um dashboard que mostra
              exatamente que tipo de negócio o bairro está pedindo.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/dashboard"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-semibold hover:opacity-90 transition"
              >
                Ver dashboard ao vivo
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
              </Link>
              <Link
                to="/vote"
                className="inline-flex items-center gap-2 glass rounded-full px-5 py-3 text-sm font-semibold hover:bg-white/80 transition"
              >
                <QrCode className="h-4 w-4 text-primary" />
                Experimentar voto da comunidade
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> LGPD compliant</span>
              <span className="inline-flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-accent" /> Setup em 48h</span>
              <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-primary" /> 4.9 / 5 satisfação</span>
            </div>
          </div>

          <HeroMock />
        </div>
      </div>
    </section>
  );
}

function HeroMock() {
  return (
    <div className="relative animate-fade-up" style={{ animationDelay: "0.1s" }}>
      <div className="absolute -inset-6 bg-gradient-to-tr from-primary/20 via-accent/15 to-transparent blur-3xl -z-10" />

      {/* Phone */}
      <div className="relative mx-auto w-[280px] sm:w-[300px] animate-float">
        <div className="glass-strong rounded-[2.2rem] p-3 border border-foreground/5">
          <div className="rounded-[1.8rem] bg-white p-5 h-[480px] relative overflow-hidden">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span>9:41</span>
              <span>UrbanaData</span>
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-secondary p-2.5">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <div className="text-[11px] font-medium truncate">Av. Central, 1280</div>
            </div>
            <div className="mt-4 text-[15px] font-bold leading-tight">
              O que falta no seu bairro?
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                { Icon: Croissant, label: "Padaria", sel: true },
                { Icon: Coffee, label: "Café" },
                { Icon: Dog, label: "Pet Shop" },
                { Icon: Pill, label: "Farmácia" },
              ].map(({ Icon, label, sel }) => (
                <div
                  key={label}
                  className={`rounded-xl p-2.5 border text-left ${
                    sel ? "border-primary bg-primary/8 glow-emerald" : "border-foreground/8 bg-white"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${sel ? "text-primary" : "text-muted-foreground"}`} />
                  <div className="text-[11px] font-semibold mt-1.5">{label}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-foreground text-background text-[11px] font-semibold py-2.5 text-center">
              Enviar meu voto
            </div>
            <div className="absolute bottom-3 right-3 text-[9px] text-muted-foreground">via QR Code</div>
          </div>
        </div>
      </div>

      {/* Floating cards */}
      <div className="hidden sm:block absolute -left-6 top-10 glass-strong rounded-2xl p-3.5 w-44 animate-float" style={{ animationDelay: "0.6s" }}>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/15 grid place-items-center">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Votos hoje</div>
            <div className="font-bold">+412</div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block absolute -right-4 bottom-12 glass-strong rounded-2xl p-3.5 w-48 animate-float" style={{ animationDelay: "1.2s" }}>
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Top categoria</div>
        <div className="mt-1 flex items-center justify-between">
          <span className="font-bold">Padaria</span>
          <span className="text-primary font-mono text-sm">42%</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-foreground/5 overflow-hidden">
          <div className="h-full w-[42%] bg-gradient-to-r from-primary to-emerald-glow rounded-full" />
        </div>
      </div>
    </div>
  );
}

/* -------------------- LOGOS -------------------- */
function Logos() {
  const names = ["Imobiliária Sul", "Prefeitura · Araranguá", "Centro Empresarial", "VarejoLab", "Distrito Verde", "Faro Capital"];
  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Confiado por imobiliárias, prefeituras e investidores
        </p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-4 items-center">
          {names.map((n) => (
            <div key={n} className="text-center text-sm font-semibold text-muted-foreground/70 hover:text-foreground transition truncate">
              {n}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- HOW IT WORKS -------------------- */
function HowItWorks() {
  const steps = [
    {
      n: "01", title: "Adesivo + QR no imóvel", icon: QrCode,
      desc: "Em menos de 5 minutos, qualquer ponto comercial vago vira um sensor de demanda phygital."
    },
    {
      n: "02", title: "Comunidade vota e deixa contato", icon: Users,
      desc: "Cidadãos escolhem o tipo de negócio que querem ver no bairro — e ganham cupom de inauguração."
    },
    {
      n: "03", title: "Dashboard com demanda real", icon: BarChart3,
      desc: "Você recebe ranking de categorias, hotspots no mapa, leads qualificados e relatório PDF executivo."
    },
  ];
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Como funciona"
          title="Da fachada vazia ao dado acionável"
          subtitle="Três passos para transformar qualquer ponto comercial em inteligência urbana."
        />
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="glass rounded-3xl p-6 relative overflow-hidden group hover:-translate-y-1 transition" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition" />
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 grid place-items-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{s.n}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------- FEATURES -------------------- */
function Features() {
  const items = [
    { icon: MapPin, title: "Mapa de calor de demanda", desc: "Visualize hotspots ao redor de cada imóvel num raio de 800m." },
    { icon: Users, title: "Leads qualificados", desc: "Capture e-mail/WhatsApp de cada interessado, com consentimento LGPD." },
    { icon: FileText, title: "Relatório executivo PDF", desc: "32 páginas com perfil demográfico, viabilidade e ranking de categorias." },
    { icon: TrendingUp, title: "Score de viabilidade", desc: "Algoritmo de match entre demanda local e tipo de negócio." },
    { icon: ShieldCheck, title: "Dados anonimizados", desc: "Privacidade by design. Conformidade LGPD ponta a ponta." },
    { icon: Zap, title: "Setup em 48h", desc: "Adesivo, QR, dashboard ativo. Sem integração técnica do cliente." },
  ];
  return (
    <section className="px-4 py-20 relative">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Plataforma"
          title="Tudo que você precisa para alugar mais rápido"
          subtitle="Da captura de voto na rua à decisão estratégica no escritório."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="glass rounded-2xl p-5 hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.18)] transition">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------- AUDIENCES -------------------- */
function Audiences() {
  const audiences = [
    {
      icon: Building2, label: "Imobiliárias",
      bullets: ["Alugue 60% mais rápido", "Argumento de venda com dados", "Pipeline de inquilinos com leads pré-qualificados"],
    },
    {
      icon: Landmark, label: "Prefeituras · GovTech",
      bullets: ["Planejamento urbano participativo", "Mapa de vocação econômica por zona", "Dados abertos para políticas públicas"],
    },
    {
      icon: Briefcase, label: "Investidores e Franquias",
      bullets: ["Validação de praça antes da abertura", "Heatmap de demanda real, não estimada", "Redução de risco em novos pontos"],
    },
  ];
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Para quem é"
          title="Três stakeholders, uma mesma fonte de verdade"
          subtitle="UrbanaData conecta proprietário, poder público e empreendedor com o mesmo dado, em tempo real."
        />
        <div className="mt-12 grid md:grid-cols-3 gap-3">
          {audiences.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.label} className="glass-strong rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />
                <div className="h-11 w-11 rounded-xl bg-foreground text-background grid place-items-center">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{a.label}</h3>
                <ul className="mt-4 space-y-2.5">
                  {a.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------- LIVE DEMAND -------------------- */
function LiveDemand() {
  const items = [
    { city: "Araranguá / SC", neigh: "Centro", cat: "Padaria", pct: 42 },
    { city: "Tubarão / SC", neigh: "Oficinas", cat: "Café", pct: 38 },
    { city: "Criciúma / SC", neigh: "Pio Corrêa", cat: "Pet Shop", pct: 31 },
    { city: "Florianópolis / SC", neigh: "Trindade", cat: "Coworking", pct: 27 },
  ];
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl glass-strong rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative grid lg:grid-cols-[1fr_1.2fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
              Demanda ao vivo
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
              O que os bairros estão pedindo <span className="text-gradient-brand">agora</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Snapshot anônimo dos imóveis ativos na rede UrbanaData. Atualizado em tempo real.
            </p>
            <Link to="/dashboard" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
              Abrir dashboard completo <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {items.map((it) => (
              <div key={it.city} className="glass rounded-2xl p-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-foreground/5 grid place-items-center shrink-0">
                  <Store className="h-5 w-5 text-foreground/70" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold truncate">{it.cat} — {it.neigh}</div>
                  <div className="text-xs text-muted-foreground">{it.city}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono text-sm font-bold text-primary">{it.pct}%</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">demanda</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- PRICING -------------------- */
function Pricing() {
  const plans = [
    {
      name: "Starter", price: "R$ 290", per: "/imóvel/mês",
      desc: "Para corretores autônomos validando um ponto.",
      features: ["1 imóvel ativo", "QR + landing de votação", "Dashboard básico", "Relatório resumido"],
      cta: "Começar agora", highlight: false,
    },
    {
      name: "Pro", price: "R$ 890", per: "/mês",
      desc: "Para imobiliárias com portfólio comercial.",
      features: ["Até 8 imóveis ativos", "Leads qualificados ilimitados", "Heatmap + relatório PDF completo", "API de exportação", "Suporte prioritário"],
      cta: "Solicitar demo", highlight: true,
    },
    {
      name: "GovTech", price: "Sob consulta", per: "",
      desc: "Para prefeituras e operadoras de cidade.",
      features: ["Imóveis ilimitados", "Painel municipal multi-zona", "Dados abertos exportáveis", "Onboarding dedicado", "SLA enterprise"],
      cta: "Falar com vendas", highlight: false,
    },
  ];
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Planos"
          title="Comece com um imóvel. Escale para uma cidade."
          subtitle="Sem fidelidade, sem taxa de setup. Cancele quando quiser."
        />
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-3xl p-7 relative ${
                p.highlight
                  ? "bg-foreground text-background shadow-[0_30px_80px_-30px_rgba(15,23,42,0.5)]"
                  : "glass"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary text-primary-foreground text-[10px] uppercase tracking-wider font-bold px-3 py-1">
                  Mais escolhido
                </div>
              )}
              <h3 className={`text-sm font-semibold uppercase tracking-wider ${p.highlight ? "text-background/60" : "text-muted-foreground"}`}>
                {p.name}
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight">{p.price}</span>
                <span className={`text-sm ${p.highlight ? "text-background/60" : "text-muted-foreground"}`}>{p.per}</span>
              </div>
              <p className={`mt-2 text-sm ${p.highlight ? "text-background/70" : "text-muted-foreground"}`}>{p.desc}</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className={`h-4 w-4 mt-0.5 shrink-0 ${p.highlight ? "text-primary" : "text-primary"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-7 w-full rounded-xl py-3 text-sm font-semibold transition ${
                  p.highlight
                    ? "bg-background text-foreground hover:opacity-90"
                    : "bg-foreground text-background hover:opacity-90"
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- FINAL CTA -------------------- */
function FinalCta() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="relative rounded-3xl overflow-hidden glass-strong p-10 sm:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/15" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Pronto para deixar a <span className="text-gradient-brand">cidade votar</span> no seu imóvel?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Ative seu primeiro imóvel hoje. Em 48h você tem QR na fachada e o primeiro dashboard de demanda.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-semibold hover:opacity-90 transition">
                Quero meu dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/vote" className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 text-sm font-semibold hover:bg-white/80 transition">
                Ver experiência do eleitor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- FOOTER -------------------- */
function Footer() {
  return (
    <footer className="px-4 pt-10 pb-12 border-t border-foreground/5 mt-10">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-primary to-accent grid place-items-center">
            <MapPin className="h-3 w-3 text-white" />
          </div>
          <span><strong className="text-foreground">UrbanaData</strong> · Inteligência urbana phygital</span>
        </div>
        <div className="flex items-center gap-5">
          <a className="hover:text-foreground transition" href="#">Privacidade</a>
          <a className="hover:text-foreground transition" href="#">Termos</a>
          <a className="hover:text-foreground transition" href="#">Contato</a>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}

/* -------------------- HELPERS -------------------- */
function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">{eyebrow}</div>
      <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-gradient">{title}</h2>
      <p className="mt-3 text-muted-foreground">{subtitle}</p>
    </div>
  );
}
