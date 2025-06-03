import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const BASE_URL = req.headers.get("origin");
	const { testId } = await req.json();
	const price = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;

	try {
		const session = await stripe.checkout.sessions.create({
			line_items: [
				{
					price: price,
					quantity: 1
				},
			],
			mode: "subscription",
			payment_method_types: ["card"],
			success_url: `${ BASE_URL }/payment-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${ BASE_URL }/`,
			metadata: {
				testId
			}
		});

		return NextResponse.json({ sessionId: session.id });
	} catch (error) {
		console.error(error);
		return NextResponse.error();
	}
}
