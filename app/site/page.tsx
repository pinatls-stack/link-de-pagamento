"use client";

import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown, ChevronRight, CornerUpRight } from "lucide-react";

// ── Hero: fotos da strip
const imgHero1 = "https://www.figma.com/api/mcp/asset/376c102f-7281-4881-8c82-2c77eeefc7c0";
const imgHero2 = "https://www.figma.com/api/mcp/asset/ffc41b6b-2388-4573-aa66-ce25187722e2";
const imgHero3 = "https://www.figma.com/api/mcp/asset/6771dad0-5f6d-49d5-ad19-7b5bd20a87af";
const imgHero4 = "https://www.figma.com/api/mcp/asset/9019b5a3-f569-4211-8672-e2594570a61f";
const imgHero5 = "https://www.figma.com/api/mcp/asset/268ef5c2-03ab-40bd-9ba0-918e0b63a060";
const imgHero6 = "https://www.figma.com/api/mcp/asset/dc56cd36-a31d-476a-99cd-59aafa275cdf";
const imgHero7 = "https://www.figma.com/api/mcp/asset/cafe73dd-51c4-41c7-ba8b-38c28357321b";
const imgHero8 = "https://www.figma.com/api/mcp/asset/2a50ea70-79d7-430f-afc2-dc544ec327b5";
const imgHero9 = "https://www.figma.com/api/mcp/asset/1d45eb65-5877-446c-ad32-68dbbcf1b33d";
const imgHero10 = "https://www.figma.com/api/mcp/asset/c9fb90f0-3733-4b0b-a52e-7308f15006f6";

// ── Feature101: imagens dos cards
const imgCapDark1 = "https://www.figma.com/api/mcp/asset/a3f4e5bd-6a63-4f30-acd9-a4c5341f4213";
const imgCapDark2 = "https://www.figma.com/api/mcp/asset/f62085b0-8e78-4d5d-a774-9b8dde88aa63";

// ── Feature101: ícones
const imgIconBlocks = "https://www.figma.com/api/mcp/asset/8849266c-c3ff-44e8-84d5-7f251f6dc4cb";
const imgIconFilter = "https://www.figma.com/api/mcp/asset/307d87c8-8bd0-4777-bcbc-f7c0acd9404b";
const imgIconPie = "https://www.figma.com/api/mcp/asset/5a01c649-8bac-49c9-9452-8b71040e4d00";
const imgIconUsers = "https://www.figma.com/api/mcp/asset/f0162e78-d6bd-4d5b-85ea-ff79cce97864";

// ── Feature285: fotos grid lateral
const imgBrand1 = "https://www.figma.com/api/mcp/asset/e7b95d7b-b8f2-47c4-940e-558de6700e70";
const imgBrand2 = "https://www.figma.com/api/mcp/asset/4de3e8c2-c4bf-42bf-911f-2497b9643b8a";
const imgBrand3 = "https://www.figma.com/api/mcp/asset/d07355c5-adb4-466a-8efa-a3a983878fd7";
const imgBrand4 = "https://www.figma.com/api/mcp/asset/80c1d20e-7323-4fe3-8c07-465532169ae9";
const imgBrand5 = "https://www.figma.com/api/mcp/asset/e0506e92-edcc-44b4-816b-2b75d607936a";
const imgBrand6 = "https://www.figma.com/api/mcp/asset/93582855-5866-4a2b-94dc-e54705ae2563";


// ── Feature284: fotos dos pilares
const imgPillar1 = "https://www.figma.com/api/mcp/asset/c718c163-19b8-4250-94b5-c6319edb8908";
const imgPillar2 = "https://www.figma.com/api/mcp/asset/07116467-f073-40c8-8d61-8c114c05c88e";
const imgPillar3 = "https://www.figma.com/api/mcp/asset/79d16b95-0e02-45b3-9513-8e415ca1214f";
const imgPillar4 = "https://www.figma.com/api/mcp/asset/9ad95602-0ea2-42d8-9a73-79fc7992de62";
const imgPillar5 = "https://www.figma.com/api/mcp/asset/a4c2ff1b-6db2-49cb-b99b-bc8569c3d773";

