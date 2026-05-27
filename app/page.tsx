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
  PencilLine,
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

type Screen = "home" | "gerar-link";

const navItems = [
  { id: "inicio", label: "Início", icon: HomeIcon },
  { id: "cobrancas", label: "Cobranças", icon: TrendingUp },
  { id: "cobrar", label: "Cobrar", icon: Link2 },
  { id: "cambio", label: "Câmbio", icon: ArrowLeftRight },
  { id: "mais", label: "Mais", icon: Plus },
] as const;

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [activeNav, setActiveNav] = useState("inicio");

  const goToGerarLink = () => setScreen("gerar-link");
  const goHome = () => {
    setScreen("home");
    setActiveNav("inicio");
  };

  return (
    <div className="flex justify-center min-h-screen bg-muted">
      <div className="relative w-full max-w-[390px] min-h-screen bg-background">
        {screen === "home" ? (
          <HomeScreen
            activeNav={activeNav}
            onNavChange={(id) => {
              if (id === "cobrar") goToGerarLink();
              else setActiveNav(id);
            }}
            onGerarLink={goToGerarLink}
          />
        ) : (
          <GerarLinkScreen onClose={goHome} />
        )}
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
      {/* Status Bar */}
      <div className="relative h-[47px] overflow-hidden bg-background">
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

function GerarLinkScreen({ onClose }: { onClose: () => void }) {
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

      {/* Status Bar */}
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
          {/* Value display — toque para digitar */}
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
            {/* Cursor piscante — indica campo editável */}
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
