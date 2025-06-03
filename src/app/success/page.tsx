"use client"
import { useUser } from "@clerk/nextjs";
import { CircleCheckBig, Hourglass } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function PaymentSuccess() {
	const router = useRouter();
	const hasPosted = useRef(false);
	const { isLoaded, user } = useUser();
	const userEmail = user?.emailAddresses[0].emailAddress;

	useEffect(() => {
		if (isLoaded && !user)
      router.replace("/");
	}, []);

	useEffect(() => {
		if(userEmail && !hasPosted.current) {
			hasPosted.current = true;
			fetch("/api/new-subscription", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email: userEmail }),
			}).then(() => {
				setTimeout(() => {
					router.replace("/");
				}, 4000);
			}).catch(() => {
				hasPosted.current = false;
			});
		}
	}, [userEmail])

	return(
		<div className="h-svh flex flex-col gap-4 justify-center items-center">
			<div className="flex items-center flex-row gap-4">
				<CircleCheckBig strokeWidth={ 2.5 } className="text-green-600" />
				<div className="h-full w-[2px] bg-green-600"/>
				<h1 className="text-xl font-black">Payment success</h1>
			</div>
			<div className="flex flex-row gap-2 items-center">
				<Hourglass className="text-muted-foreground" size={ 12 } />
				<p className="text-muted-foreground text-sm">Await auto redirect...</p>
			</div>
		</div>
	);
}
