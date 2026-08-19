// app/legal/aviso-legal/page.tsx
"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage, Language } from "@/context/LanguageContext";

export default function AvisoLegalPage() {
  const { lang } = useLanguage();

  const text: Record<Language, {
    back: string;
    title: string;
    lastUpdate: string;
    section1Title: string;
    section1Desc: string;
    section2Title: string;
    section2Desc: string;
    section3Title: string;
    section3Desc: string;
  }> = {
    ES: {
      back: "Volver al Inicio",
      title: "Aviso Legal e Identificación Institucional",
      lastUpdate: "Última actualización: 2026",
      section1Title: "1. Información General",
      section1Desc: "GSTER LLC es una entidad corporativa constituida para el desarrollo de soluciones formativas, financieras y de gestión estratégica. Esta plataforma opera bajo principios estrictos de transparencia, legalidad y responsabilidad civil y comercial.",
      section2Title: "2. Propiedad Intelectual",
      section2Desc: "Todos los contenidos, marcas comerciales, logotipos, arquitectura de software y diseños presentes en este sitio web son propiedad exclusiva de GSTER LLC o de sus socios legítimos, estando protegidos por las leyes internacionales de propiedad intelectual.",
      section3Title: "3. Responsabilidad del Usuario",
      section3Desc: "El acceso y uso de los servicios dispuestos en esta plataforma implica la aceptación plena de las normativas vigentes. El usuario se compromete a hacer un uso lícito, diligente y ético de cada una de las herramientas proporcionadas.",
    },
    EN: {
      back: "Back to Home",
      title: "Legal Notice & Corporate Identification",
      lastUpdate: "Last updated: 2026",
      section1Title: "1. General Information",
      section1Desc: "GSTER LLC is a corporate entity established to provide educational, financial, and strategic management solutions. This platform operates under strict principles of transparency, legality, and corporate compliance.",
      section2Title: "2. Intellectual Property",
      section2Desc: "All content, trademarks, logos, software architecture, and design assets hosted on this portal are the proprietary assets of GSTER LLC or authorized partners, protected under international copyright regulations.",
      section3Title: "3. User Responsibility",
      section3Desc: "Access to and engagement with services provided on this platform implies full acceptance of operational guidelines. Users agree to utilize all features lawfully, ethically, and in good faith.",
    },
    FR: {
      back: "Retour à l'Accueil",
      title: "Mentions Légales et Identification Institutionnelle",
      lastUpdate: "Dernière mise à jour : 2026",
      section1Title: "1. Informations Générales",
      section1Desc: "GSTER LLC est une entité juridique créée pour le déploiement de solutions éducatives, financières et stratégiques. Cette plateforme applique des standards élevés de transparence et de conformité réglementaire.",
      section2Title: "2. Propriété Intellectuelle",
      section2Desc: "L'ensemble des contenus, marques, logos et éléments logiciels présents sur ce site sont la propriété exclusive de GSTER LLC et de ses partenaires, protégés par le droit international de la propriété intellectuelle.",
      section3Title: "3. Responsabilité de l'Utilisateur",
      section3Desc: "L'utilisation des services implique l'adhésion complète aux règles en vigueur. L'utilisateur s'engage à faire un usage loyal, licite et responsable des outils mis à sa disposition.",
    }
  };

  const t = text[lang];

  return (
    <div className="min-h-screen bg-[#04080a] text-slate-100 selection:bg-amber-400 selection:text-slate-950">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 pt-40 pb-24 space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> {t.back}
        </Link>
        <div className="border-b border-white/10 pb-6">
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">{t.title}</h1>
          <p className="text-xs text-slate-400 mt-2 font-medium">{t.lastUpdate}</p>
        </div>
        <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-normal">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-amber-400 uppercase tracking-wide">{t.section1Title}</h2>
            <p>{t.section1Desc}</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-amber-400 uppercase tracking-wide">{t.section2Title}</h2>
            <p>{t.section2Desc}</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-amber-400 uppercase tracking-wide">{t.section3Title}</h2>
            <p>{t.section3Desc}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}