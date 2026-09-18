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
	recipient,
	setSelectedDm,
}) {
	const conversationId = selectedChannel?.conversation?.id || selectedDm?.id
	useEffect(() => {
		if (!socket) return
		const ws = socket
		if (ws && ws.readyState === WebSocket.OPEN) {
			const SEEN = { conversation: conversationId, status: 'seen' }
			if (chatType === 'chat') {
				SEEN.receiver = recipient?.id
			}
			ws.send(JSON.stringify(SEEN))
		}
	}, [messages])

	useEffect(() => {
		if (!selectedChannel?.id && !selectedDm?.id) return
		const messageTemplate = { conversation: conversationId, clientId: crypto.randomUUID(), status: 'pending' }
		if (selectedDm?.id) {
			messageTemplate.receiver = recipient?.id
		}
		setMessage(messageTemplate)
	}, [selectedChannel, selectedDm, conversationId, setMessage])

	useEffect(() => {
		if (ref.current) {
			ref.current?.scrollIntoView();
		}
	}, [messages]);

}

