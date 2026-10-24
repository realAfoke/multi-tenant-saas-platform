// import { handleChannelUpdate } from "./channel"

export default function handleChannelMembers(queryClient, incoming) {
	// handleChannelUpdate(queryClient, incoming)
	return queryClient.setQueryData(['channel', incoming?.channel], (old) => [incoming, ...(old ?? [])])
}
