// utils/finance.ts
export const calcularCuota = (monto: number) => {
  const interes = monto * 0.15; // 15% fijo
  return monto + interes;
};

export const calcularMora = (montoCuota: number, diasVencidos: number) => {
  if (diasVencidos > 0) {
    const mora = montoCuota * 0.03; // 3% de mora
    return montoCuota + mora;
  }
  return montoCuota;
};

// Sistema de Semáforo:
// 🟢 (Verde): Pagado o falta más de 5 días
// 🟠 (Naranja): Vence en menos de 5 días
// 🔴 (Rojo): Vencido
export const getEstadoSemaforo = (fechaVencimiento: Date) => {
  // Aquí iría tu lógica de comparación de fechas
};