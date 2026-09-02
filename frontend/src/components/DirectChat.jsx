import { useParams } from "react-router-dom";
import ChatUi from "./ChatUi";
import { useQuery } from "@tanstack/react-query";


export default function DirectChat() {
	// const { userId } = useParams()
	// const { data: receiver } = useQuery({
	// 	queryKey: ['receiver', userId],
	// 	queryFn: async () => {
	// 		try {
	// 			const response = await instance.get(`users/user/${userId}/`)
	// 			return response.data
	// 		} catch (err) {
	// 			console.error(err)
	// 			throw Error(err)
	// 		}
	// 	}
	// })
	return (
		<ChatUi/>
	)
}
