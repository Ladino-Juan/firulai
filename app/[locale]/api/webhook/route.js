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

    // Paso 5: Compara tu checksum calculado con el proveído en el evento
    if (data.transaction.status === 'APPROVED') {
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
