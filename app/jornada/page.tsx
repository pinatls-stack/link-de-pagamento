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
  MapPin,
  Lock,
  Building2,
  CreditCard,
  Bell,
  HelpCircle,
  FileText,
  LogOut,
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

// ── Ícone de check (Figma asset) ───────────────────────────────────────────────
const imgCheckCircle =
  "https://www.figma.com/api/mcp/asset/37fe433f-e928-449a-89bd-d4534607ac1e";

// ── Types ─────────────────────────────────────────────────────────────────────
type NodeStatus = "completed" | "active" | "locked";

interface NodeDef {
  id: number;
  label: string;
  description: string;
  tooltipTitle: string;
  tooltipButton: string;
}

const NODES: NodeDef[] = [
  { id: 1, label: "Dia 05",            description: "NFS-e + pró-labore",                tooltipTitle: "Emitir notas fiscais", tooltipButton: "Acessar NFS-e"    },
  { id: 2, label: "Dia 15",            description: "Extrato bancário (prazo: dia 8)",   tooltipTitle: "Enviar extrato",       tooltipButton: "Acessar banco"    },
  { id: 3, label: "Dia 20",            description: "DAS + DARF INSS + DARF IRRF",       tooltipTitle: "Pagar impostos",       tooltipButton: "Acessar boletos"  },
  { id: 4, label: "Dia 30",            description: "eSocial (automático)",               tooltipTitle: "Enviar eSocial",       tooltipButton: "Acessar eSocial"  },
  { id: 5, label: "Último dia do mês", description: "Revisar relatório e tirar dúvidas", tooltipTitle: "Revisar relatório",    tooltipButton: "Acessar relatório"},
];

// Deslocamento horizontal de cada nó para criar a curva S
// positivo = desloca para a direita, negativo = para a esquerda
const S_OFFSETS = [28, 42, 0, -42, -28];

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
        <div className="relative" style={{ width: 24, height: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgCheckCircle} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full" />
        </div>
      </div>
    );
  }

  if (status === "active") {
    return (
      <>
        <style>{`
          @keyframes nodeRingPulse {
            0%, 100% { box-shadow: 0 0 0 3px #ffffff, 0 0 0 6px #7537ae; }
            50%       { box-shadow: 0 0 0 3px #ffffff, 0 0 0 9px rgba(117,55,174,0.28); }
          }
        `}</style>
        <div
          className="flex items-center justify-center rounded-full shrink-0"
          style={{
            width: 60,
            height: 60,
            background: "#f5ecfe",
            animation: "nodeRingPulse 2s ease-in-out infinite",
          }}
        >
          <MapPin size={24} style={{ color: "#7537ae" }} aria-hidden="true" />
        </div>
      </>
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-full shrink-0"
      style={{ width: 60, height: 60, background: "#f8f7fb" }}
    >
      <Lock size={22} style={{ color: "#9b92b0" }} aria-hidden="true" />
    </div>
  );
}

