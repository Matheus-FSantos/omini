import { getSubscriptions } from "@/service/get-subscriptions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const subscriptions = await getSubscriptions();
		return NextResponse.json(subscriptions);
	} catch (error) {
		console.error(error);
		return NextResponse.error();
	}
}
