import { ItemGroup, Item, ItemContent, ItemTitle } from "@/components/ui/item"
import { useAppState } from "@/hooks/apptools"
import { Hash } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"


export default function Project(props) {
	const navigate = useNavigate()
	const [showTask, setShowTask] = useState(false)
	const { setView, setMessage, selectedWorkspace, selectedChannel, setChannel, setSelectedDm, view, setTask, selectedTask } = useAppState()
	const { channels, channelOrdering } = props
	const openChannel = (channel) => {
		setChannel(channel)
		setView("channel")
		setSelectedDm(null)
		setMessage("")
		setShowTask((prev) => !prev)
	}

	const openTask = (task) => {
		setTask({ id: task?.id, title: task?.title, show: true })
	}
	const queryClient = useQueryClient()

	const channel = queryClient.getQueryData([selectedWorkspace?.id, 'channel', selectedChannel?.id])

	const channelTask = channel?.tasks ?? []
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
						<div key={channel?.id} className="">
							<button
								onClick={() => {
									openChannel(channel)
									navigate(`${selectedWorkspace?.name}/${channel?.name}`)
								}
								}
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
							{(channelTask.length > 0 && selectedChannel?.id === channel.id && showTask) && <div className="flex flex-col gap-2 mt-2 *:text-left px-5">
								{channelTask?.map((task) => {
									return (
										<button key={task?.id} className="text-sm text-zinc-500" onClick={() => {
											openTask(task)
											navigate(`${selectedWorkspace?.name}/${selectedChannel?.name}/${task?.title}`)
										}}>
											{task.title}
										</button>
									)
								})}
							</div>}
						</div>



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

