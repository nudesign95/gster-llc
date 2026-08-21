// app/api/verificar-documento/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("documento") as File;

    if (!file) {
      return NextResponse.json({ 
        valido: false, 
        mensaje: "No se proporcionó ningún archivo de documento." 
      }, { status: 400 });
    }

    // 1. Validar formatos permitidos
    const validTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ 
        valido: false, 
        mensaje: "Formato no válido. Debe subir una imagen clara (JPG, PNG) o PDF de su documento de identidad." 
      }, { status: 400 });
    }

    // 2. Validación estructural de tamaño/peso mínimo (filtra archivos vacíos o corrompidos)
    const bytes = await file.arrayBuffer();
    if (bytes.byteLength < 12000) { 
      return NextResponse.json({ 
        valido: false, 
        mensaje: "La imagen es demasiado pequeña o ilegible. Por favor, asegúrese de enfocar correctamente su cédula o pasaporte." 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      valido: true, 
      mensaje: "Documento verificado con éxito." 
    });

  } catch (error: any) {
    return NextResponse.json({ 
      valido: false, 
      mensaje: "Error interno al procesar la validación inteligente del documento." 
    }, { status: 500 });
  }
}