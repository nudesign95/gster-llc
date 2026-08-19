// app/dashboard/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";
import * as XLSX from "xlsx";
import { 
  TrendingUp, Users, DollarSign, Plus, X, Trash2, Settings, 
  FileSpreadsheet, LogOut, Phone, Mail, MapPin, ChevronDown, Camera, 
  Check, Ban, Eye, EyeOff, ShieldCheck, Globe, AlertCircle, CalendarClock, FileText, Download 
} from "lucide-react";
export const dynamic = 'force-dynamic';
const translations = {
  es: {
    title: "GSTER LLC — Panel Administrativo",
    subtitle: "Plataforma Financiera Segura",
    currency: "Moneda:",
    control: "Control de Préstamos",
    aprobaciones: "Estado de Aprobación",
    registrarSol: "Registrar Solicitud",
    capitalActivo: "Capital Activo",
    interesQuincenal: "Interés Quincenal (15%)",
    prestamosCurso: "Préstamos en Curso",
    controlCobros: "Control y Gestión de Cobros",
    todos: "Todos",
    alDia: "Al Día",
    alerta: "Alerta",
    mora: "Mora",
    completados: "Completados",
    excel: "Excel",
    semaforo: "Semáforo",
    cliente: "Cliente",
    saldoActual: "Saldo Actual",
    cuotasColumna: "Cuotas Quincenales",
    vencimiento: "Vencimiento",
    contratoFirmado: "Contrato / Firma",
    accionesCobro: "Acciones de Cobro",
    noPrestamos: "No hay préstamos activos. Las solicitudes aprobadas y firmadas aparecerán aquí automáticamente.",
    enviarContrato: "Enviar Contrato WhatsApp",
    abonar: "Abonar",
    saldarTotal: "Saldar Total",
    whatsappMora: "WhatsApp Mora",
    solicitudesPendientes: "Solicitudes Pendientes de Aprobación Dual",
    descAprobacion: "Para que un préstamo pase al Panel de Control, ambos directores deben aprobarlo y el cliente debe firmar.",
    montoSolicitado: "Monto Solicitado",
    cuotaQuincenal: "Cuota Quincenal",
    totalPagar: "Total a Pagar (15%)",
    plazo: "Plazo",
    aprobacionGaric: "Aprobación Garic",
    aprobacionSolf: "Aprobación Solf",
    accionesEjecutivas: "Acciones Ejecutivas",
    noSolicitudes: "No hay solicitudes pendientes de aprobación en este momento.",
    aprobarParte: "Aprobar ✓",
    pendiente: "Pendiente",
    desaprobar: "Desaprobar",
    rechazar: "Rechazar",
    borrar: "Borrar",
    configCuenta: "Configuración de Cuenta",
    nombreCompleto: "Nombre Completo",
    nombreUsuario: "Nombre de Usuario (@)",
    nuevaContrasena: "Nueva Contraseña (Opcional)",
    guardarCambios: "Guardar Cambios en BD",
    cerrar: "Cerrar",
    cancelar: "Cancelar",
    enviarRevision: "Enviar a Revisión",
    registrarseSolicitudModal: "Registrar Nueva Solicitud",
    nombreCliente: "Nombre completo",
    telefonoWhatsapp: "Teléfono WhatsApp (+1 Automático)",
    montoPrincipal: "Monto Principal (RD$) [Mín: 1,000 - Máx: 15,000]",
    cantidadCuotas: "Cantidad de Cuotas Quincenales [Mín: 1 - Máx: 5]",
    registrarAbono: "Registrar Abono",
    ingresarMonto: "Ingresa el monto recibido.",
    confirmarDescontar: "Confirmar y Descontar"
  },
  en: {
    title: "GSTER LLC — Administrative Panel",
    subtitle: "Secure Financial Platform",
    currency: "Currency:",
    control: "Loan Control",
    aprobaciones: "Approval Status",
    registrarSol: "Register Request",
    capitalActivo: "Active Capital",
    interesQuincenal: "Bi-weekly Interest (15%)",
    prestamosCurso: "Active Loans",
    controlCobros: "Control & Collection Management",
    todos: "All",
    alDia: "On Time",
    alerta: "Alert",
    mora: "Default",
    completados: "Completed",
    excel: "Excel",
    semaforo: "Status",
    cliente: "Client",
    saldoActual: "Current Balance",
    cuotasColumna: "Bi-weekly Installments",
    vencimiento: "Due Date",
    contratoFirmado: "Contract / Signature",
    accionesCobro: "Collection Actions",
    noPrestamos: "No active loans. Approved and signed requests will appear here automatically.",
    enviarContrato: "Send WhatsApp Contract",
    abonar: "Make Payment",
    saldarTotal: "Pay in Full",
    whatsappMora: "WhatsApp Default",
    solicitudesPendientes: "Pending Dual Approval Requests",
    descAprobacion: "For a loan to move to the Loan Control Panel, both directors must approve and the client must sign.",
    montoSolicitado: "Requested Amount",
    cuotaQuincenal: "Bi-weekly Installment",
    totalPagar: "Total to Pay (15%)",
    plazo: "Term",
    aprobacionGaric: "Garic Approval",
    aprobacionSolf: "Solf Approval",
    accionesEjecutivas: "Executive Actions",
    noSolicitudes: "No pending approval requests at this time.",
    aprobarParte: "Approve ✓",
    pendiente: "Pending",
    desaprobar: "Unapprove",
    rechazar: "Reject",
    borrar: "Delete",
    configCuenta: "Account Settings",
    nombreCompleto: "Full Name",
    nombreUsuario: "Username (@)",
    nuevaContrasena: "New Password (Optional)",
    guardarCambios: "Save Changes to DB",
    cerrar: "Close",
    cancelar: "Cancel",
    enviarRevision: "Submit for Review",
    registrarseSolicitudModal: "Register New Request",
    nombreCliente: "Full Name",
    telefonoWhatsapp: "WhatsApp Phone (+1 Prefix Automatic)",
    montoPrincipal: "Principal Amount (RD$) [Min: 1,000 - Max: 15,000]",
    cantidadCuotas: "Number of Bi-weekly Installments [Min: 1 - Max: 5]",
    registrarAbono: "Register Payment",
    ingresarMonto: "Enter the amount received.",
    confirmarDescontar: "Confirm & Deduct"
  }
};

const PROVINCIAS_RD = [
  "Distrito Nacional", "Santo Domingo", "Santiago", "La Altagracia", "La Vega", 
  "Puerto Plata", "San Cristóbal", "San Pedro de Macorís", "Duarte", "Espaillat", 
  "La Romana", "San Juan", "Barahona", "Peravia", "Monseñor Nouel", "Valverde", 
  "María Trinidad Sánchez", "Azua", "Monte Cristi", "Samaná", "Hato Mayor", 
  "El Seibo", "Bahoruco", "San José de Ocoa", "Hermanas Mirabal", "Independencia", 
  "Dajabón", "Elías Piña", "Santiago Rodríguez", "Pedernales", "Monte Plata"
];

