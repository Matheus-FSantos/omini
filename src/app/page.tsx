import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Check, KeyRound } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { SubscriptionButton } from "./components/payment/button/SubscriptionButton";
import isValidSubscription from "@/service/is-valid-subscription";
import { shipporiMincho } from "@/utils/fonts";

export default async function Home() {
	const user = await currentUser();

  return (
    <div className="px-6">
      <div className="py-4 flex flex-row justify-between">
				<span className={`font-bold cursor-default ${ shipporiMincho.className }`}>Omini</span>
				<div className="flex flex-row items-center gap-4">
					{
						user &&
							user?.emailAddresses[0].emailAddress !== process.env.ADMIN_SECRET_EMAIL && (
								await isValidSubscription(user?.emailAddresses[0].emailAddress) ? (
									<Button size="sm" disabled variant="secondary" className="">Subscription <Check /></Button>
								) : (
									<SubscriptionButton />
								)
							)
					}
					<SignedOut>
						<SignInButton>
							<Button variant="secondary" size="sm" className="cursor-pointer">Enter w. your account <KeyRound strokeWidth={ 3 } /></Button>
						</SignInButton>
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>
      </div>
    </div>
  );
}
