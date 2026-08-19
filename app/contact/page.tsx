// app/contacto/page.tsx
"use client";
import { useState } from "react";
import { ArrowLeft, Send, MapPin, Mail, CheckCircle2, Building2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactoPage() {
  const { lang, setLang } = useLanguage();
  const [enviado, setEnviado] = useState(false);
  const [formData, setFormData] = useState({ nombre: "", email: "", mensaje: "" });

  const text = {
    ES: {
      back: "Volver al Inicio",
      title: "Canal de Contacto",
      subtitle: "Comunícate directamente con la gerencia ejecutiva de GSTER LLC. Estamos listos para atender consultas estratégicas y alianzas comerciales.",
      formTitle: "Envíanos un Mensaje",
      formSub: "Completa los campos y nos comunicaremos contigo de inmediato.",
      nameLabel: "Tu Nombre / Empresa",
      emailLabel: "Correo Electrónico",
      msgLabel: "Mensaje o Solicitud",
      sendBtn: "Enviar Mensaje Ejecutivo",
      successTitle: "¡Mensaje Enviado con Éxito!",
      successDesc: "Hemos recibido tu solicitud. Un representante ejecutivo de GSTER LLC se pondrá en contacto contigo a la brevedad.",
      hq: "Sede Central",
      hqLoc: "Santo Domingo, Distrito Nacional, República Dominicana",
      corpEmail: "Correo Corporativo",
      legal: "Estructura Legal",
      legalDesc: "GSTER LLC — Gestión y Operaciones Seguras"
    },
    EN: {
      back: "Back to Home",
      title: "Contact Channel",
      subtitle: "Connect directly with the executive management of GSTER LLC. We are ready to handle strategic inquiries and business partnerships.",
      formTitle: "Send Us a Message",
      formSub: "Fill out the fields and we will get back to you immediately.",
      nameLabel: "Your Name / Company",
      emailLabel: "Email Address",
      msgLabel: "Message or Request",
      sendBtn: "Send Executive Message",
      successTitle: "Message Sent Successfully!",
      successDesc: "We have received your request. An executive representative from GSTER LLC will contact you shortly.",
      hq: "Headquarters",
      hqLoc: "Santo Domingo, National District, Dominican Republic",
      corpEmail: "Corporate Email",
      legal: "Legal Structure",
      legalDesc: "GSTER LLC — Secure Management & Operations"
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.mensaje) return;
    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      setFormData({ nombre: "", email: "", mensaje: "" });
    }, 4000);
  };

  return (
    <main className="min-h-screen bg-[#0b0f19] text-white relative overflow-hidden selection:bg-gster-amarillo selection:text-gster-verde pb-20">
      
      {/* Destellos de luz corporativos de fondo */}
      <div className="absolute top-10 left-10 w-lg h-128 bg-gster-verde/20 rounded-full filter blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-lg h-128 bg-gster-amarillo/10 rounded-full filter blur-[180px] pointer-events-none" />

      {/* Barra de navegación superior con botón de retorno y selector de idioma */}
      <div className="max-w-7xl mx-auto px-6 pt-8 flex items-center justify-between relative z-10">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 hover:text-white transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-gster-amarillo" /> {text[lang].back}
        </Link>

        {/* SELECTOR DE IDIOMA */}
        <div className="flex items-center gap-2.5 bg-white/5 px-4 py-2 rounded-xl border border-white/10 shadow-inner">
          <span className="text-xs text-gster-amarillo font-bold">{lang === "ES" ? "Idioma:" : "Language:"}</span>
          <select 
            className="bg-transparent text-xs text-white font-semibold focus:outline-none cursor-pointer"
            value={lang}
            onChange={(e) => setLang(e.target.value as "ES" | "EN")}
          >
            <option value="ES" className="bg-[#0b0f19] text-white">Español (ES)</option>
            <option value="EN" className="bg-[#0b0f19] text-white">English (EN)</option>
          </select>
        </div>
      </div>

      {/* Contenedor Principal */}
      <div className="max-w-7xl mx-auto px-6 pt-8 relative z-10 space-y-12">
        
        {/* Cabecera descriptiva */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white">
            {text[lang].title.split(" ")[0]} <span className="text-transparent bg-clip-text `bg-linear-to-r` from-gster-amarillo to-emerald-400">{text[lang].title.split(" ").slice(1).join(" ")}</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed font-medium">
            {text[lang].subtitle}
          </p>
        </div>

        {/* Grid de Contenido */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Formulario */}
          <div className="lg:col-span-7 bg-white/4 backdrop-blur-2xl border border-white/15 p-8 md:p-10 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden">
            
            {enviado ? (
              <div className="py-16 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner border border-emerald-500/30">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wide text-white">{text[lang].successTitle}</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">
                  {text[lang].successDesc}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-1">{text[lang].formTitle}</h3>
                  <p className="text-xs text-gray-400">{text[lang].formSub}</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gster-amarillo font-bold mb-1.5">{text[lang].nameLabel}</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ej. Juan Pérez"
                      value={formData.nombre}
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-gster-amarillo transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gster-amarillo font-bold mb-1.5">{text[lang].emailLabel}</label>
                    <input 
                      type="email" 
                      required
                      placeholder="correo@gsterllc.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-gster-amarillo transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gster-amarillo font-bold mb-1.5">{text[lang].msgLabel}</label>
                    <textarea 
                      rows={4}
                      required
                      placeholder="..."
                      value={formData.mensaje}
                      onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-gster-amarillo transition-all resize-none"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gster-amarillo text-gster-verde font-extrabold text-xs tracking-widest uppercase shadow-[0_10px_25px_rgba(252,211,77,0.2)] hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> {text[lang].sendBtn}
                </button>
              </form>
            )}
          </div>

          {/* Información y Mapa */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/4 backdrop-blur-2xl border border-white/15 p-6 rounded-[2.5xl] shadow-xl space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gster-verde/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <MapPin className="w-6 h-6 text-gster-amarillo" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{text[lang].hq}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{text[lang].hqLoc}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2 border-t border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-gster-verde/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <Mail className="w-6 h-6 text-gster-amarillo" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{text[lang].corpEmail}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">contacto@gsterllc.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2 border-t border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-gster-verde/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <Building2 className="w-6 h-6 text-gster-amarillo" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{text[lang].legal}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{text[lang].legalDesc}</p>
                </div>
              </div>
            </div>

            {/* Mapa Real Embebido */}
            <div className="bg-white/4 backdrop-blur-2xl border border-white/15 rounded-[2.5xl] overflow-hidden shadow-xl h-64 relative">
              <iframe
                title="Mapa Santo Domingo"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60279.77123996796!2d-69.9312117!3d18.4860575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf89f110000001%3A0x889816cdb244d5a9!2sSanto%20Domingo!5e0!3m2!1ses!2sdo!4v1650000000000!5m2!1ses!2sdo"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "contrast(110%) brightness(85%)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}