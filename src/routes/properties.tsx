import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Building2, Plus, QrCode, MapPin, Users, TrendingUp, Search, Filter,
  MoreVertical, Eye, Download, Copy, Check, X, Sparkles, Store, Coffee,
  Croissant, ArrowUpRight, Activity, Calendar, Ruler, DollarSign,
} from "lucide-react";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Imóveis Ativos — UrbanaData" },
      { name: "description", content: "Cadastre imóveis comerciais vagos, gere QR Codes e acompanhe a demanda real da comunidade em tempo real." },
    ],
  }),
  component: PropertiesView,
});

type Status = "ativo" | "rascunho" | "pausado";

type Property = {
  id: string;
  code: string;
  name: string;
  address: string;
  neighborhood: string;
  city: string;
  area: number;
  rent: number;
  status: Status;
  votes: number;
  leads: number;
  topCategory: string;
  topIcon: typeof Coffee;
  createdAt: string;
  growth: number;
};

const seed: Property[] = [
  {
    id: "1", code: "URB-0142", name: "Loja Esquina Central",
    address: "Av. Central, 1280", neighborhood: "Centro", city: "Araranguá/SC",
    area: 86, rent: 4800, status: "ativo", votes: 12487, leads: 184,
    topCategory: "Padaria", topIcon: Croissant, createdAt: "12/05/2026", growth: 18.2,
  },
  {
    id: "2", code: "URB-0138", name: "Galpão Comercial Beira-Mar",
    address: "R. das Acácias, 45", neighborhood: "Praia Grande", city: "Araranguá/SC",
    area: 140, rent: 7200, status: "ativo", votes: 8341, leads: 92,
    topCategory: "Café", topIcon: Coffee, createdAt: "02/05/2026", growth: 24.5,
  },
  {
    id: "3", code: "URB-0131", name: "Ponto Comercial Mall Avenida",
    address: "Av. Brasil, 880, sala 12", neighborhood: "Cidade Alta", city: "Araranguá/SC",
    area: 52, rent: 3100, status: "ativo", votes: 5219, leads: 47,
    topCategory: "Pet Shop", topIcon: Store, createdAt: "28/04/2026", growth: 9.7,
  },
  {
    id: "4", code: "URB-0127", name: "Salão Térreo Vila Nova",
    address: "R. Voluntários, 332", neighborhood: "Vila Nova", city: "Araranguá/SC",
    area: 64, rent: 2800, status: "pausado", votes: 1872, leads: 21,
    topCategory: "Mercearia", topIcon: Store, createdAt: "10/04/2026", growth: -2.4,
  },
  {
    id: "5", code: "URB-0119", name: "Sobreloja Centro Histórico",
    address: "R. XV de Novembro, 78", neighborhood: "Centro", city: "Araranguá/SC",
    area: 110, rent: 5400, status: "rascunho", votes: 0, leads: 0,
    topCategory: "—", topIcon: Store, createdAt: "—", growth: 0,
  },
];

const statusStyles: Record<Status, { dot: string; label: string; pill: string }> = {
  ativo:    { dot: "bg-primary",         label: "Ativo",    pill: "text-primary bg-primary/10 border-primary/20" },
  pausado:  { dot: "bg-amber-500",       label: "Pausado",  pill: "text-amber-600 bg-amber-500/10 border-amber-500/20" },
  rascunho: { dot: "bg-muted-foreground", label: "Rascunho", pill: "text-muted-foreground bg-foreground/5 border-foreground/10" },
};

