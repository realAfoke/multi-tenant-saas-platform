import { useEffect } from "react";
import { convertObjKeys } from "@/utils/appUtil";

export function useMessageHook({
	socket,
	queryClient,
	selectedDm,
	selectedChannel,
	setMessage,
	message,
}) {

	const conversationId = selectedChannel?.conversation || selectedDm?.conversation
	useEffect(() => {
		if (!socket || !conversationId) return
		const ws = socket
		ws.onmessage = (e) => {
			const rawData = JSON.parse(e.data)
			const camelCaseData = convertObjKeys(rawData)
			queryClient.setQueryData(['messages', message?.conversation], (old) => {
				//remember to create a message id store mapping for easy insert
				const messgId = new Map(old?.map(obj => [obj.id || obj.clientId, obj]))
				const incomingMessgKey = camelCaseData?.clientId ?? camelCaseData?.id
				messgId.set(incomingMessgKey, camelCaseData)
				return Array.from(messgId.values())
			}
			)
		}
	}, [conversationId, socket, queryClient])

	useEffect(() => {
		if (!selectedChannel?.id && !selectedDm?.id) return
		const messageTemplate = { conversation: conversationId, clientId: crypto.randomUUID() }
		if (selectedDm?.id) {
			messageTemplate.receiver = selectedDm?.id
		}
		setMessage(messageTemplate)
	}, [selectedChannel, selectedDm, conversationId, setMessage])

}