const formatNumberWithCommas = (value: string | number) => {
  if (!value) return "";
  const numericValue = String(value).replace(/\D/g, "");
  if (!numericValue) return "";
  return Number(numericValue).toLocaleString("en-US");
};

const validarTelefonoRD = (tel: string) => {
  const limpio = tel.replace(/\D/g, "");
  if (limpio.length !== 10) return false;
  const codigoArea = limpio.substring(0, 3);
  return ["809", "829", "849"].includes(codigoArea);
};

const validarEmail = (email: string) => {
  if (!email) return true;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export default function DashboardPage() {
  const router = useRouter();
  const { lang, setLang } = useLanguage();
  const t = translations[lang as keyof typeof translations] || translations.es;
  
  const [currentUser, setCurrentUser] = useState({
    nombre: "Garic Edume", 
    cargo: "Co-Founder", 
    pais: "República Dominicana",
    username: "@garicedume",
    email: "garic@gsterllc.com",
    foto: "/images/garic-avatar-02.jpg",
    portada: "/images/garic-portada.jpg"
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("gster_user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setCurrentUser(parsed);
        setNombreInput(parsed.nombre || "");
        setUsernameInput(parsed.username || "");
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const isSecretaria = currentUser.cargo === "Secretaria";
  const isGaric = currentUser.username === "@garicedume";
  const isSolf = currentUser.username === "@solfslice";

  const [activeTab, setActiveTab] = useState<"control" | "aprobaciones">("control");
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<number | null>(null);
  const [montoPago, setMontoPago] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");

  const [nombreInput, setNombreInput] = useState(currentUser.nombre);
  const [usernameInput, setUsernameInput] = useState(currentUser.username);
  const [showPassword, setShowPassword] = useState(false);
  const [newPasswordInput, setNewPasswordInput] = useState("");

  const TASA_CAMBIO = 60;
  const [currency, setCurrency] = useState<"DOP" | "USD">("DOP");
  const [prestamos, setPrestamos] = useState<any[]>([]);

  const [cuotasCantidad, setCuotasCantidad] = useState<number>(2);
  const [nuevoCliente, setNuevoCliente] = useState("");
  const [nuevoTelefono, setNuevoTelefono] = useState("");
  const [nuevoEmail, setNuevoEmail] = useState("");
  const [nuevaDireccion, setNuevaDireccion] = useState("");
  const [nuevoSector, setNuevoSector] = useState("");
  const [nuevoPais, setNuevoPais] = useState("República Dominicana");
  const [nuevaProvincia, setNuevaProvincia] = useState("Santo Domingo");
  const [nuevoMonto, setNuevoMonto] = useState("");

  const montoNum = parseFloat(nuevoMonto.replace(/,/g, "")) || 0;
  const interesTotalCalculado = montoNum * 0.15;
  const cuotaTotalCalculada = montoNum + interesTotalCalculado;

  const fetchPrestamos = async () => {
    const { data } = await supabase
      .from("prestamos")
      .select("*, pagos(monto)")
      .order("id", { ascending: false });

    if (data) {
      setPrestamos(data);
    }
  };

  useEffect(() => {
    fetchPrestamos();
  }, []);

  const formatMoney = (amount: number) => {
    if (currency === "USD") {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount / TASA_CAMBIO);
    }
    return new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' }).format(amount);
  };

  const getEstadoPrestamo = (p: any) => {
    const totalPagado = (p.pagos || []).reduce((acc: number, cur: any) => acc + Number(cur.monto), 0);
    if (p.estado === "completado") return { color: "🔵", saldoActual: 0, tipoFiltro: "completado", enMora: false };
    
    const hoy = new Date();
    const vencimiento = new Date(p.vencimiento);
    const diasRestantes = Math.ceil((vencimiento.getTime() - hoy.getTime()) / (1000 * 3600 * 24));
    
    let cuotaTotal = Number(p.cuota_total || p.cuota || 0);
    let color = "🟢";
    let tipoFiltro = "activo";
    let enMora = false;

    if (diasRestantes < 0) {
      color = "🔴"; 
      cuotaTotal = cuotaTotal * 1.03; 
      enMora = true;
      tipoFiltro = "mora";
    } else if (diasRestantes <= 3) {
      color = "🟠"; 
      tipoFiltro = "alerta";
    }

    const saldoActual = Math.max(0, cuotaTotal - totalPagado);
    return { color, saldoActual, tipoFiltro, enMora };
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleRegistrarPago = async (id: number) => {
    const montoAbono = parseFloat(montoPago.replace(/,/g, ""));
    if (!montoAbono || montoAbono <= 0) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase.from("pagos").insert([{ prestamo_id: id, monto: montoAbono }]);
      if (error) throw error;
      await fetchPrestamos();
      alert("Abono registrado correctamente en la base de datos.");
    } catch (err: any) {
      alert("Error al guardar el pago: " + err.message);
    } finally {
      setIsLoading(false);
      setMontoPago("");
      setIsPaymentModalOpen(null);
    }
  };

  const handleCambiarEstadoCuota = async (prestamoId: number, numeroCuota: number, nuevoEstado: string) => {
    const p = prestamos.find(item => item.id === prestamoId);
    if (!p) return;

    let cuotasList = Array.isArray(p.cuotas) ? [...p.cuotas] : [];
    if (cuotasList.length === 0) {
      const cant = Number(p.cuotas_cantidad || 2);
      const totalP = Number(p.cuota_total || (p.monto * 1.15));
      const valorC = totalP / cant;
      for (let i = 1; i <= cant; i++) {
        const fV = new Date();
        fV.setDate(fV.getDate() + (i * 15));
        cuotasList.push({
          numero_cuota: i,
          monto: Number(valorC.toFixed(2)),
          fecha_vencimiento: fV.toISOString().split("T")[0],
          estado: "pendiente",
          fecha_pago: null
        });
      }
    }

    cuotasList = cuotasList.map(c => {
      if (c.numero_cuota === numeroCuota) {
        return {
          ...c,
          estado: nuevoEstado,
          fecha_pago: nuevoEstado === "pagado" ? new Date().toISOString().split("T")[0] : null
        };
      }
      return c;
    });

    const cuotaObj = cuotasList.find(c => c.numero_cuota === numeroCuota);

    if (nuevoEstado === "pagado" && cuotaObj) {
      await supabase.from("pagos").insert([{ prestamo_id: prestamoId, monto: cuotaObj.monto }]);
      const todasPagadas = cuotasList.every((c: any) => c.estado === "pagado");
      if (todasPagadas) {
        await supabase.from("prestamos").update({ estado: "completado", cuotas: cuotasList }).eq("id", prestamoId);
      } else {
        await supabase.from("prestamos").update({ cuotas: cuotasList }).eq("id", prestamoId);
      }
    } else if (nuevoEstado === "atraso" && cuotaObj) {
      const recargoMora = cuotaObj.monto * 0.03;
      const nuevaCuotaNum = cuotasList.length + 1;
      const fV = new Date();
      fV.setDate(fV.getDate() + (nuevaCuotaNum * 15));

      cuotasList.push({
        numero_cuota: nuevaCuotaNum,
        monto: Number(recargoMora.toFixed(2)),
        fecha_vencimiento: fV.toISOString().split("T")[0],
        estado: "pendiente",
        fecha_pago: null
      });

      const nuevoTotalPagar = Number(p.cuota_total || 0) + recargoMora;
      await supabase.from("prestamos").update({ cuota_total: nuevoTotalPagar, cuotas: cuotasList }).eq("id", prestamoId);
    } else {
      await supabase.from("prestamos").update({ cuotas: cuotasList }).eq("id", prestamoId);
    }

    await fetchPrestamos();
  };

  const handleSaldarTotal = async (id: number, saldoPendiente: number) => {
    if (confirm(`¿Desea saldar la totalidad de este préstamo por ${formatMoney(saldoPendiente)}?`)) {
      await supabase.from("pagos").insert([{ prestamo_id: id, monto: saldoPendiente }]);
      await supabase.from("prestamos").update({ estado: "completado" }).eq("id", id);
      await fetchPrestamos();
    }
  };

  const handleAprobarRechazar = async (id: number, accion: "aprobar_solf" | "aprobar_garic" | "rechazar") => {
    const p = prestamos.find(item => item.id === id);
    if (!p) return;

    let updateData: any = {};

    if (accion === "rechazar") {
      updateData = { estado: "rechazado", aprobado_garic: false, aprobado_solf: false };
    } else if (accion === "aprobar_solf") {
      const nuevoSolf = !p.aprobado_solf;
      const ambosAprobaron = nuevoSolf && p.aprobado_garic;
      const pasaActivo = ambosAprobaron && p.contrato_firmado;
      updateData = { aprobado_solf: nuevoSolf, estado: pasaActivo ? "activo" : "pendiente" };
    } else if (accion === "aprobar_garic") {
      const nuevoGaric = !p.aprobado_garic;
      const ambosAprobaron = p.aprobado_solf && nuevoGaric;
      const pasaActivo = ambosAprobaron && p.contrato_firmado;
      updateData = { aprobado_garic: nuevoGaric, estado: pasaActivo ? "activo" : "pendiente" };
    }

    await supabase.from("prestamos").update(updateData).eq("id", id);
    await fetchPrestamos();
  };

  const handleEliminarSolicitud = async (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar permanentemente esta solicitud?")) {
      const { error } = await supabase.from("prestamos").delete().eq("id", id);
      if (!error) {
        await fetchPrestamos();
      } else {
        alert("Error al eliminar: " + error.message);
      }
    }
  };

  const handleCrearPrestamo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoCliente || !montoNum) return;

    if (montoNum < 1000 || montoNum > 15000) {
      return alert("El monto principal del préstamo debe estar estrictamente entre RD$ 1,000 y RD$ 15,000.");
    }
    
    if (cuotasCantidad < 1 || cuotasCantidad > 5) {
      return alert("El número de cuotas debe ser mínimo 1 y máximo 5.");
    }

    if (!validarTelefonoRD(nuevoTelefono)) {
      return alert("Número de teléfono inválido para RD. Debe tener 10 dígitos y comenzar con 809, 829 o 849.");
    }

    if (!validarEmail(nuevoEmail)) {
      return alert("Por favor ingresa un correo electrónico válido.");
    }

    const telefonoLimpio = nuevoTelefono.replace(/\D/g, "");
    const telefonoCompleto = "+1" + telefonoLimpio;

    const { data: clientePrevio } = await supabase
      .from("prestamos")
      .select("documento_url, documento_tipo")
      .eq("telefono", telefonoCompleto)
      .not("documento_url", "is", null)
      .limit(1);

    let docUrlExistente = null;
    let docTipoExistente = null;

    if (clientePrevio && clientePrevio.length > 0) {
      docUrlExistente = clientePrevio[0].documento_url;
      docTipoExistente = clientePrevio[0].documento_tipo;
    }

    const valorCuotaInd = cuotaTotalCalculada / cuotasCantidad;
    const cuotasGeneradas = [];
    for (let i = 1; i <= cuotasCantidad; i++) {
      const fechaVenc = new Date();
      fechaVenc.setDate(fechaVenc.getDate() + (i * 15));
      cuotasGeneradas.push({
        numero_cuota: i,
        monto: Number(valorCuotaInd.toFixed(2)),
        fecha_vencimiento: fechaVenc.toISOString().split("T")[0],
        estado: "pendiente",
        fecha_pago: null
      });
    }

    const fechaVencFinal = new Date();
    fechaVencFinal.setDate(fechaVencFinal.getDate() + (cuotasCantidad * 15));

    const { error } = await supabase.from("prestamos").insert([
      {
        cliente: nuevoCliente,
        telefono: telefonoCompleto,
        email: nuevoEmail || "cliente@gsterllc.com",
        direccion: nuevaDireccion,
        sector: nuevoSector,
        pais: nuevoPais,
        provincia: nuevoPais === "República Dominicana" ? nuevaProvincia : "N/A",
        monto: montoNum,
        cuotas_cantidad: cuotasCantidad,
        cuota_total: cuotaTotalCalculada,
        vencimiento: fechaVencFinal.toISOString().split("T")[0],
        estado: "pendiente",
        aprobado_garic: isGaric ? true : false,
        aprobado_solf: isSolf ? true : false,
        documento_url: docUrlExistente,
        documento_tipo: docTipoExistente,
        cuotas: cuotasGeneradas
      }
    ]);

    if (!error) {
      setIsModalOpen(false);
      setNuevoCliente(""); setNuevoTelefono(""); setNuevoEmail(""); 
      setNuevaDireccion(""); setNuevoSector(""); setNuevoMonto(""); setCuotasCantidad(2);
      await fetchPrestamos();
      
      if (docUrlExistente) {
        alert("¡Cliente recurrente detectado! Su documento anterior fue vinculado automáticamente. Solicitud registrada con éxito.");
      } else {
        alert("Solicitud registrada con éxito. Quedará pendiente hasta la aprobación dual y la firma del cliente.");
      }
    } else {
      alert("Error al registrar: " + error.message);
    }
  };

  const handleUpdateProfile = async () => {
    const updatedUser = { ...currentUser, nombre: nombreInput, username: usernameInput };
    setCurrentUser(updatedUser);
    localStorage.setItem("gster_user", JSON.stringify(updatedUser));

    let updateData: any = { nombre: nombreInput, username: usernameInput };
    if (newPasswordInput.length >= 4) {
      updateData.password = newPasswordInput;
    }

    const { error } = await supabase
      .from("usuarios_admin")
      .update(updateData)
      .eq("username", currentUser.username);

    if (!error) {
      alert("¡Perfil y contraseña actualizados con éxito en la base de datos!");
      setIsConfigOpen(false);
      setNewPasswordInput("");
    } else {
      alert("Error al actualizar perfil: " + error.message);
    }
  };

  const exportarExcel = () => {
    let datosParaExcel: any[] = [];
    
    prestamos.forEach(p => {
      const cuotasList = Array.isArray(p.cuotas) ? p.cuotas : [];
      if (cuotasList.length > 0) {
        cuotasList.forEach((c: any) => {
          datosParaExcel.push({
            "Cliente": p.cliente,
            "Monto Total": p.cuota_total || p.monto,
            "Cuota N°": c.numero_cuota,
            "Monto Cuota": c.monto,
            "Vencimiento": c.fecha_vencimiento,
            "Estado": c.estado,
            "Fecha de Pago": c.fecha_pago || "Pendiente"
          });
        });
      } else {
        datosParaExcel.push({
          "Cliente": p.cliente,
          "Monto Total": p.cuota_total || p.monto,
          "Cuota N°": 1,
          "Monto Cuota": p.cuota_total || p.monto,
          "Vencimiento": p.vencimiento,
          "Estado": p.estado,
          "Fecha de Pago": "N/A"
        });
      }
    });

    const worksheet = XLSX.utils.json_to_sheet(datosParaExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Control de Cuotas GSTER");
    XLSX.writeFile(workbook, `Reporte_Cobros_GSTER_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const prestamosActivos = prestamos.filter(p => p.estado === "activo" || p.estado === "completado");
  const prestamosPorAprobar = prestamos.filter(p => p.estado === "pendiente" || p.estado === "rechazado");

  const capitalTotal = prestamosActivos.reduce((acc, curr) => acc + (curr.estado === "activo" ? Number(curr.monto) : 0), 0);
  const interesTotal = capitalTotal * 0.15;

  const prestamosFiltrados = prestamosActivos.filter(item => {
    if (filtroEstado === "todos") return true;
    const { tipoFiltro } = getEstadoPrestamo(item);
    if (filtroEstado === "activo") return tipoFiltro === "activo";
    if (filtroEstado === "alerta") return tipoFiltro === "alerta";
    if (filtroEstado === "mora") return tipoFiltro === "mora";
    if (filtroEstado === "completado") return item.estado === "completado";
    return true;
  });

  return (
    <main className="dashboard-area min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-gster-amarillo selection:text-gster-verde text-base">
      
      {/* BARRA SUPERIOR */}
      <header className="bg-gster-verde text-white px-10 py-5 flex items-center justify-between shadow-md border-b border-white/10">
        <div className="flex items-center gap-4">
          <img src="/assets/gster-logoblanco.svg" alt="GSTER LLC Logo" className="h-10 w-auto object-contain pointer-events-none select-none" />
          <div className="border-l border-white/20 pl-4">
            <h1 className="text-sm font-extrabold tracking-wider uppercase text-white flex items-center gap-2">
              {t.title}
            </h1>
            <p className="text-[10px] text-slate-300 font-medium">{t.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1 bg-white/10 p-1 rounded-2xl border border-white/20">
            <Globe className="w-4 h-4 text-gster-amarillo ml-1.5" />
            <button onClick={() => setLang("es" as any)} className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${lang === ("es" as any) ? "bg-gster-amarillo text-gster-verde shadow" : "text-white hover:bg-white/10"}`}>ES</button>
            <button onClick={() => setLang("en" as any)} className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${lang === ("en" as any) ? "bg-gster-amarillo text-gster-verde shadow" : "text-white hover:bg-white/10"}`}>EN</button>
          </div>

          <div className="flex items-center gap-2.5 bg-white/10 px-5 py-2.5 rounded-2xl border border-white/20 shadow-inner">
            <span className="text-sm text-gster-amarillo font-bold">{t.currency}</span>
            <select className="bg-transparent text-sm text-white font-semibold focus:outline-none cursor-pointer" value={currency} onChange={(e) => setCurrency(e.target.value as "DOP" | "USD")}>
              <option value="DOP" className="bg-gster-verde text-white">RD$ (Peso Dominicano)</option>
              <option value="USD" className="bg-gster-verde text-white">US$ (Dólar USA)</option>
            </select>
          </div>

          <div className="relative">
            <div onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center gap-3.5 bg-white/10 hover:bg-white/15 px-4 py-2 rounded-2xl border border-white/15 cursor-pointer transition-all shadow-sm">
              <img src={currentUser.foto} alt={currentUser.nombre} className="w-9 h-9 rounded-full object-cover border border-gster-amarillo shadow-sm" />
              <div className="text-right">
                <p className="text-sm font-bold text-white flex items-center gap-1">
                  {currentUser.nombre}
                  <ChevronDown className="w-4 h-4 text-gster-amarillo" />
                </p>
                <p className="text-[11px] text-gster-amarillo uppercase font-semibold">{currentUser.cargo}</p>
              </div>
            </div>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-gster-verde border border-white/15 rounded-2xl shadow-xl overflow-hidden z-50">
                <div className="p-3.5 border-b border-white/10">
                  <p className="text-[11px] text-slate-300">Conectado como</p>
                  <p className="text-sm font-bold text-white truncate">{currentUser.email}</p>
                </div>
                <button onClick={() => { setIsProfileMenuOpen(false); setIsConfigOpen(true); }} className="w-full px-4 py-3 text-left text-sm text-white font-medium hover:bg-white/10 flex items-center gap-2.5 transition-colors cursor-pointer">
                  <Settings className="w-4 h-4 text-gster-amarillo" /> {t.configCuenta}
                </button>
                <button onClick={() => {
                  localStorage.removeItem("gster_user");
                  document.cookie = "gster_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                  router.push("/login");
                }} className="w-full px-4 py-3 text-left text-sm text-rose-300 font-semibold hover:bg-rose-500/20 flex items-center gap-2.5 transition-colors border-t border-white/10 cursor-pointer">
                  <LogOut className="w-4 h-4 text-rose-400" /> Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* PORTADA Y FOTO */}
      <section className="w-full bg-[#0b1d22] relative shadow-md overflow-hidden border-b border-slate-200">
        <div className="relative h-48 w-full overflow-hidden">
          <img src={currentUser.portada} alt="Portada" className="w-full h-full object-cover opacity-85 filter brightness-90" />
          <div className="absolute inset-0 bg-linear-to-t from-[#0b1d22] via-black/20 to-transparent" />
          
          <label className="absolute top-4 right-4 bg-black/60 hover:bg-black/90 text-white px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer backdrop-blur-md flex items-center gap-2 transition-all shadow border border-white/20 z-10">
            <Camera className="w-4 h-4 text-gster-amarillo" /> Cambiar Portada
            <input type="file" accept="image/*" className="hidden" onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const url = URL.createObjectURL(e.target.files[0]);
                const updated = {...currentUser, portada: url};
                setCurrentUser(updated);
                localStorage.setItem("gster_user", JSON.stringify(updated));
              }
            }} />
          </label>

          <div className="absolute inset-0 flex items-center justify-center pb-6">
            <h2 className="text-2xl font-black text-white tracking-widest uppercase drop-shadow">
              WELCOME MR. {currentUser.nombre.toUpperCase()}
            </h2>
          </div>
        </div>

        <div className="max-w-328 mx-auto px-10 relative pb-6 flex flex-col items-center">
          <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <div className="relative w-28 h-28 rounded-full border-4 border-[#0b1d22] overflow-hidden shadow-xl bg-white group cursor-pointer">
              <img src={currentUser.foto} alt="Avatar" className="w-full h-full object-cover" />
              <label className="absolute inset-0 bg-black/50 hover:bg-black/70 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-5 h-5 text-gster-amarillo mb-0.5" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Cambiar</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const url = URL.createObjectURL(e.target.files[0]);
                    const updated = {...currentUser, foto: url};
                    setCurrentUser(updated);
                    localStorage.setItem("gster_user", JSON.stringify(updated));
                  }
                }} />
              </label>
            </div>
          </div>

          <div className="pt-14">
            <span className="text-xs font-black uppercase tracking-wider text-gster-verde bg-gster-amarillo px-4 py-1.5 rounded-full shadow">
              {currentUser.cargo} — {currentUser.pais}
            </span>
          </div>
        </div>
      </section>

      {/* NAVEGACIÓN ENTRE PANELES (BOTONES GRANDES Y LEGIBLES) */}
      <div className="max-w-328 mx-auto px-10 pt-8">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-200 pb-5 gap-4">
          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={() => setActiveTab("control")}
              className={`px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center gap-3 ${
                activeTab === "control" 
                  ? "bg-gster-verde text-gster-amarillo scale-[1.02]" 
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <span>{t.control}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-gster-amarillo text-gster-verde text-xs font-black">
                {prestamosActivos.filter(p => p.estado === "activo").length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("aprobaciones")}
              className={`px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center gap-3 ${
                activeTab === "aprobaciones" 
                  ? "bg-gster-verde text-gster-amarillo scale-[1.02]" 
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <span>{t.aprobaciones}</span>
              {prestamosPorAprobar.length > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-gster-amarillo text-gster-verde text-xs font-black">
                  {prestamosPorAprobar.length}
                </span>
              )}
            </button>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-4 rounded-2xl bg-gster-amarillo text-gster-verde text-sm font-black uppercase tracking-wider hover:bg-amber-400 transition-all shadow-md flex items-center gap-2.5 cursor-pointer"
          >
            <Plus className="w-5 h-5" /> {t.registrarSol}
          </button>
        </div>
      </div>

      {/* CONTENIDO DE LOS PANELES */}
      <div className="max-w-328 mx-auto px-10 py-8 space-y-7">
        
        {activeTab === "control" && (
          <div className="space-y-7">
            {!isSecretaria && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-200/60 flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gster-verde/10 text-gster-verde flex items-center justify-center font-bold"><DollarSign className="w-7 h-7" /></div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">{t.capitalActivo}</p>
                    <h3 className="text-2xl font-black text-gster-verde mt-1">{formatMoney(capitalTotal)}</h3>
                  </div>
                </div>

                <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-200/60 flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gster-amarillo/20 text-gster-verde flex items-center justify-center font-bold"><TrendingUp className="w-7 h-7" /></div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">{t.interesQuincenal}</p>
                    <h3 className="text-2xl font-black text-gster-verde mt-1">{formatMoney(interesTotal)}</h3>
                  </div>
                </div>

                <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-200/60 flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold"><Users className="w-7 h-7" /></div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">{t.prestamosCurso}</p>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">{prestamosActivos.filter(p => p.estado === "activo").length} Activos</h3>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-8 space-y-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <h2 className="text-xl font-bold text-gster-verde">{t.controlCobros}</h2>

                <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl text-sm font-semibold">
                  <button onClick={() => setFiltroEstado("todos")} className={`px-4 py-2 rounded-xl transition-all ${filtroEstado === "todos" ? 'bg-gster-verde text-white shadow-sm' : 'text-slate-600 hover:text-black'}`}>{t.todos}</button>
                  <button onClick={() => setFiltroEstado("activo")} className={`px-4 py-2 rounded-xl transition-all ${filtroEstado === "activo" ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-600 hover:text-black'}`}>🟢 {t.alDia}</button>
                  <button onClick={() => setFiltroEstado("alerta")} className={`px-4 py-2 rounded-xl transition-all ${filtroEstado === "alerta" ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600 hover:text-black'}`}>🟠 {t.alerta}</button>
                  <button onClick={() => setFiltroEstado("mora")} className={`px-4 py-2 rounded-xl transition-all ${filtroEstado === "mora" ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-600 hover:text-black'}`}>🔴 {t.mora}</button>
                  <button onClick={() => setFiltroEstado("completado")} className={`px-4 py-2 rounded-xl transition-all ${filtroEstado === "completado" ? 'bg-blue-500 text-white shadow-sm' : 'text-slate-600 hover:text-black'}`}>{t.completados}</button>
                </div>

                <button onClick={exportarExcel} className="px-5 py-2.5 rounded-2xl bg-emerald-600 text-white text-sm font-bold uppercase tracking-wider hover:bg-emerald-700 transition-all shadow-sm flex items-center gap-2 cursor-pointer">
                  <FileSpreadsheet className="w-4 h-4" /> {t.excel}
                </button>
              </div>

              {/* TABLA PRINCIPAL CON SELECTOR DE CUOTAS */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs text-slate-400 uppercase tracking-wider font-bold">
                      <th className="py-4 px-5">{t.semaforo}</th>
                      <th className="py-4 px-5">{t.cliente}</th>
                      <th className="py-4 px-5">{t.saldoActual}</th>
                      <th className="py-4 px-5">{t.cuotasColumna}</th>
                      <th className="py-4 px-5">{t.vencimiento}</th>
                      <th className="py-4 px-5">{t.contratoFirmado}</th>
                      <th className="py-4 px-5 text-right">{t.accionesCobro}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm font-medium">
                    {prestamosFiltrados.length === 0 ? (
                      <tr><td colSpan={7} className="text-center py-12 text-slate-400">{t.noPrestamos}</td></tr>
                    ) : (
                      prestamosFiltrados.map((item) => {
                        const { color, saldoActual, enMora } = getEstadoPrestamo(item);
                        const cuotasList = Array.isArray(item.cuotas) ? item.cuotas : [];

                        return (
                          <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-4 px-5 flex items-center gap-3">
                              <span className="text-lg">{color}</span>
                              {item.estado === "activo" && <span className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-xl font-bold">Activo</span>}
                              {item.estado === "completado" && <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-xl font-bold">Completado</span>}
                            </td>

                            <td className="py-4 px-5">
                              <button onClick={() => setSelectedClient(item)} className="font-bold text-gster-verde hover:underline flex items-center gap-2.5 text-left cursor-pointer">
                                <span className="w-8 h-8 rounded-full bg-gster-verde/10 flex items-center justify-center text-sm text-gster-verde">👤</span>
                                {item.cliente}
                              </button>
                            </td>

                            <td className="py-4 px-5 font-extrabold text-base text-gster-verde">
                              <div className="flex items-center gap-2">
                                <span>{formatMoney(saldoActual)}</span>
                                {enMora && <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-black">+3% MORA</span>}
                              </div>
                            </td>

                            {/* COLUMNA DE CUOTAS */}
                            <td className="py-4 px-5">
                              <div className="flex items-center gap-1.5 flex-wrap max-w-xs">
                                {cuotasList.length === 0 ? (
                                  <span className="text-xs text-slate-400">Sin cuotas</span>
                                ) : (
                                  cuotasList.map((c: any) => {
                                    const esPagada = c.estado === "pagado";
                                    const esAtraso = c.estado === "atraso";

                                    return (
                                      <div key={c.numero_cuota} className="relative inline-block">
                                        <select
                                          value={c.estado}
                                          onChange={(e) => handleCambiarEstadoCuota(item.id, c.numero_cuota, e.target.value)}
                                          className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all outline-none border shadow-xs appearance-none pr-7 text-center ${
                                            esPagada ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-extrabold' : 
                                            esAtraso ? 'bg-rose-100 text-rose-800 border-rose-300 font-extrabold' : 
                                            'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                                          }`}
                                          title={`Cuota #${c.numero_cuota} - ${c.estado.toUpperCase()}`}
                                        >
                                          <option value="pendiente">#{c.numero_cuota} ⏳ Pendiente</option>
                                          <option value="pagado">✓ #{c.numero_cuota} Pagado</option>
                                          <option value="atraso">✗ #{c.numero_cuota} Retraso</option>
                                        </select>
                                      </div>
                                    );
                                  })
                                )}
                              </div>
                            </td>

                            <td className="py-4 px-5 text-slate-500 font-semibold">{item.vencimiento}</td>

                            <td className="py-4 px-5">
                              {item.contrato_firmado ? (
                                <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-xl font-bold">Firmado ✓</span>
                              ) : (
                                <button 
                                  onClick={() => {
                                    const totalPagarW = Number(item.cuota_total || (item.monto * 1.15));
                                    const cantCuotasW = Number(item.cuotas_cantidad || 2);
                                    const valorCuotaW = totalPagarW / cantCuotasW;
                                    const urlFirma = `${window.location.origin}/firma/${item.id}`;
                                    
                                    const msg = `¡Hola ${item.cliente}! 📄 Su préstamo en GSTER LLC ha sido aprobado.\n\n` +
                                      `• Monto: RD$ ${Number(item.monto).toLocaleString()}\n` +
                                      `• Total a pagar: RD$ ${totalPagarW.toLocaleString()}\n` +
                                      `• Cuotas: ${cantCuotasW} de RD$ ${valorCuotaW.toLocaleString()}\n\n` +
                                      `Haz clic en el siguiente enlace seguro para revisar, firmar y adjuntar tu documento:\n\n` +
                                      `${urlFirma}`;
                                    
                                    window.open(`https://wa.me/${item.telefono}?text=${encodeURIComponent(msg)}`, '_blank');
                                  }}
                                  className="px-3.5 py-1.5 rounded-xl bg-gster-amarillo/20 text-gster-verde font-bold text-xs hover:bg-gster-amarillo transition-all"
                                >
                                  {t.enviarContrato}
                                </button>
                              )}
                            </td>

                            <td className="py-4 px-5 text-right space-x-2">
                              {item.estado === "activo" && (
                                <>
                                  <button onClick={() => setIsPaymentModalOpen(item.id)} className="px-3.5 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 font-bold text-xs shadow-sm cursor-pointer">{t.abonar}</button>
                                  <button onClick={() => handleSaldarTotal(item.id, saldoActual)} className="px-3.5 py-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 font-bold text-xs shadow-sm cursor-pointer">{t.saldarTotal}</button>
                                </>
                              )}

                              {enMora && (
                                <button onClick={() => {
                                  const mensaje = `Estimado(a) ${item.cliente}, su préstamo en GSTER LLC presenta un retraso. Se ha aplicado el recargo automático del 3% por mora. Balance actual: ${formatMoney(saldoActual)}. Favor regularizar.`;
                                  window.open(`https://wa.me/${item.telefono}?text=${encodeURIComponent(mensaje)}`, '_blank');
                                }} className="px-3.5 py-2 rounded-xl bg-rose-500 text-white hover:bg-rose-600 font-bold text-xs shadow-sm cursor-pointer">
                                  {t.whatsappMora}
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA APROBACIONES CON BOTÓN DE WHATSAPP CON ENLACE CLICKEABLE */}
        {activeTab === "aprobaciones" && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-8 space-y-6">
            <h2 className="text-xl font-bold text-gster-verde">{t.solicitudesPendientes}</h2>
            <p className="text-xs text-slate-500">{t.descAprobacion}</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-xs text-slate-400 uppercase tracking-wider font-bold">
                    <th className="py-4 px-5">{t.cliente}</th>
                    <th className="py-4 px-5">{t.montoSolicitado}</th>
                    <th className="py-4 px-5">{t.cuotaQuincenal}</th>
                    <th className="py-4 px-5">{t.totalPagar}</th>
                    <th className="py-4 px-5">{t.plazo}</th>
                    <th className="py-4 px-5">{t.aprobacionGaric}</th>
                    <th className="py-4 px-5">{t.aprobacionSolf}</th>
                    <th className="py-4 px-5 text-right">{t.accionesEjecutivas}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-medium">
                  {prestamosPorAprobar.length === 0 ? (
                    <tr><td colSpan={8} className="text-center py-12 text-slate-400">{t.noSolicitudes}</td></tr>
                  ) : (
                    prestamosPorAprobar.map((p) => {
                      const totalPagar = Number(p.cuota_total || p.cuota || 0);
                      const cantCuotas = Number(p.cuotas_cantidad || 2);
                      const cuotaQuincenal = cantCuotas > 0 ? totalPagar / cantCuotas : totalPagar;

                      return (
                        <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-5 font-bold text-gster-verde">{p.cliente}</td>
                          <td className="py-4 px-5 font-bold">{formatMoney(p.monto)}</td>
                          <td className="py-4 px-5 font-extrabold text-blue-600">{formatMoney(cuotaQuincenal)}</td>
                          <td className="py-4 px-5 font-extrabold text-gster-verde">{formatMoney(totalPagar)}</td>
                          <td className="py-4 px-5 text-slate-500 font-semibold">{cantCuotas} Quincenas</td>
                          
                          <td className="py-4 px-5">
                            <span className={`px-3 py-1 rounded-xl text-xs font-bold ${p.aprobado_garic ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                              {p.aprobado_garic ? t.aprobarParte : t.pendiente}
                            </span>
                          </td>

                          <td className="py-4 px-5">
                            <span className={`px-3 py-1 rounded-xl text-xs font-bold ${p.aprobado_solf ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                              {p.aprobado_solf ? t.aprobarParte : t.pendiente}
                            </span>
                          </td>

                          <td className="py-4 px-5 text-right">
                            <div className="flex items-center justify-end gap-1.5 flex-wrap">
                              {/* BOTÓN WHATSAPP CON ENLACE LIMPIO Y CLICKEABLE */}
                              <button 
                                onClick={() => {
                                  const totalPagarW = Number(p.cuota_total || (p.monto * 1.15));
                                  const cantCuotasW = Number(p.cuotas_cantidad || 2);
                                  const valorCuotaW = totalPagarW / cantCuotasW;
                                  const urlFirma = `${window.location.origin}/firma/${p.id}`;
                                  
                                  const msg = `¡Hola ${p.cliente}! 📄 Su préstamo en GSTER LLC está pendiente de firma.\n\n` +
                                    `• Monto: RD$ ${Number(p.monto).toLocaleString()}\n` +
                                    `• Total a pagar: RD$ ${totalPagarW.toLocaleString()}\n` +
                                    `• Cuotas: ${cantCuotasW} de RD$ ${valorCuotaW.toLocaleString()}\n\n` +
                                    `Haz clic en el siguiente enlace seguro para firmar y adjuntar tu documento:\n\n` +
                                    `${urlFirma}`;
                                  
                                  window.open(`https://wa.me/${p.telefono}?text=${encodeURIComponent(msg)}`, '_blank');
                                }}
                                className="px-3.5 py-2 rounded-xl bg-gster-amarillo/30 text-gster-verde hover:bg-gster-amarillo font-bold text-xs shadow-sm cursor-pointer transition-all"
                                title="Enviar enlace de firma por WhatsApp"
                              >
                                {t.enviarContrato}
                              </button>

                              <button onClick={() => handleAprobarRechazar(p.id, isGaric ? "aprobar_garic" : "aprobar_solf")} className="px-3.5 py-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 font-bold text-xs shadow-sm cursor-pointer inline-flex items-center gap-1 transition-all">
                                <Check className="w-3.5 h-3.5" /> {(isGaric && p.aprobado_garic) || (isSolf && p.aprobado_solf) ? t.desaprobar : t.aprobarParte}
                              </button>
                              
                              <button onClick={() => handleAprobarRechazar(p.id, "rechazar")} className="px-3.5 py-2 rounded-xl bg-rose-500 text-white hover:bg-rose-600 font-bold text-xs shadow-sm cursor-pointer inline-flex items-center gap-1 transition-all">
                                <Ban className="w-3.5 h-3.5" /> {t.rechazar}
                              </button>

                              <button onClick={() => handleEliminarSolicitud(p.id)} className="px-3.5 py-2 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-800 hover:text-white font-bold text-xs shadow-sm cursor-pointer inline-flex items-center gap-1 transition-all">
                                <Trash2 className="w-3.5 h-3.5 text-rose-500 group-hover:text-white" /> {t.borrar}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* MODAL CONFIGURACIÓN */}
      {isConfigOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-gster-verde text-white w-full max-w-md rounded-3xl p-8 shadow-2xl border border-white/20 relative space-y-6">
            <button onClick={() => setIsConfigOpen(false)} className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"><X className="w-5 h-5" /></button>

            <div>
              <h3 className="text-xl font-bold">{t.configCuenta}</h3>
              <p className="text-xs text-slate-300 mt-1">Actualizar perfil y clave para <span className="text-gster-amarillo font-bold">{currentUser.nombre}</span></p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-gster-amarillo font-bold mb-1">{t.nombreCompleto}</label>
                <input type="text" value={nombreInput} onChange={(e) => setNombreInput(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-gster-amarillo" />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-gster-amarillo font-bold mb-1">{t.nombreUsuario}</label>
                <input type="text" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-gster-amarillo" />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-gster-amarillo font-bold mb-1">{t.nuevaContrasena}</label>
                <div className="relative flex items-center">
                  <input type={showPassword ? "text" : "password"} placeholder="Dejar en blanco si no desea cambiarla" value={newPasswordInput} onChange={(e) => setNewPasswordInput(e.target.value)} className="w-full pl-4 pr-12 py-3 rounded-2xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-gster-amarillo" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 text-slate-300 hover:text-white p-1 cursor-pointer">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <button onClick={handleUpdateProfile} className="w-full py-3.5 rounded-2xl bg-gster-amarillo text-gster-verde font-extrabold text-xs uppercase tracking-wider shadow-lg hover:bg-white transition-all cursor-pointer flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" /> {t.guardarCambios}
            </button>
          </div>
        </div>
      )}

      {/* MODAL EXPEDIENTE CLIENTE CON VISUALIZACIÓN Y DESCARGA DE DOCUMENTOS */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-gster-verde text-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-white/20 relative space-y-5 my-8">
            <button onClick={() => setSelectedClient(null)} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"><X className="w-4 h-4" /></button>

            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-12 h-12 rounded-full bg-gster-amarillo text-gster-verde font-bold text-lg flex items-center justify-center">{selectedClient.cliente.charAt(0)}</div>
              <div>
                <h3 className="text-base font-bold">{selectedClient.cliente}</h3>
                <p className="text-[10px] text-gster-amarillo uppercase font-bold tracking-wider">Expediente Verificado GSTER LLC</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-white/10 p-3 rounded-xl border border-white/10 flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gster-amarillo shrink-0" />
                <div>
                  <p className="text-[9px] text-slate-300 uppercase font-bold">Teléfono / WhatsApp</p>
                  <p className="font-semibold">{selectedClient.telefono}</p>
                </div>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10 flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gster-amarillo shrink-0" />
                <div>
                  <p className="text-[9px] text-slate-300 uppercase font-bold">Correo Electrónico</p>
                  <p className="font-semibold truncate">{selectedClient.email || "No registrado"}</p>
                </div>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10 col-span-full flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-gster-amarillo shrink-0" />
                <div>
                  <p className="text-[9px] text-slate-300 uppercase font-bold">Dirección Completa</p>
                  <p className="font-semibold">{selectedClient.direccion || "N/A"} {selectedClient.sector ? `, Sector ${selectedClient.sector}` : ""}</p>
                </div>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10 flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-gster-amarillo shrink-0" />
                <div>
                  <p className="text-[9px] text-slate-300 uppercase font-bold">Provincia / Estado</p>
                  <p className="font-semibold">{selectedClient.provincia || "N/A"}</p>
                </div>
              </div>

              <div className="bg-white/10 p-3 rounded-xl border border-white/10 flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-gster-amarillo shrink-0" />
                <div>
                  <p className="text-[9px] text-slate-300 uppercase font-bold">País</p>
                  <p className="font-semibold">{selectedClient.pais || "República Dominicana"}</p>
                </div>
              </div>
            </div>

            {/* SECCIÓN DE DOCUMENTO Y DESCARGA */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <p className="text-xs text-gster-amarillo uppercase font-extrabold flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Documento de Identidad Adjunto
              </p>
              
              {selectedClient.documento_url ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10 text-xs">
                    <span className="font-bold text-white">{selectedClient.documento_tipo || "Cédula / Pasaporte"}</span>
                    <div className="flex gap-2">
                      <a 
                        href={selectedClient.documento_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-3 py-1.5 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition-all shadow flex items-center gap-1"
                      >
                        Ver ↗
                      </a>
                      <a 
                        href={selectedClient.documento_url} 
                        download 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-all shadow flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" /> Descargar
                      </a>
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-white/20 bg-black/50 h-36 flex items-center justify-center">
                    <img src={selectedClient.documento_url} alt="Cédula del Cliente" className="w-full h-full object-contain" />
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                  <p className="text-xs text-amber-400 font-bold">Este cliente aún no ha adjuntado su documento de identidad.</p>
                </div>
              )}
            </div>

            <button onClick={() => setSelectedClient(null)} className="w-full py-3 rounded-xl bg-gster-amarillo text-gster-verde font-bold text-xs uppercase tracking-wider hover:bg-white transition-all cursor-pointer shadow">
              {t.cerrar}
            </button>
          </div>
        </div>
      )}

      {/* MODAL NUEVA SOLICITUD DE PRÉSTAMO */}
      {!isSecretaria && isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-gster-verde text-white w-full max-w-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative space-y-5 my-8">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"><X className="w-4 h-4" /></button>

            <div>
              <h3 className="text-xl font-black">{t.registrarseSolicitudModal}</h3>
            </div>

            <div className="bg-gster-amarillo/15 border-2 border-gster-amarillo p-4 rounded-2xl flex items-start gap-3 shadow-inner">
              <AlertCircle className="w-6 h-6 text-gster-amarillo shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-black text-gster-amarillo uppercase tracking-wider">Límites y Condiciones Generales:</p>
                <p className="text-[11px] text-white/90 font-medium mt-0.5">
                  • Monto permitido: <strong>RD$ 1,000 - RD$ 15,000</strong><br />
                  • Plazo: <strong>1 a 5 cuotas quincenales</strong>
                </p>
              </div>
            </div>

            <form onSubmit={handleCrearPrestamo} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gster-amarillo font-bold mb-1">{t.nombreCliente}</label>
                <input type="text" required value={nuevoCliente} placeholder="Nombre completo del cliente" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold focus:outline-none focus:border-gster-amarillo" onChange={(e) => setNuevoCliente(e.target.value)} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gster-amarillo font-bold mb-1">{t.telefonoWhatsapp}</label>
                  <div className="flex items-center rounded-xl bg-white/10 border border-white/20 overflow-hidden">
                    <span className="px-3.5 py-3 bg-white/5 text-gster-amarillo font-bold border-r border-white/10 text-xs">+1</span>
                    <input type="text" required value={nuevoTelefono} placeholder="Ej. 809-440-0000" className="w-full px-4 py-3 bg-transparent text-white focus:outline-none font-semibold" onChange={(e) => setNuevoTelefono(e.target.value)} />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gster-amarillo font-bold mb-1">Correo Electrónico</label>
                  <input type="email" value={nuevoEmail} placeholder="Ej. cliente@email.com" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold focus:outline-none focus:border-gster-amarillo" onChange={(e) => setNuevoEmail(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gster-amarillo font-bold mb-1">Dirección (Calle / Número)</label>
                  <input type="text" required value={nuevaDireccion} placeholder="Ej. Av. 27 de Febrero #45" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold focus:outline-none focus:border-gster-amarillo" onChange={(e) => setNuevaDireccion(e.target.value)} />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gster-amarillo font-bold mb-1">Sector</label>
                  <input type="text" required value={nuevoSector} placeholder="Ej. Naco / Piantini" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold focus:outline-none focus:border-gster-amarillo" onChange={(e) => setNuevoSector(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gster-amarillo font-bold mb-1">País</label>
                  <select value={nuevoPais} onChange={(e) => setNuevoPais(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[#051c22] border border-white/20 text-white font-bold cursor-pointer">
                    <option value="República Dominicana">República Dominicana</option>
                    <option value="Estados Unidos">Estados Unidos (USA)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gster-amarillo font-bold mb-1">Provincia / Estado</label>
                  {nuevoPais === "República Dominicana" ? (
                    <select value={nuevaProvincia} onChange={(e) => setNuevaProvincia(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[#051c22] border border-white/20 text-white font-bold cursor-pointer">
                      {PROVINCIAS_RD.map(prov => (<option key={prov} value={prov}>{prov}</option>))}
                    </select>
                  ) : (
                    <input type="text" value={nuevaProvincia} placeholder="Estado (Ej. New York, Florida)" onChange={(e) => setNuevaProvincia(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold" />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gster-amarillo font-bold mb-1">{t.montoPrincipal}</label>
                <input 
                  type="text" 
                  required 
                  value={formatNumberWithCommas(nuevoMonto)} 
                  placeholder="Ej. 10,000" 
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-extrabold text-base focus:outline-none focus:border-gster-amarillo" 
                  onChange={(e) => setNuevoMonto(e.target.value.replace(/\D/g, ""))} 
                />
                <p className="text-[9px] text-slate-300 mt-1">Escribe el monto (ej. 1,000 hasta 15,000).</p>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gster-amarillo font-bold mb-1">{t.cantidadCuotas}</label>
                <select value={cuotasCantidad} onChange={(e) => setCuotasCantidad(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl bg-[#051c22] border border-white/20 text-white font-bold cursor-pointer">
                  <option value={1}>1 Cuota</option>
                  <option value={2}>2 Cuotas</option>
                  <option value={3}>3 Cuotas</option>
                  <option value={4}>4 Cuotas</option>
                  <option value={5}>5 Cuotas</option>
                </select>
                
                <div className="mt-2 bg-gster-amarillo/10 border border-gster-amarillo/30 p-2.5 rounded-xl">
                  <p className="text-[11px] text-gster-amarillo font-extrabold text-center">
                    📅 Nota: Las cuotas se programan automáticamente para los días 15 y 30 de cada mes.
                  </p>
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-1/2 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wider cursor-pointer">{t.cancelar}</button>
                <button type="submit" className="w-1/2 py-3.5 rounded-xl bg-gster-amarillo text-gster-verde font-black uppercase tracking-wider shadow hover:bg-white transition-all cursor-pointer">{t.enviarRevision}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE ABONOS */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-gster-verde text-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-white/20 relative space-y-4">
            <button onClick={() => setIsPaymentModalOpen(null)} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"><X className="w-4 h-4" /></button>

            <h3 className="text-base font-bold">{t.registrarAbono}</h3>
            <p className="text-[11px] text-slate-300">{t.ingresarMonto}</p>

            <div className="space-y-3 text-xs">
              <input type="text" placeholder="Monto abonado (ej. 5,000)" value={formatNumberWithCommas(montoPago)} onChange={(e) => setMontoPago(e.target.value.replace(/\D/g, ""))} className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white" />
              <button disabled={isLoading} onClick={() => handleRegistrarPago(isPaymentModalOpen)} className="w-full py-3 rounded-xl bg-gster-amarillo text-gster-verde font-bold uppercase tracking-wider shadow hover:bg-white transition-all cursor-pointer">
                {isLoading ? "Procesando..." : t.confirmarDescontar}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}