import { ItemGroup, Item, ItemContent, ItemTitle } from "@/components/ui/item"
import { useAppState } from "@/hooks/apptools"
import { Hash } from "lucide-react"

export default function Project(props) {
	const { setView, setMessage, selectedWorkspace, selectedChannel, setChannel, setSelectedDm, view } = useAppState()
	const { channels, channelOrdering } = props
	const openChannel = (channel) => {
		setChannel({ id: channel.id, name: channel.name, status: true })
		setView("channel")
		setSelectedDm(null)
		setMessage("")
	}
	return (
		<div>
			<Item className="gap-2 py-2 hover:bg-[#ffffff1a] rounded-md px-2">
				<ItemContent>
					<ItemTitle className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
						CHANNELS
					</ItemTitle>
				</ItemContent>
			</Item>
			{selectedWorkspace?.show && <ItemGroup className="gap-0">
				{channelOrdering?.map((channelId) => {
					const channel = channels?.[channelId]
					return (

						<button
							key={channel.id}
							onClick={() => openChannel(channel)}
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
										${view === "channel" &&
									selectedChannel.id === channel.id
									? "bg-zinc-800 text-white"
									: "text-zinc-500 hover:text-white hover:bg-zinc-800/50"
								}
									`}
						>

							<Hash className="w-4 h-4" />

							<span className="flex-1 text-left">
								{channel.name}
							</span>

							{channel?.unread > 0 && (
								<span className="text-xs bg-blue-500 text-white min-w-5 h-5 px-1 rounded-full flex items-center justify-center">

								</span>
							)}

						</button>



					)
				})}
			</ItemGroup>}
		</div>

	)
}
//
// <ItemMedia variant="image" className="w-5 h-5">
// 	<img src={cog} />
// </ItemMedia>

// <div key={project?.id}>
//
// 							<Hash className="w-4 h-4" />
// 							<NestedList key={project?.id} list={project} isProject={true} setter={setProject} />
// 							{
// 								selectedProject?.id === project?.id &&
// 								<ItemGroup className="gap-0 my-0 py-0 px-7">
// 									{taskOrdering?.map((taskId) => {
//
// 										const task = tasks?.[taskId]
// 										return (
// 											<NestedList key={task?.id} list={task} setter={setTask} />
// 										)
// 									})}
// 								</ItemGroup>
// 							}
// 						</div>

