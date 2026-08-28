import { useEffect } from "react"

export function useChannel(
	socket,
	queryClient,
	workspaces,
	selectedWorkspace,
	channelName,
	setChannel,
	pathNames,
	setSelected,
	sent,
	setSent
) {
	useEffect(() => {
		if (!socket) return
		const ws = socket
		ws.onmessage = (e) => {
			const data = JSON.parse(e.data)
			const cameCaseObj = convertObjKeys(data)
			queryClient.setQueryData(['activity', 'channel-activity', data?.project], old => [cameCaseObj, ...(old ?? [])])
		}
	}, [socket])

	useEffect(() => {

		if (!selectedWorkspace || !channelName) return
		const workspace = workspaces?.[selectedWorkspace?.id]
		const { channels } = workspace ?? {}
		const channel = Object.values(channels ?? {})?.find((obj) => obj?.name == channelName)
		if (channel) {
			setChannel({ id: channel?.id, name: channel?.name, show: true })
		}

	}, [workspaces, selectedWorkspace, channelName])

	useEffect(() => {
		if (pathNames.length == 3) {
			setSelected('overview')
		} else {
			setSelected(pathNames[pathNames.length - 1])
		}
	}, [pathNames])
	useEffect(() => {
		const timer = setTimeout(() => {
			setSent(false)
		}, [5000])
		return () => clearTimeout(timer)
	}, [sent])


}
