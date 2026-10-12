import { useQuery } from "@tanstack/react-query"
import { useAppState } from "@/hooks/apptools"
import { Plus } from "lucide-react"
import { conversationsQueryOption } from "@/queryOptions/queryOptions"
import { useNavigate } from "react-router-dom"
import InviteToDirectChat from "../DirectChatInvite"

export default function DirectMessage({ showAddPeople, setShowAddPeople }) {
	const navigate = useNavigate()
	const { view, setView, setSelectedDm, selectedDm, setChannel } = useAppState()
	const openDM = (dm) => {
		setView('dm')
		setSelectedDm(dm)
		setChannel({})
		console.log(dm)
		navigate(`/chat/${dm?.id}`)
	}
	const { data: directMessages } = useQuery(conversationsQueryOption())
	return (
		<div>
			<div className="flex items-center justify-between px-3 pt-5 pb-2">

				<p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
					Direct Messages
				</p>

				<button onClick={() => setShowAddPeople(true)}
					className="flex items-center justify-center w-6 h-6 rounded-md text-zinc-500 hover:text-white hover:bg-zinc-800 transition"
				>
					<Plus className="w-4 h-4" />
				</button>

			</div>

			<div className="space-y-1">

				{directMessages?.map((conversation) => {
					const person = conversation?.receiver ?? {}
					const initial = person?.firstName?.[0]?.toUpperCase()
					return (

						<button
							key={conversation.id}
							onClick={() => openDM(conversation)}
							className={`group w-full flex items-center gap-2.5 px-3 py-2 rounded-md transition ${view === "dm" && selectedDm?.id === person.id ? "bg-zinc-800" : "hover:bg-zinc-800/60"}
	`}
						>
							<div className="relative shrink-0">

								<div className="
			w-8
			h-8
			rounded-full
			bg-zinc-700
			flex
			items-center
			justify-center
			text-xs
			font-semibold
			text-zinc-200
		">
									{initial}
								</div>

								{person?.online && (
									<span className="
				absolute
				bottom-0
				right-0
				w-2
				h-2
				rounded-full
				bg-green-500
				border-2
				border-zinc-900
			"/>
								)}

							</div>

							<div className="flex-1 min-w-0 text-left">

								<div className="flex items-center justify-between gap-2">

									<p className={`
				truncate
				text-sm
				${view === "dm" && selectedDm?.id === person.id
											? "text-white"
											: "text-zinc-400 group-hover:text-zinc-200"
										}
			`}>
										{person?.firstName}
									</p>

									{conversation?.unread > 0 && (
										<span className="
					text-[10px]
					bg-blue-500
					text-white
					min-w-5
					h-5
					px-1
					rounded-full
					flex
					items-center
					justify-center
				">
											{conversation?.unread}
										</span>
									)}

								</div>

								<p className="text-[11px] text-zinc-600 group-hover:text-zinc-500 truncate mt-0.5">
									{person?.lastMessage}
								</p>

							</div>

						</button>

					)
				})}

			</div>
			{showAddPeople && <InviteToDirectChat onOpenChange={setShowAddPeople} />}
		</div>
	)
}

// <button
// 	key={conversation.id}
// 	onClick={() => openDM(conversation)}
// 	className={`
// 				w-full
// 				flex
// 				items-center
// 				gap-3
// 				px-3
// 				py-2.5
// 				rounded-lg
// 				text-sm
// 				transition
// 				${view === "dm" &&
// 			selectedDm?.id === person.id
// 			? "bg-zinc-800 text-white"
// 			: "text-zinc-500 hover:text-white hover:bg-zinc-800/50"
// 		}
// 			`}
// >
//
// 	{/* Avatar */}
//
// 	<div className="relative flex-shrink-0">
//
// 		<div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-xs font-semibold text-white">
// 			{initial}
// 		</div>
//
// 		{person?.online && (
// 			<span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-zinc-900" />
// 		)}
//
// 	</div>
//
//
// 	{/* Person */}
//
// 	<div className="flex-1 min-w-0 text-left">
//
// 		<div className="flex items-center justify-between gap-2">
//
// 			<p className="truncate text-sm text-zinc-300">
// 				{person?.firstName}
// 			</p>
//
// 			{conversation?.unread > 0 && (
// 				<span className="text-xs bg-blue-500 text-white min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
// 					{conversation?.unread}
// 				</span>
// 			)}
//
// 		</div>
//
// 		<p className="text-xs text-zinc-600 truncate mt-0.5">
// 			{person?.lastMessage}
// 		</p>
//
// 	</div>
//
// </button>

