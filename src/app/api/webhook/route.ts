import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
	try {
		const body = await req.text();
		const signature = (await headers()).get("stripe-signature"); 
		
		if(!WEBHOOK_SECRET || !signature)
			throw new Error("Missing webhook secret or stripe signature");

		const event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
		switch(event.type) {
			case "checkout.session.completed":
				if(event.data.object.payment_status === "paid") {
					//payment completed
					const testId = event.data.object.metadata?.testeId;
					console.log("Card payment completed successfully ✅🚀", testId);
				}
				break;
			
			case "checkout.session.expired":
				if(event.data.object.payment_status === "unpaid") {
					//customer leaves the checkout page and does not complete the payment
					const testId = event.data.object.metadata?.testeId;
					console.log("Expired payment ❌❌❌", testId)
				}
				break;
			
			case "customer.subscription.deleted":
				//customer cancel their subscription
				break;
		}

		return NextResponse.json({
			result: event,
			ok: true
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			message: `Webhook error: ${ error }`,
			ok: false
		}, { status: 500 });
	}
}
