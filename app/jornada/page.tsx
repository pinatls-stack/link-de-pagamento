"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Library,
  FilePlus,
  MessageCircle,
  Video,
  MoreHorizontal,
  Signal,
  Wifi,
  Battery,
  ChevronRight,
  Menu,
  CheckCircle2,
  MapPin,
  Lock,
} from "lucide-react";

// ── Ilustrações ───────────────────────────────────────────────────────────────
const imgMaioIlustracao =
  "https://www.figma.com/api/mcp/asset/f7496f12-8d6f-425f-8a4c-67962e1d5508";
const imgIlustracao =
  "https://www.figma.com/api/mcp/asset/666f1399-ffa0-422f-8fae-b771f9d034f4";
const imgJulhoIlustracao =
  "https://www.figma.com/api/mcp/asset/936feaf5-f545-47f9-b015-640969e02763";
const imgClaudia =
  "https://www.figma.com/api/mcp/asset/b0317409-7e31-4c36-8338-6ba757ebdfda";

// ── Types ─────────────────────────────────────────────────────────────────────

type NodeStatus = "completed" | "active" | "locked";

interface NodeDef {
  id: number;
  label: string;
  description: string;
  x: number;
  y: number;
}

const NODES: NodeDef[] = [
  { id: 1, label: "Dia 05",            description: "NFS-e + pró-labore",              x: 62,  y: 32  },
  { id: 2, label: "Dia 15",            description: "Extrato bancário (prazo: dia 8)", x: 163, y: 152 },
  { id: 3, label: "Dia 20",            description: "DAS + DARF INSS + DARF IRRF",     x: 262, y: 272 },
  { id: 4, label: "Dia 30",            description: "eSocial (automático)",             x: 163, y: 392 },
  { id: 5, label: "Último dia do mês", description: "Revisar relatório e tirar dúvidas",x: 62,  y: 492 },
];

const NODE_SIZE = 60;
const COMPANY   = "Lumina Gestão";

// ── Segmented Control ─────────────────────────────────────────────────────────

function SegmentedControl({
  active,
  onChange,
}: {
  active: "minhas" | "agilize";
  onChange: (v: "minhas" | "agilize") => void;
}) {
  return (
    <div
      className="mx-6 mt-3 flex gap-1 p-[3px] rounded-[10px] flex-shrink-0"
      style={{ background: "var(--secondary)" }}
    >
      {(["minhas", "agilize"] as const).map((v) => {
        const isActive = active === v;
        return (
          <button
            key={v}
            onClick={() => onChange(v)}
            className="flex-1 py-2 rounded-lg text-[14px] transition-all"
            style={{
              fontWeight: isActive ? 500 : 400,
              color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
              background: isActive ? "var(--background)" : "transparent",
              boxShadow: isActive ? "0 0 12px -2px rgba(0,0,0,0.12)" : "none",
            }}
          >
            {v === "minhas" ? "Minhas demandas" : "Demandas da Agilize"}
          </button>
        );
      })}
    </div>
  );
}

// ── MonthSection ──────────────────────────────────────────────────────────────

