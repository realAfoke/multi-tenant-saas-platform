

export function handleConversationUpdate(queryClient, incomingUpdate, setWorkspace, setSelectedDm, user) {
	console.log('incomig:', incomingUpdate)
	if (incomingUpdate?.chatType === 'channel') {
		queryClient.setQueryData(['workspace'], (old) => {
			const ordering = old?.ordering ?? []
			const workspaces = old?.workspaces ?? {}
			const wkId = incomingUpdate?.workspace
			const mainWk = workspaces?.[wkId] ?? {}
			const channelOrdering = mainWk.channelOrdering ?? []
			const channels = mainWk?.channels ?? {}
			const pinnedChannels = mainWk?.pinnedChannels ?? []
			const channelId = incomingUpdate?.channel
			// console.log('id:', channelId)
			const mainChannel = channels?.[channelId] ?? {}

			const newConv = {
				...old,
				workspaces: {
					...workspaces,
					[wkId]: {
						...mainWk,
						channels: !incomingUpdate.isPinned ? {
							...channels,
							[channelId]: {
								...mainChannel,
								conversation: {
									...(mainChannel?.conversation ?? {}),
									...incomingUpdate
								}
							}
						} : channels,
						channelOrdering: !incomingUpdate.isPinned ? [... new Set([channelId, ...channelOrdering])] : channelOrdering,
						pinnedChannels: pinnedChannels?.map((obj) => obj.id === incomingUpdate?.channel ? {
							...obj,
							conversation: {
								...obj.conversation,
								...incomingUpdate
							}
						} : obj)
					},
				},
				ordering: [...new Set([wkId, ...ordering])]
			}
			setWorkspace(newConv?.workspaces?.wkId)
			// console.log('new:', newConv)
			return newConv
		})
	} else {
		queryClient.setQueryData(['user', 'conversations'], (old) => {
			if (incomingUpdate?.receiver?.id === user?.id) return
			const convoIds = new Map(old.map(convo => [convo.id, convo]))
			convoIds.set(incomingUpdate?.id, incomingUpdate)
			return Array.from(convoIds.values())
		})
		setSelectedDm(incomingUpdate)
	}


}
