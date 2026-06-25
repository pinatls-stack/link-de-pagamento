"use client";

import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import {
  User,
  Link2,
  PiggyBank,
  Wallet,
  Eye,
  Star,
  Home as HomeIcon,
  TrendingUp,
  ArrowLeftRight,
  Plus,
  X,
  ArrowRight,
  ArrowLeft,
  PencilLine,
  Check,
  Copy,
  Share2,
  ChevronRight,
  Settings,
  HelpCircle,
  MessageCircle,
  Info,
  LogOut,
  Zap,
  CreditCard,
} from "lucide-react";

// Status bar assets (Figma — valid 7 days)
const imgNotch = "https://www.figma.com/api/mcp/asset/13265464-9cbb-41cc-8f3c-b4908224b4f0";
const imgBatteryOutline = "https://www.figma.com/api/mcp/asset/49d35a3e-3946-45fd-8b3d-1a00e4c472b0";
const imgBatteryFill = "https://www.figma.com/api/mcp/asset/f7b7a325-18ac-4f82-81ba-6c1c60b511c2";
const imgBatteryEnd = "https://www.figma.com/api/mcp/asset/16d769ff-d3b5-4b22-a2e7-ab9a28b5a8a2";
const imgWifi = "https://www.figma.com/api/mcp/asset/a21d8568-3edc-4730-93e1-1f060b2e8475";
const imgSignal = "https://www.figma.com/api/mcp/asset/e9776620-9471-44f7-b9a0-fdddce993254";

// News photo assets (Figma — valid 7 days)
const photoPixGratuito = "https://www.figma.com/api/mcp/asset/0e63134a-1a87-440b-bf99-411d6703c577";
const photoCambio = "https://www.figma.com/api/mcp/asset/61464fe7-0bc8-4846-b2d9-83c8eb73472e";
const photoAntecipacao = "https://www.figma.com/api/mcp/asset/88f45eec-93c8-4848-ab21-df7d11acbe77";

type Screen = "home" | "gerar-link" | "personalizar-link" | "link-gerado" | "cobrancas" | "mais";
type PayMethod = "pix" | "cartao" | "ambos";
type FilterTab = "todos" | "aguardando" | "pagos" | "expirados";

type LinkRecord = {
  id: string;
  name: string;
  cents: number;
  status: "aguardando" | "pago" | "expirado";
  createdAt: string;
};

const initialLinks: LinkRecord[] = [
  { id: "1", name: "Reunião de consultoria", cents: 35000, status: "pago", createdAt: "24/05/2026" },
  { id: "2", name: "Sem nome", cents: 120000, status: "aguardando", createdAt: "26/05/2026" },
  { id: "3", name: "Serviços de maio", cents: 280000, status: "pago", createdAt: "15/05/2026" },
  { id: "4", name: "Honorários mensais", cents: 89000, status: "expirado", createdAt: "10/05/2026" },
  { id: "5", name: "Sem nome", cents: 15000, status: "aguardando", createdAt: "27/05/2026" },
];

const navItems = [
  { id: "inicio", label: "Início", icon: HomeIcon },
  { id: "cobrancas", label: "Cobranças", icon: TrendingUp },
  { id: "cobrar", label: "Cobrar", icon: Link2 },
  { id: "cambio", label: "Câmbio", icon: ArrowLeftRight },
  { id: "mais", label: "Mais", icon: Plus },
] as const;

// ── StatusBar (reutilizado em todas as telas) ──

function StatusBar() {
  return (
    <div className="relative h-[47px] overflow-hidden bg-background flex-shrink-0">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[156px] h-[33px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgNotch} alt="" aria-hidden="true" className="w-full h-full" />
      </div>
      <span className="absolute left-6 top-[14px] text-[17px] font-semibold leading-[22px] tracking-[-0.4px] text-foreground">
        9:41
      </span>
      <div className="absolute right-4 top-[19px] flex items-center gap-1.5 h-[13px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgSignal} alt="" aria-hidden="true" className="h-full w-auto" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgWifi} alt="" aria-hidden="true" className="h-full w-auto" />
        <div className="relative h-[13px] w-[27px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgBatteryOutline} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgBatteryFill} alt="" aria-hidden="true" className="absolute left-[2px] top-[2px] h-[9px] w-[21px]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgBatteryEnd} alt="" aria-hidden="true" className="absolute right-0 top-1/2 -translate-y-1/2 h-[4px] w-[2px]" />
        </div>
      </div>
    </div>
  );
}

