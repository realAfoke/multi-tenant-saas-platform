
export function dateFormatter(lastDate) {
	const updatedAt = new Date(lastDate)
	const now = new Date()
	const diff = now - updatedAt
	let lastUpdated
	const hour = diff / (1000 * 60 * 60)
	const day = Math.floor(hour / 24)
	if (hour < 24) {
		lastUpdated = hour.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' })
	} else if (hour < 48) {
		lastUpdated = 'yesterday'
	} else {
		lastUpdated = `${day}  days ago`
	}
	return lastUpdated

}
