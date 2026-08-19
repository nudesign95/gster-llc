// app/legal/cookies/page.tsx
"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage, Language } from "@/context/LanguageContext";

export default function CookiesPage() {
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
      title: "Política de Cookies",
      lastUpdate: "Última actualización: 2026",
      section1Title: "1. ¿Qué son las Cookies?",
      section1Desc: "Las cookies son pequeños archivos de datos que se almacenan en su dispositivo al navegar en nuestra plataforma. Se utilizan para garantizar el correcto funcionamiento técnico, recordar sus preferencias de idioma y optimizar la seguridad.",
      section2Title: "2. Tipos de Cookies que Empleamos",
      section2Desc: "Utilizamos cookies técnicas y esenciales necesarias para la sesión de usuario y selección de idioma. No comercializamos sus datos de navegación con terceros.",
      section3Title: "3. Gestión y Configuración",
      section3Desc: "Usted puede desactivar o eliminar las cookies en cualquier momento desde la configuración de su navegador web, aunque esto podría limitar ciertas funciones interactivas del portal.",
    },
    EN: {
      back: "Back to Home",
      title: "Cookie Policy",
      lastUpdate: "Last updated: 2026",
      section1Title: "1. Understanding Cookies",
      section1Desc: "Cookies are small data files stored on your device when navigating our platform. They ensure proper technical operation, preserve language preferences, and enhance security protocols.",
      section2Title: "2. Cookies We Deploy",
      section2Desc: "We exclusively utilize essential technical and functional cookies required for user session stability and interface localization. We do not monetize personal browsing behavior.",
      section3Title: "3. User Control",
      section3Desc: "You can modify or disable cookies at any time through your browser preferences. Note that disabling essential cookies may impact platform functionality.",
    },
    FR: {
      back: "Retour à l'Accueil",
      title: "Politique de Cookies",
      lastUpdate: "Dernière mise à jour : 2026",
      section1Title: "1. Définition des Cookies",
      section1Desc: "Les cookies sont des fichiers texte enregistrés sur votre terminal lors de votre visite. Ils permettent d'assurer le fonctionnement technique et de mémoriser vos choix de langue.",
      section2Title: "2. Utilisation sur Notre Plateforme",
      section2Desc: "Nous utilisons uniquement des cookies strictement nécessaires à la navigation et à la sécurité de vos sessions. Vos données ne sont en aucun cas revendues.",
      section3Title: "3. Gestion de Vos Préférences",
      section3Desc: "Vous pouvez paramétrer ou bloquer les cookies depuis votre navigateur Internet à tout moment, bien que cela puisse restreindre l'accès à certaines options.",
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