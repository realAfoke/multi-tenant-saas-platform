import ChatUi from "./ChatUi";
import { useQuery } from "@tanstack/react-query";
import { useAppState } from "@/hooks/apptools";
import { instance } from "@/api/axios";
import { useEffect } from "react";


export default function DirectChat() {
	const { socket, selectedDm, selectedChannel, setMessage } = useAppState()

	const { data: messages } = useQuery({
		queryKey: ['directMessages', selectedDm?.conversation],
		queryFn: async ({ queryKey }) => {
			try {
				const [, id] = queryKey
				const response = await instance.get(`chat/${id}/messages`)
				return response.data
			} catch (err) {
				console.error(err)
				throw Error(err)
			}
		},
		enabled: !!selectedDm?.conversation
	})

	useEffect(() => {
		if (!(selectedDm?.id && selectedChannel?.id)) return
		const messageTemplate = { conversation: selectedChannel?.conversation || selectedDm?.conversation }
		if (selectedDm?.id) {
			messageTemplate.receiver = selectedDm?.id
		}
		setMessage(messageTemplate)
	})
	return (
		<ChatUi messages={messages} />
	)
}
