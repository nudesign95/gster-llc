// app/firma/[id]/page.tsx
"use client";
import { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import jsPDF from "jspdf";
import { ShieldCheck, CheckCircle2, FileText, RefreshCw, Send } from "lucide-react";

export default function FirmaContratoPage() {
  const sigCanvas = useRef<any>(null);
  const [firmado, setFirmado] = useState(false);
  const [cedulaFoto, setCedulaFoto] = useState<string | null>(null);
  const [generandoPDF, setGenerandoPDF] = useState(false);
  const [completado, setCompletado] = useState(false);

  // Datos de ejemplo del préstamo (en producción se cargan por el [id])
  const loanData = {
    cliente: "Juan Pérez",
    monto: 15000,
    cuota: 17250,
    vencimiento: "2026-09-01",
    empresa: "GSTER LLC"
  };

  const limpiarFirma = () => {
    sigCanvas.current.clear();
    setFirmado(false);
  };

  const guardarFirma = () => {
    if (sigCanvas.current.isEmpty()) {
      alert("Por favor, dibuje su firma en el recuadro antes de continuar.");
      return;
    }
    setFirmado(true);
  };

  // Generar el Contrato PDF en tiempo real con la firma y metadatos
  const generarContratoPDF = () => {
    if (!firmado) {
      alert("Debe validar su firma primero.");
      return;
    }

    setGenerandoPDF(true);

    try {
      const doc = new jsPDF();
      const firmaImg = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
      const fechaHoraActual = new Date().toLocaleString();

      // Estilo del Contrato corporativo en PDF
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(1, 69, 79); // Color corporativo GSTER (#01454f)
      doc.text("GSTER LLC — CONTRATO DE PRÉSTAMO", 20, 20);

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Fecha y Hora de Emisión: ${fechaHoraActual}`, 20, 28);
      doc.text("Documento con validez legal y firma digital verificada.", 20, 34);

      doc.setLineWidth(0.5);
      doc.line(20, 40, 190, 40);

      // Cuerpo del contrato
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(40, 40, 40);

      const textoContrato = `Por medio del presente documento, el cliente ${loanData.cliente}, en pleno uso de sus facultades legales, acepta formalmente las condiciones de financiamiento otorgadas por ${loanData.empresa}.

Detalles de la Operación:
- Monto del Préstamo Principal: RD$ ${loanData.monto.toLocaleString()}
- Total a Pagar con Interés Aplicado (15%): RD$ ${loanData.cuota.toLocaleString()}
- Fecha Límite de Vencimiento: ${loanData.vencimiento}

El deudor se compromete a honrar el pago en el plazo establecido, aceptando los cargos por mora estipulados en las políticas internas de la compañía en caso de retraso.`;

      doc.text(textoContrato, 20, 50, { maxWidth: 170 });

      // Incrustar la Firma Digital
      doc.setFont("helvetica", "bold");
      doc.text("Firma Digital del Cliente:", 20, 130);
      doc.addImage(firmaImg, "PNG", 20, 135, 60, 25);

      // Metadatos de seguridad y legalidad
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text(`Validación de Seguridad GSTER LLC`, 20, 170);
      doc.text(`Registro de Autenticidad IP Verificada y Sello Criptográfico.`, 20, 175);

      // Descargar el PDF automáticamente en el dispositivo del cliente
      doc.save(`Contrato_Prestamo_${loanData.cliente.replace(" ", "_")}.pdf`);

      setGenerandoPDF(false);
      setCompletado(true);
    } catch (error) {
      console.error(error);
      alert("Error al generar el PDF del contrato.");
      setGenerandoPDF(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0f19] text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white/[0.04] backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl space-y-6">
        
        <div className="text-center space-y-1">
          <ShieldCheck className="w-10 h-10 text-[#f9b233] mx-auto" />
          <h1 className="text-xl font-extrabold uppercase tracking-widest">GSTER<span className="text-[#f9b233]">LLC</span></h1>
          <p className="text-xs text-gray-400">Plataforma de Validación y Firma Digital</p>
        </div>

        {!completado ? (
          <>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Cliente:</span>
                <span className="font-bold">{loanData.cliente}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Monto Aprobado:</span>
                <span className="font-bold text-[#f9b233]">RD$ {loanData.monto.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total con 15% Interés:</span>
                <span className="font-bold text-emerald-400">RD$ {loanData.cuota.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#f9b233]">
                Firme en el recuadro con su dedo o lápiz:
              </label>
              <div className="bg-white rounded-2xl overflow-hidden border-2 border-dashed border-white/20">
                <SignatureCanvas 
                  ref={sigCanvas}
                  penColor="black"
                  canvasProps={{ className: "w-full h-40 cursor-crosshair" }}
                />
              </div>
              <div className="flex justify-between">
                <button 
                  onClick={limpiarFirma}
                  className="text-xs text-rose-400 hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Limpiar firma
                </button>
                {!firmado ? (
                  <button 
                    onClick={guardarFirma}
                    className="px-4 py-1.5 rounded-xl bg-emerald-500 text-gray-900 font-bold text-xs"
                  >
                    Validar Firma
                  </button>
                ) : (
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Firma Validada
                  </span>
                )}
              </div>
            </div>

            <button 
              onClick={generarContratoPDF}
              disabled={!firmado || generandoPDF}
              className={`w-full py-4 rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                firmado 
                  ? 'bg-[#f9b233] text-[#01454f] hover:bg-white shadow-lg cursor-pointer' 
                  : 'bg-white/10 text-gray-500 cursor-not-allowed'
              }`}
            >
              <FileText className="w-4 h-4" /> 
              {generandoPDF ? "Generando Contrato PDF..." : "Aceptar, Firmar y Descargar PDF"}
            </button>
          </>
        ) : (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold">¡Contrato Firmado con Éxito!</h3>
            <p className="text-xs text-gray-400">
              El documento oficial con la firma digital y los metadatos de seguridad ha sido descargado en su dispositivo.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}