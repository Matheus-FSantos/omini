import { newSubscription } from "@/service/new-subscription";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { email } = await req.json();

	try {
		await newSubscription(email);
		return NextResponse.json(null);
	} catch (error) {
		console.log("POST NEXT REQUEST");
		console.log(error);
		return NextResponse.error();
	}
}