// ── Footer: redes sociais
const imgSocial1 = "https://www.figma.com/api/mcp/asset/976f670b-4241-4c37-9202-ee48f26aaa14";
const imgSocial2 = "https://www.figma.com/api/mcp/asset/d6f63c50-b806-4e90-b380-f59828f595dd";
const imgSocial3 = "https://www.figma.com/api/mcp/asset/039daa93-ba69-4eec-bbae-fe668fe66266";
const imgSocial4 = "https://www.figma.com/api/mcp/asset/e5290500-2dff-4309-be79-1135ae039051";
const imgSocial5 = "https://www.figma.com/api/mcp/asset/dbe4635f-0828-4de5-a783-9b765d77117c";

const heroPhotos = [
  { src: imgHero1, h: 219 }, { src: imgHero2, h: 349 }, { src: imgHero3, h: 219 },
  { src: imgHero4, h: 308 }, { src: imgHero5, h: 257 }, { src: imgHero6, h: 219 },
  { src: imgHero7, h: 349 }, { src: imgHero8, h: 219 }, { src: imgHero9, h: 308 },
  { src: imgHero10, h: 257 },
];

const faqItems = [
  {
    q: "O que é a Agilize?",
    a: "A Agilize é a primeira contabilidade online do Brasil. Oferecemos serviços contábeis completos de forma digital, simples e acessível.",
  },
  { q: "Como abro minha empresa com a Agilize?", a: null },
  { q: "Quanto custa o serviço de contabilidade?", a: null },
  { q: "A Agilize emite nota fiscal para minha empresa?", a: null },
  { q: "Como funciona a troca de contador?", a: null },
  { q: "Quais regimes tributários a Agilize atende?", a: null },
  { q: "Onde encontro meus documentos e guias fiscais?", a: null },
];

