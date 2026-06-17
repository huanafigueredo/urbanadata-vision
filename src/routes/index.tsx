import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  MapPin, BadgeCheck, Croissant, Dog, Pill, Coffee, Dumbbell, Laptop,
  ShoppingBag, IceCream, Send, Sparkles, CheckCircle2, Share2, Gift, X, Mail,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vote no seu bairro — UrbanaData" },
      { name: "description", content: "Decida qual estabelecimento deve abrir no seu bairro. Sua voz molda a economia local." },
    ],
  }),
  component: VoterView,
});

const categories = [
  { id: "padaria", label: "Padaria", icon: Croissant },
  { id: "petshop", label: "Pet Shop", icon: Dog },
  { id: "farmacia", label: "Farmácia", icon: Pill },
  { id: "cafe", label: "Café", icon: Coffee },
  { id: "academia", label: "Academia", icon: Dumbbell },
  { id: "coworking", label: "Coworking", icon: Laptop },
  { id: "mercado", label: "Mercado", icon: ShoppingBag },
  { id: "sorveteria", label: "Sorveteria", icon: IceCream },
];

function VoterView() {
  const [selected, setSelected] = useState<string | null>(null);
  const [contact, setContact] = useState("");
  const [wantsCoupon, setWantsCoupon] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const selectedCategory = categories.find((c) => c.id === selected);

  return (
    <div className="px-4 pb-24 pt-8 sm:pt-12">
      <div className="mx-auto max-w-2xl">
        {/* Hero */}
        <div className="text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 text-xs text-muted-foreground mb-5">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Inteligência urbana phygital</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-gradient">
            O que falta no seu bairro?<br />
            <span className="text-primary">Você decide.</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
            Seu voto molda a economia local. Diga à comunidade qual estabelecimento deveria abrir aqui.
          </p>
        </div>

        {/* Address badge */}
        <div className="mt-8 glass-strong rounded-2xl p-4 flex items-center gap-3 animate-fade-up" style={{ animationDelay: "0.05s" }}>
          <div className="h-11 w-11 shrink-0 rounded-xl bg-primary/15 grid place-items-center">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Imóvel detectado</div>
            <div className="font-semibold truncate">Av. Central, 1280 — Centro</div>
            <div className="text-xs text-muted-foreground truncate">Araranguá / SC</div>
          </div>
          <div className="flex items-center gap-1 text-primary text-xs font-medium shrink-0">
            <BadgeCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Verificado</span>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-baseline justify-between mb-3 px-1">
            <h2 className="text-sm font-semibold">Escolha uma categoria</h2>
            <span className="text-[11px] text-muted-foreground">{selected ? "1 selecionada" : "Toque para votar"}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSel = selected === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelected(cat.id)}
                  className={`relative group rounded-2xl p-4 text-left transition-all duration-300 ${
                    isSel ? "glass-strong glow-emerald scale-[1.02]" : "glass hover:scale-[1.02] hover:bg-white/[0.08]"
                  }`}
                >
                  <div className={`h-10 w-10 rounded-xl grid place-items-center mb-3 transition ${
                    isSel ? "bg-primary text-primary-foreground" : "bg-white/5 text-white"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-semibold">{cat.label}</div>
                  {isSel && (
                    <CheckCircle2 className="absolute top-3 right-3 h-4 w-4 text-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form */}
        {selected && (
          <div className="mt-6 glass-strong rounded-2xl p-5 animate-fade-up">
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Seu contato</label>
            <div className="mt-2 relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="E-mail ou WhatsApp"
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm placeholder:text-muted-foreground transition"
              />
            </div>
            <label className="mt-3 flex items-start gap-3 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={wantsCoupon}
                onChange={(e) => setWantsCoupon(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded accent-emerald-400"
              />
              <span className="text-muted-foreground leading-snug">
                Quero receber um <span className="text-primary font-medium">cupom de desconto exclusivo</span> quando o estabelecimento inaugurar!
              </span>
            </label>

            <button
              onClick={() => setSubmitted(true)}
              disabled={!contact}
              className="mt-5 w-full relative overflow-hidden rounded-xl bg-primary text-primary-foreground font-semibold py-3.5 text-sm hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 group"
            >
              <Send className="h-4 w-4" />
              Enviar meu voto e garantir benefícios
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700" />
            </button>
          </div>
        )}

        {/* Footer note */}
        <p className="mt-8 text-center text-[11px] text-muted-foreground">
          Powered by <span className="text-white font-semibold">UrbanaData</span> · Dados anônimos · LGPD
        </p>
      </div>

      {/* Success modal */}
      {submitted && (
        <div className="fixed inset-0 z-50 grid place-items-center px-4 bg-black/60 backdrop-blur-md animate-fade-up">
          <div className="w-full max-w-md glass-strong rounded-3xl p-8 text-center relative">
            <button onClick={() => { setSubmitted(false); setSelected(null); setContact(""); }} className="absolute top-4 right-4 h-8 w-8 grid place-items-center rounded-full bg-white/5 hover:bg-white/10 transition">
              <X className="h-4 w-4" />
            </button>

            <div className="mx-auto h-16 w-16 rounded-full bg-primary/20 grid place-items-center animate-pulse-glow">
              <CheckCircle2 className="h-9 w-9 text-primary" />
            </div>
            <h3 className="mt-5 text-2xl font-bold">Voto registrado!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Obrigado por moldar o futuro do seu bairro. Categoria escolhida: <span className="text-white font-semibold">{selectedCategory?.label}</span>
            </p>

            <div className="mt-6 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-5 text-left relative overflow-hidden">
              <div className="absolute -top-6 -right-6 h-24 w-24 bg-primary/20 rounded-full blur-2xl" />
              <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
                <Gift className="h-4 w-4" /> Cupom reservado
              </div>
              <div className="mt-2 text-3xl font-bold text-gradient">15% OFF</div>
              <div className="text-xs text-muted-foreground mt-1">
                Válido na inauguração da nova {selectedCategory?.label.toLowerCase()} em Av. Central.
              </div>
              <div className="mt-3 font-mono text-sm tracking-widest text-primary">URBANA-2026</div>
            </div>

            <button className="mt-6 w-full rounded-xl glass hover:bg-white/10 transition py-3 text-sm font-medium flex items-center justify-center gap-2">
              <Share2 className="h-4 w-4" /> Compartilhar com vizinhos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