// ── Root ──

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [activeNav, setActiveNav] = useState("inicio");
  const [linkCents, setLinkCents] = useState(0);
  const [linkName, setLinkName] = useState("");
  const [links, setLinks] = useState<LinkRecord[]>(initialLinks);

  const goToGerarLink = () => {
    setScreen("gerar-link");
    setActiveNav("cobrar");
  };
  const goToPersonalizarLink = (cents: number) => {
    setLinkCents(cents);
    setScreen("personalizar-link");
  };
  const goToLinkGerado = (name: string) => {
    const newLink: LinkRecord = {
      id: Date.now().toString(),
      name: name.trim() || "Sem nome",
      cents: linkCents,
      status: "aguardando",
      createdAt: new Date().toLocaleDateString("pt-BR"),
    };
    setLinks((prev) => [newLink, ...prev]);
    setLinkName(name);
    setScreen("link-gerado");
  };
  const goToCobrancas = () => {
    setScreen("cobrancas");
    setActiveNav("cobrancas");
  };
  const goToMais = () => {
    setScreen("mais");
    setActiveNav("mais");
  };
  const goHome = () => {
    setScreen("home");
    setActiveNav("inicio");
  };

  return (
    <div className="flex justify-center min-h-screen bg-muted">
      <div className="relative w-full max-w-[390px] min-h-screen bg-background">
        {screen === "home" && (
          <HomeScreen
            activeNav={activeNav}
            onNavChange={(id) => {
              if (id === "cobrar") goToGerarLink();
              else if (id === "cobrancas") goToCobrancas();
              else if (id === "mais") goToMais();
              else setActiveNav(id);
            }}
            onGerarLink={goToGerarLink}
          />
        )}
        {screen === "gerar-link" && (
          <GerarLinkScreen onClose={goHome} onContinuar={goToPersonalizarLink} />
        )}
        {screen === "personalizar-link" && (
          <PersonalizarLinkScreen
            cents={linkCents}
            onBack={() => setScreen("gerar-link")}
            onGerarLink={goToLinkGerado}
          />
        )}
        {screen === "link-gerado" && (
          <LinkGeradoScreen
            cents={linkCents}
            name={linkName}
            onNovoLink={() => {
              setLinkCents(0);
              setLinkName("");
              setScreen("gerar-link");
            }}
            onVerCobrancas={goToCobrancas}
            onHome={goHome}
          />
        )}
        {screen === "cobrancas" && (
          <CobrancasScreen links={links} onClose={goHome} onGerarLink={goToGerarLink} />
        )}
        {screen === "mais" && <MaisScreen onClose={goHome} />}
      </div>
    </div>
  );
}

// ── HomeScreen ──

type HomeScreenProps = {
  activeNav: string;
  onNavChange: (id: string) => void;
  onGerarLink: () => void;
};

