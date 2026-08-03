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
// export function dateFormatter(lastDate) {
// 	if (!lastDate) return
// 	const updatedAt = new Date(lastDate)
// 	const now = new Date()
// 	const diff = now - updatedAt
// 	let lastUpdated
// 	const hour = diff / (1000 * 60 * 60)
// 	const day = Math.floor(hour / 24)
// 	if (hour < 24) {
// 		lastUpdated = hour.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' })
// 	} else if (hour < 48) {
// 		lastUpdated = 'yesterday'
// 	} else {
// 		lastUpdated = `${day}  days ago`
// 	}
// 	return lastUpdated
//
// }
