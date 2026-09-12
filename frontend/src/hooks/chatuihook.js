import { useEffect } from "react";
import { convertObjKeys, saveMessageOffline } from "@/utils/appUtil";

export function useMessageHook({
	socket,
	queryClient,
	selectedDm,
	selectedChannel,
	setMessage,
	messages,
	ref,
	chatType,
}) {

	const conversationId = selectedChannel?.conversation || selectedDm?.conversation

	useEffect(() => {
		if (!socket || !conversationId) return
	})
	useEffect(() => {
		if (!socket || !conversationId) return
		const ws = socket
		ws.onmessage = async (e) => {
			const rawData = JSON.parse(e.data)
			const camelCaseData = convertObjKeys(rawData)
			await saveMessageOffline(camelCaseData, chatType)
			queryClient.setQueryData(['messages', conversationId], (old) => {
				//remember to create a message id store mapping for easy insert
				const messgId = new Map(old?.map(obj => [obj.id || obj.clientId, obj]))
				const incomingMessgKey = camelCaseData?.clientId ?? camelCaseData?.id
				messgId.set(incomingMessgKey, camelCaseData)
				return Array.from(messgId.values())
			}
			)

			if (ws && ws.readyState === WebSocket.OPEN) {
				ws.send(JSON.stringify({ status: 'seen', conversation: conversationId }))
			}
		}
	}, [conversationId, socket, queryClient])

	useEffect(() => {
		if (!selectedChannel?.id && !selectedDm?.id) return
		const messageTemplate = { conversation: conversationId, clientId: crypto.randomUUID(), status: 'pending' }
		if (selectedDm?.id) {
			messageTemplate.receiver = selectedDm?.id
		}
		setMessage(messageTemplate)
	}, [selectedChannel, selectedDm, conversationId, setMessage])

	useEffect(() => {
		if (ref.current) {
			ref.current?.scrollIntoView();
		}
	}, [messages]);

}

