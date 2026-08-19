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
  Check, Ban, Eye, EyeOff, ShieldCheck, Globe 
} from "lucide-react";

// DICCIONARIO DE TRADUCCIONES ACTUALIZADO
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
    vencimiento: "Vencimiento",
    contratoFirmado: "Contrato Firmado",
    accionesCobro: "Acciones de Cobro",
    noPrestamos: "No hay préstamos activos. Las solicitudes aprobadas aparecerán aquí automáticamente.",
    enviarContrato: "Enviar Contrato WhatsApp",
    abonar: "Abonar",
    saldarTotal: "Saldar Total",
    whatsappMora: "WhatsApp Mora",
    solicitudesPendientes: "Solicitudes Pendientes de Aprobación Dual",
    descAprobacion: "Para que un préstamo pase automáticamente al Panel de Control de Préstamos, tanto Garic Edume como Solf Slice deben aprobarlo.",
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
    limitesModal: "Límites: Monto (1,000 - 15,000 DOP) | Cuotas (2 a 5 quincenales: días 15 y 30).",
    nombreCliente: "Nombre del Cliente",
    telefonoWhatsapp: "Teléfono WhatsApp (Prefijo +1 Automático)",
    montoPrincipal: "Monto Principal (RD$) [Mín: 1,000 - Máx: 15,000]",
    cantidadCuotas: "Cantidad de Cuotas Quincenales [Mín: 2 - Máx: 5]",
    infoCuotas: "* Las cuotas se programan automáticamente para los días 15 y 30 de cada mes.",
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
    vencimiento: "Due Date",
    contratoFirmado: "Signed Contract",
    accionesCobro: "Collection Actions",
    noPrestamos: "No active loans. Approved requests will appear here automatically.",
    enviarContrato: "Send WhatsApp Contract",
    abonar: "Make Payment",
    saldarTotal: "Pay in Full",
    whatsappMora: "WhatsApp Default",
    solicitudesPendientes: "Pending Dual Approval Requests",
    descAprobacion: "For a loan to automatically move to the Loan Control Panel, both Garic Edume and Solf Slice must approve it.",
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
    limitesModal: "Limits: Amount (1,000 - 15,000 DOP) | Installments (2 to 5 bi-weekly: days 15 and 30).",
    nombreCliente: "Client Name",
    telefonoWhatsapp: "WhatsApp Phone (+1 Prefix Automatic)",
    montoPrincipal: "Principal Amount (RD$) [Min: 1,000 - Max: 15,000]",
    cantidadCuotas: "Number of Bi-weekly Installments [Min: 2 - Max: 5]",
    infoCuotas: "* Installments are automatically scheduled for the 15th and 30th of each month.",
    registrarAbono: "Register Payment",
    ingresarMonto: "Enter the amount received.",
    confirmarDescontar: "Confirm & Deduct"
  }
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

  // Estados del perfil editable
  const [nombreInput, setNombreInput] = useState(currentUser.nombre);
  const [usernameInput, setUsernameInput] = useState(currentUser.username);
  const [showPassword, setShowPassword] = useState(false);
  const [newPasswordInput, setNewPasswordInput] = useState("");

  const TASA_CAMBIO = 60;
  const [currency, setCurrency] = useState<"DOP" | "USD">("DOP");

  const [prestamos, setPrestamos] = useState<any[]>([]);

  // Estados para reglas de negocio de solicitudes
  const [cuotasCantidad, setCuotasCantidad] = useState<number>(2);
  const [nuevoCliente, setNuevoCliente] = useState("");
  const [nuevoTelefono, setNuevoTelefono] = useState("");
  const [nuevoMonto, setNuevoMonto] = useState("");

  const montoNum = parseFloat(nuevoMonto) || 0;
  const interesTotalCalculado = montoNum * 0.15;
  const cuotaTotalCalculada = montoNum + interesTotalCalculado;

  // 1. Cargar Préstamos desde Supabase
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

  // Cálculo de Estado y 3% de Mora Automática
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

  // Registrar Abono Quincenal en Supabase
  const handleRegistrarPago = async (id: number) => {
    const montoAbono = parseFloat(montoPago);
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

  // Saldar Préstamo Completo
  const handleSaldarTotal = async (id: number, saldoPendiente: number) => {
    if (confirm(`¿Desea saldar la totalidad de este préstamo por ${formatMoney(saldoPendiente)}?`)) {
      await supabase.from("pagos").insert([{ prestamo_id: id, monto: saldoPendiente }]);
      await supabase.from("prestamos").update({ estado: "completado" }).eq("id", id);
      await fetchPrestamos();
    }
  };

  // Aprobación o Rechazo Dual (Solf y Garic)
  const handleAprobarRechazar = async (id: number, accion: "aprobar_solf" | "aprobar_garic" | "rechazar") => {
    const p = prestamos.find(item => item.id === id);
    if (!p) return;

    let updateData: any = {};

    if (accion === "rechazar") {
      updateData = { estado: "rechazado", aprobado_garic: false, aprobado_solf: false };
    } else if (accion === "aprobar_solf") {
      const nuevoSolf = !p.aprobado_solf;
      const ambosAprobaron = nuevoSolf && p.aprobado_garic;
      updateData = { aprobado_solf: nuevoSolf, estado: ambosAprobaron ? "activo" : "pendiente" };
    } else if (accion === "aprobar_garic") {
      const nuevoGaric = !p.aprobado_garic;
      const ambosAprobaron = p.aprobado_solf && nuevoGaric;
      updateData = { aprobado_garic: nuevoGaric, estado: ambosAprobaron ? "activo" : "pendiente" };
    }

    await supabase.from("prestamos").update(updateData).eq("id", id);
    await fetchPrestamos();
  };

  // Eliminar Solicitud de la Base de Datos
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

  // Registrar Nuevo Préstamo en Supabase
  const handleCrearPrestamo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoCliente || !montoNum) return;

    if (montoNum < 1000 || montoNum > 15000) {
      return alert("El monto principal del préstamo debe estar estrictamente entre RD$ 1,000 y RD$ 15,000.");
    }
    
    if (cuotasCantidad < 2 || cuotasCantidad > 5) {
      return alert("El número de cuotas debe ser mínimo 2 y máximo 5.");
    }

    const telefonoLimpio = nuevoTelefono.replace(/\D/g, "");
    if (telefonoLimpio.length < 10) {
      return alert("Por favor ingresa un número de teléfono válido.");
    }
    const telefonoCompleto = "+1" + telefonoLimpio;

    const fechaVencFinal = new Date();
    fechaVencFinal.setDate(fechaVencFinal.getDate() + (cuotasCantidad * 15));

    const { error } = await supabase.from("prestamos").insert([
      {
        cliente: nuevoCliente,
        telefono: telefonoCompleto,
        email: "cliente@gsterllc.com",
        monto: montoNum,
        cuotas_cantidad: cuotasCantidad,
        cuota_total: cuotaTotalCalculada,
        vencimiento: fechaVencFinal.toISOString().split("T")[0],
        estado: "pendiente",
        aprobado_garic: isGaric ? true : false,
        aprobado_solf: isSolf ? true : false,
      }
    ]);

    if (!error) {
      setIsModalOpen(false);
      setNuevoCliente(""); setNuevoTelefono(""); setNuevoMonto(""); setCuotasCantidad(2);
      await fetchPrestamos();
      alert("Solicitud registrada. Quedará en 'Estado de Aprobación' hasta que ambos directores confirmen.");
    } else {
      alert("Error al registrar: " + error.message);
    }
  };

  // Actualizar Perfil y Contraseña en Supabase
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
      alert("¡Perfil y datos actualizados con éxito en la base de datos!");
      setIsConfigOpen(false);
      setNewPasswordInput("");
    } else {
      alert("Error al actualizar perfil: " + error.message);
    }
  };

  const exportarExcel = () => {
    const datosParaExcel = prestamos.map(p => {
      const totalPagado = (p.pagos || []).reduce((acc: number, cur: any) => acc + Number(cur.monto), 0);
      return {
        "ID Préstamo": p.id,
        "Cliente": p.cliente,
        "Teléfono": p.telefono,
        "Monto Principal": p.monto,
        "Cuotas": p.cuotas_cantidad || 2,
        "Cuota Total": p.cuota_total || p.cuota,
        "Total Abonado": totalPagado,
        "Vencimiento": p.vencimiento,
        "Estado": p.estado,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(datosParaExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte GSTER");
    XLSX.writeFile(workbook, `Reporte_GSTER_${new Date().toISOString().split('T')[0]}.xlsx`);
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
          {/* BOTONES DE IDIOMA */}
          <div className="flex items-center gap-1 bg-white/10 p-1 rounded-2xl border border-white/20">
            <Globe className="w-4 h-4 text-gster-amarillo ml-1.5" />
            <button
              onClick={() => setLang("es")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${lang === "es" ? "bg-gster-amarillo text-gster-verde shadow" : "text-white hover:bg-white/10"}`}
            >
              ES
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${lang === "en" ? "bg-gster-amarillo text-gster-verde shadow" : "text-white hover:bg-white/10"}`}
            >
              EN
            </button>
          </div>

          <div className="flex items-center gap-2.5 bg-white/10 px-5 py-2.5 rounded-2xl border border-white/20 shadow-inner">
            <span className="text-sm text-gster-amarillo font-bold">{t.currency}</span>
            <select 
              className="bg-transparent text-sm text-white font-semibold focus:outline-none cursor-pointer"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as "DOP" | "USD")}
            >
              <option value="DOP" className="bg-gster-verde text-white">RD$ (Peso Dominicano)</option>
              <option value="USD" className="bg-gster-verde text-white">US$ (Dólar USA)</option>
            </select>
          </div>

          <div className="relative">
            <div 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-3.5 bg-white/10 hover:bg-white/15 px-4 py-2 rounded-2xl border border-white/15 cursor-pointer transition-all shadow-sm"
            >
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
                <button 
                  onClick={() => { setIsProfileMenuOpen(false); setIsConfigOpen(true); }}
                  className="w-full px-4 py-3 text-left text-sm text-white font-medium hover:bg-white/10 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-gster-amarillo" /> {t.configCuenta}
                </button>
                <button 
                  onClick={() => {
                    localStorage.removeItem("gster_user");
                    document.cookie = "gster_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                    router.push("/login");
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-rose-300 font-semibold hover:bg-rose-500/20 flex items-center gap-2.5 transition-colors border-t border-white/10 cursor-pointer"
                >
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d22] via-black/20 to-transparent" />
          
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

        <div className="max-w-[82rem] mx-auto px-10 relative pb-6 flex flex-col items-center">
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

      {/* NAVEGACIÓN ENTRE PANELES: CONTROL Y APROBACIONES */}
      <div className="max-w-[82rem] mx-auto px-10 pt-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab("control")}
              className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "control" ? "bg-gster-verde text-gster-amarillo shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:text-black"
              }`}
            >
              {t.control} ({prestamosActivos.filter(p => p.estado === "activo").length})
            </button>

            <button
              onClick={() => setActiveTab("aprobaciones")}
              className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "aprobaciones" ? "bg-gster-verde text-gster-amarillo shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:text-black"
              }`}
            >
              <span>{t.aprobaciones}</span>
              {prestamosPorAprobar.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-gster-amarillo text-gster-verde text-[10px] font-black">
                  {prestamosPorAprobar.length}
                </span>
              )}
            </button>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-gster-amarillo text-gster-verde text-sm font-bold uppercase tracking-wider hover:bg-white transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> {t.registrarSol}
          </button>
        </div>
      </div>

      {/* CONTENIDO DE LOS PANELES */}
      <div className="max-w-[82rem] mx-auto px-10 py-8 space-y-7">
        
        {/* 🌟 PANEL 1: CONTROL DE PRÉSTAMOS ACTIVOS 🌟 */}
        {activeTab === "control" && (
          <div className="space-y-7">
            
            {!isSecretaria && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-200/60 flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gster-verde/10 text-gster-verde flex items-center justify-center font-bold">
                    <DollarSign className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">{t.capitalActivo}</p>
                    <h3 className="text-2xl font-black text-gster-verde mt-1">{formatMoney(capitalTotal)}</h3>
                  </div>
                </div>

                <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-200/60 flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gster-amarillo/20 text-gster-verde flex items-center justify-center font-bold">
                    <TrendingUp className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">{t.interesQuincenal}</p>
                    <h3 className="text-2xl font-black text-gster-verde mt-1">{formatMoney(interesTotal)}</h3>
                  </div>
                </div>

                <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-200/60 flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                    <Users className="w-7 h-7" />
                  </div>
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

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs text-slate-400 uppercase tracking-wider font-bold">
                      <th className="py-4 px-5">{t.semaforo}</th>
                      <th className="py-4 px-5">{t.cliente}</th>
                      <th className="py-4 px-5">{t.saldoActual}</th>
                      <th className="py-4 px-5">{t.vencimiento}</th>
                      <th className="py-4 px-5">{t.contratoFirmado}</th>
                      <th className="py-4 px-5 text-right">{t.accionesCobro}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm font-medium">
                    {prestamosFiltrados.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-slate-400">
                          {t.noPrestamos}
                        </td>
                      </tr>
                    ) : (
                      prestamosFiltrados.map((item) => {
                        const { color, saldoActual, enMora } = getEstadoPrestamo(item);
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

                            <td className="py-4 px-5 text-slate-500 font-semibold">{item.vencimiento}</td>

                            <td className="py-4 px-5">
                              {item.contrato_firmado ? (
                                <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-xl font-bold">Firmado ✓</span>
                              ) : (
                                <button 
                                  onClick={() => {
                                    const url = `${window.origin}/firma/${item.id}`;
                                    const msg = `¡Hola ${item.cliente}! Por favor formalice su contrato y adjunte su cédula o pasaporte en el siguiente enlace seguro de GSTER LLC: ${url}`;
                                    window.open(`https://wa.me/${item.telefono}?text=${encodeURIComponent(msg)}`, '_blank');
                                  }}
                                  className="px-3 py-1.5 rounded-xl bg-gster-amarillo/20 text-gster-verde font-bold text-xs hover:bg-gster-amarillo transition-all"
                                >
                                  {t.enviarContrato}
                                </button>
                              )}
                            </td>

                            <td className="py-4 px-5 text-right space-x-2">
                              {item.estado === "activo" && (
                                <>
                                  <button onClick={() => setIsPaymentModalOpen(item.id)} className="px-3.5 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 font-bold text-xs shadow-sm cursor-pointer">
                                    {t.abonar}
                                  </button>
                                  <button onClick={() => handleSaldarTotal(item.id, saldoActual)} className="px-3.5 py-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 font-bold text-xs shadow-sm cursor-pointer">
                                    {t.saldarTotal}
                                  </button>
                                </>
                              )}

                              {enMora && (
                                <button 
                                  onClick={() => {
                                    const mensaje = `Estimado(a) ${item.cliente}, su préstamo en GSTER LLC presenta un retraso. Se ha aplicado el recargo automático del 3% por mora. Balance actual: ${formatMoney(saldoActual)}. Favor regularizar.`;
                                    window.open(`https://wa.me/${item.telefono}?text=${encodeURIComponent(mensaje)}`, '_blank');
                                  }}
                                  className="px-3.5 py-2 rounded-xl bg-rose-500 text-white hover:bg-rose-600 font-bold text-xs shadow-sm cursor-pointer"
                                >
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

        {/* 🌟 PANEL 2: ESTADO DE APROBACIÓN DUAL CON BOTONES ORGANIZADOS Y BORRAR 🌟 */}
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
                    <tr>
                      <td colSpan={8} className="text-center py-12 text-slate-400">
                        {t.noSolicitudes}
                      </td>
                    </tr>
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

                          {/* ACCIONES EJECUTIVAS ORGANIZADAS Y CON BOTÓN DE BORRAR */}
                          <td className="py-4 px-5 text-right">
                            <div className="flex items-center justify-end gap-1.5 flex-wrap">
                              <button 
                                onClick={() => handleAprobarRechazar(p.id, isGaric ? "aprobar_garic" : "aprobar_solf")}
                                className="px-3 py-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 font-bold text-xs shadow-sm cursor-pointer inline-flex items-center gap-1 transition-all"
                                title="Aprobar / Desaprobar mi parte"
                              >
                                <Check className="w-3.5 h-3.5" /> {(isGaric && p.aprobado_garic) || (isSolf && p.aprobado_solf) ? t.desaprobar : t.aprobarParte}
                              </button>
                              
                              <button 
                                onClick={() => handleAprobarRechazar(p.id, "rechazar")}
                                className="px-3 py-2 rounded-xl bg-rose-500 text-white hover:bg-rose-600 font-bold text-xs shadow-sm cursor-pointer inline-flex items-center gap-1 transition-all"
                                title="Rechazar Solicitud"
                              >
                                <Ban className="w-3.5 h-3.5" /> {t.rechazar}
                              </button>

                              <button 
                                onClick={() => handleEliminarSolicitud(p.id)}
                                className="px-3 py-2 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-800 hover:text-white font-bold text-xs shadow-sm cursor-pointer inline-flex items-center gap-1 transition-all"
                                title="Eliminar Solicitud Permanentemente"
                              >
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

      {/* MODAL CONFIGURACIÓN CON PERFIL EDITABLE COMPLETO */}
      {isConfigOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-gster-verde text-white w-full max-w-md rounded-3xl p-8 shadow-2xl border border-white/20 relative space-y-6">
            <button onClick={() => setIsConfigOpen(false)} className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer">
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-bold">{t.configCuenta}</h3>
              <p className="text-xs text-slate-300 mt-1">Actualizar perfil y clave para <span className="text-gster-amarillo font-bold">{currentUser.nombre}</span></p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-gster-amarillo font-bold mb-1">{t.nombreCompleto}</label>
                <input 
                  type="text" 
                  value={nombreInput}
                  onChange={(e) => setNombreInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-gster-amarillo"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-gster-amarillo font-bold mb-1">{t.nombreUsuario}</label>
                <input 
                  type="text" 
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-gster-amarillo"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-gster-amarillo font-bold mb-1">{t.nuevaContrasena}</label>
                <div className="relative flex items-center">
                  <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Dejar en blanco si no desea cambiarla" 
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 rounded-2xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-gster-amarillo"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-slate-300 hover:text-white p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={handleUpdateProfile}
              className="w-full py-3.5 rounded-2xl bg-gster-amarillo text-gster-verde font-extrabold text-xs uppercase tracking-wider shadow-lg hover:bg-white transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> {t.guardarCambios}
            </button>
          </div>
        </div>
      )}

      {/* MODAL EXPEDIENTE CLIENTE */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-gster-verde text-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-white/20 relative space-y-4">
            <button onClick={() => setSelectedClient(null)} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-12 h-12 rounded-full bg-gster-amarillo text-gster-verde font-bold text-lg flex items-center justify-center">
                {selectedClient.cliente.charAt(0)}
              </div>
              <div>
                <h3 className="text-base font-bold">{selectedClient.cliente}</h3>
                <p className="text-[10px] text-gster-amarillo uppercase font-bold tracking-wider">Expediente Verificado GSTER</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/10">
                <Phone className="w-4 h-4 text-gster-amarillo" />
                <div>
                  <p className="text-[9px] text-slate-300 uppercase font-bold">Teléfono / WhatsApp</p>
                  <p className="font-semibold">{selectedClient.telefono}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/10">
                <Mail className="w-4 h-4 text-gster-amarillo" />
                <div>
                  <p className="text-[9px] text-slate-300 uppercase font-bold">Correo</p>
                  <p className="font-semibold">{selectedClient.email || "cliente@gsterllc.com"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/10">
                <MapPin className="w-4 h-4 text-gster-amarillo" />
                <div>
                  <p className="text-[9px] text-slate-300 uppercase font-bold">Ubicación</p>
                  <p className="font-semibold">{selectedClient.ubicacion || "República Dominicana"}</p>
                </div>
              </div>

              {selectedClient.documento_url && (
                <div className="pt-2">
                  <p className="text-[10px] text-gster-amarillo uppercase font-bold mb-1">Documento de Identidad Adjunto:</p>
                  <a href={selectedClient.documento_url} target="_blank" rel="noopener noreferrer" className="block text-xs text-blue-300 underline truncate">
                    Ver {selectedClient.documento_tipo || "Cédula/Pasaporte"} ↗
                  </a>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-gster-verde text-white w-full max-w-lg rounded-3xl p-8 shadow-2xl border border-white/20 relative space-y-4 my-8">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>

            <div>
              <h3 className="text-lg font-bold">{t.registrarseSolicitudModal}</h3>
              <p className="text-[11px] text-slate-300 mt-0.5">{t.limitesModal}</p>
            </div>

            <form onSubmit={handleCrearPrestamo} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gster-amarillo font-bold mb-1">{t.nombreCliente}</label>
                <input type="text" required value={nuevoCliente} placeholder="Ej. Diesel Beltre" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white" onChange={(e) => setNuevoCliente(e.target.value)} />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gster-amarillo font-bold mb-1">{t.telefonoWhatsapp}</label>
                <div className="flex items-center rounded-xl bg-white/10 border border-white/20 overflow-hidden">
                  <span className="px-4 py-3 bg-white/5 text-gster-amarillo font-bold border-r border-white/10 text-xs">+1</span>
                  <input type="text" required value={nuevoTelefono} placeholder="Ej. 8296651986 u 8095551234" className="w-full px-4 py-3 bg-transparent text-white focus:outline-none" onChange={(e) => setNuevoTelefono(e.target.value)} />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gster-amarillo font-bold mb-1">{t.montoPrincipal}</label>
                <input type="number" min="1000" max="15000" required value={nuevoMonto} placeholder="Ej. 15000" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-sm" onChange={(e) => setNuevoMonto(e.target.value)} />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gster-amarillo font-bold mb-1">{t.cantidadCuotas}</label>
                <select value={cuotasCantidad} onChange={(e) => setCuotasCantidad(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl bg-[#051c22] border border-white/20 text-white font-bold cursor-pointer">
                  <option value={2}>2 Cuotas (Ciclos de pago: 15 y 30)</option>
                  <option value={3}>3 Cuotas (Ciclos de pago: 15 y 30)</option>
                  <option value={4}>4 Cuotas (Ciclos de pago: 15 y 30)</option>
                  <option value={5}>5 Cuotas (Ciclos de pago: 15 y 30)</option>
                </select>
                <p className="text-[10px] text-gster-amarillo mt-1 italic">{t.infoCuotas}</p>
              </div>

              <div className="pt-2 flex gap-3">
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
            <button onClick={() => setIsPaymentModalOpen(null)} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold">{t.registrarAbono}</h3>
            <p className="text-[11px] text-slate-300">{t.ingresarMonto}</p>

            <div className="space-y-3 text-xs">
              <input type="number" placeholder="Monto abonado (ej. 5000)" value={montoPago} onChange={(e) => setMontoPago(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white" />
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