function PropertiesView() {
  const [items, setItems] = useState<Property[]>(seed);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | Status>("all");
  const [modal, setModal] = useState<null | "new" | { kind: "qr"; prop: Property }>(null);

  const filtered = useMemo(() => {
    return items.filter((p) => {
      const match = (p.name + p.address + p.neighborhood + p.code).toLowerCase().includes(search.toLowerCase());
      const fst = filter === "all" || p.status === filter;
      return match && fst;
    });
  }, [items, search, filter]);

  const stats = useMemo(() => ({
    total: items.length,
    active: items.filter((p) => p.status === "ativo").length,
    votes: items.reduce((s, p) => s + p.votes, 0),
    leads: items.reduce((s, p) => s + p.leads, 0),
  }), [items]);

  const handleCreate = (prop: Omit<Property, "id" | "votes" | "leads" | "topCategory" | "topIcon" | "growth" | "createdAt" | "code">) => {
    const id = String(items.length + 1);
    const code = `URB-${String(150 + items.length).padStart(4, "0")}`;
    setItems([
      { ...prop, id, code, votes: 0, leads: 0, topCategory: "—", topIcon: Store, growth: 0, createdAt: new Date().toLocaleDateString("pt-BR"), status: "rascunho" },
      ...items,
    ]);
    setModal(null);
  };

  return (
    <div className="px-4 pb-12 pt-6">
      <div className="mx-auto max-w-7xl space-y-5">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Gestão</div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Imóveis Ativos</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Cadastre pontos comerciais vagos, gere QR Codes e capture demanda real.
            </p>
          </div>
          <button
            onClick={() => setModal("new")}
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:opacity-95 transition shadow-lg shadow-primary/20"
          >
            <Plus className="h-4 w-4" /> Cadastrar imóvel
          </button>
        </div>

        {/* Stat strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Total de imóveis", value: stats.total, icon: Building2, hint: "Na carteira" },
            { label: "Ativos coletando", value: stats.active, icon: Activity, hint: "Captando agora" },
            { label: "Votos acumulados", value: stats.votes.toLocaleString("pt-BR"), icon: Users, hint: "Todos os imóveis" },
            { label: "Leads gerados", value: stats.leads, icon: TrendingUp, hint: "+12% no mês" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="glass rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary grid place-items-center">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{s.hint}</span>
                </div>
                <div className="mt-3 text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                <div className="text-2xl font-bold tracking-tight">{s.value}</div>
              </div>
            );
          })}
        </div>

        {/* Toolbar */}
        <div className="glass rounded-2xl p-3 flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, endereço, código..."
              className="w-full bg-transparent border border-foreground/10 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-primary/40"
            />
          </div>
          <div className="flex items-center gap-1 p-1 rounded-xl border border-foreground/10">
            {(["all", "ativo", "pausado", "rascunho"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition capitalize ${
                  filter === f ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "all" ? "Todos" : f}
              </button>
            ))}
          </div>
          <button className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground border border-foreground/10 rounded-xl">
            <Filter className="h-3.5 w-3.5" /> Mais filtros
          </button>
        </div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {filtered.map((p) => {
            const st = statusStyles[p.status];
            const Icon = p.topIcon;
            return (
              <article key={p.id} className="glass rounded-2xl p-5 flex flex-col gap-4 group hover:shadow-lg transition">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold border ${st.pill}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${st.dot} ${p.status === "ativo" ? "animate-pulse" : ""}`} />
                        {st.label}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">{p.code}</span>
                    </div>
                    <h3 className="mt-2 font-semibold truncate">{p.name}</h3>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5 truncate">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span className="truncate">{p.address} · {p.neighborhood}</span>
                    </div>
                  </div>
                  <button className="p-1.5 rounded-lg hover:bg-foreground/5 text-muted-foreground shrink-0">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-foreground/5 py-2">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center justify-center gap-1">
                      <Ruler className="h-3 w-3" /> Área
                    </div>
                    <div className="text-sm font-bold mt-0.5">{p.area} m²</div>
                  </div>
                  <div className="rounded-xl bg-foreground/5 py-2">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center justify-center gap-1">
                      <DollarSign className="h-3 w-3" /> Aluguel
                    </div>
                    <div className="text-sm font-bold mt-0.5">R$ {p.rent.toLocaleString("pt-BR")}</div>
                  </div>
                  <div className="rounded-xl bg-foreground/5 py-2">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center justify-center gap-1">
                      <Calendar className="h-3 w-3" /> Desde
                    </div>
                    <div className="text-sm font-bold mt-0.5">{p.createdAt.slice(0, 5)}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-xl bg-gradient-to-br from-primary/8 to-accent/5 border border-primary/15 p-3">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Top demanda</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-sm truncate">{p.topCategory}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold">{p.votes.toLocaleString("pt-BR")}</div>
                    <div className="text-[10px] text-muted-foreground">votos</div>
                  </div>
                  {p.growth !== 0 && (
                    <div className={`text-xs font-semibold ${p.growth > 0 ? "text-primary" : "text-amber-600"}`}>
                      {p.growth > 0 ? "+" : ""}{p.growth}%
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setModal({ kind: "qr", prop: p })}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-foreground/10 hover:bg-foreground/5 px-3 py-2 text-xs font-semibold transition"
                  >
                    <QrCode className="h-3.5 w-3.5" /> QR Code
                  </button>
                  <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-foreground text-background px-3 py-2 text-xs font-semibold hover:opacity-90 transition">
                    <Eye className="h-3.5 w-3.5" /> Ver painel
                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </article>
            );
          })}
          {filtered.length === 0 && (
            <div className="md:col-span-2 xl:col-span-3 glass rounded-2xl p-12 text-center">
              <div className="mx-auto h-12 w-12 rounded-2xl bg-foreground/5 grid place-items-center">
                <Building2 className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-semibold">Nenhum imóvel encontrado</h3>
              <p className="text-sm text-muted-foreground mt-1">Ajuste os filtros ou cadastre um novo ponto comercial.</p>
            </div>
          )}
        </div>
      </div>

      {modal === "new" && <NewPropertyModal onClose={() => setModal(null)} onCreate={handleCreate} />}
      {modal && typeof modal === "object" && modal.kind === "qr" && (
        <QrModal prop={modal.prop} onClose={() => setModal(null)} />
      )}
    </div>
  );
}

function NewPropertyModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (p: Omit<Property, "id" | "votes" | "leads" | "topCategory" | "topIcon" | "growth" | "createdAt" | "code">) => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({
    name: "", address: "", neighborhood: "", city: "Araranguá/SC",
    area: 80, rent: 3500,
  });
  const [saving, setSaving] = useState(false);

  const submit = () => {
    setSaving(true);
    setTimeout(() => {
      onCreate({ ...form, status: "rascunho" });
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-strong rounded-3xl w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-foreground/5 text-muted-foreground">
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary grid place-items-center">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Cadastrar novo imóvel</h2>
            <p className="text-xs text-muted-foreground">Etapa {step} de 3</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-5 flex items-center gap-1.5">
          {[1, 2, 3].map((n) => (
            <div key={n} className={`h-1 flex-1 rounded-full ${n <= step ? "bg-primary" : "bg-foreground/10"}`} />
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {step === 1 && (
            <>
              <Field label="Nome interno do imóvel">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ex: Loja esquina Av. Central"
                  className="w-full bg-transparent border border-foreground/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/40" />
              </Field>
              <Field label="Endereço completo">
                <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Rua, número, complemento"
                  className="w-full bg-transparent border border-foreground/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/40" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Bairro">
                  <input value={form.neighborhood} onChange={(e) => setForm({ ...form, neighborhood: e.target.value })}
                    placeholder="Centro"
                    className="w-full bg-transparent border border-foreground/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/40" />
                </Field>
                <Field label="Cidade">
                  <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-transparent border border-foreground/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/40" />
                </Field>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <Field label={`Área útil — ${form.area} m²`}>
                <input type="range" min={20} max={500} value={form.area}
                  onChange={(e) => setForm({ ...form, area: Number(e.target.value) })}
                  className="w-full accent-primary" />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>20 m²</span><span>500 m²</span>
                </div>
              </Field>
              <Field label={`Aluguel pretendido — R$ ${form.rent.toLocaleString("pt-BR")}/mês`}>
                <input type="range" min={500} max={20000} step={100} value={form.rent}
                  onChange={(e) => setForm({ ...form, rent: Number(e.target.value) })}
                  className="w-full accent-primary" />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>R$ 500</span><span>R$ 20.000</span>
                </div>
              </Field>
              <div className="rounded-xl bg-foreground/5 p-3 flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Esses dados aparecem para a comunidade junto com o QR Code e ajudam a calibrar a viabilidade do negócio sugerido.
                </p>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                <div className="text-xs uppercase tracking-wider text-primary font-semibold">Resumo</div>
                <div className="mt-2 space-y-1.5 text-sm">
                  <Row k="Imóvel" v={form.name || "—"} />
                  <Row k="Endereço" v={form.address || "—"} />
                  <Row k="Bairro" v={`${form.neighborhood || "—"} · ${form.city}`} />
                  <Row k="Área" v={`${form.area} m²`} />
                  <Row k="Aluguel" v={`R$ ${form.rent.toLocaleString("pt-BR")}/mês`} />
                </div>
              </div>
              <div className="rounded-xl bg-foreground/5 p-3 flex items-start gap-2">
                <QrCode className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Após criar, geramos automaticamente o QR Code da fachada e o link de votação único.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between gap-2">
          <button
            onClick={() => step === 1 ? onClose() : setStep((step - 1) as 1 | 2 | 3)}
            className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl"
          >
            {step === 1 ? "Cancelar" : "Voltar"}
          </button>
          {step < 3 ? (
            <button
              onClick={() => setStep((step + 1) as 1 | 2 | 3)}
              disabled={step === 1 && (!form.name || !form.address)}
              className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:opacity-95 transition disabled:opacity-40"
            >
              Continuar
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={saving}
              className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:opacity-95 transition disabled:opacity-80 inline-flex items-center gap-2"
            >
              {saving ? "Criando..." : (<><Check className="h-4 w-4" /> Criar imóvel</>)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function QrModal({ prop, onClose }: { prop: Property; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const link = `urbanadata.com/v/${prop.code.toLowerCase()}`;

  const copy = () => {
    navigator.clipboard?.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-strong rounded-3xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-foreground/5 text-muted-foreground">
          <X className="h-4 w-4" />
        </button>

        <div className="text-center">
          <div className="mx-auto h-10 w-10 rounded-xl bg-primary/15 text-primary grid place-items-center">
            <QrCode className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-lg font-bold">QR Code da fachada</h2>
          <p className="text-xs text-muted-foreground mt-1">{prop.name} · {prop.code}</p>
        </div>

        {/* QR */}
        <div className="mt-5 mx-auto w-fit p-5 bg-white rounded-2xl border border-foreground/10">
          <FakeQR seed={prop.code} />
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-xl border border-foreground/10 p-1 pl-3">
          <span className="text-xs font-mono text-muted-foreground truncate flex-1">{link}</span>
          <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-lg bg-foreground/5 hover:bg-foreground/10 px-2.5 py-1.5 text-xs font-semibold transition">
            {copied ? <><Check className="h-3.5 w-3.5 text-primary" /> Copiado</> : <><Copy className="h-3.5 w-3.5" /> Copiar</>}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-foreground/10 hover:bg-foreground/5 px-3 py-2.5 text-xs font-semibold transition">
            <Download className="h-3.5 w-3.5" /> Baixar PNG
          </button>
          <button className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-3 py-2.5 text-xs font-semibold hover:opacity-95 transition">
            <Download className="h-3.5 w-3.5" /> Kit fachada PDF
          </button>
        </div>
      </div>
    </div>
  );
}

function FakeQR({ seed }: { seed: string }) {
  // Deterministic 21x21 pseudo-QR pattern from seed
  const size = 21;
  const cells = useMemo(() => {
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
    const out: boolean[] = [];
    for (let i = 0; i < size * size; i++) {
      h = (h * 1103515245 + 12345) & 0x7fffffff;
      out.push((h % 100) < 48);
    }
    return out;
  }, [seed]);

  const isFinder = (r: number, c: number) => {
    const inBox = (br: number, bc: number) => r >= br && r < br + 7 && c >= bc && c < bc + 7;
    return inBox(0, 0) || inBox(0, size - 7) || inBox(size - 7, 0);
  };

  return (
    <div className="grid gap-px" style={{ gridTemplateColumns: `repeat(${size}, 8px)` }}>
      {Array.from({ length: size * size }).map((_, i) => {
        const r = Math.floor(i / size), c = i % size;
        let filled = cells[i];
        if (isFinder(r, c)) {
          const br = r < 7 ? 0 : size - 7;
          const bc = c < 7 ? 0 : (c >= size - 7 ? size - 7 : 0);
          const lr = r - br, lc = c - bc;
          const ring = lr === 0 || lr === 6 || lc === 0 || lc === 6;
          const center = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4;
          filled = ring || center;
        }
        return <div key={i} className={`h-2 w-2 ${filled ? "bg-foreground" : "bg-transparent"}`} />;
      })}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-xs text-muted-foreground">{k}</span>
      <span className="font-medium truncate text-right">{v}</span>
    </div>
  );
}
