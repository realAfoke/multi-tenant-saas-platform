import { useAppState } from "@/hooks/apptools"
import { Hash, Paperclip, Smile, Send } from "lucide-react"
import { Button } from "./ui/button"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useRef, useState } from "react"
import { instance } from "@/api/axios"
import { useMessageHook } from "@/hooks/chatuihook"
import { getMessages, saveMessageOffline } from "@/utils/appUtil"
import UserProfile from "./userProfile"

export default function Chat() {
	const { view, selectedChannel, selectedDm, setChannel, socket } = useAppState()
	const [message, setMessage] = useState({})
	const queryClient = useQueryClient()
	const currentUser = queryClient.getQueryData(["user"])
	const recipient = selectedDm?.receiver ?? selectedDm

	const [selectedUser, setSelectedUser] = useState(null)
	const [position, setPosition] = useState({ top: 0, left: 0 })

	const ref = useRef(null)

	const chatType = selectedChannel?.id ? "channel" : "chat"

	let { data: messages } = useQuery({
		queryKey: ["messages", message?.conversation],
		queryFn: async ({ queryKey }) => {
			try {
				const [, id] = queryKey
				let clientStoredMessages = await getMessages(chatType, message.conversation)
				let response

				if (clientStoredMessages.length < 1) {
					response = await instance.get(`chat/${id}/all-message/`)
				} else {
					response = await instance.get(`chat/${id}/messages`)
				}

				clientStoredMessages = await getMessages(chatType, message.conversation, response.data)
				response.data = [...(clientStoredMessages ?? [])]
				return response.data
			} catch (err) {
				console.error(err)
				throw new Error(err.message, { cause: err })
			}
		},
		enabled: !!message?.conversation,
	})

	useMessageHook({
		setMessage,
		socket,
		queryClient,
		selectedChannel,
		selectedDm,
		messages,
		ref,
		chatType,
		recipient,
		setChannel,
	})

	return (
		<div className="flex-1 h-screen md:px-6 flex flex-col pt-[4rem] px-auto relative shrink-0">

			{/* Floating User Profile */}
			{selectedUser && (
				<div
					style={{
						position: "fixed",
						top: position.top,
						left: position.left,
						zIndex: 50,
					}}
				>
					<UserProfile
						user={selectedUser}
						onClose={() => setSelectedUser(null)}
					/>
				</div>
			)}

			{/* Messages Area */}
			<div className="px-3 md:px-6 flex-1 overflow-auto pt-[5rem] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-zinc-900">
				<div className="overflow-auto mx-auto max-w-4xl">

					{/* Header */}
					<div className="pb-5 border-b border-zinc-800">
						{view === "dm" && selectedDm ? (
							<>
								<div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-semibold mb-4">
									{recipient?.firstName?.[0]?.toUpperCase()}
								</div>
								<h2 className="text-xl font-bold text-white">
									{recipient?.firstName}
								</h2>
								<p className="text-sm text-zinc-500 mt-2">
									This is the beginning of your conversation with {recipient?.firstName}{" "}
									{recipient?.lastName}.
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

					{/* Messages List */}
					<div className="flex flex-col gap-5 mt-5">
						{messages?.map((message) => {
							const sender = message?.channelId ? message?.sender?.user : currentUser
							const initial = `${sender?.firstName?.[0]?.toUpperCase()}`
							const timeStamp = new Date(message?.timestamp)
							const time = timeStamp?.toLocaleString("en-US", {
								hour: "numeric",
								minute: "numeric",
							})

							return (
								<div
									key={message.id || message?.clientId}
									className={`
										max-w-80 
										md:max-w-100
										rounded-xs px-2
										${view === "dm"
											? message?.sender === currentUser?.id
												? `self-end ${selectedDm?.lastReadMssgId >= message?.id
													? "bg-[#7dd3fc]"
													: selectedDm?.lastDeliveredMssgId >= message?.id
														? "bg-[#3bbdf8]"
														: message?.status === "pending"
															? "bg-[#0759b5]"
															: "bg-[#0ea5e9]"
												}`
												: "self-start bg-zinc-600"
											: "flex gap-3"
										}
									`}
								>
									{/* Avatar (only in channel) */}
									{view === "channel" && (
										<button
											className="flex w-9 h-9 md:w-7 md:h-7 shrink-0 rounded-full bg-blue-500 items-center justify-center text-sm font-semibold text-white"
											onClick={(e) => {
												const rect = e.currentTarget.getBoundingClientRect()
												setPosition({
													top: rect.bottom + 8,
													left: rect.left,
												})
												setSelectedUser(sender)
											}}
										>
											{initial}
										</button>
									)}

									{/* Message Content */}
									<div
										className={`flex flex-col ${view === "dm"
											? message?.sender === currentUser?.id
												? "items-end"
												: "items-start"
											: ""
											} min-w-0`}
									>
										<div className={`flex ${view === "dm" ? "order-2" : ""}`}>
											<span className="text-xs text-gray-400">{time}</span>
										</div>
										<p
											className={`w-full break-all ${view === "dm" ? "order-1" : ""
												} text-sm text-white mt-1 leading-relaxed`}
										>
											{message.content}
										</p>
									</div>
								</div>
							)
						})}
						<div ref={ref} />
					</div>
				</div>
			</div>
			{selectedUser && (
				<UserProfile
					user={selectedUser}
					onClose={() => setSelectedUser(null)}
				/>
			)}
			{/* Message Input */}
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
								onKeyDown={async (e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault()
										const ws = socket
										if (ws && ws.readyState === WebSocket.OPEN) {
											ws.send(JSON.stringify(message))
											const sentMessage = { ...message, sender: currentUser?.id }
											queryClient.setQueryData(
												["messages", sentMessage?.conversation],
												(old) => [...(old ?? []), sentMessage]
											)
											setMessage((prev) => ({
												...prev,
												clientId: crypto.randomUUID(),
												content: "",
											}))
											await saveMessageOffline(sentMessage, chatType)
										}
									}
								}}
								rows={1}
								placeholder={
									view === "dm"
										? `Message ${recipient?.firstName}`
										: `Message #${selectedChannel?.name}`
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

