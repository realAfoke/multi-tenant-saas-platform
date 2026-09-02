import { Search, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useAppState } from "@/hooks/apptools"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { instance } from "@/api/axios"
import { snakeToCamelCase } from "@/utils/appUtil"
import { convertObjKeys } from "@/utils/appUtil"
import { useOutletContext } from "react-router-dom"


export default function Discussion() {
	const [day, setDay] = useState('')
	const [message, setMessage] = useState('')
	const { socket, selectedProject, selectedWorkspace } = useAppState()
	const { hideProjectDetail } = useOutletContext()
	const queryClient = useQueryClient()
	const { data: disscussionMessages } = useQuery({
		queryKey: ['discussion', selectedWorkspace?.id, selectedProject?.id],
		queryFn: async () => {
			try {
				const response = await instance.get(`chat/discussion/${selectedProject?.id}/`)
				return response.data
			} catch (error) {
				console.error(error)
				throw Error(error)
			}
		},
		enabled: !!selectedProject?.id
	})

	useEffect(() => {
		if (!socket) return
		socket.onmessage = (e) => {
			let data = JSON.parse(e.data)
			const converted = convertObjKeys(data)
			if (data?.project === selectedProject?.id && data?.workspace === selectedWorkspace?.id) {
				queryClient.setQueryData(['discussion', selectedWorkspace?.id, selectedProject?.id], old => [...(old ?? []), converted])
			}
		}
	}, [socket, queryClient])

	return (
		<div className={`h-screen flex flex-col text-white mb-[5rem]`}>

			<div className="flex-1 flex flex-col min-h-0 max-w-5xl">

				<div className={`flex items-center justify-center gap-3 h-11 my-6`}>
					<div className="p-2 py-3 rounded-xl flex-1 gap-2 bg-zinc-900 flex items-center">
						<Search className="w-4 h-4 text-zinc-500" />

						<input
							placeholder="Search conversation..."
							className="flex-1 bg-transparent outline-none text-white placeholder:text-zinc-500"
						/>
					</div>

				</div>

				<div className="flex-1  space-y-6 pr-2 pb-[7rem]">
					{disscussionMessages?.map((message) => {
						const sender = message?.user?.member?.user ?? {}
						const initials = `${sender?.firstName[0]?.toUpperCase()}`
						const timeStamp = new Date(message?.timestamp)
						const time = timeStamp?.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' })
						return (
							<div key={message?.id} className="flex gap-2">

								<div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-sm font-semibold shrink-0">
									{initials}
								</div>

								<div>

									<div className="flex items-center gap-2">
										<p className="text-sm font-medium">
											{sender?.first}
										</p>

										<span className="text-xs text-zinc-600">
											{time}
										</span>
									</div>

									<p className="text-zinc-400 leading-relaxed text-sm">
										{message?.content}
									</p>

								</div>

							</div>

						)
					})}
				</div>

				<div className="pt-5 fixed bottom-3 flex justify-center w-full left-0 lg:-left-[10rem]">

					<div className="flex flex-1 max-w-[calc(100%-5%)] md:max-w-[calc(100%-30%)] lg:max-w-[calc(100%-40%)] items-end gap-3 rounded-xl bg-zinc-900 border border-zinc-800 p-3">

						<textarea
							rows={2}
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault()
									if (socket && socket.readyState === WebSocket.OPEN) {
										socket.send(JSON.stringify({ project: selectedProject?.id, content: message }))
										setMessage('')
									}

								}
							}}
							placeholder="Write a message..."
							className="flex-1 resize-none bg-transparent outline-none text-white placeholder:text-zinc-500 px-2"
						/>

						<Button className="w-11 h-11 rounded-xl bg-blue-500 hover:bg-blue-600 shrink-0"
							onClick={() => {
								if (socket && socket.readyState === WebSocket.OPEN) {
									socket.send(JSON.stringify({ project: selectedProject?.id, content: message }))
									setMessage('')
								}

							}}>
							<Send className="w-4 h-4" />
						</Button>

					</div>

				</div>

			</div>

		</div>
	)
}