export default function SitePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="bg-background min-h-screen">

      {/* ──────────────── HERO ──────────────── */}
      <section className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center max-w-[1280px] w-full px-8 mx-auto gap-4">

          {/* Badge */}
          <div className="bg-secondary flex items-center gap-1.5 h-[22px] px-2 rounded-full">
            <span className="text-secondary-foreground text-xs font-medium leading-4">
              Primeira contabilidade online do Brasil
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-medium text-[72px] leading-none max-w-3xl text-center tracking-[-0.4px] text-foreground">
            Você cuida da sua empresa. A gente cuida da sua contabilidade.
          </h1>

          {/* Subtítulo */}
          <div className="flex items-center justify-center max-w-[576px] pt-5 w-full">
            <p className="flex-1 text-base text-center text-muted-foreground opacity-80 leading-6">
              Deixe a burocracia com a gente. Resolvemos tudo, desde a abertura do CNPJ até o dia a dia da sua contabilidade.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex gap-2.5 items-center pb-12 pt-8">
            <button className="bg-secondary flex gap-2 h-9 items-center justify-center px-4 rounded-full text-sm font-medium text-secondary-foreground cursor-pointer transition-colors duration-150 hover:bg-border active:bg-border-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              Abra sua empresa grátis
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
            <button className="bg-primary flex gap-2 h-9 items-center justify-center px-4 rounded-full text-sm font-medium text-primary-foreground cursor-pointer transition-colors duration-150 hover:bg-primary-hover active:bg-primary-active disabled:bg-primary-disabled disabled:text-disabled-foreground disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              Troque de contador
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </div>

          {/* Strip de fotos */}
          <div className="flex flex-col h-[304px] overflow-hidden pt-12 w-full">
            <div className="flex gap-4 items-center justify-center w-full">
              {heroPhotos.map((photo, i) => (
                <div key={i} className="relative rounded-[11px] flex-shrink-0 w-[220px]" style={{ height: photo.h }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.src} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover rounded-[11px]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── RECURSOS ──────────────── */}
      <section className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center max-w-[1280px] w-full px-8 mx-auto">

          {/* Header */}
          <div className="flex flex-col gap-4 items-center max-w-[576px] text-center w-full">
            <h2 className="font-bold text-5xl leading-none text-foreground">
              Tudo o que sua empresa precisa para crescer!
            </h2>
            <p className="text-xl text-muted-foreground leading-7">
              Gerencie sua contabilidade com facilidade e fique sempre em dia com suas obrigações.
            </p>
          </div>

          {/* Bento grid 3 colunas */}
          <div className="grid grid-cols-3 gap-4 max-w-[1152px] pt-20 w-full">

            {/* Transparência fiscal — col 1-2, row 1-2 (card grande) */}
            <div className="bg-muted col-start-1 col-span-2 row-start-1 row-span-2 flex flex-col justify-between p-8 rounded-lg">
              <div className="flex flex-col">
                <div className="pb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgIconBlocks} alt="" aria-hidden="true" className="size-11" />
                </div>
                <h3 className="text-2xl font-medium text-foreground leading-8 pb-1">Transparência fiscal</h3>
                <p className="text-base text-muted-foreground leading-6">Saiba exatamente quanto paga de imposto e quando pagar.</p>
              </div>
              <div className="flex flex-col items-end mt-8">
                <div className="h-[320px] rounded-lg w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgCapDark1} alt="" aria-hidden="true" className="w-full h-full object-cover rounded-lg" />
                </div>
              </div>
            </div>

            {/* Conciliação bancária — col 3, row 1 */}
            <div className="bg-muted col-start-3 row-start-1 flex flex-col h-[320px] justify-between p-8 rounded-lg">
              <div className="pb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imgIconFilter} alt="" aria-hidden="true" className="size-11" />
              </div>
              <div>
                <h3 className="text-2xl font-medium text-foreground leading-8 pb-1">Conciliação bancária</h3>
                <p className="text-base text-muted-foreground leading-6">Integre seu banco e acompanhe entradas e saídas em tempo real.</p>
              </div>
            </div>

            {/* Previsão de impostos — col 3, row 2 */}
            <div className="bg-muted col-start-3 row-start-2 flex flex-col h-[320px] justify-between p-8 rounded-lg">
              <div className="pb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imgIconPie} alt="" aria-hidden="true" className="size-11" />
              </div>
              <div>
                <h3 className="text-2xl font-medium text-foreground leading-8 pb-1">Previsão de impostos</h3>
                <p className="text-base text-muted-foreground leading-6">Calcule e preveja seus impostos com antecedência.</p>
              </div>
            </div>

            {/* Emissão de notas — col 1, row 3 */}
            <div className="bg-muted col-start-1 row-start-3 flex flex-col h-[320px] justify-between p-8 rounded-lg">
              <div className="pb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imgIconUsers} alt="" aria-hidden="true" className="size-11" />
              </div>
              <div>
                <h3 className="text-2xl font-medium text-foreground leading-8 pb-1">Emissão de notas</h3>
                <p className="text-base text-muted-foreground leading-6">Emita notas fiscais com poucos cliques, sem complicações.</p>
              </div>
            </div>

            {/* Gestão completa — col 2-3, row 3 */}
            <div className="bg-muted col-start-2 col-span-2 row-start-3 flex h-[320px] items-end gap-4 p-8 rounded-lg">
              <div className="flex-1">
                <h3 className="text-2xl font-medium text-foreground leading-8 pb-1">Gestão completa</h3>
                <p className="text-base text-muted-foreground leading-6">Controle seus clientes, contratos e documentos em um só lugar.</p>
              </div>
              <div className="flex-1 h-[256px] rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imgCapDark2} alt="" aria-hidden="true" className="w-full h-full object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── BRAND ──────────────── */}
      <section className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center max-w-[1280px] w-full px-8 mx-auto">
          <div className="bg-muted flex items-start overflow-hidden rounded-[32px] w-full">

            {/* Esquerda: texto */}
            <div className="flex flex-1 flex-col justify-between p-[60px] self-stretch min-w-0">
              {/* Logo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="Agilize" className="h-8 w-auto" />

              {/* Copy */}
              <div className="flex flex-col gap-2 py-12">
                <h2 className="text-[60px] font-semibold text-foreground leading-none tracking-[-0.4px]">
                  Somos a primeira contabilidade online do Brasil
                </h2>
                <p className="text-lg text-muted-foreground leading-7 opacity-50">
                  Cuidamos de toda a parte burocrática da sua empresa para você focar no que realmente importa: crescer.
                </p>
              </div>

              {/* CTA */}
              <button className="bg-primary flex gap-2 h-10 items-center justify-center w-fit px-6 rounded-lg text-sm font-medium text-primary-foreground cursor-pointer transition-colors duration-150 hover:bg-primary-hover active:bg-primary-active disabled:bg-primary-disabled disabled:text-disabled-foreground disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                Contrate a Agilize
                <CornerUpRight size={16} aria-hidden="true" />
              </button>
            </div>

            {/* Direita: grid de fotos */}
            <div className="flex flex-1 gap-4 h-[644px] items-center justify-center pr-3">
              <div className="flex flex-1 flex-col gap-4 min-w-0">
                {[imgBrand1, imgBrand2, imgBrand3, imgBrand1].map((src, i) => (
                  <div key={i} className="aspect-square rounded-3xl overflow-hidden w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" aria-hidden="true" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-1 flex-col gap-4 min-w-0">
                {[imgBrand4, imgBrand5, imgBrand6].map((src, i) => (
                  <div key={i} className="aspect-square rounded-3xl overflow-hidden w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" aria-hidden="true" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── PLANOS ──────────────── */}
      <section className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center max-w-[1280px] w-full px-8 mx-auto gap-[52px]">

          <h2 className="font-bold text-[60px] leading-none text-center tracking-[-0.4px] text-foreground">
            Planos para cada momento da sua empresa
          </h2>

          {/* Tabs */}
          <div className="bg-muted flex items-center overflow-hidden p-1 rounded-xl w-64">
            <button className="bg-background flex flex-1 gap-1.5 h-7 items-center justify-center overflow-hidden px-1.5 py-0.5 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-border active:bg-border-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              <span className="text-sm font-medium text-foreground">Serviço</span>
            </button>
            <button className="flex flex-1 gap-1.5 h-7 items-center justify-center overflow-hidden px-1.5 py-0.5 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-background active:bg-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              <span className="text-sm font-medium text-muted-foreground">Comércio</span>
            </button>
          </div>

          {/* Cards */}
          <div className="flex gap-9 items-stretch w-full">
            <PricingCard
              name="MEI"
              price="Grátis"
              period="para sempre"
              description="Ideal para quem está começando. Abertura de CNPJ e contabilidade gratuita."
              cta="Começar grátis"
              ctaVariant="secondary"
              features={["Abertura de empresa", "Declaração MEI", "Emissão de notas", "Suporte especializado", "Acesso ao app"]}
              highlighted={false}
            />
            <PricingCard
              name="ME / EPP"
              price="R$ 99"
              period="por mês"
              description="Completo para pequenas e médias empresas. Tudo que você precisa para crescer."
              cta="Contratar agora"
              ctaVariant="primary"
              features={["Contabilidade completa", "Emissão de notas", "Folha de pagamento", "Consultoria tributária", "Suporte prioritário"]}
              highlighted={true}
            />
            <PricingCard
              name="Empresas"
              price="Sob consulta"
              period="plano personalizado"
              description="Para empresas de médio e grande porte com necessidades específicas."
              cta="Falar com consultor"
              ctaVariant="secondary"
              features={["Tudo do plano ME/EPP", "Gestão fiscal avançada", "Relatórios customizados", "Gerente de conta dedicado", "SLA garantido"]}
              highlighted={false}
            />
          </div>
        </div>
      </section>

      {/* ──────────────── PILARES ──────────────── */}
      <section className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center max-w-[1280px] w-full px-8 mx-auto">
          <div
            className="grid grid-cols-4 gap-4 max-w-[1152px] w-full"
            style={{ gridTemplateRows: "352px auto" }}
          >
            {/* 01 Simplicidade — col 1, row 1 */}
            <PillarCard num="01" title="Simplicidade" desc="Interface intuitiva que facilita o dia a dia da sua gestão contábil." img={imgPillar1} className="col-start-1 row-start-1" />
            {/* 02 Agilidade — col 2-3, row 1 */}
            <PillarCard num="02" title="Agilidade" desc="Processos automatizados para que você nunca perca um prazo importante." img={imgPillar2} className="col-start-2 col-span-2 row-start-1" />
            {/* 03 Segurança — col 4, row 1-2 */}
            <PillarCard num="03" title="Segurança" desc="Seus dados protegidos com criptografia e conformidade com a LGPD." img={imgPillar3} className="col-start-4 row-start-1 row-span-2" />
            {/* 05 Tecnologia — col 1-2, row 2 */}
            <PillarCard num="05" title="Tecnologia" desc="Plataforma moderna com integrações bancárias e emissão de notas fiscais." img={imgPillar5} className="col-start-1 col-span-2 row-start-2" />
            {/* 04 Especialistas — col 3, row 2 */}
            <PillarCard num="04" title="Especialistas" desc="Time de contadores qualificados prontos para te atender." img={imgPillar4} className="col-start-3 row-start-2" />
          </div>
        </div>
      </section>

      {/* ──────────────── FAQ ──────────────── */}
      <section className="flex items-center justify-center py-32">
        <div className="flex flex-col items-start max-w-[1280px] w-full px-8 mx-auto">
          <div className="flex flex-col items-center overflow-hidden w-full">

            {/* Header */}
            <div className="flex flex-col gap-4 items-start overflow-hidden w-full">
              <div className="bg-primary flex items-center gap-1.5 h-[22px] px-2 rounded-full">
                <span className="text-primary-foreground text-xs font-medium leading-4">FAQ</span>
              </div>
              <h2 className="text-4xl font-semibold text-foreground leading-10">Perguntas frequentes</h2>
              <div className="flex items-center justify-center pt-2 w-full">
                <p className="flex-1 text-lg text-muted-foreground leading-7">
                  Tire suas dúvidas sobre abertura de empresa, contabilidade e serviços da Agilize.
                </p>
              </div>
            </div>

            {/* Acordeão */}
            <div className="border-b border-border flex flex-col items-start overflow-hidden py-12 w-full">
              {faqItems.map((item, i) => (
                <div key={i} className="flex flex-col items-start w-full border-t border-border first:border-t-0">
                  <button
                    className="flex gap-1 items-center min-h-9 py-4 text-left w-full cursor-pointer transition-colors duration-150 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className="flex-1 text-sm font-medium text-foreground leading-6">{item.q}</span>
                    <ChevronDown
                      size={16}
                      aria-hidden="true"
                      className={`flex-shrink-0 transition-transform duration-200 text-muted-foreground ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === i && item.a && (
                    <div className="flex items-center justify-center pb-4 w-full">
                      <p className="flex-1 text-sm text-foreground leading-6">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA inferior */}
            <div className="flex gap-4 items-end justify-between pt-12 w-full">
              <div className="flex flex-1 flex-col gap-6 pt-4">
                <h3 className="text-2xl font-semibold text-foreground leading-8">Ainda tem dúvidas?</h3>
                <p className="text-lg font-medium text-muted-foreground leading-7">
                  Nossa equipe está pronta para te ajudar em cada etapa da sua jornada.
                </p>
              </div>
              <button className="flex gap-2 items-center text-primary text-base font-medium leading-6 flex-shrink-0 pb-2 cursor-pointer transition-colors duration-150 hover:text-primary-hover active:text-primary-active focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm">
                Falar com a Agilize
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── FOOTER ──────────────── */}
      <footer className="flex items-center justify-center py-32 border-t border-border">
        <div className="flex flex-col items-start max-w-[1280px] w-full px-8 mx-auto gap-24">

          <div className="flex flex-col gap-14 items-start w-full">
            {/* Logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Agilize" className="h-10 w-auto" />

            {/* Grid: nav + social + newsletter */}
            <div className="grid grid-cols-5 gap-8 w-full">
              {/* Produto */}
              <div className="flex flex-col gap-4">
                <p className="text-base font-bold text-foreground leading-6">Produto</p>
                <nav className="flex flex-col gap-4">
                  {["Visão geral", "Planos", "Parceiros", "Funcionalidades", "Integrações", "Preços"].map((link) => (
                    <a key={link} href="#" className="text-base font-medium text-muted-foreground leading-6 hover:text-foreground transition-colors">
                      {link}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Empresa */}
              <div className="flex flex-col gap-4">
                <p className="text-base font-bold text-foreground leading-6">Empresa</p>
                <nav className="flex flex-col gap-4">
                  {["Sobre nós", "Time", "Blog", "Carreiras", "Contato", "Privacidade"].map((link) => (
                    <a key={link} href="#" className="text-base font-medium text-muted-foreground leading-6 hover:text-foreground transition-colors">
                      {link}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Recursos */}
              <div className="flex flex-col gap-4">
                <p className="text-base font-bold text-foreground leading-6">Recursos</p>
                <nav className="flex flex-col gap-4">
                  {["Ajuda", "Vendas", "Anunciar"].map((link) => (
                    <a key={link} href="#" className="text-base font-medium text-muted-foreground leading-6 hover:text-foreground transition-colors">
                      {link}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Social + Newsletter */}
              <div className="col-span-2 flex flex-col gap-10 items-end">
                {/* Redes sociais */}
                <div className="flex flex-wrap gap-2 items-center justify-end w-full">
                  {[imgSocial1, imgSocial2, imgSocial3, imgSocial4, imgSocial5].map((src, i) => (
                    <button key={i} className="bg-muted flex items-center justify-center p-3 rounded-3xl size-12 cursor-pointer transition-colors duration-150 hover:bg-border active:bg-border-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" aria-label={`Rede social ${i + 1}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" aria-hidden="true" className="size-6 block" />
                    </button>
                  ))}
                </div>

                {/* Newsletter */}
                <div className="flex flex-col gap-1.5 items-start w-full">
                  <label className="text-sm font-medium text-foreground leading-6">
                    Receba novidades da Agilize
                  </label>
                  <div className="flex gap-2 items-stretch max-w-96 w-full">
                    <div className="bg-background border border-border flex flex-1 flex-col items-start justify-center px-2.5 py-1 rounded-lg">
                      <span className="text-sm text-muted-foreground leading-6">Seu e-mail</span>
                    </div>
                    <button className="bg-primary flex gap-2 h-9 items-center justify-center px-4 rounded-lg text-sm font-medium text-primary-foreground flex-shrink-0 cursor-pointer transition-colors duration-150 hover:bg-primary-hover active:bg-primary-active disabled:bg-primary-disabled disabled:text-disabled-foreground disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                      Assinar
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground leading-4">
                    Ao enviar, você concorda com nossa Política de Privacidade
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Barra inferior */}
          <div className="border-t border-border flex items-center justify-between pt-8 w-full">
            <span className="text-sm font-medium text-muted-foreground leading-6">
              © 2025 Agilize. Todos os direitos reservados.
            </span>
            <div className="flex gap-4 items-center">
              <a href="#" className="text-sm font-medium text-muted-foreground leading-6 underline hover:text-foreground transition-colors">
                Termos e Condições
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground leading-6 underline hover:text-foreground transition-colors">
                Política de Privacidade
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

// ──────────────── SUB-COMPONENTES ────────────────

type PricingCardProps = {
  name: string;
  price: string;
  period: string;
  description: string;
  cta: string;
  ctaVariant: "primary" | "secondary";
  features: string[];
  highlighted: boolean;
};

function PricingCard({ name, price, period, description, cta, ctaVariant, features, highlighted }: PricingCardProps) {
  return (
    <div
      className={`bg-background border flex flex-1 flex-col gap-6 max-w-96 overflow-hidden p-6 rounded-3xl shadow-sm ${
        highlighted ? "border-primary" : "border-border"
      }`}
    >
      <div className="flex flex-col gap-5 items-start w-full">
        <p className="text-lg font-medium text-foreground leading-7">{name}</p>
        <div className="flex flex-col items-start w-full">
          <p className="text-5xl font-semibold text-muted-foreground leading-none tracking-[-0.4px]">{price}</p>
          <p className="text-xs text-foreground leading-4 mt-1">{period}</p>
        </div>
      </div>

      <div className="flex flex-col items-start pt-6 px-1 w-full">
        <p className="text-sm text-muted-foreground leading-6">{description}</p>

        <div className="pt-6 w-full">
          <button
            className={`flex gap-2 h-9 items-center justify-center overflow-hidden px-4 rounded-lg text-sm font-medium w-full cursor-pointer transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
              ctaVariant === "primary"
                ? "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active disabled:bg-primary-disabled disabled:text-disabled-foreground disabled:cursor-not-allowed"
                : "bg-secondary text-secondary-foreground hover:bg-border active:bg-border-hover"
            }`}
          >
            {cta}
          </button>
        </div>

        <div className="flex items-center justify-center pb-4 pt-12 w-full">
          <span className="text-xs text-muted-foreground opacity-50 leading-4 tracking-widest">INCLUSO</span>
        </div>

        <div className="flex flex-col gap-4 items-start pt-6 w-full">
          {features.map((feature) => (
            <div key={feature} className="flex gap-3 items-center w-full">
              <Check size={20} className="text-primary flex-shrink-0" aria-hidden="true" />
              <span className="flex-1 text-sm text-muted-foreground leading-6">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type PillarCardProps = {
  num: string;
  title: string;
  desc: string;
  img: string;
  className?: string;
};

function PillarCard({ num, title, desc, img, className = "" }: PillarCardProps) {
  return (
    <div className={`border border-border flex flex-col gap-2 items-start overflow-hidden p-4 rounded-3xl ${className}`}>
      <div className="flex items-center justify-between w-full">
        <span className="text-base text-muted-foreground whitespace-nowrap leading-6">{num}</span>
      </div>
      <div className="flex-1 min-h-0 relative rounded-3xl w-full overflow-hidden" style={{ minHeight: 120 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover rounded-3xl" />
      </div>
      <div className="flex items-center justify-center pt-4 w-full">
        <h3 className="flex-1 text-2xl font-semibold text-foreground leading-8 tracking-[-0.4px]">{title}</h3>
      </div>
      <p className="text-base text-muted-foreground leading-6 w-full">{desc}</p>
    </div>
  );
}
