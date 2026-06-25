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

// ── Sucess green — assets do Figma node 2026-1368 ─────────────────────────────
const imgSuccessV1 =
  "https://www.figma.com/api/mcp/asset/369dc419-ea75-4199-904d-090f08f8f597";
const imgSuccessV2 =
  "https://www.figma.com/api/mcp/asset/36bab46c-d9f5-4d25-b8bb-6da98766a379";
const imgSuccessV3 =
  "https://www.figma.com/api/mcp/asset/6c08fcfd-0eaa-4656-a308-d06211e2690d";
const imgSuccessFrame =
  "https://www.figma.com/api/mcp/asset/75472906-109e-46b1-840d-2e447080becf";
const imgSuccessV4 =
  "https://www.figma.com/api/mcp/asset/1d69ca26-335b-48fd-8013-1212b9fe1b94";

// ── Ícone de check (Figma asset) ───────────────────────────────────────────────
const imgCheckCircle =
  "https://www.figma.com/api/mcp/asset/37fe433f-e928-449a-89bd-d4534607ac1e";

// ── Types ─────────────────────────────────────────────────────────────────────
type NodeStatus = "completed" | "active" | "locked";

interface NodeDef {
  id: number;
  label: string;
  description: string;
}

const NODES: NodeDef[] = [
  { id: 1, label: "Dia 05",            description: "NFS-e + pró-labore"              },
  { id: 2, label: "Dia 15",            description: "Extrato bancário (prazo: dia 8)" },
  { id: 3, label: "Dia 20",            description: "DAS + DARF INSS + DARF IRRF"     },
  { id: 4, label: "Dia 30",            description: "eSocial (automático)"             },
  { id: 5, label: "Último dia do mês", description: "Revisar relatório e tirar dúvidas"},
];

const COMPANY = "Clínica Vida";

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
      className="flex gap-2 p-[3px] rounded-[10px] w-full shrink-0"
      style={{ background: "#f8f7fb" }}
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
              color: isActive ? "#2a2630" : "#483f59",
              background: isActive ? "white" : "transparent",
              boxShadow: isActive ? "0px 0px 12px -2px rgba(0,0,0,0.12)" : "none",
            }}
          >
            {v === "minhas" ? "Minhas demandas" : "Demandas da Agilize"}
          </button>
        );
      })}
    </div>
  );
}

// ── Node Circle ───────────────────────────────────────────────────────────────
function NodeCircle({ status }: { status: NodeStatus }) {
  if (status === "completed") {
    return (
      <div
        className="flex items-center justify-center rounded-full shrink-0"
        style={{ width: 60, height: 60, background: "#e1edff" }}
      >
        {/* Check-circle asset do Figma */}
        <div className="relative" style={{ width: 24, height: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgCheckCircle}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    );
  }

  if (status === "active") {
    return (
      <div
        className="flex items-center justify-center rounded-full shrink-0"
        style={{ width: 60, height: 60, background: "var(--purple-100)" }}
      >
        <MapPin size={24} style={{ color: "var(--primary)" }} aria-hidden="true" />
      </div>
    );
  }

  // locked
  return (
    <div
      className="flex items-center justify-center rounded-full shrink-0"
      style={{ width: 60, height: 60, background: "#f8f7fb", border: "1px solid var(--border)" }}
    >
      <Lock size={22} style={{ color: "var(--muted-foreground)" }} aria-hidden="true" />
    </div>
  );
}

// ── Sucess Illustration (composta, absoluta) ──────────────────────────────────
function SucessIllustration({ top }: { top: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: -109,
        top,
        width: 124,
        height: 124,
        overflow: "clip",
        pointerEvents: "none",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imgSuccessV1} alt="" className="absolute block max-w-none w-full h-full"
        style={{ inset: "15.56% 46.11% 59.44% 36.67%" }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imgSuccessV2} alt="" className="absolute block max-w-none w-full h-full"
        style={{ inset: "70.56% 60% 17.78% 33.33%" }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imgSuccessV3} alt="" className="absolute block max-w-none w-full h-full"
        style={{ inset: "29.44% 16.11% 13.33% 15%" }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imgSuccessFrame} alt="" className="absolute block max-w-none w-full h-full"
        style={{ inset: "0 1.67% 68.89% 67.22%" }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imgSuccessV4} alt="" className="absolute block max-w-none w-full h-full"
        style={{ inset: "16.11% 26.67% 68.33% 62.78%" }} />
    </div>
  );
}

