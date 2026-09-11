import { useAppState } from "@/hooks/apptools"
import { instance } from "@/api/axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import ChatUi from "./ChatUi"

export default function ChannelChat() {
	const { socket,selectedChannel, selectedWorkspace } = useAppState()
	const queryClient = useQueryClient()

	const { data: messages } = useQuery({
		queryKey: ['discussion', selectedWorkspace?.id, selectedChannel?.id],
		queryFn: async () => {
			try {
				const response = await instance.get(`chat/discussion/${selectedChannel?.id}/`)
				return response.data
			} catch (error) {
				console.error(error)
				throw Error(error)
			}
		},
		enabled: !!selectedChannel?.id
	})

	useEffect(() => {
		if (!socket) return
		socket.onmessage = (e) => {
			let data = JSON.parse(e.data)
			const converted = convertObjKeys(data)
			if (data?.project === selectedChannel?.id && data?.workspace === selectedWorkspace?.id) {
				queryClient.setQueryData(['discussion', selectedWorkspace?.id, selectedChannel?.id], old => [...(old ?? []), converted])
			}
		}
	}, [socket, queryClient])

	return (
		<ChatUi messages={messages} />
	)
}
