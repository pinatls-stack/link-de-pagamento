"use client";

import { useRouter } from "next/navigation";
import {
  Home,
  Library,
  FilePlus,
  MessageCircle,
  MoreHorizontal,
  Signal,
  Wifi,
  Battery,
  LogOut,
  Star,
  Newspaper,
  MessageSquare,
} from "lucide-react";

// ── Assets (Figma MCP) ────────────────────────────────────────────────────────
const imgFoto     = "https://www.figma.com/api/mcp/asset/108e6357-f7f9-4d2d-b7dd-5df9f23ce9be";
const imgFoto1    = "https://www.figma.com/api/mcp/asset/2e1650d8-3518-4b61-a3ca-ba2d61d9fddb";
const imgFoto2    = "https://www.figma.com/api/mcp/asset/fbac7b40-fb87-4e1a-89e9-a1b11d5c2018";

// ── Nav config ────────────────────────────────────────────────────────────────
const NAV = [
  { id: "inicio",   Icon: Home,           label: "Início",   href: "/jornada" },
  { id: "recursos", Icon: Library,        label: "Recursos", href: "/recursos" },
  { id: "nota",     Icon: FilePlus,       label: "Emissão",  href: "#" },
  { id: "claudia",  Icon: MessageCircle,  label: "Cláudia",  href: "#" },
  { id: "mais",     Icon: MoreHorizontal, label: "Mais",     href: "#" },
];

// ── Card components ───────────────────────────────────────────────────────────

interface BannerCardProps {
  title: string;
  description: string;
  iconBg: string;
  icon: React.ReactNode;
}

function BannerCard({ title, description, iconBg, icon }: BannerCardProps) {
  return (
    <div
      className="flex-shrink-0 w-[200px] flex flex-col gap-3 p-4 rounded-xl"
      style={{ border: "1px solid var(--border)", background: "var(--background)", scrollSnapAlign: "start" }}
    >
      <div
        className="w-10 h-10 rounded-[20px] flex items-center justify-center"
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <span
          className="text-[14px] font-medium leading-[20px]"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </span>
        <span
          className="text-[12px] font-normal leading-[18px]"
          style={{ color: "var(--muted-foreground)" }}
        >
          {description}
        </span>
      </div>
    </div>
  );
}

interface BenefitCardProps {
  title: string;
  description: string;
  imgSrc: string;
  cta: string;
}

