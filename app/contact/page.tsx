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

  const currentText = text[lang as keyof typeof text] || text.ES;

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
    <main className="min-h-screen bg-white text-gster-verde relative overflow-hidden selection:bg-gster-amarillo selection:text-gster-verde pb-20">
      
      {/* Destellos de luz corporativos de fondo */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-gster-verde/5 rounded-full filter blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-gster-amarillo/10 rounded-full filter blur-[180px] pointer-events-none" />

      {/* Barra de navegación superior */}
      <div className="max-w-7xl mx-auto px-6 pt-8 flex items-center justify-between relative z-10">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 hover:text-gster-verde transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-gster-amarillo" /> {currentText.back}
        </Link>

        {/* SELECTOR DE IDIOMA */}
        <div className="flex items-center gap-2.5 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 shadow-inner">
          <span className="text-xs text-gster-verde font-bold">{lang === "ES" ? "Idioma:" : "Language:"}</span>
          <select 
            className="bg-transparent text-xs text-gster-verde font-semibold focus:outline-none cursor-pointer"
            value={lang}
            onChange={(e) => setLang(e.target.value as "ES" | "EN")}
          >
            <option value="ES">Español (ES)</option>
            <option value="EN">English (EN)</option>
          </select>
        </div>
      </div>

      {/* Contenedor Principal */}
      <div className="max-w-7xl mx-auto px-6 pt-8 relative z-10 space-y-12">
        
        {/* Cabecera descriptiva */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-gster-verde">
            {currentText.title}
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
            {currentText.subtitle}
          </p>
        </div>

        {/* Grid de Contenido */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Formulario */}
          <div className="lg:col-span-7 bg-white border border-slate-100 p-8 md:p-10 rounded-4xl shadow-[0_20px_50px_-15px_rgba(1,69,79,0.1)] relative overflow-hidden">
            
            {enviado ? (
              <div className="py-16 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-gster-amarillo/10 text-gster-amarillo rounded-full flex items-center justify-center mx-auto shadow-inner border border-gster-amarillo/20">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wide text-gster-verde">{currentText.successTitle}</h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                  {currentText.successDesc}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-base font-bold uppercase tracking-wider text-gster-verde mb-1">{currentText.formTitle}</h3>
                  <p className="text-xs text-slate-400">{currentText.formSub}</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gster-verde font-bold mb-2">{currentText.nameLabel}</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ej. Juan Pérez"
                      value={formData.nombre}
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-gster-verde placeholder-slate-400 focus:outline-none focus:border-gster-verde focus:ring-1 focus:ring-gster-verde transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gster-verde font-bold mb-2">{currentText.emailLabel}</label>
                    <input 
                      type="email" 
                      required
                      placeholder="correo@gsterllc.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-gster-verde placeholder-slate-400 focus:outline-none focus:border-gster-verde focus:ring-1 focus:ring-gster-verde transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gster-verde font-bold mb-2">{currentText.msgLabel}</label>
                    <textarea 
                      rows={4}
                      required
                      placeholder="..."
                      value={formData.mensaje}
                      onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-gster-verde placeholder-slate-400 focus:outline-none focus:border-gster-verde focus:ring-1 focus:ring-gster-verde transition-all resize-none"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gster-verde text-gster-amarillo font-extrabold text-xs tracking-widest uppercase shadow-lg hover:bg-slate-900 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" /> {currentText.sendBtn}
                </button>
              </form>
            )}
          </div>

          {/* Información y Mapa */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-100 p-6 rounded-4xl shadow-sm space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gster-verde/5 text-gster-verde flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gster-verde uppercase tracking-wider">{currentText.hq}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{currentText.hqLoc}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-gster-verde/5 text-gster-verde flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gster-verde uppercase tracking-wider">{currentText.corpEmail}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">contacto@gsterllc.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-gster-verde/5 text-gster-verde flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gster-verde uppercase tracking-wider">{currentText.legal}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{currentText.legalDesc}</p>
                </div>
              </div>
            </div>

            {/* Mapa Real Embebido */}
            <div className="bg-white border border-slate-100 rounded-4xl overflow-hidden shadow-sm h-64 relative">
              <iframe
                title="Mapa Santo Domingo"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60279.77123996796!2d-69.9312117!3d18.4860575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf89f110000001%3A0x889816cdb244d5a9!2sSanto%20Domingo!5e0!3m2!1ses!2sdo!4v1650000000000!5m2!1ses!2sdo"
                width="100%"
                height="100%"
                style={{ border: 0 }}
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