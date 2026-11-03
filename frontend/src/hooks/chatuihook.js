import { useEffect } from "react";

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
	setChannel,
}) {
	const conversation = selectedChannel?.conversation || selectedDm
	const conversationId = conversation?.conversation || conversation?.id
	useEffect(() => {
		if (!socket) return
		const unread = conversation?.unread
		const ws = socket
		if (ws && ws.readyState === WebSocket.OPEN && unread >= 1) {
			const SEEN = { conversation: conversationId, status: 'seen', chat_type: selectedChannel?.id ? 'channel' : 'direct' }
			if (chatType === 'chat') {
				SEEN.receiver = recipient?.id
			}
			ws.send(JSON.stringify(SEEN))
			if (selectedChannel?.id) {
				setChannel({ ...selectedChannel, conversation: { ...selectedChannel?.conversation, unread: 0 } })
				queryClient.setQueryData(['workspace'], (old) => {
					const workspaces = old?.workspaces ?? {}
					const workspace = workspaces?.[selectedChannel?.workspace] ?? {}
					const channels = workspace?.channels ?? {}
					return {
						...(old ?? {}),
						workspaces: {
							...workspaces,
							[selectedChannel?.workspace]: {
								...workspace,
								channels: {
									...channels,
									[selectedChannel?.id]: {
										...selectedChannel,
										conversation: {
											...(selectedChannel?.conversation ?? {}),
											unread: 0
										}
									}
								}
							}
						}
					}

				})
			}

		}
	}, [messages, chatType, selectedChannel?.id, queryClient, conversation?.unread, recipient?.id, selectedChannel, conversationId, setChannel, socket])

	useEffect(() => {
		if (!selectedChannel?.id && !selectedDm?.id) return
		const messageTemplate = { conversation: conversationId, clientId: crypto.randomUUID(), status: 'pending', chat_type: selectedDm?.id ? 'direct' : 'channel' }
		setMessage(messageTemplate)
	}, [selectedChannel, selectedDm, conversationId, setMessage])

	useEffect(() => {
		if (ref.current) {
			ref.current?.scrollIntoView();
		}
	}, [messages, ref]);

}