function BenefitCard({ title, description, imgSrc, cta }: BenefitCardProps) {
  return (
    <div
      className="flex-shrink-0 w-[200px] flex flex-col gap-4 p-4 rounded-xl"
      style={{ border: "1px solid var(--border)", background: "var(--background)", scrollSnapAlign: "start" }}
    >
      <div className="flex flex-col gap-0.5">
        <span
          className="text-[14px] font-semibold leading-[20px]"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </span>
        <span
          className="text-[12px] font-normal leading-[18px]"
          style={{ color: "var(--muted-foreground)" }}
        >
          {description}
        </span>
      </div>
      <div className="h-[108px] rounded-lg overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgSrc} alt={title} className="w-full h-full object-cover" />
      </div>
      <button
        className="self-start text-[12px] font-medium px-2 py-1.5 rounded-lg"
        style={{
          border: "1px solid var(--border)",
          background: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        {cta}
      </button>
    </div>
  );
}

interface ListItemProps {
  iconBg: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  cta: string;
}

function ListItem({ iconBg, icon, title, subtitle, cta }: ListItemProps) {
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl"
      style={{ border: "1px solid var(--border)" }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span
          className="text-[14px] font-semibold leading-[20px]"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </span>
        <span
          className="text-[12px] leading-[18px]"
          style={{ color: "var(--muted-foreground)" }}
        >
          {subtitle}
        </span>
      </div>
      <button
        className="flex-shrink-0 text-[12px] font-medium px-2 py-1.5 rounded-lg whitespace-nowrap"
        style={{
          border: "1px solid var(--border)",
          background: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        {cta}
      </button>
    </div>
  );
}

// ── Section header ─────────────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-[16px] font-medium leading-[24px]"
      style={{ color: "var(--foreground)" }}
    >
      {children}
    </span>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RecursosPage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex justify-center items-center"
      style={{ background: "var(--secondary)" }}
    >
      <div className="relative w-[390px] h-[844px] bg-background overflow-hidden flex flex-col rounded-[40px] shadow-2xl">

        {/* Dynamic Island */}
        <div className="flex justify-center pt-3 flex-shrink-0">
          <div className="w-[126px] h-[37px] bg-foreground rounded-full" />
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-6 py-1 flex-shrink-0">
          <span className="text-[13px] font-semibold text-foreground">9:41</span>
          <div className="flex items-center gap-2 text-foreground">
            <Signal size={14} />
            <Wifi size={14} />
            <Battery size={14} />
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ minHeight: 0 }}>
          <div className="flex flex-col gap-8 pt-5 pb-6">

            {/* Header */}
            <div className="flex items-center justify-between px-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--secondary)" }}
                >
                  <svg
                    width="20" height="20" viewBox="0 0 24 24" fill="none"
                    aria-hidden="true"
                    stroke="currentColor" strokeWidth="1.5"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-semibold leading-[20px]" style={{ color: "var(--foreground)" }}>
                    Nome do cliente
                  </span>
                  <span className="text-[12px] leading-[18px]" style={{ color: "var(--muted-foreground)" }}>
                    0000.0000.0000/00
                  </span>
                </div>
              </div>
              <button
                aria-label="Sair"
                className="w-9 h-9 flex items-center justify-center rounded-lg"
                style={{ border: "1px solid var(--border)", background: "var(--background)" }}
              >
                <LogOut size={18} style={{ color: "var(--muted-foreground)" }} aria-hidden="true" />
              </button>
            </div>

            {/* Para minha contabilidade */}
            <div className="flex flex-col gap-4">
              <div className="px-6"><SectionTitle>Para minha contabilidade</SectionTitle></div>
              {/* overflow-x-auto no container block; inline-flex interno cresce livremente */}
              <div className="w-full overflow-x-auto scrollbar-hide" style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
                <div className="inline-flex gap-4 pb-1" style={{ paddingLeft: 24, paddingRight: 24 }}>
                  <BannerCard
                    title="Jornada contábil"
                    description="Acompanhe suas tarefas mensais"
                    iconBg="var(--purple-100)"
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"
                        stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--primary)" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                      </svg>
                    }
                  />
                  <BannerCard
                    title="Simulador de imposto"
                    description="Veja quanto irá pagar"
                    iconBg="var(--purple-100)"
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"
                        stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--primary)" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25v-.008Zm2.498-4.5h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007v-.008Zm2.504-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm-2.508 0h.008v.008h-.008v-.008ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.598 4.5 4.718V19.5a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V4.718c0-1.12-.806-2.019-1.907-2.147A48.507 48.507 0 0 0 12 2.25Z" />
                      </svg>
                    }
                  />
                  <BannerCard
                    title="Pague menos imposto"
                    description="Simule estratégias de redução"
                    iconBg="var(--purple-100)"
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"
                        stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--primary)" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                      </svg>
                    }
                  />
                  <BannerCard
                    title="Nota fiscal"
                    description="Emita suas notas"
                    iconBg="var(--purple-100)"
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"
                        stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--primary)" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                      </svg>
                    }
                  />
                </div>
              </div>
            </div>

            {/* Para minhas finanças */}
            <div className="flex flex-col gap-4">
              <div className="px-6"><SectionTitle>Para minhas finanças</SectionTitle></div>
              <div className="w-full overflow-x-auto scrollbar-hide" style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
                <div className="inline-flex gap-4 pb-1" style={{ paddingLeft: 24, paddingRight: 24 }}>
                  <BannerCard
                    title="Elizeo"
                    description="Seu agente de cobranças"
                    iconBg="#e1edff"
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"
                        stroke="currentColor" strokeWidth="1.5" style={{ color: "#114593" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253M3 12a8.96 8.96 0 0 0 .284 2.253" />
                      </svg>
                    }
                  />
                  <BannerCard
                    title="Conciliação automática"
                    description="Conecte seu banco"
                    iconBg="#e1edff"
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"
                        stroke="currentColor" strokeWidth="1.5" style={{ color: "#114593" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                      </svg>
                    }
                  />
                  <BannerCard
                    title="Link de pagamento"
                    description="Cobre via Pix ou cartão"
                    iconBg="#e1edff"
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"
                        stroke="currentColor" strokeWidth="1.5" style={{ color: "#114593" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                      </svg>
                    }
                  />
                  <BannerCard
                    title="Câmbio"
                    description="Receba do exterior"
                    iconBg="#e1edff"
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"
                        stroke="currentColor" strokeWidth="1.5" style={{ color: "#114593" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    }
                  />
                </div>
              </div>
            </div>

            {/* Meus benefícios */}
            <div className="flex flex-col gap-4">
              <div className="px-6"><SectionTitle>Meus benefícios</SectionTitle></div>
              <div className="w-full overflow-x-auto scrollbar-hide" style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
                <div className="inline-flex gap-4 pb-1" style={{ paddingLeft: 24, paddingRight: 24 }}>
                  <BenefitCard
                    title="Wellhub"
                    description="Tenha acesso a academias e diversos esportes"
                    imgSrc={imgFoto}
                    cta="Conhecer"
                  />
                  <BenefitCard
                    title="Starbem"
                    description="Acesso a psicólogos e nutricionistas"
                    imgSrc={imgFoto1}
                    cta="Conhecer"
                  />
                  <BenefitCard
                    title="Indique e ganhe"
                    description="Ganhe R$ 100,00 de desconto por cada indicação"
                    imgSrc={imgFoto2}
                    cta="Indicar"
                  />
                </div>
              </div>
            </div>

            {/* Dúvidas */}
            <div className="flex flex-col gap-4 px-6">
              <SectionTitle>Dúvidas</SectionTitle>
              <ListItem
                iconBg="var(--secondary)"
                icon={
                  <MessageSquare size={18} style={{ color: "var(--muted-foreground)" }} aria-hidden="true" />
                }
                title="Cláudia"
                subtitle="Tire dúvidas sobre contabilidade"
                cta="Falar com a Cláudia"
              />
            </div>

            {/* Novidades */}
            <div className="flex flex-col gap-4 px-6">
              <SectionTitle>Novidades</SectionTitle>
              <ListItem
                iconBg="var(--secondary)"
                icon={
                  <Newspaper size={18} style={{ color: "var(--muted-foreground)" }} aria-hidden="true" />
                }
                title="Prêmio Reclame Aqui"
                subtitle="Vote na Agilize"
                cta="Votar"
              />
            </div>

            {/* Deixe a sua opinião */}
            <div className="flex flex-col gap-4 px-6">
              <SectionTitle>Deixe a sua opinião</SectionTitle>
              <ListItem
                iconBg="var(--secondary)"
                icon={
                  <Star size={18} style={{ color: "var(--muted-foreground)" }} aria-hidden="true" />
                }
                title="O que acha da Agilize?"
                subtitle="Nos ajude a construir um produto melhor"
                cta="Opinar"
              />
            </div>

          </div>
        </div>

        {/* Bottom Navigation */}
        <div
          className="flex-shrink-0 flex items-center justify-between px-6 pt-3 pb-8 bg-background"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {NAV.map(({ id, Icon, label, href }) => {
            const isActive = id === "recursos";
            return (
              <button
                key={id}
                onClick={() => router.push(href)}
                aria-label={label}
                className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl w-[72px] transition-colors"
                style={{
                  background: isActive ? "var(--purple-100)" : "transparent",
                  color: isActive ? "var(--primary)" : "var(--muted-foreground)",
                }}
              >
                <Icon size={22} aria-hidden="true" />
                <span className="text-[10px] font-medium">{label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
