"use client";

import { useState, useRef, useEffect } from "react";
import {
  FileText,
  Building2,
  EyeOff,
  DollarSign,
  ClipboardList,
  Lock,
  Home,
  History,
  FilePlus,
  Bot,
  MoreHorizontal,
  Signal,
  Wifi,
  Battery,
} from "lucide-react";

// ── Ilustrações decorativas ───────────────────────────────────────────────────
// Junho — lado direito (node 558:16)
const imgIlustracao =
  "https://www.figma.com/api/mcp/asset/1f252e99-6795-44c1-920b-09791d9b438a";
// Maio — lado esquerdo (node 558:13)
const imgMaioIlustracao =
  "https://www.figma.com/api/mcp/asset/24dc4bf6-9e09-4e8f-9c0d-715f03e7d7ed";

// ── Types ─────────────────────────────────────────────────────────────────────

type NodeStatus = "completed" | "active" | "locked";

interface NodeTemplate {
  id: number;
  label: string;
  description: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  x: number;
  y: number;
}

// ── Atividades mensais (mesmas para todos os meses) ───────────────────────────

const NODE_TEMPLATES: NodeTemplate[] = [
  {
    id: 1,
    label: "Último dia útil",
    description: "NFS-e + pró-labore",
    Icon: FileText,
    x: 163, y: 40,
  },
  {
    id: 2,
    label: "Dia 5",
    description: "Extrato bancário (prazo: dia 8)",
    Icon: Building2,
    x: 262, y: 150,
  },
  {
    id: 3,
    label: "Dia 15",
    description: "eSocial (automático)",
    Icon: EyeOff,
    x: 272, y: 270,
  },
  {
    id: 4,
    label: "Dia 20",
    description: "DAS + DARF INSS + DARF IRRF",
    Icon: DollarSign,
    x: 162, y: 390,
  },
  {
    id: 5,
    label: "Pós-mês",
    description: "Revisar relatório e tirar dúvidas",
    Icon: ClipboardList,
    x: 62, y: 510,
  },
];

const NODE_SIZE = 64;
const COMPANY   = "Lumina Gestão";

// ── SVG path builder ──────────────────────────────────────────────────────────

const centers = NODE_TEMPLATES.map((n) => ({
  x: n.x + NODE_SIZE / 2,
  y: n.y + NODE_SIZE / 2,
}));

function buildPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1], c = pts[i];
    const my = (p.y + c.y) / 2;
    d += ` C ${p.x} ${my}, ${c.x} ${my}, ${c.x} ${c.y}`;
  }
  return d;
}

const fullPath = buildPath(centers);

// ── MonthSection ──────────────────────────────────────────────────────────────

