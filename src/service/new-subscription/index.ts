import { SUBSCRIPTIONS_COLLECTION } from "@/utils/firebase.browser";
import { addDoc } from "firebase/firestore";

export async function newSubscription(email: string) {
	const currentDate = new Date();
	const expiresIn = new Date(currentDate);
	expiresIn.setMonth(expiresIn.getMonth() + 1); //1 mounth later

	const newSubscription = {
		client_email: email,
		created_at: currentDate,
		expires_in: expiresIn
	}

	try {
		const docRef = await addDoc(SUBSCRIPTIONS_COLLECTION, newSubscription);
		console.log(`Congratulations, a new entry has been registered with id ${ docRef.id }! 🎉🚀`);
	} catch (error) {
		console.log(error);
	}
}
