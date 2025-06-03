import { Timestamp } from "firebase/firestore"

export interface Subscription {
	id: string,
	client_email: string
	created_at: Timestamp
	expires_in: Timestamp
}
