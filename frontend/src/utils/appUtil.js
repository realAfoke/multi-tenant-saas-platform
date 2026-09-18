export function dateFormatter(lastDate) {

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

let db = null
let queue = []
let isOpening = false

export async function getIndexedDb() {

	return new Promise((resolve, reject) => {
		if (db) {
			resolve(db)
		}
		queue.push({ resolve, reject })
		if (isOpening) return
		isOpening = true

		const request = indexedDB.open('ORBITDB', 1)
		request.onupgradeneeded = (event) => {
			const database = event.target.result
			if (!database.objectStoreNames.contains('channels')) {
				const store = database.createObjectStore('channels', { keyPath: 'clientId' })
				store.createIndex('conversation_timestamp', ['conversation', 'timestamp'], { unique: false })
			}
			if (!database.objectStoreNames.contains('chats')) {
				const store = database.createObjectStore('chats', { keyPath: 'clientId' })
				store.createIndex('conversation_timestamp', ['conversation', 'timestamp'], { unique: false })
			}
		}

		request.onsuccess = (event) => {
			db = event.target.result
			queue.forEach((req) => req.resolve(db))
			queue = []
			isOpening = false
		}
		request.onerror = (event) => {
			console.error('INDEXED REQUEST EERROR:', event.target.error)
			queue.forEach(prom => prom.reject(event.target.error))
			queue = []
		}
		return db
	})
}

export async function saveMessageOffline(message, chatType) {
	const database = await getIndexedDb()
	const tx = database.transaction(['channels', 'chats'], 'readwrite')
	const store = chatType === 'channels' ? tx.objectStore('channels') : tx.objectStore('chats')
	store.put(message)

}

export async function getMessages(chatType, conversation, markMessages = []) {
	const database = await getIndexedDb()
	const tx = database.transaction(['channels', 'chats'], 'readwrite')
	let store = chatType === 'channel' ? tx.objectStore('channels') : tx.objectStore('chats')

	return new Promise((resolve, reject) => {
		if (markMessages.length >= 1) {
			markMessages.forEach((message) => {
				store.put(message)
			})
		}
		const messages = []
		const index = store.index('conversation_timestamp')
		const range = IDBKeyRange.bound(
			[conversation, ''],
			[conversation, '\uffff'])
		const request = index.openCursor(range)
		request.onsuccess = (event) => {
			const cursor = event.target.result
			if (cursor) {
				messages.push(cursor.value)
				cursor.continue()
			} else {
				console.log('ALL MESSAGE READ!!!')
				resolve(messages)
			}
		}
		request.onerror = () => reject(request.result)
	})
}




