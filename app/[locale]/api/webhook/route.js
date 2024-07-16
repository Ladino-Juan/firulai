import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getXataClient } from "@/src/xata";
import crypto from "crypto";
import { auth } from "@clerk/nextjs";

export async function POST(request) {
  const { userId } = auth();
  const body = await request.json();
  const { event, signature, timestamp, data } = body;
  const secret = process.env.WOMPI_WEBHOOK_KEY; // Asegúrate de definir tu secreto en variables de entorno
  const xataClient = getXataClient();

  try {
    // Paso 1: Concatena los valores de los datos del evento
    const concatenatedProperties = signature.properties.join('');

    // Paso 2: Concatena el campo timestamp
    const concatenatedString = concatenatedProperties + timestamp;

    // Paso 3: Concatena tu secreto
    const stringToHash = concatenatedString + secret;

    // Paso 4: Usa SHA256 para generar el checksum
    const calculatedChecksum = crypto
      .createHash("sha256")
      .update(stringToHash)
      .digest('hex');


    // Paso 5: Compara tu checksum calculado con el proveído en el evento
    if (calculatedChecksum === signature.checksum && signature.properties[1] === 'APPROVED') {
      const parts = data.transaction.reference.split('-');
      const userId = parts[0];
      const petId = parts[1];
      const xataClient = getXataClient();    
    
        const parsedData = {
          models: petId,
        };
        const newRecord = { ...parsedData, userId };
    
        await xataClient.db.firus.create(newRecord);
      
    }
    
  } catch (error) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  return new NextResponse(null, { status: 200 });
}
