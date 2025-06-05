import { SUBSCRIPTIONS_COLLECTION } from "@/utils/firebase.browser";
import { addDoc, doc, updateDoc } from "firebase/firestore";
import { getSubscriptions } from "../get-subscriptions";
import { NewSubscription, Subscription } from "@/interfaces/subscription";

export async function newSubscription(email: string) {
	const currentDate: Date = new Date();
	const expiresIn: Date = new Date(currentDate);
	expiresIn.setMonth(expiresIn.getMonth() + 1); //1 mounth later
	let oldClientId: string | null = null;
	let docRef;

	let newSubscription = {
		client_email: email,
		created_at: currentDate,
		expires_in: expiresIn
	}

	try {
		const subscriptions: Subscription[] = await getSubscriptions();
		subscriptions.forEach(data => {
			if(data.client_email === email) {
				newSubscription.created_at = data.created_at.toDate();
				oldClientId = data.id;
			}
		});

		if(oldClientId){
			const oldSubscription = doc(SUBSCRIPTIONS_COLLECTION, oldClientId);
			await updateDoc(oldSubscription, newSubscription);
			docRef = oldSubscription;
		} else
			docRef = await addDoc(SUBSCRIPTIONS_COLLECTION, newSubscription);

		console.log(`Congratulations, a new entry has been ${ oldClientId ? "updated" : "registered" } with id ${ docRef.id }! 🎉🚀`);
	} catch (error) {
		console.log(error);
	}
}
