import { NextResponse } from "next/server";
import { Stripe } from "stripe";
import { auth, currentUser } from "@clerk/nextjs";
import { getXataClient } from "@/src/xata";

export async function POST(request) {
  try {
    const { userId } = auth();
    const user = await currentUser();
    const xataClient = getXataClient();

    const { priceId, petId } = await request.json();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const userSubscription = await xataClient.db.firus
      .filter({ userId: userId, models: petId })
      .getMany();

    if (userSubscription.length > 0 && userSubscription[0].customerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription[0].customerId,
        return_url: "http://localhost:3000/api/pets",
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: "http://localhost:3000/api/pets",
      cancel_url: "http://localhost:3000/api/pets",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      metadata: {
        userId: userId,
        petId: petId,
      },
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
