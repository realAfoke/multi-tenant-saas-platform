import { useQuery } from "@tanstack/react-query"
import { useAppState } from "@/hooks/apptools"
import { Plus } from "lucide-react"

export default function DirectMessage() {
	const { setView, setSelectedDm, selectedDm, setselectedChannel } = useAppState()
	const { data: directMessages } = useQuery({
		queryKey: ['directmessage'],
		queryFn: async () => { }
	})

	const openDM = (dm) => {
		setView('dm')
		setSelectedDm(dm)
		setselectedChannel(null)
	}
	return (
		<div>
			<div className="flex items-center justify-between p-2 mb-2">

				<p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
					Direct Messages
				</p>

				<button className="text-zinc-600 hover:text-white">
					<Plus className="w-4 h-4" />
				</button>

			</div>

			<div className="space-y-1">

				{directMessages?.map((person) => (

					<button
						key={person.id}
						onClick={() => openDM(person)}
						className={`
										w-full
										flex
										items-center
										gap-3
										px-3
										py-2.5
										rounded-lg
										text-sm
										transition
										${view === "dm" &&
								selectedDm?.id === person.id
								? "bg-zinc-800 text-white"
								: "text-zinc-500 hover:text-white hover:bg-zinc-800/50"
							}
									`}
					>

						{/* Avatar */}

						<div className="relative flex-shrink-0">

							<div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-xs font-semibold text-white">
								{person.initial}
							</div>

							{person.online && (
								<span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-zinc-900" />
							)}

						</div>


						{/* Person */}

						<div className="flex-1 min-w-0 text-left">

							<div className="flex items-center justify-between gap-2">

								<p className="truncate text-sm text-zinc-300">
									{person.name}
								</p>

								{person.unread > 0 && (
									<span className="text-xs bg-blue-500 text-white min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
										{person.unread}
									</span>
								)}

							</div>

							<p className="text-xs text-zinc-600 truncate mt-0.5">
								{person.lastMessage}
							</p>

						</div>

					</button>

				))}

			</div>


		</div>
	)
}
