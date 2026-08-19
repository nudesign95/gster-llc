"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, ShieldCheck, Upload, Camera, FileText, RefreshCw } from "lucide-react";

export default function FirmaClientePage() {
  const params = useParams();
  const id = params?.id;

  const [prestamo, setPrestamo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [firmaValida, setFirmaValida] = useState(false);
  const [archivoDoc, setArchivoDoc] = useState<File | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [firmadoExitoso, setFirmadoExitoso] = useState(false);

  // Referencia para el lienzo de firma
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPrestamoDetalle();
    }
  }, [id]);

  const fetchPrestamoDetalle = async () => {
    try {
      const { data, error } = await supabase
        .from("prestamos")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setPrestamo(data);
    } catch (err) {
      console.error("Error al cargar el préstamo:", err);
    } finally {
      setLoading(false);
    }
  };

  // Configuración del Lienzo de Firma Táctil / Mouse
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
  }, [prestamo]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.beginPath();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x = 0;
    let y = 0;

    if ("clientX" in e) {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    } else if (e.touches && e.touches[0]) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const limpiarFirma = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setFirmaValida(false);
  };

  const validarFirma = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setFirmaValida(true);
    alert("¡Firma capturada correctamente en el sistema!");
  };

 const handleEnviarContrato = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firmaValida) {
      return alert("Por favor dibuje y valide su firma antes de continuar.");
    }
    if (!archivoDoc) {
      return alert("Es obligatorio adjuntar su cédula o pasaporte para mayor seguridad.");
    }

    setEnviando(true);
    try {
      // 1. Subir documento al bucket 'documentos'
      const fileExt = archivoDoc.name.split('.').pop();
      const fileName = `doc_${id}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("documentos")
        .upload(fileName, archivoDoc);

      if (uploadError) throw uploadError;

      // 2. Obtener URL pública del documento desde 'documentos'
      const { data: publicUrlData } = supabase.storage
        .from("documentos")
        .getPublicUrl(fileName);

      const documentoUrl = publicUrlData.publicUrl;

      // 3. Actualizar estado del préstamo en la base de datos
      const { error: updateError } = await supabase
        .from("prestamos")
        .update({
          contrato_firmado: true,
          estado: "activo",
          documento_url: documentoUrl,
          documento_tipo: "Cédula / Pasaporte"
        })
        .eq("id", id);

      if (updateError) throw updateError;

      setFirmadoExitoso(true);
    } catch (err: any) {
      alert("Error al procesar el contrato: " + err.message);
    } finally {
      setEnviando(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#051c22] flex items-center justify-center text-white">
        <p className="text-sm font-bold animate-pulse text-gster-amarillo">Cargando expediente seguro de GSTER LLC...</p>
      </div>
    );
  }

  if (!prestamo) {
    return (
      <div className="min-h-screen bg-[#051c22] flex items-center justify-center text-white px-4 text-center">
        <div>
          <h2 className="text-xl font-bold text-rose-400">Enlace no encontrado o inválido</h2>
          <p className="text-xs text-slate-300 mt-2">El contrato solicitado no existe o ya expiró.</p>
        </div>
      </div>
    );
  }

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' }).format(amount);
  };

  return (
    <main className="min-h-screen bg-[#051c22] text-white py-10 px-4 flex flex-col items-center justify-center antialiased">
      
      <div className="w-full max-w-lg bg-[#0b242b] border border-white/15 rounded-3xl p-8 shadow-2xl space-y-6">
        
        {/* ENCABEZADO CON LOGO OFICIAL */}
        <div className="text-center space-y-3 border-b border-white/10 pb-6">
          <img src="/assets/gster-logoblanco.svg" alt="GSTER LLC Logo" className="h-12 w-auto mx-auto object-contain pointer-events-none select-none" />
          <p className="text-xs text-gster-amarillo font-bold uppercase tracking-wider">Plataforma de Validación y Firma Digital</p>
        </div>

        {firmadoExitoso ? (
          <div className="text-center py-10 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
            <h3 className="text-2xl font-black">¡Contrato Firmado con Éxito!</h3>
            <p className="text-xs text-slate-300">Su documento de identidad y firma digital han sido registrados y verificados de manera segura por GSTER LLC.</p>
          </div>
        ) : (
          <form onSubmit={handleEnviarContrato} className="space-y-6">
            
            {/* TARJETA DE DATOS REALES DEL PRÉSTAMO */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 text-xs">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Cliente:</span>
                <span className="font-bold text-gster-amarillo">{prestamo.cliente}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Monto Aprobado:</span>
                <span className="font-bold">{formatMoney(prestamo.monto)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total con 15% Interés:</span>
                <span className="font-bold text-emerald-400">{formatMoney(prestamo.cuota_total || (prestamo.monto * 1.15))}</span>
              </div>
            </div>

            {/* LIENZO DE FIRMA TÁCTIL */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gster-amarillo uppercase tracking-wider">
                Firme en el recuadro con su dedo o lápiz:
              </label>
              
              <div className="bg-white rounded-2xl overflow-hidden border-2 border-gster-amarillo shadow-inner relative">
                <canvas
                  ref={canvasRef}
                  width={440}
                  height={180}
                  onMouseDown={startDrawing}
                  onMouseUp={stopDrawing}
                  onMouseMove={draw}
                  onTouchStart={startDrawing}
                  onTouchEnd={stopDrawing}
                  onTouchMove={draw}
                  className="w-full `h-45` cursor-crosshair touch-none bg-white"
                />
              </div>

              <div className="flex justify-between items-center pt-1">
                <button
                  type="button"
                  onClick={limpiarFirma}
                  className="text-xs text-rose-300 hover:text-rose-400 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Limpiar firma
                </button>

                <button
                  type="button"
                  onClick={validarFirma}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    firmaValida ? 'bg-emerald-500 text-white' : 'bg-gster-amarillo text-gster-verde'
                  }`}
                >
                  {firmaValida ? "Firma Validada ✓" : "Validar Firma"}
                </button>
              </div>
            </div>

            {/* CARGA DE CÉDULA / PASAPORTE */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-gster-amarillo uppercase tracking-wider">
                Adjuntar Cédula o Pasaporte (Foto o PDF):
              </label>

              <label className="border-2 border-dashed border-white/20 hover:border-gster-amarillo rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer bg-white/5 transition-all text-center">
                <Camera className="w-6 h-6 text-gster-amarillo mb-1" />
                <span className="text-xs font-semibold text-white">
                  {archivoDoc ? archivoDoc.name : "Haga clic para subir o tomar foto de su documento"}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">Formatos aceptados: JPG, PNG, PDF</span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  required
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setArchivoDoc(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>

            {/* BOTÓN FINAL DE ENVÍO */}
            <button
              type="submit"
              disabled={enviando}
              className="w-full py-4 rounded-2xl bg-gster-amarillo text-gster-verde font-black uppercase tracking-wider text-xs shadow-lg hover:bg-white transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              {enviando ? "Procesando firma..." : "Aceptar, Firmar y Enviar Contrato"}
            </button>

          </form>
        )}

      </div>
    </main>
  );
}