// ── MonthSection ──────────────────────────────────────────────────────────────
function MonthSection({
  month,
  statuses,
  illustration,
  illustrationIsRight = false,
  sectionHeight,
  "data-month": dataMonth,
}: {
  month: string;
  statuses: NodeStatus[];
  illustration?: string;
  illustrationIsRight?: boolean;
  sectionHeight?: number;
  "data-month"?: string;
}) {
  const [tab, setTab] = useState<"minhas" | "agilize">("minhas");

  // Calcula o índice do nó ativo para posicionar a ilustração do Junho
  const activeIndex = statuses.indexOf("active");
  // Cada nó ocupa: 60 (círculo) + 8 (gap) + 18 (label) + 24 (gap entre nós) = 110px; pt-6=24
  const ilustrationTop = 24 + activeIndex * 110;

  return (
    <div
      data-month={dataMonth}
      className="flex flex-col flex-shrink-0 overflow-hidden"
      style={{
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
        height: sectionHeight ? `${sectionHeight}px` : "100%",
      }}
    >
      {/* Conteúdo centrado */}
      <div className="flex flex-col gap-8 items-center px-6 pt-4 flex-1" style={{ minHeight: 0 }}>

        {/* Header card */}
        <div
          className="rounded-[8px] px-4 py-4 flex items-center justify-between w-full shrink-0"
          style={{ background: "#f5ecfe" }}
        >
          <div className="flex flex-col gap-1">
            <p className="text-[14px] font-semibold leading-5" style={{ color: "#522b77" }}>
              {month}
            </p>
            <p className="text-[14px] font-normal leading-5" style={{ color: "#522b77" }}>
              {COMPANY}
            </p>
          </div>
          <button
            aria-label="Menu"
            className="flex gap-2 items-center justify-center overflow-hidden px-2 py-1.5 rounded-lg shrink-0"
            style={{ background: "#7537ae" }}
          >
            <Menu size={20} color="white" aria-hidden="true" />
          </button>
        </div>

        {/* Segmented control */}
        <SegmentedControl active={tab} onChange={setTab} />

        {/* Track de nodes */}
        <div className="relative flex justify-center flex-1 w-full overflow-y-auto scrollbar-hide" style={{ minHeight: 0 }}>

          {/* Ilustração: Sucess green (Junho) */}
          {!illustration && activeIndex >= 0 && (
            <SucessIllustration top={ilustrationTop} />
          )}

          {/* Ilustração estática (Maio / Julho) */}
          {illustration && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={illustration}
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                [illustrationIsRight ? "right" : "left"]: -16,
                top: ilustrationTop,
                width: 110,
                height: 110,
                objectFit: "contain",
                pointerEvents: "none",
              }}
            />
          )}

          {/* Coluna de nodes — 142px centrada */}
          <div className="flex flex-col gap-6 pt-6 pb-4" style={{ width: 142 }}>
            {NODES.map((node, idx) => {
              const status = statuses[idx];
              const isActive = status === "active";

              return (
                <div key={node.id} className="flex flex-col items-center gap-2 relative">
                  {/* Tooltip no nó ativo */}
                  {isActive && (
                    <div
                      className="absolute rounded-xl z-10"
                      style={{
                        top: 8,
                        right: 72,
                        padding: "8px 12px",
                        border: "1px solid var(--border)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        background: "white",
                        width: 144,
                      }}
                    >
                      {/* Seta */}
                      <span className="absolute" style={{
                        right: -7, top: "50%", transform: "translateY(-50%)",
                        width: 0, height: 0,
                        borderTop: "6px solid transparent",
                        borderBottom: "6px solid transparent",
                        borderLeft: "7px solid var(--border)",
                      }} />
                      <span className="absolute" style={{
                        right: -5, top: "50%", transform: "translateY(-50%)",
                        width: 0, height: 0,
                        borderTop: "5px solid transparent",
                        borderBottom: "5px solid transparent",
                        borderLeft: "6px solid white",
                      }} />
                      <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: "var(--primary)" }}>
                        Fazer agora
                      </p>
                      <p className="text-[11px] font-medium mt-0.5 leading-tight" style={{ color: "#483f59" }}>
                        {node.description}
                      </p>
                    </div>
                  )}

                  <NodeCircle status={status} />

                  <p
                    className="text-[12px] font-normal text-center whitespace-nowrap"
                    style={{ color: "#483f59", lineHeight: "18px" }}
                  >
                    {node.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
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
      <div className="relative w-[390px] h-[844px] bg-white overflow-hidden flex flex-col rounded-[40px] shadow-2xl">

        {/* Dynamic Island */}
        <div className="flex justify-center pt-3 flex-shrink-0">
          <div className="w-[156px] h-[33px] bg-black rounded-full" />
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-6 py-2 flex-shrink-0">
          <span className="text-[17px] font-semibold text-black tracking-[-0.41px]">9:41</span>
          <div className="flex items-center gap-2 text-black">
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
              sectionHeight={sectionHeight}
            />
            <MonthSection
              month="Junho de 2026"
              statuses={JUN_STATUSES}
              sectionHeight={sectionHeight}
              data-month="junho-2026"
            />
            <MonthSection
              month="Julho de 2026"
              statuses={JUL_STATUSES}
              illustration={imgJulhoIlustracao}
              sectionHeight={sectionHeight}
            />
          </div>
        )}

        {/* Bottom Navigation */}
        <div
          className="flex-shrink-0 flex items-center justify-between px-6 pt-3 pb-8 bg-white"
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
                  background: isActive ? "#f5ecfe" : "transparent",
                  color: isActive ? "#7537ae" : "#483f59",
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
