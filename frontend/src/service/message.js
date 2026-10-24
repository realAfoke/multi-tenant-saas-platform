import { saveMessageOffline } from "@/utils/appUtil"

export async function handleMessageUpdate(queryClient, incomingUpdate, ws) {
	const chatType = incomingUpdate?.workspace ? 'channel' : 'chat'
	await saveMessageOffline(incomingUpdate, chatType)
	queryClient.setQueryData(['messages', incomingUpdate?.conversation], (old) => {
		// 	//remember to create a message id store mapping for easy insert
		const exists = old?.findIndex((msg => msg?.clientId === incomingUpdate?.clientId))

		if (exists !== -1) {
			return old.map((msg) => {
				return msg?.clientId === incomingUpdate?.clientId ? { ...msg, ...incomingUpdate } : msg
			})
		}
		return [...old, incomingUpdate]
	}
	)
	if (ws && ws.readyState === WebSocket.OPEN) {
		const data = { messageId: incomingUpdate?.id, status: 'received', conversation: incomingUpdate?.conversation }
		if (!incomingUpdate?.channel) {
			data['receiver'] = incomingUpdate?.sender
		}
		ws.send(JSON.stringify(data))
	}
}
