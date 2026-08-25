export function dateFormatter(lastDate) {
	if (!lastDate) return "";

	const updatedAt = new Date(lastDate);
	const now = new Date();

	const diff = now - updatedAt;

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(diff / (1000 * 60));
	const hours = Math.floor(diff / (1000 * 60 * 60));
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	if (seconds < 5) {
		return "Just now";
	}
	if (seconds < 60) {
		return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
	}

	if (minutes < 60) {
		return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
	}

	if (hours < 24) {
		return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
	}

	if (days === 1) {
		return "Yesterday";
	}

	return `${days} day${days !== 1 ? "s" : ""} ago`;
}


export function snakeToCamelCase(prop) {
	if (!prop) return
	return prop.replace(/_([a-z])/g, (_, letter) => (letter.toUpperCase()))
}

export function convertObjKeys(obj) {
	if (!obj && typeof obj !== 'object') return
	return Object.fromEntries(Object.entries(obj).map(([key, value]) => [snakeToCamelCase(key), value && typeof value === 'object' ? convertObjKeys(value) : value]))
}
