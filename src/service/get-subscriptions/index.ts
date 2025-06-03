import { Subscription } from "@/interfaces/subscription";
import { SUBSCRIPTIONS_COLLECTION } from "@/utils/firebase.browser";
import { DocumentData, getDocs } from "firebase/firestore";

export async function getSubscriptions(): Promise<Subscription[]> {
	const firebaseSubscriptions = getDocs(SUBSCRIPTIONS_COLLECTION);
	const localSubscription = (await firebaseSubscriptions).docs.map((doc: DocumentData) => {
		return {...doc.data(), id: doc.id };
	});

	return localSubscription as Subscription[];
}