// ── MonthSection ──────────────────────────────────────────────────────────────
function MonthSection({
  month,
  statuses,
  illustration,
  illustrationSide = "left",
  sectionHeight,
  "data-month": dataMonth,
}: {
  month: string;
  statuses: NodeStatus[];
  illustration?: string;
  illustrationSide?: "left" | "right";
  sectionHeight?: number;
  "data-month"?: string;
}) {
  const [tab, setTab] = useState<"minhas" | "agilize">("minhas");
  const [openTooltip, setOpenTooltip] = useState<number | null>(null);

  return (
    <div
      data-month={dataMonth}
      className="flex flex-col overflow-hidden"
      style={{
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
        height: sectionHeight ? `${sectionHeight}px` : "100%",
        flexShrink: 0,
      }}
    >
      <div className="flex flex-col gap-4 px-6 pt-4 flex-1" style={{ minHeight: 0 }}>

        {/* Header card */}
        <div
          className="rounded-[8px] px-4 py-3 flex flex-col gap-[2px] shrink-0"
          style={{ background: "#f5ecfe" }}
        >
          <p className="text-[14px] font-semibold leading-5" style={{ color: "#522b77" }}>
            {month}
          </p>
          <p className="text-[14px] font-normal leading-5" style={{ color: "#522b77" }}>
            {COMPANY}
          </p>
        </div>

        {/* Segmented control */}
        <SegmentedControl active={tab} onChange={setTab} />

        {/* Track de nodes — ocupa todo o espaço restante, sem scroll interno */}
        <div className="relative flex flex-col justify-around flex-1 pb-2" style={{ minHeight: 0 }}>

          {/* Ilustração — inteira, absolutamente posicionada */}
          {illustration && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={illustration}
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                [illustrationSide]: 0,
                top: illustrationSide === "left" ? "22%" : "52%",
                width: 130,
                height: 130,
                objectFit: "contain",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
          )}

          {/* Nodes com curva S */}
          {NODES.map((node, idx) => {
            const status = statuses[idx];
            const isActive = status === "active";
            const offset = S_OFFSETS[idx];
            const isTooltipOpen = openTooltip === idx;

            return (
              <div
                key={node.id}
                className="flex flex-col items-center gap-2 relative"
                style={{
                  transform: `translateX(${offset}px)`,
                  transition: "transform 0.2s ease",
                  zIndex: isTooltipOpen ? 20 : 1,
                }}
              >
                {/* Overlay invisível — fecha ao clicar fora */}
                {isActive && isTooltipOpen && (
                  <div
                    onClick={() => setOpenTooltip(null)}
                    style={{
                      position: "fixed",
                      inset: 0,
                      zIndex: 25,
                    }}
                  />
                )}

                {/* Tooltip abaixo do nó ativo */}
                {isActive && isTooltipOpen && (
                  <div
                    className="absolute"
                    style={{
                      top: "calc(100% + 14px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 280,
                      background: "#7537ae",
                      borderRadius: 16,
                      padding: "15px 13px 13px",
                      zIndex: 30,
                    }}
                  >
                    {/* Seta apontando para cima */}
                    <span style={{
                      position: "absolute",
                      top: -8,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 0,
                      height: 0,
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      borderBottom: "10px solid #7537ae",
                    }} />

                    {/* Título */}
                    <p style={{ fontSize: 16, fontWeight: 600, lineHeight: "24px", color: "white" }}>
                      {node.tooltipTitle}
                    </p>
                    {/* Subtítulo */}
                    <p style={{ fontSize: 14, fontWeight: 400, lineHeight: "20px", color: "white", marginTop: 8 }}>
                      Etapa {idx + 1} de {NODES.length}
                    </p>

                    {/* Botão */}
                    <button
                      style={{
                        marginTop: 12,
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "6px 8px",
                        borderRadius: 8,
                        background: "white",
                        border: "1px solid #eae6f0",
                        color: "#2a2630",
                        fontSize: 12,
                        fontWeight: 500,
                        lineHeight: "18px",
                        cursor: "pointer",
                      }}
                    >
                      {node.tooltipButton}
                    </button>
                  </div>
                )}

                {/* Círculo — clicável apenas se ativo */}
                <button
                  aria-label={isActive ? `Abrir detalhes: ${node.tooltipTitle}` : node.label}
                  onClick={() => isActive ? setOpenTooltip(isTooltipOpen ? null : idx) : undefined}
                  style={{ cursor: isActive ? "pointer" : "default", background: "none", border: "none", padding: 0 }}
                >
                  <NodeCircle status={status} />
                </button>

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
  );
}

// ── Status por mês ────────────────────────────────────────────────────────────
const MAY_STATUSES: NodeStatus[] = ["completed", "completed", "completed", "completed", "completed"];
const JUN_STATUSES: NodeStatus[] = ["completed", "completed", "active", "locked", "locked"];
const JUL_STATUSES: NodeStatus[] = ["locked", "locked", "locked", "locked", "locked"];

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
        <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#9b92b0" }}>
          Assistente de contabilidade
        </p>
        <h1 className="text-[22px] font-semibold mt-0.5" style={{ color: "#2a2630" }}>
          Cláudia
        </h1>
      </div>
      <div className="flex justify-center items-center py-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgClaudia} alt="Cláudia, assistente virtual" style={{ width: 220, height: "auto" }} />
      </div>
      <div className="text-center mb-8">
        <p className="text-[17px] font-semibold" style={{ color: "#2a2630" }}>
          Como prefere falar comigo?
        </p>
        <p className="text-[13px] mt-1" style={{ color: "#483f59" }}>
          Tire dúvidas sobre a contabilidade da sua empresa
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {[
          { Icon: MessageCircle, title: "Mensagem de texto",  subtitle: "Envie uma mensagem agora"   },
          { Icon: Video,         title: "Videochamada",       subtitle: "Fale ao vivo com a Cláudia" },
        ].map(({ Icon, title, subtitle }) => (
          <button
            key={title}
            className="flex items-center gap-4 px-4 py-4 rounded-2xl w-full text-left transition-colors"
            style={{ border: "1px solid #e5e0ef", background: "white" }}
          >
            <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: "#f5ecfe" }}>
              <Icon size={20} style={{ color: "#7537ae" }} />
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-[15px] font-semibold" style={{ color: "#2a2630" }}>{title}</span>
              <span className="text-[12px]" style={{ color: "#483f59" }}>{subtitle}</span>
            </div>
            <ChevronRight size={18} style={{ color: "#9b92b0" }} />
          </button>
        ))}
      </div>
    </div>
  );
}

// ── ConfiguracoesScreen ───────────────────────────────────────────────────────