function MonthSection({
  month,
  statuses,
  illustration,
  illustrationSide = "left",
  illustrationTop = 220,
  sectionHeight,
  "data-month": dataMonth,
}: {
  month: string;
  statuses: NodeStatus[];
  illustration?: string;
  illustrationSide?: "left" | "right";
  illustrationTop?: number;
  sectionHeight?: number;
  "data-month"?: string;
}) {
  const [tab, setTab] = useState<"minhas" | "agilize">("minhas");

  return (
    <div
      data-month={dataMonth}
      className="flex flex-col flex-shrink-0"
      style={{
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
        height: sectionHeight ? `${sectionHeight}px` : "100%",
      }}
    >
      {/* Header card */}
      <div
        className="mx-6 mt-4 rounded-xl px-4 py-3 flex items-center justify-between flex-shrink-0"
        style={{ background: "var(--purple-100)" }}
      >
        <div className="flex flex-col gap-0.5">
          <p className="text-[14px] font-semibold leading-[20px]" style={{ color: "#522b77" }}>
            {month}
          </p>
          <p className="text-[14px] font-normal leading-[20px]" style={{ color: "#522b77" }}>
            {COMPANY}
          </p>
        </div>
        <button
          aria-label="Menu"
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--primary)" }}
        >
          <Menu size={18} color="white" aria-hidden="true" />
        </button>
      </div>

      {/* Segmented control */}
      <SegmentedControl active={tab} onChange={setTab} />

      {/* Track */}
      <div className="relative flex-1" style={{ minHeight: 0 }}>

        {/* Ilustração */}
        {illustration && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={illustration}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              [illustrationSide]: 16,
              top: illustrationTop,
              width: 110,
              height: 110,
              objectFit: "contain",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Nodes */}
        {NODES.map((node, idx) => {
          const status = statuses[idx];
          const done   = status === "completed";
          const active = status === "active";
          const locked = status === "locked";

          return (
            <div
              key={node.id}
              style={{ position: "absolute", left: node.x, top: node.y }}
            >
              {/* Tooltip no nó ativo */}
              {active && (
                <div
                  className="absolute rounded-xl"
                  style={{
                    top: 8,
                    right: NODE_SIZE + 12,
                    padding: "8px 12px",
                    border: "1px solid var(--border)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    background: "var(--background)",
                    width: 140,
                  }}
                >
                  <span
                    className="absolute"
                    style={{
                      right: -7, top: "50%", transform: "translateY(-50%)",
                      width: 0, height: 0,
                      borderTop: "6px solid transparent",
                      borderBottom: "6px solid transparent",
                      borderLeft: "7px solid var(--border)",
                    }}
                  />
                  <span
                    className="absolute"
                    style={{
                      right: -5, top: "50%", transform: "translateY(-50%)",
                      width: 0, height: 0,
                      borderTop: "5px solid transparent",
                      borderBottom: "5px solid transparent",
                      borderLeft: "6px solid var(--background)",
                    }}
                  />
                  <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: "var(--primary)" }}>
                    Fazer agora
                  </p>
                  <p className="text-[11px] font-medium mt-0.5 leading-tight" style={{ color: "var(--muted-foreground)" }}>
                    {node.description}
                  </p>
                </div>
              )}

              {/* Círculo flat */}
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: NODE_SIZE,
                  height: NODE_SIZE,
                  background: done
                    ? "#dbfff2"
                    : active
                    ? "var(--purple-100)"
                    : "var(--secondary)",
                  border: locked ? "1px solid var(--border)" : "none",
                }}
              >
                {done && (
                  <CheckCircle2
                    size={24}
                    style={{ color: "#0c7952" }}
                    aria-hidden="true"
                  />
                )}
                {active && (
                  <MapPin
                    size={24}
                    style={{ color: "var(--primary)" }}
                    aria-hidden="true"
                  />
                )}
                {locked && (
                  <Lock
                    size={22}
                    style={{ color: "var(--muted-foreground)" }}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Label */}
              <p
                className="absolute whitespace-nowrap text-[12px] font-normal text-center"
                style={{
                  top: NODE_SIZE + 8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "var(--muted-foreground)",
                }}
              >
                {node.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Status por mês ────────────────────────────────────────────────────────────

const MAY_STATUSES: NodeStatus[] = [
  "completed", "completed", "completed", "completed", "completed",
];
const JUN_STATUSES: NodeStatus[] = [
  "completed", "completed", "active", "locked", "locked",
];
const JUL_STATUSES: NodeStatus[] = [
  "locked", "locked", "locked", "locked", "locked",
];

// ── Bottom nav ────────────────────────────────────────────────────────────────

const NAV = [
  { id: "inicio",   Icon: Home,           label: "Início"   },
  { id: "recursos", Icon: Library,        label: "Recursos" },
  { id: "nota",     Icon: FilePlus,       label: "Emissão"  },
  { id: "claudia",  Icon: MessageCircle,  label: "Cláudia"  },
  { id: "mais",     Icon: MoreHorizontal, label: "Mais"     },
];

// ── ClaudiaScreen ─────────────────────────────────────────────────────────────

function ClaudiaScreen() {
  return (
    <div className="flex-1 flex flex-col px-6" style={{ minHeight: 0 }}>
      <div className="pt-6 pb-2">
        <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
          Assistente de contabilidade
        </p>
        <h1 className="text-[22px] font-semibold mt-0.5" style={{ color: "var(--foreground)" }}>
          Cláudia
        </h1>
      </div>
      <div className="flex justify-center items-center py-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgClaudia} alt="Cláudia, assistente virtual" style={{ width: 220, height: "auto" }} />
      </div>
      <div className="text-center mb-8">
        <p className="text-[17px] font-semibold" style={{ color: "var(--foreground)" }}>
          Como prefere falar comigo?
        </p>
        <p className="text-[13px] mt-1" style={{ color: "var(--muted-foreground)" }}>
          Tire dúvidas sobre a contabilidade da sua empresa
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {[
          { Icon: MessageCircle, title: "Mensagem de texto",  subtitle: "Envie uma mensagem agora" },
          { Icon: Video,         title: "Videochamada",       subtitle: "Fale ao vivo com a Cláudia" },
        ].map(({ Icon, title, subtitle }) => (
          <button
            key={title}
            className="flex items-center gap-4 px-4 py-4 rounded-2xl w-full text-left transition-colors"
            style={{ border: "1px solid var(--border)", background: "var(--background)" }}
          >
            <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "var(--purple-100)" }}>
              <Icon size={20} style={{ color: "var(--primary)" }} />
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-[15px] font-semibold" style={{ color: "var(--foreground)" }}>{title}</span>
              <span className="text-[12px]" style={{ color: "var(--muted-foreground)" }}>{subtitle}</span>
            </div>
            <ChevronRight size={18} style={{ color: "var(--muted-foreground)" }} />
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function JornadaPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("inicio");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    setSectionHeight(el.clientHeight);
  }, []);

  useEffect(() => {
    if (!sectionHeight) return;
    const el = scrollRef.current;
    if (!el) return;
    const june = el.querySelector("[data-month='junho-2026']") as HTMLElement | null;
    if (june) el.scrollTop = june.offsetTop;
  }, [sectionHeight]);

  return (
    <div className="min-h-screen flex justify-center items-center" style={{ background: "var(--secondary)" }}>
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

        {/* Conteúdo */}
        {activeTab === "claudia" ? (
          <ClaudiaScreen />
        ) : (
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-scroll scrollbar-hide"
            style={{ minHeight: 0, scrollSnapType: "y mandatory", overscrollBehaviorY: "none" }}
          >
            <MonthSection
              month="Maio de 2026"
              statuses={MAY_STATUSES}
              illustration={imgMaioIlustracao}
              illustrationSide="left"
              illustrationTop={200}
              sectionHeight={sectionHeight}
            />
            <MonthSection
              month="Junho de 2026"
              statuses={JUN_STATUSES}
              illustration={imgIlustracao}
              illustrationSide="left"
              illustrationTop={260}
              sectionHeight={sectionHeight}
              data-month="junho-2026"
            />
            <MonthSection
              month="Julho de 2026"
              statuses={JUL_STATUSES}
              illustration={imgJulhoIlustracao}
              illustrationSide="left"
              illustrationTop={200}
              sectionHeight={sectionHeight}
            />
          </div>
        )}

        {/* Bottom Navigation */}
        <div
          className="flex-shrink-0 flex items-center justify-between px-6 pt-3 pb-8 bg-background"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {NAV.map(({ id, Icon, label }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => id === "recursos" ? router.push("/recursos") : setActiveTab(id)}
                className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl w-[72px] transition-colors"
                style={{
                  background: isActive ? "var(--purple-100)" : "transparent",
                  color: isActive ? "var(--primary)" : "var(--muted-foreground)",
                }}
              >
                <Icon size={22} />
                <span className="text-[10px] font-medium">{label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
