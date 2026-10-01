

//remembe to look up oop in mdn later to turn this service to class base service


export function handleChannelUpdate(queryClient, incomingUpdate) {
	// console.log('incoming chnnel')
	queryClient.setQueryData(
		['workspace'],
		(old) => {
			console.log('incoming channel:', incomingUpdate)
			const workspaces = (old?.workspaces) ?? {}
			const workspace = workspaces?.[incomingUpdate?.workspace] ?? {}
			const channels = workspace?.channels ?? {}
			const channelOrdering = workspace?.channelOrdering ?? []
			const update = {
				...old,
				workspaces: {
					...workspaces,
					[incomingUpdate?.workspace]: {
						...workspace,
						channels: {
							...channels,
							[incomingUpdate?.id]: incomingUpdate
						},
						channelOrdering: [...new Set([incomingUpdate?.id, ...(channelOrdering)])]
					}
				},
			}
			return update
			// console.log('old:', old)
			// console.log('update:', update)
		}
	)
}
