import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getXataClient } from "@/src/xata";

export async function POST(request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature");
  let event;

  try {
    event = Stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object;
  const userId = session?.metadata?.userId;
  const petId = session?.metadata?.petId;
  const xataClient = getXataClient();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });
  
  if (event.type === "checkout.session.completed") {
    if (!userId || !petId) {
      return new NextResponse("Webhook Error: Missing metadata", {
        status: 400,
      });
    }
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    );
    const parsedData = {
      models: petId,
      subscriptionId: subscription.id,
      customerId: subscription.customer,
      priceId: subscription.items.data[0].price.id,
      currentPeriodEnd: new Date((subscription.current_period_end * 1000)),
    };
    const newRecord = { ...parsedData, userId };

    await xataClient.db.firus.create(newRecord);
  }
  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    );
    await xataClient.db.firus.update(userId, {
      priceId: subscription.items.data[0].price.id,
      currentPeriodEnd: new Date((subscription.current_period_end * 1000)),
    });
  } else {
    return new NextResponse(
      `Webhook Error: Unhandled event Type ${event.type}`,
      { status: 200 }
    );
  }
  return new NextResponse(null, { status: 200 });
}
