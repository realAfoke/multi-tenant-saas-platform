

//remembe to look up oop in mdn later to turn this service to class base service


export function handleChannelUpdate(queryClient, incomingUpdate) {
	queryClient.setQueryData(
		['workspace'],
		(old) => {
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
			// console.log('old:', old)
			// console.log('update:', update)
			return update
		}
	)
}
