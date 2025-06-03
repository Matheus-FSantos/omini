const isValidSubscription = (): boolean => {
	if(typeof window !== "undefined")
		return new String(localStorage.getItem("sessionId")).length > 0;
	
	return false;
}

export { isValidSubscription };
