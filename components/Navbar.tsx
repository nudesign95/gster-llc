// components/Navbar.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, Lock } from "lucide-react";
import { useLanguage, Language } from "@/context/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navTranslations: Record<Language, {
    inicio: string;
    educacion: string;
    finanzas: string;
    diseno: string;
    contacto: string;
    portal: string;
  }> = {
    ES: {
      inicio: "Inicio",
      educacion: "Educación",
      finanzas: "Finanzas",
      diseno: "Diseño Gráfico",
      contacto: "Contacto",
      portal: "Acceso Seguro",
    },
    EN: {
      inicio: "Home",
      educacion: "Education",
      finanzas: "Finance",
      diseno: "Graphic Design",
      contacto: "Contact",
      portal: "Secure Access",
    },
    FR: {
      inicio: "Accueil",
      educacion: "Éducation",
      finanzas: "Finances",
      diseno: "Design Graphique",
      contacto: "Contact",
      portal: "Accès Sécurisé",
    }
  };

  const t = navTranslations[lang];

  const navLinks = [
    { name: t.inicio, href: "/" },
    { name: t.educacion, href: "/education" },
    { name: t.finanzas, href: "/finance" },
    { name: t.diseno, href: "https://nudesign.agency/", external: true },
    { name: t.contacto, href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-3 px-4 sm:px-8 select-none">
      <div
        className={`max-w-7xl mx-auto rounded-3xl transition-all duration-500 ${
          isScrolled
            ? "bg-slate-950/90 backdrop-blur-2xl border border-white/10 shadow-2xl py-3 px-6 sm:px-8"
            : "bg-slate-950/60 backdrop-blur-xl border border-white/5 shadow-xl py-4 px-6 sm:px-8"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          
          {/* 🔒 LOGO BLINDADO CONTRA DESCARGAS Y CLIC DERECHO */}
          <Link href="/" className="flex items-center group cursor-pointer select-none">
            <div className="relative flex items-center justify-center py-1">
              <div className="absolute -inset-2 bg-emerald-500/10 rounded-2xl blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <img
                src="/assets/gster-logoblanco.svg"
                alt="GSTER LLC"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="relative h-10 sm:h-11 w-auto object-contain pointer-events-none select-none transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* NAVEGACIÓN DE ESCRITORIO */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-white/5 border border-white/10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-200 text-slate-300 hover:text-white hover:bg-white/10 flex items-center gap-1.5 select-none"
                >
                  {link.name}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 pointer-events-none" />
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-200 select-none ${
                    isActive
                      ? "text-amber-300 font-bold bg-white/10 shadow-inner"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CONTROLES: IDIOMAS Y BOTÓN DE ACCESO */}
          <div className="hidden sm:flex items-center gap-4 select-none">
            <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10">
              {(["ES", "EN", "FR"] as Language[]).map((item) => (
                <button
                  key={item}
                  onClick={() => setLang(item)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                    lang === item
                      ? "bg-amber-400 text-slate-950 font-extrabold shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <Link
              href="/login"
              className="relative px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer select-none"
            >
              <Lock className="w-3.5 h-3.5 pointer-events-none" />
              {t.portal}
            </Link>
          </div>

          {/* BOTÓN MENÚ MÓVIL */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Abrir menú"
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5 text-slate-200" />}
            </button>
          </div>

        </div>

        {/* MENÚ MÓVIL DESPLEGABLE */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-white/10 space-y-4 select-none animate-in fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between text-slate-300 hover:bg-white/5"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-60 pointer-events-none" />
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between text-slate-300 hover:bg-white/5"
                  >
                    <span>{link.name}</span>
                  </Link>
                )
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10">
                {(["ES", "EN", "FR"] as Language[]).map((item) => (
                  <button
                    key={item}
                    onClick={() => setLang(item)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      lang === item ? "bg-amber-400 text-slate-950" : "text-slate-400"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
              >
                {t.portal}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}