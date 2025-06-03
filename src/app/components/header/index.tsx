"use client"

import { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";

const Header = (): React.ReactElement => {
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const { user } = useUser();

	useEffect(() => {
		
		console.log(user?.emailAddresses);
	}, []);

  return (
    <div className="py-4">
			<SignedOut>
				<SignInButton>
					<Button variant="secondary" size="sm" className="cursor-pointer">Enter w. your account <KeyRound strokeWidth={ 3 } /></Button>
				</SignInButton>
			</SignedOut>
			<SignedIn>
				<UserButton />
			</SignedIn>
		</div>
  );
}

export { Header };
