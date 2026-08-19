"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage, Language } from "@/context/LanguageContext";

export default function TerminosPage() {
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
      title: "Términos y Condiciones Generales",
      lastUpdate: "Última actualización: 2026",
      section1Title: "1. Alcance de los Servicios",
      section1Desc: "GSTER LLC proporciona servicios profesionales de formación, análisis financiero y coordinación operativa. La utilización de cada servicio está sujeta a la firma de acuerdos individuales.",
      section2Title: "2. Cumplimiento y Compromiso Mutuo",
      section2Desc: "Las partes se comprometen a actuar con total buena fe, honestidad y apego a las leyes aplicables en cada territorio de operación comercial.",
      section3Title: "3. Modificaciones de los Términos",
      section3Desc: "GSTER LLC se reserva la potestad de actualizar periódicamente estos términos para adecuarlos a nuevas regulaciones o mejoras en la plataforma.",
    },
    EN: {
      back: "Back to Home",
      title: "General Terms & Conditions",
      lastUpdate: "Last updated: 2026",
      section1Title: "1. Scope of Operations",
      section1Desc: "GSTER LLC delivers advisory, practical education, and financial management solutions. All services are governed by individualized bilateral agreements.",
      section2Title: "2. Mutual Accountability",
      section2Desc: "All participating parties agree to conduct operations in good faith, maintaining high standards of integrity and adherence to governing jurisdictions.",
      section3Title: "3. Revisions to Terms",
      section3Desc: "GSTER LLC reserves the prerogative to amend these terms periodically to reflect regulatory updates and platform enhancements.",
    },
    FR: {
      back: "Retour à l'Accueil",
      title: "Conditions Générales d'Utilisation",
      lastUpdate: "Dernière mise à jour : 2026",
      section1Title: "1. Champ d'Application",
      section1Desc: "GSTER LLC propose des services d'accompagnement financier, d'éducation et de gestion stratégique régis par des contrats spécifiques.",
      section2Title: "2. Réciprocité et Rigueur",
      section2Desc: "Les parties s'engagent à agir avec rigueur, bonne foi et dans le respect absolu des lois commerciales en vigueur.",
      section3Title: "3. Évolution des Conditions",
      section3Desc: "GSTER LLC se réserve le droit d'adapter ses conditions d'utilisation afin de se conformer aux évolutions légales et organisationnelles.",
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