const CONFIG_ITEMS = [
  { Icon: CreditCard, label: "Plano e assinatura",  subtitle: "Gerencie seu plano Agilize"    },
  { Icon: Bell,       label: "Notificações",         subtitle: "Alertas e lembretes de prazos" },
  { Icon: FileText,   label: "Documentos",           subtitle: "Contratos e comprovantes"      },
  { Icon: HelpCircle, label: "Central de ajuda",     subtitle: "Dúvidas e suporte"             },
];

// Item de lista reutilizável — sem borda, ícone cinza
function ListItem({ Icon, label, subtitle }: { Icon: React.ElementType; label: string; subtitle: string }) {
  return (
    <button
      className="flex items-center gap-4 px-4 py-3 w-full text-left transition-colors rounded-xl"
      style={{ background: "transparent" }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{ background: "#f3f2f5" }}
      >
        <Icon size={18} style={{ color: "#9b92b0" }} aria-hidden="true" />
      </div>
      <div className="flex flex-col flex-1 gap-[2px]">
        <span className="text-[15px] font-medium" style={{ color: "#2a2630", lineHeight: "22px" }}>
          {label}
        </span>
        <span className="text-[12px] font-normal" style={{ color: "#9b92b0", lineHeight: "18px" }}>
          {subtitle}
        </span>
      </div>
      <ChevronRight size={16} style={{ color: "#c8c2d4" }} aria-hidden="true" />
    </button>
  );
}

// Seção de lista com título e separadores entre itens
function ListSection({ title, items }: { title: string; items: { Icon: React.ElementType; label: string; subtitle: string }[] }) {
  return (
    <div className="flex flex-col">
      <p className="px-4 pb-1 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#9b92b0", letterSpacing: "0.08em" }}>
        {title}
      </p>
      <div className="flex flex-col">
        {items.map(({ Icon, label, subtitle }, idx) => (
          <div key={label}>
            <ListItem Icon={Icon} label={label} subtitle={subtitle} />
            {idx < items.length - 1 && (
              <div className="mx-4" style={{ height: 1, background: "#f3f2f5" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ConfiguracoesScreen() {
  return (
    <div className="flex-1 flex flex-col" style={{ minHeight: 0 }}>
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-[22px] font-semibold" style={{ color: "#2a2630", lineHeight: "30px" }}>
          Configurações
        </h1>
      </div>

      <div className="flex flex-col gap-6 px-2 flex-1 overflow-y-auto scrollbar-hide pb-4">
        {/* Seção Onboarding */}
        <ListSection
          title="Onboarding"
          items={[
            { Icon: Building2,  label: "Configurações da sua empresa", subtitle: "CNPJ, endereço e sócios"       },
          ]}
        />

        {/* Seção Configurações */}
        <ListSection
          title="Configurações"
          items={CONFIG_ITEMS}
        />

        {/* Sair */}
        <div className="flex flex-col px-2">
          <button
            className="flex items-center gap-4 px-4 py-3 w-full text-left rounded-xl transition-colors"
            style={{ background: "transparent" }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "#fde8e8" }}>
              <LogOut size={18} style={{ color: "#c0392b" }} aria-hidden="true" />
            </div>
            <div className="flex flex-col flex-1 gap-[2px]">
              <span className="text-[15px] font-medium" style={{ color: "#c0392b", lineHeight: "22px" }}>Sair da conta</span>
              <span className="text-[12px] font-normal" style={{ color: "#e57373", lineHeight: "18px" }}>Encerrar sessão atual</span>
            </div>
            <ChevronRight size={16} style={{ color: "#e57373" }} aria-hidden="true" />
          </button>
        </div>
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
    <div className="min-h-screen flex justify-center items-center" style={{ background: "#f8f7fb" }}>
      <div className="relative w-[390px] h-[844px] bg-white overflow-hidden flex flex-col rounded-[40px] shadow-2xl">

        {/* Dynamic Island */}
        <div className="flex justify-center pt-3 shrink-0">
          <div className="w-[156px] h-[33px] bg-black rounded-full" />
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-6 py-2 shrink-0">
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
        ) : activeTab === "mais" ? (
          <ConfiguracoesScreen />
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
              sectionHeight={sectionHeight}
            />
            <MonthSection
              month="Junho de 2026"
              statuses={JUN_STATUSES}
              illustration={imgIlustracao}
              illustrationSide="right"
              sectionHeight={sectionHeight}
              data-month="junho-2026"
            />
            <MonthSection
              month="Julho de 2026"
              statuses={JUL_STATUSES}
              illustration={imgJulhoIlustracao}
              illustrationSide="left"
              sectionHeight={sectionHeight}
            />
          </div>
        )}

        {/* Bottom Navigation */}
        <div
          className="shrink-0 flex items-center justify-between px-6 pt-3 pb-8 bg-white"
          style={{ borderTop: "1px solid #e5e0ef" }}
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
