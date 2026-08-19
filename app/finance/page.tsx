// app/finanzas/page.tsx
"use client";
import { Sparkles, ShieldCheck, Rocket, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FinanzasConstruccionPage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] text-white flex flex-col items-center justify-center relative overflow-hidden p-6 selection:bg-gster-amarillo selection:text-gster-verde">
      
      {/* Destellos de luz corporativos de fondo */}
      <div className="absolute top-1/4 left-1/4 w-lg h-128 bg-gster-verde/30 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-lg h-128 bg-gster-amarillo/15 rounded-full filter blur-[180px] pointer-events-none" />

      {/* Tarjeta principal informativa */}
      <div className="relative w-full max-w-2xl bg-white/4 backdrop-blur-2xl border border-white/15 p-12 rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] text-center space-y-8">
        
        {/* Cabecera con botón de retorno al inicio y badge */}
        <div className="flex items-center justify-between">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 hover:text-white transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-gster-amarillo" /> Volver al Inicio
          </Link>

          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gster-amarillo/10 border border-gster-amarillo/30 text-gster-amarillo text-xs font-extrabold uppercase tracking-widest shadow-inner">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> GSTER LLC
          </span>
        </div>

        {/* Ícono central elegante */}
        <div className="flex justify-center pt-2">
          <div className="w-24 h-24 rounded-3xl bg-linear-to-tr from-gster-verde to-emerald-600 p-0.5 shadow-2xl shadow-gster-verde/40">
            <div className="w-full h-full bg-[#0b0f19] rounded-[22px] flex items-center justify-center">
              <Rocket className="w-10 h-10 text-gster-amarillo animate-bounce" />
            </div>
          </div>
        </div>

        {/* Textos del aviso */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white">
            Módulo de <span className="text-transparent bg-clip-text bg-linear-to-r from-gster-amarillo to-emerald-400">Finanzas</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed font-medium">
            Este espacio se encuentra reservado bajo estrictos estándares de ingeniería y seguridad para las futuras operaciones financieras globales de <strong className="text-white">GSTER LLC</strong>.
          </p>
        </div>

        {/* Detalle informativo estético */}
        <div className="bg-white/3 border border-white/10 p-5 rounded-2xl flex items-center gap-4 text-left">
          <div className="w-10 h-10 rounded-xl bg-gster-verde/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Infraestructura Financiera Segura</h4>
            <p className="text-[11px] text-gray-400 mt-0.5">Módulo optimizado para la gerencia general y socios autorizados.</p>
          </div>
        </div>

      </div>
    </main>
  );
}