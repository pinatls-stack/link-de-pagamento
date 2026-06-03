"use client";

import { useState } from "react";
import {
  FileText,
  Building2,
  EyeOff,
  DollarSign,
  ClipboardList,
  Lock,
  Flame,
  Gem,
  Heart,
  Home,
  BookOpen,
  Award,
  User,
  MoreHorizontal,
  Signal,
  Wifi,
  Battery,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

type NodeStatus = "completed" | "active" | "locked";

interface StepNode {
  id: number;
  label: string;
  description: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  status: NodeStatus;
  x: number;
  y: number;
}

// ── Track data — winding snake pattern within 390px ──────────────────────────

const NODES: StepNode[] = [
  {
    id: 1,
    label: "Último dia útil",
    description: "NFS-e + pró-labore",
    Icon: FileText,
    status: "completed",
    x: 163, y: 40,
  },
  {
    id: 2,
    label: "Dia 5",
    description: "Extrato bancário (prazo: dia 8)",
    Icon: Building2,
    status: "active",
    x: 262, y: 150,
  },
  {
    id: 3,
    label: "Dia 15",
    description: "eSocial (automático)",
    Icon: EyeOff,
    status: "locked",
    x: 272, y: 270,
  },
  {
    id: 4,
    label: "Dia 20",
    description: "DAS + DARF INSS + DARF IRRF",
    Icon: DollarSign,
    status: "locked",
    x: 162, y: 390,
  },
  {
    id: 5,
    label: "Pós-mês",
    description: "Revisar relatório e tirar dúvidas",
    Icon: ClipboardList,
    status: "locked",
    x: 62, y: 510,
  },
];

// ── SVG path builder (cubic bezier S-curves) ─────────────────────────────────

function buildPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1];
    const c = pts[i];
    const my = (p.y + c.y) / 2;
    d += ` C ${p.x} ${my}, ${c.x} ${my}, ${c.x} ${c.y}`;
  }
  return d;
}

const NODE_SIZE = 64;
const centers = NODES.map((n) => ({ x: n.x + NODE_SIZE / 2, y: n.y + NODE_SIZE / 2 }));
const progressCount = NODES.filter((n) => n.status !== "locked").length;
const fullPath     = buildPath(centers);
const progressPath = buildPath(centers.slice(0, progressCount));

// ── Bottom nav ────────────────────────────────────────────────────────────────

const NAV = [
  { id: "inicio",     Icon: Home,           label: "Início"     },
  { id: "modulos",    Icon: BookOpen,       label: "Módulos"    },
  { id: "conquistas", Icon: Award,          label: "Conquistas" },
  { id: "perfil",     Icon: User,           label: "Perfil"     },
  { id: "mais",       Icon: MoreHorizontal, label: "Mais"       },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function JornadaPage() {
  const [activeTab, setActiveTab] = useState("inicio");

  return (
    <div
      className="min-h-screen flex justify-center items-start"
      style={{ background: "var(--secondary)" }}
    >
      <div className="relative w-[390px] min-h-screen bg-background overflow-hidden flex flex-col">

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

        {/* Stats Header */}
        <div
          className="flex items-center justify-between px-4 py-2.5 flex-shrink-0 bg-background"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-1.5">
            <span className="text-base leading-none">🇧🇷</span>
            <span className="text-sm font-bold text-foreground">14</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame size={18} className="text-orange-400" />
            <span className="text-sm font-bold text-orange-400">12</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gem size={18} className="text-sky-400" />
            <span className="text-sm font-bold text-sky-400">527</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Heart size={18} className="text-destructive" />
            <span className="text-sm font-bold text-destructive">5</span>
          </div>
        </div>

        {/* Section Banner */}
        <div
          className="mx-4 mt-3 rounded-xl px-4 py-3 flex items-center justify-between flex-shrink-0"
          style={{ background: "var(--primary)" }}
        >
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Lumina Gestão
            </p>
            <p className="text-[17px] font-semibold text-primary-foreground mt-0.5">
              Junho de 2026
            </p>
          </div>
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.18)" }}
          >
            <FileText size={18} className="text-primary-foreground" />
          </div>
        </div>

        {/* Scrollable Track */}
        <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ minHeight: 0 }}>
          <div className="relative" style={{ width: 390, height: 660 }}>

            {/* SVG winding path */}
            <svg
              className="absolute inset-0 pointer-events-none"
              width={390}
              height={660}
              viewBox="0 0 390 660"
              fill="none"
            >
              {/* Background (locked) path */}
              <path
                d={fullPath}
                stroke="var(--border)"
                strokeWidth={10}
                strokeLinecap="round"
              />
              {/* Progress (completed + active) path */}
              <path
                d={progressPath}
                stroke="var(--success)"
                strokeWidth={10}
                strokeLinecap="round"
              />
            </svg>

            {/* Nodes */}
            {NODES.map((node) => {
              const { Icon, status, label, description } = node;
              const done   = status === "completed";
              const active = status === "active";
              const locked = status === "locked";

              return (
                <div
                  key={node.id}
                  style={{ position: "absolute", left: node.x, top: node.y }}
                >
                  {/* Tooltip da atividade (nó ativo) */}
                  {active && (
                    <div
                      className="absolute rounded-xl bg-background"
                      style={{
                        top: 8,
                        left: NODE_SIZE + 10,
                        padding: "8px 12px",
                        border: "1px solid var(--border)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        maxWidth: 130,
                      }}
                    >
                      {/* Arrow caret */}
                      <span
                        className="absolute"
                        style={{
                          left: -7,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 0,
                          height: 0,
                          borderTop: "6px solid transparent",
                          borderBottom: "6px solid transparent",
                          borderRight: "7px solid var(--border)",
                        }}
                      />
                      <span
                        className="absolute"
                        style={{
                          left: -5,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 0,
                          height: 0,
                          borderTop: "5px solid transparent",
                          borderBottom: "5px solid transparent",
                          borderRight: "6px solid var(--background)",
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
                        {description}
                      </p>
                    </div>
                  )}

                  {/* Circle */}
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

                  {/* Stars (completed only) */}
                  {done && (
                    <div
                      className="absolute flex gap-[3px] justify-center"
                      style={{ top: NODE_SIZE + 4, left: 0, width: NODE_SIZE }}
                    >
                      {[0, 1, 2].map((i) => (
                        <svg key={i} width="11" height="11" viewBox="0 0 10 10">
                          <path
                            d="M5 0L6.12 3.45H9.76L6.82 5.59L7.94 9.04L5 6.9L2.06 9.04L3.18 5.59L0.24 3.45H3.88L5 0Z"
                            fill="var(--success)"
                          />
                        </svg>
                      ))}
                    </div>
                  )}

                  {/* Label */}
                  <p
                    className="absolute whitespace-nowrap text-[11px] font-medium text-center"
                    style={{
                      top: done ? NODE_SIZE + 22 : NODE_SIZE + 8,
                      left: "50%",
                      transform: "translateX(-50%)",
                      color: locked
                        ? "var(--muted-foreground)"
                        : active
                        ? "var(--primary)"
                        : "var(--foreground)",
                    }}
                  >
                    {label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div
          className="flex-shrink-0 flex items-center justify-between px-2 pt-3 pb-8 bg-background"
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
