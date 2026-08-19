// app/page.tsx
"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, TrendingUp, Palette, Shield } from "lucide-react";
import { useLanguage, Language } from "@/context/LanguageContext";

export default function HomePage() {
  const { lang } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "/images/hero/hero-01.jpg",
    "/images/hero/hero-02.jpg",
    "/images/hero/hero-03.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const content: Record<Language, {
    heroTitle1: string;
    heroTitle2: string;
    heroTitle3: string;
    heroSubtitle: string;
    exploreFinance: string;
    visitAgency: string;
    financeModule: string;
    financeTitle: string;
    financeDesc: string;
    enterFinance: string;
    dashboardActive: string;
    adminAccess: string;
    designBadge: string;
    designTitle: string;
    designDesc: string;
    exploreAgency: string;
    creativeStudio: string;
    viewPortfolio: string;
  }> = {
    ES: {
      heroTitle1: "Impulsamos la",
      heroTitle2: "Independencia y el Progreso",
      heroTitle3: "con Soluciones Reales",
      heroSubtitle: "Proporcionamos las herramientas financieras, formativas y estratégicas para transformar la determinación en prosperidad duradera.",
      exploreFinance: "Servicios Financieros",
      visitAgency: "Agencia de Diseño",
      financeModule: "División Financiera",
      financeTitle: "Capital Estratégico y Soluciones de Crecimiento",
      financeDesc: "Facilitamos estructuras de financiamiento ágiles y transparentes diseñadas para respaldar proyectos ambiciosos y fortalecer la economía productiva con total solidez.",
      enterFinance: "Conocer Finanzas",
      dashboardActive: "Plataforma Institucional Activa",
      adminAccess: "Operaciones Seguras",
      designBadge: "División Creativa",
      designTitle: "Identidad Visual y Presencia de Marca de Alto Nivel",
      designDesc: "A través de NuDesign Agency, desarrollamos estrategias de marca, diseño de vanguardia y activos digitales que posicionan proyectos con distinción y autoridad en el mercado global.",
      exploreAgency: "Visitar NuDesign Agency",
      creativeStudio: "Estudio Estratégico",
      viewPortfolio: "Portafolio",
    },
    EN: {
      heroTitle1: "Empowering",
      heroTitle2: "Independence & Growth",
      heroTitle3: "through Real Solutions",
      heroSubtitle: "We provide structured financial tools, practical development, and strategic direction to turn ambition into sustainable prosperity.",
      exploreFinance: "Financial Services",
      visitAgency: "Design Agency",
      financeModule: "Financial Division",
      financeTitle: "Strategic Capital & Scalable Solutions",
      financeDesc: "Delivering agile, transparent financing structures designed to support high-potential initiatives and reinforce economic self-reliance with confidence.",
      enterFinance: "Explore Finance",
      dashboardActive: "Institutional Platform Online",
      adminAccess: "Secure Operations",
      designBadge: "Creative Division",
      designTitle: "World-Class Visual Identity & Brand Strategy",
      designDesc: "Through NuDesign Agency, we craft cutting-edge brand systems and digital assets engineered to position forward-thinking businesses with global authority.",
      exploreAgency: "Visit NuDesign Agency",
      creativeStudio: "Creative Studio",
      viewPortfolio: "Portfolio",
    },
    FR: {
      heroTitle1: "Propulser",
      heroTitle2: "l'Autonomie et l'Essor",
      heroTitle3: "par des Solutions Concrètes",
      heroSubtitle: "Nous apportons les leviers financiers, éducatifs et stratégiques pour transformer la détermination en prospérité durable et pérenne.",
      exploreFinance: "Pôle Financier",
      visitAgency: "Agence de Design",
      financeModule: "Division Financière",
      financeTitle: "Capital Stratégique et Solutions d'Avenir",
      financeDesc: "Nous déployons des financements clairs et performants, conçus pour concrétiser des projets solides et bâtir une véritable souveraineté économique.",
      enterFinance: "Découvrir la Finance",
      dashboardActive: "Plateforme Institutionnelle Active",
      adminAccess: "Opérations Sécurisées",
      designBadge: "Division Créative",
      designTitle: "Identité Visuelle et Stratégie de Marque Haut de Gamme",
      designDesc: "À travers NuDesign Agency, nous concevons des identités fortes et des outils de communication d'élite pour positionner chaque projet avec autorité et prestige.",
      exploreAgency: "Visiter NuDesign Agency",
      creativeStudio: "Studio Stratégique",
      viewPortfolio: "Portfolio",
    }
  };

  const t = content[lang];

  return (
    <main className="min-h-screen bg-[#04080a] text-slate-100 selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden">
      <Navbar />

      {/* 🌟 HERO CINEMATOGRÁFICO 🌟 */}
      <section className="relative min-h-[90vh] w-full flex items-center overflow-hidden bg-slate-950 pt-28 pb-20">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
            style={{ transitionProperty: "opacity, transform", transitionDuration: "1.5s" }}
          >
            {/* Gradiente optimizado con clase canónica */}
            <div className="absolute inset-0 bg-linear-to-r from-[#04080a]/75 via-[#04080a]/35 to-transparent z-10" />
            <img
              src={slide}
              alt={`GSTER Panorama ${index + 1}`}
              className="w-full h-full object-cover object-center filter brightness-95"
            />
          </div>
        ))}

        {/* Contenedor desplazado hacia la izquierda[cite: 2] */}
        <div className="relative z-20 w-full px-6 sm:px-12 lg:px-16">
          <div className="max-w-3xl space-y-8">
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-[1.08]">
              {t.heroTitle1} <br />
              <span className="text-amber-400 drop-shadow-[0_0_35px_rgba(251,191,36,0.3)]">
                {t.heroTitle2}
              </span> <br />
              {t.heroTitle3}
            </h1>

            <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              {/* BOTÓN 1: FINANZAS */}
              <Link
                href="/finance"
                className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-xl transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
              >
                {t.exploreFinance} <ArrowRight className="w-4 h-4" />
              </Link>
              {/* BOTÓN 2: AGENCIA NUDESIGN */}
              <a
                href="https://nudesign.agency/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300"
              >
                {t.visitAgency}
              </a>
            </div>
          </div>
        </div>

        {/* INDICADORES DEL SLIDER */}
        <div className="absolute bottom-10 right-8 sm:right-12 z-20 flex items-center gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                idx === currentSlide ? "w-10 bg-amber-400" : "w-2.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </section>

      {/* 🌟 FRANJAS PRINCIPALES 🌟 */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-24 sm:py-32 space-y-16">
        
        {/* FRANJA 1: FINANZAS */}
        <div className="relative bg-linear-to-r from-[#06181d] via-[#0b2930] to-[#06181d] text-white rounded-[3rem] p-10 sm:p-16 overflow-hidden shadow-2xl border border-white/10 group">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-[120px] pointer-events-none group-hover:scale-125 transition-transform duration-700" />
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-widest uppercase">
                <TrendingUp className="w-3.5 h-3.5" /> {t.financeModule}
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight uppercase">
                {t.financeTitle}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                {t.financeDesc}
              </p>
              <div className="pt-2">
                {/* BOTÓN 2: FINANZAS */}
                <Link
                  href="/finance"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-xl transition-all duration-300 cursor-pointer"
                >
                  {t.enterFinance} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* PREVIEW EJECUTIVO */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-white/4 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">GSTER LLC</p>
                      <p className="text-sm font-bold text-white">{t.dashboardActive}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
                    Online
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-white/10 rounded-full w-4/5" />
                  <div className="h-3 bg-white/10 rounded-full w-3/5" />
                </div>
                <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-white/5">
                  <span className="font-medium text-slate-300">Solf Slice & Garic Edume</span>
                  <span className="text-amber-400 font-bold">{t.adminAccess}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FRANJA 2: DISEÑO GRÁFICO (NUDESIGN AGENCY) */}
        <div className="relative bg-linear-to-r from-slate-950 via-[#0a1218] to-slate-950 text-white rounded-[3rem] p-10 sm:p-16 overflow-hidden shadow-2xl border border-white/10 group">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none group-hover:scale-125 transition-transform duration-700" />
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
            
            {/* PREVIEW CREATIVO */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="w-full max-w-md bg-white/4 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/15 text-amber-400 flex items-center justify-center font-bold">
                      <Palette className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{t.creativeStudio}</p>
                      <p className="text-sm font-bold text-white">nudesign.agency</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[11px] font-bold">
                    Vanguardia
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-white/10 rounded-full w-5/6" />
                  <div className="h-3 bg-white/10 rounded-full w-1/2" />
                </div>
                <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-white/5">
                  <span>Branding & Estrategia</span>
                  <a
                    href="https://nudesign.agency/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-white font-bold transition-colors"
                  >
                    {t.viewPortfolio} ↗
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-400 text-xs font-bold tracking-widest uppercase">
                {t.designBadge}
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight uppercase">
                {t.designTitle}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                {t.designDesc}
              </p>
              <div className="pt-2">
                <a
                  href="https://nudesign.agency/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-xl transition-all duration-300 cursor-pointer"
                >
                  {t.exploreAgency} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>

      </section>

      <Footer />
    </main>
  );
}