"use client";
import { useState } from "react";
import { Mail, MapPin, Building2, Send, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      {/* Botón de retorno */}
      <div className="max-w-7xl mx-auto mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Inicio
        </Link>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            CENTRO DE CONTACTO EJECUTIVO
          </h1>
          <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
            Establezca comunicación directa con la alta gerencia de GSTER LLC para consultas estratégicas, financieras y alianzas corporativas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Formulario */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Envíanos un Mensaje</h3>
            <p className="text-sm text-slate-500 mb-6">Complete los campos y nuestro equipo ejecutivo le responderá a la brevedad.</p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-center">
                ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                    Nombre o Razón Social
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ej. Juan Pérez / Empresa SRL" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-slate-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                    Correo Electrónico
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="correo@gsterllc.com" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-slate-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                    Mensaje o Solicitud de Negocio
                  </label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Escriba los detalles de su consulta..." 
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-slate-900 bg-white"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Enviar Mensaje Ejecutivo
                </button>
              </form>
            )}
          </div>

          {/* Información y Ubicación */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Sede Central</h4>
                  <p className="text-slate-800 font-medium mt-1">Santo Domingo, Distrito Nacional, República Dominicana</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Correo Corporativo</h4>
                  <p className="text-slate-800 font-medium mt-1">contacto@gsterllc.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Estructura Legal</h4>
                  <p className="text-slate-800 font-medium mt-1">GSTER LLC – Gestión y Operaciones Seguras</p>
                </div>
              </div>
            </div>

            {/* Mapa visualizador */}
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="w-full h-64 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 text-sm font-medium">
                {/* Aquí puedes mantener tu iframe de Google Maps o componente de mapa */}
                <span className="flex items-center gap-2">📍 Mapa de Ubicación (Santo Domingo)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}