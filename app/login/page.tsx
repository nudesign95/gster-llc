// app/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Lock, User, ArrowLeft, Home, ShieldCheck, AlertCircle } from "lucide-react";
import { useLanguage, Language } from "@/context/LanguageContext";

type TranslationType = {
  backTop: string;
  portalTitle: string;
  userInput: string;
  passInput: string;
  submitBtn: string;
  loadingBtn: string;
  errorText: string;
  secureNotice: string;
  backHomeBtn: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { lang, setLang } = useLanguage();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const content: Record<Language, TranslationType> = {
    ES: {
      backTop: "Inicio",
      portalTitle: "PORTAL ADMINISTRATIVO",
      userInput: "Usuario Ejecutivo",
      passInput: "Contraseña de Seguridad",
      submitBtn: "ENTRAR AL SISTEMA",
      loadingBtn: "VERIFICANDO CREDENCIALES...",
      errorText: "Credenciales no autorizadas. Acceso denegado.",
      secureNotice: "Acceso exclusivo para directores y personal autorizado de GSTER LLC.",
      backHomeBtn: "Volver a la Página Principal",
    },
    EN: {
      backTop: "Home",
      portalTitle: "ADMINISTRATIVE PORTAL",
      userInput: "Executive Username",
      passInput: "Security Password",
      submitBtn: "ENTER SYSTEM",
      loadingBtn: "VERIFYING CREDENTIALS...",
      errorText: "Unauthorized credentials. Access denied.",
      secureNotice: "Exclusive access for GSTER LLC executives and authorized staff.",
      backHomeBtn: "Return to Homepage",
    },
    FR: {
      backTop: "Accueil",
      portalTitle: "PORTAIL ADMINISTRATIF",
      userInput: "Identifiant Exécutif",
      passInput: "Mot de Passe de Sécurité",
      submitBtn: "ACCÉDER AU SYSTÈME",
      loadingBtn: "VÉRIFICATION...",
      errorText: "Identifiants non autorisés. Accès refusé.",
      secureNotice: "Accès réservé exclusivement aux directeurs et au personnel habilité de GSTER LLC.",
      backHomeBtn: "Retour à la Page d'Accueil",
    }
  };

  const t = content[lang];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    setTimeout(() => {
      const cleanUser = username.trim().toLowerCase();
      const isGaric = cleanUser === "garic" || cleanUser === "garic edume" || cleanUser === "@garicedume";
      const isSolf = cleanUser === "solf" || cleanUser === "solf slice" || cleanUser === "@solfslice";

      if ((isGaric || isSolf) && password.length >= 4) {
        const userData = isGaric
          ? {
              nombre: "Garic Edume",
              cargo: "Co-Founder",
              pais: "República Dominicana",
              username: "@garicedume",
              email: "garic@gsterllc.com",
              foto: "/images/garic-avatar-02.jpg",
              portada: "/images/garic-portada.jpg",
            }
          : {
              nombre: "Solf Slice",
              cargo: "Co-Founder",
              pais: "República Dominicana",
              username: "@solfslice",
              email: "solf@gsterllc.com",
              foto: "/images/slice-avatar-01.jpg",
              portada: "/images/slice-portada.jpg",
            };

        localStorage.setItem("gster_user", JSON.stringify(userData));
        document.cookie = "gster_auth_token=authorized_session; path=/; max-age=86400; SameSite=Strict";
        
        router.push("/dashboard");
      } else {
        setIsLoading(false);
        setErrorMsg(t.errorText);
      }
    }, 600);
  };

  return (
    <main className="min-h-screen bg-[#04080a] text-slate-100 flex flex-col justify-between p-6 selection:bg-amber-400 selection:text-slate-950">
      
      {/* 🌟 BARRA SUPERIOR: BOTÓN VOLVER E IDIOMAS 🌟 */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between pt-2">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm group"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" /> 
          <span>{t.backTop}</span>
        </Link>

        {/* SELECTOR DE IDIOMAS */}
        <div className="flex items-center p-1 rounded-2xl bg-white/5 border border-white/10">
          {(["ES", "EN", "FR"] as Language[]).map((item) => (
            <button
              key={item}
              onClick={() => setLang(item)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                lang === item ? "bg-amber-400 text-slate-950 font-black shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* 🌟 TARJETA DE LOGIN 🌟 */}
      <div className="w-full max-w-md mx-auto my-auto py-8">
        <div className="bg-white/3 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-8">
          
          {/* LOGO OFICIAL + PORTAL ADMINISTRATIVO */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <Image
                src="/assets/gster-logoblanco.svg"
                alt="GSTER LLC"
                width={160}
                height={48}
                priority
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="h-12 w-auto object-contain pointer-events-none select-none"
              />
            </div>
            <p className="text-[11px] uppercase tracking-[0.25em] font-black text-amber-400">
              {t.portalTitle}
            </p>
          </div>

          {/* FORMULARIO */}
          <form onSubmit={handleLogin} className="space-y-4">
            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-bold">
                {t.userInput}
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  required
                  placeholder="Garic Edume / Solf Slice"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-4 pr-11 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors text-sm font-medium"
                />
                <User className="w-5 h-5 text-slate-400 absolute right-4 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-bold">
                {t.passInput}
              </label>
              <div className="relative flex items-center">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-11 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors text-sm font-medium"
                />
                <Lock className="w-5 h-5 text-slate-400 absolute right-4 pointer-events-none" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-black text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-amber-400/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                {isLoading ? t.loadingBtn : t.submitBtn}
              </button>
            </div>
          </form>

          {/* 🌟 BOTÓN DIRECTO PARA REGRESAR AL INICIO 🌟 */}
          <div className="pt-2 border-t border-white/10 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 hover:text-white uppercase tracking-wider transition-all cursor-pointer group"
            >
              <Home className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>{t.backHomeBtn}</span>
            </Link>
          </div>

          <p className="text-[11px] text-center text-slate-400 leading-relaxed">
            {t.secureNotice}
          </p>

        </div>
      </div>

      {/* FOOTER INFERIOR */}
      <div className="text-center text-xs text-slate-400 pb-2">
        © {new Date().getFullYear()} GSTER LLC. Todos los derechos reservados.
      </div>
    </main>
  );
}