function MonthSection({
  month,
  statuses,
  showIllustration,
  showLeftIllustration,
  "data-month": dataMonth,
}: {
  month: string;
  statuses: NodeStatus[];
  showIllustration?: boolean;
  showLeftIllustration?: boolean;
  "data-month"?: string;
}) {
  const progressCount = statuses.filter((s) => s !== "locked").length;
  const progressPath  = progressCount >= 2 ? buildPath(centers.slice(0, progressCount)) : "";

  return (
    <div data-month={dataMonth} style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}>
      {/* Banner */}
      <div
        className="mx-6 mt-4 rounded-xl px-4 py-3 flex items-center justify-between"
        style={{ background: "var(--primary)" }}
      >
        <div>
          <p
            className="text-[11px] font-semibold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            {COMPANY}
          </p>
          <p className="text-[17px] font-semibold text-primary-foreground mt-0.5">
            {month}
          </p>
        </div>
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.18)" }}
        >
          <FileText size={18} className="text-primary-foreground" />
        </div>
      </div>

      {/* Track */}
      <div className="relative" style={{ width: 390, height: 660 }}>
        {/* Winding path */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={390}
          height={660}
          viewBox="0 0 390 660"
          fill="none"
        >
          <path
            d={fullPath}
            stroke="var(--border)"
            strokeWidth={10}
            strokeLinecap="round"
          />
          {progressPath && (
            <path
              d={progressPath}
              stroke="var(--success)"
              strokeWidth={10}
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* Ilustração direita (Junho) */}
        {showIllustration && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgIlustracao}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              right: 24,
              top: 484,
              width: 116,
              height: 116,
              objectFit: "contain",
            }}
          />
        )}

        {/* Ilustração esquerda (Maio) */}
        {showLeftIllustration && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgMaioIlustracao}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 24,
              top: 257,
              width: 90,
              height: 90,
              objectFit: "contain",
            }}
          />
        )}

        {/* Nodes */}
        {NODE_TEMPLATES.map((node, idx) => {
          const status = statuses[idx];
          const done   = status === "completed";
          const active = status === "active";
          const locked = status === "locked";
          const { Icon } = node;

          return (
            <div
              key={node.id}
              style={{ position: "absolute", left: node.x, top: node.y }}
            >
              {/* Tooltip "Fazer agora" (nó ativo) */}
              {active && (
                <div
                  className="absolute rounded-xl bg-background"
                  style={{
                    top: 8,
                    right: NODE_SIZE + 10,
                    padding: "8px 12px",
                    border: "1px solid var(--border)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
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
                  <p
                    className="text-[11px] font-bold uppercase tracking-wide"
                    style={{ color: "var(--primary)" }}
                  >
                    Fazer agora
                  </p>
                  <p
                    className="text-[11px] font-medium mt-0.5 leading-tight"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {node.description}
                  </p>
                </div>
              )}

              {/* Círculo */}
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: NODE_SIZE,
                  height: NODE_SIZE,
                  ...(done
                    ? {
                        background: "var(--success)",
                        color: "#fff",
                        boxShadow: "0 5px 0 #076e49, 0 7px 14px rgba(10,155,102,0.25)",
                      }
                    : active
                    ? {
                        background: "var(--primary)",
                        color: "var(--primary-foreground)",
                        boxShadow: "0 5px 0 var(--primary-active), 0 7px 18px rgba(117,55,174,0.32)",
                      }
                    : {
                        background: "var(--muted)",
                        color: "var(--muted-foreground)",
                        border: "2px solid var(--border)",
                      }),
                }}
              >
                {locked ? <Lock size={22} /> : <Icon size={22} />}
              </div>

              {/* Label */}
              <p
                className="absolute whitespace-nowrap text-[11px] font-medium text-center"
                style={{
                  top: NODE_SIZE + 8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: locked
                    ? "var(--muted-foreground)"
                    : active
                    ? "var(--primary)"
                    : "var(--foreground)",
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
  "completed", "active", "locked", "locked", "locked",
];
const JUL_STATUSES: NodeStatus[] = [
  "locked", "locked", "locked", "locked", "locked",
];

// ── Bottom nav ────────────────────────────────────────────────────────────────

const NAV = [
  { id: "inicio",    Icon: Home,           label: "Início"    },
  { id: "historico", Icon: History,        label: "Histórico" },
  { id: "nota",      Icon: FilePlus,       label: "Emissão"   },
  { id: "agentes",   Icon: Bot,            label: "Agentes"   },
  { id: "mais",      Icon: MoreHorizontal, label: "Mais"      },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function JornadaPage() {
  const [activeTab, setActiveTab] = useState("inicio");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Posiciona o scroll em Junho de 2026 no carregamento inicial
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const june = container.querySelector("[data-month='junho-2026']") as HTMLElement | null;
    if (june) {
      container.scrollTop = june.offsetTop;
    }
  }, []);

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

        {/* Scroll vertical — 3 meses empilhados */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-scroll scrollbar-hide"
          style={{ minHeight: 0, scrollSnapType: "y mandatory", overscrollBehaviorY: "none" }}
        >
          <MonthSection
            month="Maio de 2026"
            statuses={MAY_STATUSES}
            showLeftIllustration
          />
          <MonthSection
            month="Junho de 2026"
            statuses={JUN_STATUSES}
            showIllustration
            data-month="junho-2026"
          />
          <MonthSection
            month="Julho de 2026"
            statuses={JUL_STATUSES}
          />
        </div>

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
                onClick={() => setActiveTab(id)}
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
