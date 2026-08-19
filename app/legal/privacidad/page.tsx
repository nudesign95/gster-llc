"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage, Language } from "@/context/LanguageContext";

export default function PrivacidadPage() {
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
      title: "Política de Privacidad y Protección de Datos",
      lastUpdate: "Última actualización: 2026",
      section1Title: "1. Confidencialidad Institucional",
      section1Desc: "En GSTER LLC protegemos la privacidad y la información suministrada por cada cliente, colaborador y aliado. Todos los datos personales son tratados con estricta reserva y medidas de seguridad digital.",
      section2Title: "2. Uso de la Información",
      section2Desc: "La información recolectada a través de formularios o contratos se emplea únicamente para la gestión de solicitudes, soporte técnico y ejecución de acuerdos acordados.",
      section3Title: "3. Derechos de los Titulares",
      section3Desc: "Usted tiene derecho a solicitar la consulta, actualización o eliminación de sus datos en cualquier momento mediante comunicación directa con nuestra dirección ejecutiva.",
    },
    EN: {
      back: "Back to Home",
      title: "Privacy & Data Protection Policy",
      lastUpdate: "Last updated: 2026",
      section1Title: "1. Institutional Confidentiality",
      section1Desc: "GSTER LLC prioritizes the security and privacy of all data provided by clients, partners, and associates. All records are maintained under rigorous confidentiality standards.",
      section2Title: "2. Data Utilization",
      section2Desc: "Information collected via application forms or service agreements is used exclusively for strategic evaluation, account administration, and operational fulfillment.",
      section3Title: "3. Data Subject Rights",
      section3Desc: "Users maintain the right to review, rectify, or request deletion of their personal records at any time by contacting our executive office.",
    },
    FR: {
      back: "Retour à l'Accueil",
      title: "Politique de Confidentialité et Protection des Données",
      lastUpdate: "Dernière mise à jour : 2026",
      section1Title: "1. Confidentialité et Sécurité",
      section1Desc: "GSTER LLC assure une protection rigoureuse des informations personnelles et d'entreprise. Nous appliquons des protocoles stricts de sécurité informatique.",
      section2Title: "2. Traitement des Données",
      section2Desc: "Les informations fournies lors des prises de contact ou formalisations de contrats sont strictement réservées à la gestion des services demandés.",
      section3Title: "3. Vos Droits",
      section3Desc: "Vous disposez à tout moment d'un droit d'accès, de rectification et de suppression de vos données sur simple demande auprès de notre direction.",
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