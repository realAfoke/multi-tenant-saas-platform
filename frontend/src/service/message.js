import { saveMessageOffline } from "@/utils/appUtil"


export async function handleMessageUpdate(queryClient, incomingUpdate, ws) {
	const chatType = incomingUpdate?.workspace ? 'channel' : 'chat'
	await saveMessageOffline(incomingUpdate, chatType)
	queryClient.setQueryData(['messages', incomingUpdate?.conversation], (old) => {
		// 	//remember to create a message id store mapping for easy insert
		const messgId = new Map(old?.map(obj => [obj.id || obj.clientId, obj]))
		messgId.set(incomingUpdate?.clientId, incomingUpdate)
		return Array.from(messgId.values())
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
