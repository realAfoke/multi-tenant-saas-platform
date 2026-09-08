import { useAppState } from "@/hooks/apptools"
import { Hash, Paperclip, Smile, Send } from "lucide-react"
import { Button } from "./ui/button"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { instance } from "@/api/axios";
import { useMessageHook } from "@/hooks/chatuihook";


export default function Chat() {
	const { view, selectedChannel, selectedDm, socket } = useAppState()
	// console.log('chat channel:',selectedChannel)
	const [message, setMessage] = useState({})
	const queryClient = useQueryClient()
	const currentUser = queryClient.getQueryData(['user'])

	useMessageHook({
		setMessage,
		socket,
		queryClient,
		selectedChannel,
		selectedDm,
		message
	})

	const { data: messages } = useQuery({
		queryKey: ['messages', message?.conversation],
		queryFn: async ({ queryKey }) => {
			try {
				const [, id] = queryKey
				const response = await instance.get(`chat/${id}/messages`)
				// const response = await instance.get(`chat/${id}/messages`)
				return response.data
			} catch (err) {
				console.error(err)
				throw Error(err)
			}
		},
		enabled: !!message?.conversation
	})




	return (
		<div className="flex-1 h-screen md:px-6 flex flex-col pt-[4rem] px-auto">

			<div className="px-3 md:px-6 flex-1 overflow-auto space-y-7 pt-[5rem] pb-[2rem] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-zinc-900 ">

				<div className="overflow-auto mx-auto max-w-4xl">
					<div className="pb-5 border-b border-zinc-800">

						{view === "dm" && selectedDm ? (

							<>

								<div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-semibold mb-4">
									{selectedDm?.firstName[0]?.toUpperCase()}
								</div>

								<h2 className="text-xl font-bold text-white">
									{selectedDm?.firstName}
								</h2>

								<p className="text-sm text-zinc-500 mt-2">
									This is the beginning of your conversation with {selectedDm?.firstName} {selectedDm?.lastName}.
								</p>

							</>

						) : (

							<>

								<div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center mb-4">

									<Hash className="w-6 h-6 text-zinc-400" />

								</div>

								<h2 className="text-xl font-bold text-white lowercase">
									Welcome to #{selectedChannel?.name}
								</h2>

								<p className="text-sm text-zinc-500 mt-2">
									This is the beginning of the #{selectedChannel?.name} channel.
								</p>

							</>

						)}

					</div>

					<div

						className={`flex flex-col gap-5 my-5`}
					>
						{messages?.map((message) => {
							const sender = message?.project ? message?.sender?.user : currentUser
							const initial = `${sender?.firstName[0]?.toUpperCase()}`
							const timeStamp = new Date(message?.timestamp)
							const time = timeStamp?.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' })
							return (

								<div
									key={message.id || message?.clientId}
									className={`max-w-80  md:max-w-100 rounded-xs px-2 py-1 ${view === 'dm' ? message?.sender === currentUser?.id ? 'self-end bg-blue-600' : 'self-start bg-zinc-600' : 'flex gap-3'}`}
								>

									{view === 'channel' && <div className={` flex w-9 h-9 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-sm font-semibold`}>
										{initial}
									</div>
									}


									<div className={`flex flex-col ${view === 'dm' ? `items-end ${message?.sender === currentUser?.id ? 'items-end' : 'items-start'}` : ''} min-w-0`}>

										<div className={`flex ${view === 'dm' ? 'order-2' : ''}`}>

											<p className="text-sm font-semibold">
											</p>

											<span className="text-xs text-zinc-600">
												{time}
											</span>

										</div>

										<p className={`${view === 'dm' ? 'order-1' : ''} text-sm text-white mt-1 leading-relaxed`}>
											{message.content}
										</p>

									</div>

								</div>

							)
						})}
					</div>

				</div>
			</div>
			<div className="md:px-6 md:pb-5 pt-5">

				<div className="max-w-4xl mx-auto">

					<div className="rounded-xl border border-zinc-800 bg-zinc-900 p-2">

						<div className="flex items-end gap-2">

							<Button
								variant="ghost"
								size="icon"
								className="text-zinc-500 hover:text-white flex-shrink-0"
							>
								<Paperclip className="w-5 h-5" />
							</Button>


							<textarea
								value={message?.content}
								onChange={(e) =>
									setMessage((prev) => ({ ...prev, content: e.target.value }))
								}
								onKeyDown={(e) => {

									if (
										e.key === "Enter" &&
										!e.shiftKey
									) {
										e.preventDefault()
										const ws = socket
										if (ws && ws.readyState === WebSocket.OPEN) {
											ws.send(JSON.stringify(message))
											message.sender = currentUser?.id
											queryClient.setQueryData(['messages', message?.conversation], old => [...(old ?? []), message])
											setMessage((prev) => ({ ...prev, clientId: crypto.randomUUID(), content: '' }))
										}
									}

								}}
								rows={1}
								placeholder={
									view === "dm"
										? `Message ${selectedDm?.firstName}`
										: `Message #${selectedChannel}`
								}
								className="
										flex-1
										bg-transparent
										resize-none
										outline-none
										text-sm
										text-white
										placeholder:text-zinc-600
										py-2
										max-h-32
									"
							/>


							<Button
								variant="ghost"
								size="icon"
								className="text-zinc-500 hover:text-white flex-shrink-0"
							>
								<Smile className="w-5 h-5" />
							</Button>


							<Button
								disabled={!message?.content?.trim()}
								size="icon"
								className="flex-shrink-0 bg-blue-500 hover:bg-blue-600"
							>
								<Send className="w-4 h-4" />
							</Button>

						</div>

					</div>

					<p className="text-[11px] text-zinc-600 px-1">
						Press Enter to send · Shift + Enter for a new line
					</p>

				</div>

			</div>

		</div>

	)
}
