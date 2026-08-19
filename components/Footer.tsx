// components/Footer.tsx
"use client";
import Link from "next/link";
import { useLanguage, Language } from "@/context/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();

  const footerText: Record<Language, {
    motto: string;
    servicesTitle: string;
    services: { name: string; href: string; external?: boolean }[];
    legalTitle: string;
    legalLinks: { name: string; href: string }[];
    rights: string;
  }> = {
    ES: {
      motto: "Construyendo las bases de un nuevo horizonte económico y profesional a través de oportunidades reales y sólidas.",
      servicesTitle: "Plataforma",
      services: [
        { name: "Educación", href: "/education" },
        { name: "Finanzas", href: "/finance" },
        { name: "Diseño Gráfico", href: "https://nudesign.agency/", external: true },
        { name: "Contacto", href: "/contact" },
      ],
      legalTitle: "Marco Legal y Cumplimiento",
      legalLinks: [
        { name: "Aviso Legal", href: "/legal/aviso-legal" },
        { name: "Política de Cookies", href: "/legal/cookies" },
        { name: "Políticas de Pago", href: "/legal/pago" },
        { name: "Privacidad", href: "/legal/privacidad" },
        { name: "Términos y Condiciones", href: "/legal/terminos-y-condiciones" },
      ],
      rights: "Pagina creado y diseñado por Garic Edume",
    },
    EN: {
      motto: "Building the foundations of a new economic and professional horizon through genuine and structured opportunities.",
      servicesTitle: "Platform",
      services: [
        { name: "Education", href: "/education" },
        { name: "Finance", href: "/finance" },
        { name: "Graphic Design", href: "https://nudesign.agency/", external: true },
        { name: "Contact", href: "/contact" },
      ],
      legalTitle: "Legal Framework & Compliance",
      legalLinks: [
        { name: "Legal Notice", href: "/legal/aviso-legal" },
        { name: "Cookie Policy", href: "/legal/cookies" },
        { name: "Payment Terms", href: "/legal/pago" },
        { name: "Privacy Policy", href: "/legal/privacidad" },
        { name: "Terms & Conditions", href: "/legal/terminos-y-condiciones" },
      ],
      rights: "All rights reserved. Dedicated to structured and sustainable growth.",
    },
    FR: {
      motto: "Bâtir les fondations d'un nouvel horizon économique et professionnel grâce à des opportunités concrètes et pérennes.",
      servicesTitle: "Plateforme",
      services: [
        { name: "Éducation", href: "/education" },
        { name: "Finances", href: "/finance" },
        { name: "Design Graphique", href: "https://nudesign.agency/", external: true },
        { name: "Contact", href: "/contact" },
      ],
      legalTitle: "Cadre Juridique et Conformité",
      legalLinks: [
        { name: "Mentions Légales", href: "/legal/aviso-legal" },
        { name: "Politique de Cookies", href: "/legal/cookies" },
        { name: "Modalités de Paiement", href: "/legal/pago" },
        { name: "Confidentialité", href: "/legal/privacidad" },
        { name: "Conditions Générales", href: "/legal/terminos-y-condiciones" },
      ],
      rights: "Tous droits réservés. Engagement, solvabilité et développement.",
    }
  };

  const t = footerText[lang];

  return (
    <footer className="w-full bg-slate-950 border-t border-white/10 text-slate-300 py-12 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* IDENTIDAD CORPORATIVA */}
          <div className="md:col-span-5 space-y-3">
          <img
  src="/assets/gster-logoblanco.svg"
  alt="GSTER LLC"
  draggable={false}
  onContextMenu={(e) => e.preventDefault()}
  className="h-12 w-auto object-contain pointer-events-none select-none"
/>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.motto}
            </p>
          </div>

          {/* SERVICIOS / PLATAFORMA */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {t.servicesTitle}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {t.services.map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link href={item.href} className="text-slate-400 hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* MARCO LEGAL */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {t.legalTitle}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {t.legalLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-slate-400 hover:text-amber-400 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} GSTER LLC.</p>
          <p className="text-center sm:text-right">{t.rights}</p>
        </div>

      </div>
    </footer>
  );
}