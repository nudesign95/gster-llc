// app/api/verificar-documento/route.ts
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Inicializamos el cliente de Google GenAI usando tu llave de entorno GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("documento") as File;
    const clienteNombre = formData.get("clienteNombre") as string;

    if (!file || !clienteNombre) {
      return NextResponse.json({ 
        valido: false, 
        mensaje: "Faltan datos obligatorios para la validación de identidad." 
      }, { status: 400 });
    }

    // Convertir el archivo a un buffer para pasarlo a la IA
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    // Estructurar la petición al modelo multimodal de IA
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Modelo rápido y optimizado para visión y texto
      contents: [
        {
          inlineData: {
            data: base64Image,
            mimeType: file.type || "image/jpeg",
          },
        },
        {
          text: `Eres un sistema estricto de validación de identidad bancaria para GSTER LLC. 
          Analiza esta imagen con extrema atención:
          1. ¿Es una Cédula de Identidad o un Pasaporte real, claro y legible? (Responde true o false).
          2. Extrae el nombre completo que aparece escrito en el documento.
          3. Compara el nombre extraído del documento con el nombre del cliente registrado en el sistema: "${clienteNombre}". 
             (Sé flexible con el orden de los apellidos, pero el nombre y apellidos principales deben coincidir razonablemente para evitar fraudes de identidad).
          
          Devuelve la respuesta estrictamente en formato JSON válido con esta estructura exacta, sin texto adicional:
          {
            "esDocumentoValido": boolean,
            "nombreExtraido": "string con el nombre encontrado en la cédula",
            "coincideNombre": boolean,
            "motivo": "Explicación breve en español si algo falla"
          }`
        },
      ],
    });

    const textResult = response.text ? response.text.trim() : "";
    
    // Limpiar posibles bloques de código markdown que devuelva la IA
    const cleanJsonText = textResult.replace(/```json/g, "").replace(/```/g, "").trim();
    const resultadoIA = JSON.parse(cleanJsonText);

    if (!resultadoIA.esDocumentoValido) {
      return NextResponse.json({ 
        valido: false, 
        mensaje: "La IA ha rechazado el documento: No parece una cédula o pasaporte válido, o la imagen es muy borrosa." 
      }, { status: 400 });
    }

    if (!resultadoIA.coincideNombre) {
      return NextResponse.json({ 
        valido: false, 
        mensaje: `Alerta de Fraude: El nombre en el documento (${resultadoIA.nombreExtraido}) NO coincide con el titular del préstamo (${clienteNombre}).` 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      valido: true, 
      mensaje: "Identidad verificada exitosamente por IA." 
    });

  } catch (error: any) {
    console.error("Error en validación de IA:", error);
    return NextResponse.json({ 
      valido: false, 
      mensaje: "Error al procesar el análisis biométrico y de texto con la IA." 
    }, { status: 500 });
  }
}