function HomeScreen({ activeNav, onNavChange, onGerarLink }: HomeScreenProps) {
  return (
    <>
      <StatusBar />

      {/* Scrollable Content */}
      <div className="overflow-y-auto pb-24">
        <div className="flex flex-col gap-8 pt-8">

          {/* Header: avatar + nome + CNPJ */}
          <div className="px-6 flex items-center gap-4 h-11">
            <div className="bg-secondary flex items-center justify-center p-2 rounded-full flex-shrink-0">
              <User size={24} className="text-grey-700" aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-1 text-sm leading-5 text-grey-700">
              <p className="font-semibold">Nome do cliente</p>
              <p className="font-normal">0000.0000.0000/00</p>
            </div>
          </div>

          {/* Agilize Pay */}
          <div className="px-6">
            <div className="bg-purple-100 flex items-center p-4 rounded-[8px] gap-4">
              <div className="bg-white flex items-center justify-center p-2 rounded-full flex-shrink-0">
                <Link2 size={24} className="text-primary-active" aria-hidden="true" />
              </div>
              <div className="flex flex-1 flex-col gap-1 text-sm leading-5 text-primary-active min-w-0">
                <p className="font-semibold">Agilize Pay</p>
                <p className="font-normal">Cobre via Pix ou cartão de crédito</p>
              </div>
              <button
                onClick={onGerarLink}
                className="bg-primary text-primary-foreground text-xs font-medium leading-[18px] px-2 py-1.5 rounded-[8px] flex-shrink-0 cursor-pointer"
                aria-label="Gerar um link de pagamento"
              >
                Gerar um link
              </button>
            </div>
          </div>

          {/* Minhas cobranças */}
          <div className="flex flex-col gap-4">
            <div className="px-6 flex items-center justify-between">
              <p className="font-medium text-base leading-6 text-grey-800">Minhas cobranças</p>
              <button className="bg-white p-2 rounded-[8px]" aria-label="Visualizar cobranças">
                <Eye size={20} className="text-foreground" aria-hidden="true" />
              </button>
            </div>
            <div className="flex gap-6 overflow-x-auto px-6 scrollbar-hide">
              <CobrancaCard
                iconBg="bg-blue-100"
                icon={<Link2 size={24} className="text-blue-700" aria-hidden="true" />}
                value="R$ 0.000,00"
                label="Gerados"
                linkCount="10 links"
              />
              <CobrancaCard
                iconBg="bg-green-100"
                icon={<PiggyBank size={24} className="text-green-700" aria-hidden="true" />}
                value="R$ 0.000,00"
                label="Pagos pelo cliente"
                linkCount="9 links"
              />
              <CobrancaCard
                iconBg="bg-purple-100"
                icon={<Wallet size={24} className="text-primary-active" aria-hidden="true" />}
                value="R$ 0.000,00"
                label="Recebidos"
                linkCount="8 links"
              />
            </div>
          </div>

          {/* Novidades */}
          <div className="flex flex-col gap-4">
            <div className="px-6">
              <p className="font-medium text-base leading-6 text-grey-800">Novidades</p>
            </div>
            <div className="flex gap-6 overflow-x-auto px-6 scrollbar-hide">
              <NovidadeCard
                title="Pix gratuito"
                subtitle="Agora você não paga nada para cobrar com Pix!"
                photo={photoPixGratuito}
                photoAlt="Mulher utilizando celular para pagamento via Pix"
                cta="Cobrar com Pix"
              />
              <NovidadeCard
                title="Câmbio"
                subtitle="Receba dinheiro do exterior com facilidade"
                photo={photoCambio}
                photoAlt="Serviço de câmbio internacional"
                photoPosition="object-bottom"
                cta="Conhecer"
              />
              <NovidadeCard
                title="Antecipação"
                subtitle="Venda parcelado, receba de uma vez"
                photo={photoAntecipacao}
                photoAlt="Antecipação de recebíveis de cartão"
                cta="Antecipar"
              />
            </div>
          </div>

          {/* Deixe a sua opinião */}
          <div className="px-6 pb-4">
            <div className="flex flex-col gap-4">
              <p className="font-medium text-base leading-6 text-grey-800">Deixe a sua opinião</p>
              <div className="border border-border rounded-[8px] p-4 flex items-center gap-4">
                <div className="bg-secondary flex items-center justify-center p-2 rounded-full flex-shrink-0">
                  <Star size={24} className="text-grey-700" aria-hidden="true" />
                </div>
                <div className="flex flex-1 flex-col gap-1 text-sm leading-5 text-grey-700 min-w-0">
                  <p className="font-semibold">O que está achando do Agilize Pay?</p>
                  <p className="font-normal">Nos ajude a construir um produto melhor</p>
                </div>
                <button
                  className="bg-white border border-border text-foreground text-xs font-medium leading-[18px] px-2 py-1.5 rounded-[8px] flex-shrink-0"
                  aria-label="Deixar feedback sobre o Agilize Pay"
                >
                  Deixar feedback
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-border rounded-t-[8px] overflow-hidden px-6 py-4 z-50">
        <div className="flex items-center justify-between">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavChange(item.id)}
                className="flex flex-col items-center cursor-pointer"
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                <div
                  className={`flex items-center justify-center p-2.5 rounded-[8px] w-11 transition-colors ${
                    isActive ? "bg-purple-100" : ""
                  }`}
                >
                  <item.icon
                    size={20}
                    aria-hidden="true"
                    className={isActive ? "text-primary-active" : "text-grey-700"}
                  />
                </div>
                <span
                  className={`text-xs leading-[18px] text-center ${
                    isActive ? "font-medium text-foreground" : "font-normal text-grey-700"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ── GerarLinkScreen ──

function GerarLinkScreen({
  onClose,
  onContinuar,
}: {
  onClose: () => void;
  onContinuar: (cents: number) => void;
}) {
  const [rawCents, setRawCents] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 150);
    return () => clearTimeout(timer);
  }, []);

  const formatValue = (): string => {
    if (rawCents === 0) return "R$ 00,00";
    return (rawCents / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const isValid = rawCents >= 500 && rawCents <= 2000000;

  return (
    <div className="relative w-full h-screen bg-background flex flex-col">

      <StatusBar />

      {/* Close button */}
      <div className="px-6 pt-4 flex justify-end flex-shrink-0">
        <button
          onClick={onClose}
          className="bg-white border border-border flex items-center justify-center p-1.5 rounded-[8px] w-8 h-8 cursor-pointer transition-colors hover:bg-secondary active:bg-border"
          aria-label="Fechar e voltar ao início"
        >
          <X size={20} className="text-foreground" aria-hidden="true" />
        </button>
      </div>

      {/* Main content — centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-10 relative">

        <div className="flex flex-col items-center gap-4 w-full">
          {/* Value display */}
          <div
            className="flex items-center justify-center w-full cursor-text"
            onClick={() => inputRef.current?.focus()}
            role="button"
            tabIndex={-1}
            aria-label="Toque para inserir um valor"
          >
            <span className="font-semibold text-[32px] leading-[38px] text-foreground select-none">
              {formatValue()}
            </span>
            <span
              className="inline-block w-0.5 h-9 bg-primary ml-1 transition-opacity"
              style={{
                animation: isFocused ? "blink 1s step-end infinite" : "none",
                opacity: isFocused ? 1 : 0,
              }}
              aria-hidden="true"
            />
          </div>

          <p className="text-xs text-center text-grey-700 leading-[18px]">
            Insira um valor entre R$&nbsp;5,00 e R$&nbsp;20.000,00
          </p>
        </div>

        {/* Input invisível — captura digitação */}
        <input
          ref={inputRef}
          type="tel"
          inputMode="numeric"
          className="absolute inset-0 w-full h-full opacity-0 cursor-text"
          onInput={(e) => {
            const target = e.currentTarget;
            const val = target.value;
            for (const char of val) {
              if (char >= "0" && char <= "9") {
                setRawCents((prev) => Math.min(prev * 10 + parseInt(char), 2000000));
              }
            }
            target.value = "";
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              e.preventDefault();
              setRawCents((prev) => Math.floor(prev / 10));
            }
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Valor da cobrança"
        />

        {/* Nomear cobrança */}
        <button
          className="relative z-10 flex items-center gap-2 px-2 py-1.5 rounded-[8px] cursor-pointer transition-colors hover:bg-purple-100 active:bg-purple-100"
          aria-label="Nomear esta cobrança"
        >
          <span className="text-xs font-medium text-primary-active leading-[18px]">
            Nomear cobrança
          </span>
          <PencilLine size={20} className="text-primary-active" aria-hidden="true" />
        </button>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-border px-6 pt-6 pb-8 flex-shrink-0 bg-background">
        <button
          onClick={() => onContinuar(rawCents)}
          disabled={!isValid}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-[8px] text-sm font-medium leading-5 transition-all duration-150
            bg-primary text-primary-foreground
            hover:bg-primary-hover active:bg-primary-active
            disabled:bg-primary-disabled disabled:text-disabled-foreground disabled:cursor-not-allowed"
          aria-disabled={!isValid}
        >
          Continuar
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>

    </div>
  );
}

// ── PersonalizarLinkScreen ──

function PersonalizarLinkScreen({
  cents,
  onBack,
  onGerarLink,
}: {
  cents: number;
  onBack: () => void;
  onGerarLink: (name: string) => void;
}) {
  const [name, setName] = useState("");
  const [payMethod, setPayMethod] = useState<PayMethod>("ambos");

  const formattedValue = (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const payOptions: {
    id: PayMethod;
    label: string;
    desc: string;
    icon: typeof Zap;
  }[] = [
    { id: "pix", label: "Pix", desc: "Gratuito — receba na hora", icon: Zap },
    { id: "cartao", label: "Cartão de crédito", desc: "Taxa de 2,99% + R$ 0,39", icon: CreditCard },
    { id: "ambos", label: "Pix e Cartão", desc: "Cliente escolhe como pagar", icon: Wallet },
  ];

  return (
    <div className="relative w-full h-screen bg-background flex flex-col">

      <StatusBar />

      {/* Header */}
      <div className="px-6 pt-4 pb-2 flex items-center gap-4 flex-shrink-0">
        <button
          onClick={onBack}
          className="bg-white border border-border flex items-center justify-center p-1.5 rounded-[8px] w-8 h-8 cursor-pointer transition-colors hover:bg-secondary active:bg-border"
          aria-label="Voltar"
        >
          <ArrowLeft size={20} className="text-foreground" aria-hidden="true" />
        </button>
        <p className="font-semibold text-base leading-6 text-foreground">Personalizar cobrança</p>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pt-6">
        <div className="flex flex-col gap-8">

          {/* Valor */}
          <div className="flex flex-col gap-1">
            <p className="text-xs text-grey-700 leading-[18px]">Valor</p>
            <p className="text-2xl font-semibold text-foreground leading-8">{formattedValue}</p>
          </div>

          {/* Nome */}
          <div className="flex flex-col gap-2">
            <label htmlFor="link-name" className="text-sm font-medium text-foreground leading-5">
              Nome da cobrança{" "}
              <span className="text-grey-700 font-normal">(opcional)</span>
            </label>
            <input
              id="link-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Reunião de consultoria"
              maxLength={60}
              className="bg-background border border-border rounded-[8px] px-3 py-2 text-sm text-foreground placeholder:text-grey-700 outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Forma de pagamento */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-foreground leading-5">Forma de pagamento</p>
            <div className="flex flex-col gap-2">
              {payOptions.map(({ id, label, desc, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setPayMethod(id)}
                  aria-pressed={payMethod === id}
                  className={`flex items-center gap-3 p-3 rounded-[8px] border text-left transition-colors cursor-pointer ${
                    payMethod === id
                      ? "border-primary bg-purple-100"
                      : "border-border bg-background hover:bg-secondary"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center p-2 rounded-full flex-shrink-0 ${
                      payMethod === id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-grey-700"
                    }`}
                  >
                    <Icon size={16} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground leading-5">{label}</p>
                    <p className="text-xs text-grey-700 leading-[18px]">{desc}</p>
                  </div>
                  {payMethod === id && (
                    <Check size={16} className="text-primary flex-shrink-0" aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border px-6 pt-6 pb-8 flex-shrink-0 bg-background">
        <button
          onClick={() => onGerarLink(name)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-[8px] text-sm font-medium leading-5 transition-all duration-150
            bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active"
        >
          Gerar link de pagamento
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>

    </div>
  );
}

// ── LinkGeradoScreen ──

function LinkGeradoScreen({
  cents,
  name,
  onNovoLink,
  onVerCobrancas,
  onHome,
}: {
  cents: number;
  name: string;
  onNovoLink: () => void;
  onVerCobrancas: () => void;
  onHome: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const mockLink = "agilize.pay/lnk/f7k2m9";

  const formattedValue = (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${mockLink}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full h-screen bg-background flex flex-col">

      <StatusBar />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">

        {/* Ícone de sucesso */}
        <div className="bg-green-100 p-4 rounded-full">
          <Check size={32} className="text-green-700" aria-hidden="true" />
        </div>

        {/* Título */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="font-semibold text-xl leading-7 text-foreground">
            Link gerado com sucesso!
          </p>
          {name.trim() && (
            <p className="text-sm text-grey-700 leading-5">{name.trim()}</p>
          )}
          <p className="text-2xl font-semibold text-foreground leading-8">{formattedValue}</p>
        </div>

        {/* Link copiável */}
        <div className="flex items-center bg-muted border border-border rounded-[8px] w-full overflow-hidden">
          <span className="flex-1 px-3 py-2.5 text-xs text-grey-700 truncate leading-[18px]">
            {mockLink}
          </span>
          <button
            onClick={handleCopy}
            className="bg-white border-l border-border px-3 py-2.5 text-xs font-medium text-primary-active flex items-center gap-1.5 flex-shrink-0 transition-colors hover:bg-purple-100 active:bg-purple-100"
            aria-label={copied ? "Link copiado" : "Copiar link"}
          >
            {copied ? (
              <Check size={14} aria-hidden="true" />
            ) : (
              <Copy size={14} aria-hidden="true" />
            )}
            {copied ? "Copiado!" : "Copiar"}
          </button>
        </div>

        {/* Compartilhar */}
        <button
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-[8px] text-sm font-medium leading-5 border border-border bg-background text-foreground transition-colors hover:bg-secondary active:bg-border"
          aria-label="Compartilhar link de pagamento"
        >
          <Share2 size={16} aria-hidden="true" />
          Compartilhar link
        </button>

      </div>

      {/* Ações inferiores */}
      <div className="px-6 pb-8 flex flex-col gap-3 flex-shrink-0">
        <button
          onClick={onVerCobrancas}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-[8px] text-sm font-medium leading-5 transition-all duration-150
            bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active"
        >
          Ver cobranças
        </button>
        <button
          onClick={onNovoLink}
          className="w-full text-center text-sm font-medium text-primary-active leading-5 py-2 transition-colors hover:text-primary-hover"
        >
          Gerar novo link
        </button>
        <button
          onClick={onHome}
          className="w-full text-center text-xs text-grey-700 leading-[18px] py-1 transition-colors hover:text-foreground"
        >
          Ir para o início
        </button>
      </div>

    </div>
  );
}

// ── CobrancasScreen ──

function CobrancasScreen({
  links,
  onClose,
  onGerarLink,
}: {
  links: LinkRecord[];
  onClose: () => void;
  onGerarLink: () => void;
}) {
  const [filter, setFilter] = useState<FilterTab>("todos");

  const filtered = links.filter((l) => {
    if (filter === "todos") return true;
    if (filter === "aguardando") return l.status === "aguardando";
    if (filter === "pagos") return l.status === "pago";
    return l.status === "expirado";
  });

  const fmt = (cents: number) =>
    (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const totalGerado = links.reduce((sum, l) => sum + l.cents, 0);
  const totalPago = links.filter((l) => l.status === "pago").reduce((sum, l) => sum + l.cents, 0);
  const totalAguardando = links
    .filter((l) => l.status === "aguardando")
    .reduce((sum, l) => sum + l.cents, 0);

  const filterTabs: { id: FilterTab; label: string }[] = [
    { id: "todos", label: "Todos" },
    { id: "aguardando", label: "Aguardando" },
    { id: "pagos", label: "Pagos" },
    { id: "expirados", label: "Expirados" },
  ];

  return (
    <div className="relative w-full min-h-screen bg-background flex flex-col">

      <StatusBar />

      {/* Header */}
      <div className="px-6 pt-4 pb-4 flex items-center justify-between flex-shrink-0">
        <button
          onClick={onClose}
          className="bg-white border border-border flex items-center justify-center p-1.5 rounded-[8px] w-8 h-8 cursor-pointer transition-colors hover:bg-secondary active:bg-border"
          aria-label="Fechar cobranças"
        >
          <X size={20} className="text-foreground" aria-hidden="true" />
        </button>
        <p className="font-semibold text-base leading-6 text-foreground">Cobranças</p>
        <button
          onClick={onGerarLink}
          className="bg-primary text-primary-foreground text-xs font-medium leading-[18px] px-2 py-1.5 rounded-[8px] cursor-pointer transition-colors hover:bg-primary-hover active:bg-primary-active"
          aria-label="Gerar novo link"
        >
          Novo link
        </button>
      </div>

      {/* Cards de resumo */}
      <div className="flex gap-3 overflow-x-auto px-6 pb-4 scrollbar-hide flex-shrink-0">
        <SummaryCard
          label="Total gerado"
          value={fmt(totalGerado)}
          color="bg-blue-100"
          textColor="text-blue-700"
        />
        <SummaryCard
          label="Pagos"
          value={fmt(totalPago)}
          color="bg-green-100"
          textColor="text-green-700"
        />
        <SummaryCard
          label="Aguardando"
          value={fmt(totalAguardando)}
          color="bg-purple-100"
          textColor="text-primary-active"
        />
      </div>

      {/* Filtros */}
      <div className="flex gap-2 px-6 pb-4 flex-shrink-0">
        {filterTabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium leading-[18px] transition-colors cursor-pointer ${
              filter === id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-grey-700 hover:bg-border"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div className="flex-1 overflow-y-auto px-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-sm text-grey-700 leading-5">Nenhuma cobrança encontrada</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 pb-8">
            {filtered.map((link) => (
              <LinkListItem key={link.id} link={link} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

function SummaryCard({
  label,
  value,
  color,
  textColor,
}: {
  label: string;
  value: string;
  color: string;
  textColor: string;
}) {
  return (
    <div className={`${color} flex flex-col gap-1 px-4 py-3 rounded-[8px] min-w-[140px] flex-shrink-0`}>
      <p className={`text-xs leading-[18px] font-medium ${textColor}`}>{label}</p>
      <p className={`text-base font-semibold leading-6 ${textColor}`}>{value}</p>
    </div>
  );
}

function LinkListItem({ link }: { link: LinkRecord }) {
  const fmt = (cents: number) =>
    (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const statusConfig: Record<
    LinkRecord["status"],
    { label: string; bg: string; text: string }
  > = {
    aguardando: { label: "Aguardando", bg: "bg-blue-100", text: "text-blue-700" },
    pago: { label: "Pago", bg: "bg-green-100", text: "text-green-700" },
    expirado: { label: "Expirado", bg: "bg-secondary", text: "text-grey-700" },
  };
  const { label, bg, text } = statusConfig[link.status];

  return (
    <div className="bg-white border border-border rounded-[8px] p-4 flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm leading-5 text-foreground truncate">{link.name}</p>
        <p className="text-xs leading-[18px] text-grey-700">{link.createdAt}</p>
      </div>
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <p className="font-semibold text-sm leading-5 text-foreground">{fmt(link.cents)}</p>
        <span className={`${bg} ${text} text-xs font-medium leading-[18px] px-2 py-0.5 rounded-full`}>
          {label}
        </span>
      </div>
    </div>
  );
}

// ── MaisScreen ──

function MaisScreen({ onClose }: { onClose: () => void }) {
  const menuItems = [
    { icon: User, label: "Minha conta", desc: "Dados e configurações da conta" },
    { icon: Settings, label: "Configurações", desc: "Preferências e notificações" },
    { icon: HelpCircle, label: "Central de ajuda", desc: "Tire suas dúvidas" },
    { icon: MessageCircle, label: "Falar com suporte", desc: "Atendimento via chat" },
    { icon: Info, label: "Sobre o Agilize Pay", desc: "Versão 1.0.0" },
  ];

  return (
    <div className="relative w-full min-h-screen bg-background flex flex-col">

      <StatusBar />

      {/* Header */}
      <div className="px-6 pt-4 pb-6 flex items-center justify-between flex-shrink-0">
        <p className="font-semibold text-lg leading-7 text-foreground">Mais</p>
        <button
          onClick={onClose}
          className="bg-white border border-border flex items-center justify-center p-1.5 rounded-[8px] w-8 h-8 cursor-pointer transition-colors hover:bg-secondary active:bg-border"
          aria-label="Fechar menu"
        >
          <X size={20} className="text-foreground" aria-hidden="true" />
        </button>
      </div>

      {/* Menu */}
      <div className="flex flex-col px-6">
        {menuItems.map(({ icon: Icon, label, desc }) => (
          <button
            key={label}
            className="flex items-center gap-4 py-4 border-b border-border last:border-0 w-full text-left cursor-pointer transition-colors rounded-sm hover:bg-secondary active:bg-border"
          >
            <div className="bg-secondary flex items-center justify-center p-2 rounded-full flex-shrink-0">
              <Icon size={20} className="text-grey-700" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm leading-5 text-foreground">{label}</p>
              <p className="text-xs leading-[18px] text-grey-700">{desc}</p>
            </div>
            <ChevronRight size={16} className="text-grey-700 flex-shrink-0" aria-hidden="true" />
          </button>
        ))}

        {/* Sair */}
        <button className="flex items-center gap-4 py-4 mt-6 w-full text-left cursor-pointer transition-colors rounded-sm hover:bg-secondary active:bg-border">
          <div className="bg-secondary flex items-center justify-center p-2 rounded-full flex-shrink-0">
            <LogOut size={20} className="text-destructive" aria-hidden="true" />
          </div>
          <span className="text-sm font-medium leading-5 text-destructive">Sair</span>
        </button>
      </div>

    </div>
  );
}

// ── Sub-components ──

type CobrancaCardProps = {
  iconBg: string;
  icon: ReactNode;
  value: string;
  label: string;
  linkCount: string;
};

function CobrancaCard({ iconBg, icon, value, label, linkCount }: CobrancaCardProps) {
  return (
    <div className="min-w-[214px] w-[214px] bg-white border border-border rounded-[8px] p-4 flex flex-col gap-5 flex-shrink-0">
      <div className="flex flex-col gap-3">
        <div className={`${iconBg} p-2 rounded-[20px] w-fit`}>{icon}</div>
        <div className="flex flex-col gap-1">
          <p className="font-medium text-base leading-6 text-foreground">{value}</p>
          <p className="text-xs leading-[18px] text-grey-muted">{label}</p>
        </div>
      </div>
      <div className="flex justify-end">
        <p className="text-xs leading-[18px] text-grey-muted">{linkCount}</p>
      </div>
    </div>
  );
}

type NovidadeCardProps = {
  title: string;
  subtitle: string;
  photo: string;
  photoAlt: string;
  photoPosition?: string;
  cta: string;
};

function NovidadeCard({
  title,
  subtitle,
  photo,
  photoAlt,
  photoPosition = "",
  cta,
}: NovidadeCardProps) {
  return (
    <div className="min-w-[214px] bg-white border border-border rounded-[8px] p-4 flex flex-col gap-4 flex-shrink-0">
      <div className="flex flex-col text-grey-700">
        <p className="font-semibold text-sm leading-5">{title}</p>
        <p className="font-normal text-xs leading-[18px]">{subtitle}</p>
      </div>
      <div className="rounded-[8px] overflow-hidden h-[108px] flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt={photoAlt}
          className={`w-full h-full object-cover ${photoPosition}`}
        />
      </div>
      <div className="flex justify-end">
        <button className="bg-white border border-border text-foreground text-xs font-medium leading-[18px] px-2 py-1.5 rounded-[8px]">
          {cta}
        </button>
      </div>
    </div>
  );
}
