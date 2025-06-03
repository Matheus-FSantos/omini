import { Timestamp } from "firebase/firestore";
import { getSubscriptions } from "../get-subscriptions";

export default async function isValidSubscription(email: string) {
	const subscriptions = await getSubscriptions();

	for(const data of subscriptions) {
		if(data.client_email === email) {
			const expires_in = (data.expires_in as Timestamp).toDate();

			if(expires_in > new Date())
				return true;
			else 
				return false
		}
	}

	return false;
}
