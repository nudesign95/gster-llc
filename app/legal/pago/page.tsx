// app/legal/pago/page.tsx
"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage, Language } from "@/context/LanguageContext";

export default function PagoPage() {
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
      title: "Políticas y Condiciones de Pago",
      lastUpdate: "Última actualización: 2026",
      section1Title: "1. Transparencia y Monedas de Operación",
      section1Desc: "Todas las operaciones financieras y acuerdos de pago gestionados a través de GSTER LLC se estructuran en Pesos Dominicanos (DOP) o Dólares Estadounidenses (USD), aplicando tasas transparentes y acordadas contractualmente.",
      section2Title: "2. Compromiso y Cronogramas",
      section2Desc: "Los pagos o abonos a contratos de financiamiento y servicios profesionales deben realizarse conforme a las fechas pactadas en cada acuerdo individual, garantizando la sostenibilidad y el buen crédito de las partes.",
      section3Title: "3. Métodos y Canales Verificados",
      section3Desc: "Los cobros y abonos se procesan únicamente a través de cuentas bancarias y canales institucionales autorizados por la gerencia de GSTER LLC.",
    },
    EN: {
      back: "Back to Home",
      title: "Payment Terms & Conditions",
      lastUpdate: "Last updated: 2026",
      section1Title: "1. Operational Currencies & Transparency",
      section1Desc: "All financial transactions and payment structures managed by GSTER LLC are denominated in Dominican Pesos (DOP) or United States Dollars (USD), adhering to explicitly agreed conversion rates.",
      section2Title: "2. Schedules & Fulfillment",
      section2Desc: "Installments and disbursements must align with the agreed contractual schedule, preserving financial integrity and mutual accountability.",
      section3Title: "3. Verified Payment Channels",
      section3Desc: "Payments and capital settlements are executed strictly through verified corporate banking channels authorized by GSTER LLC management.",
    },
    FR: {
      back: "Retour à l'Accueil",
      title: "Modalités et Conditions de Paiement",
      lastUpdate: "Dernière mise à jour : 2026",
      section1Title: "1. Devises et Transparence",
      section1Desc: "Toutes les opérations gérées par GSTER LLC sont libellées en Pesos Dominicains (DOP) ou en Dollars Américains (USD), selon des taux de change clairs et contractuellement définis.",
      section2Title: "2. Respect des Échéances",
      section2Desc: "Les règlements et remboursements doivent être effectués selon le calendrier convenu lors de la signature, garantissant la pérennité des engagements mutuels.",
      section3Title: "3. Canaux Officiels Autorisés",
      section3Desc: "Les transactions s'effectuent exclusivement via les comptes bancaires et plateformes certifiés par la direction de GSTER LLC.",
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