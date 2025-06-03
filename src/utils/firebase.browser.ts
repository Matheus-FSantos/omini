import { FirebaseStorage, getStorage } from "firebase/storage";
import { getFirestore, collection, Firestore } from "firebase/firestore";
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";

const CLIENT_CREDENTIALS: FirebaseOptions = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
}

const app: FirebaseApp = initializeApp(CLIENT_CREDENTIALS);
const DATABASE: Firestore = getFirestore(app);
const STORAGE: FirebaseStorage = getStorage(app);

/* instantiate all collections below */
const SUBSCRIPTIONS_COLLECTION = collection(DATABASE, "subscriptions"); 

export { app, DATABASE, STORAGE, SUBSCRIPTIONS_COLLECTION };
