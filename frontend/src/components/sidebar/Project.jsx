import { ItemGroup } from "../ui/item"
import { useAppState } from "@/hooks/apptools"
import { Hash, Plus, ChevronDown } from "lucide-react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"


export default function Project() {
	const navigate = useNavigate()
	const { wkName } = useParams()
	const [showTask, setShowTask] = useState(false)
	const { view, setView, selectedWorkspace, selectedChannel, setChannel, setSelectedDm, setTask, } = useAppState()
	const { channels, channelOrdering, pinnedChannels } = selectedWorkspace

	const openChannel = (channel) => {
		setChannel(channel)
		setView("channel")
		setSelectedDm(null)
		setShowTask((prev) => !prev)
	}
	const openTask = (task) => {
		setTask({
			id: task?.id,
			title: task?.title,
			show: true
		})
	}

	const queryClient = useQueryClient()
	const channel = queryClient.getQueryData([selectedWorkspace?.id, "channel", selectedChannel?.id,])
	const channelTask = channel?.tasks ?? []

	return (
		<div className="mt-2">
			<div className="flex items-center justify-between px-3 py-2">
				<p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
					Channels
				</p>
				<button className="flex items-center justify-center w-6 h-6 rounded-md text-zinc-500 hover:text-white hover:bg-zinc-800 transition" onClick={() => navigate(`/${wkName}/create-channel`)} >
					<Plus className="w-4 h-4" />

				</button>

			</div>
			{pinnedChannels?.map((channel) => {
				const conversation = channel?.conversation ?? {}
				const isActive = view === "channel" && selectedChannel?.id === channel?.id
				return (
					<div key={channel?.id}>
						<button onClick={() => {
							openChannel(channel)
							navigate(`${selectedWorkspace?.name}/${channel?.name}`)
						}
						}
							className={` group w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition ${isActive ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"} `} >

							<Hash className={` w-4 h-4 shrink-0 ${isActive ? "text-zinc-300" : "text-zinc-600 group-hover:text-zinc-400"} `} />
							<span className="flex-1 text-left truncate">
								{channel?.name}
							</span>
							{conversation?.unread > 0 && (
								<span className="text-[10px] font-medium bg-blue-500 text-white min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
									{conversation?.unread}
								</span>
							)
							}
							{isActive && channelTask.length > 0 && (
								<ChevronDown className={` w-3.5 h-3.5 text-zinc-500 transition-transform ${showTask ? "rotate-0" : "-rotate-90"} `} />
							)
							}
						</button>
						{channelTask.length > 0 && selectedChannel?.id === channel.id && showTask && (
							<div className="ml-5 mt-1 mb-2 pl-4 border-l border-zinc-800 space-y-0.5">
								{channelTask?.map((task) => (
									<button key={task?.id}
										className=" w-full text-left text-xs text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50 rounded-md px-2.5 py-1.5 transition truncate "
										onClick={() => {
											openTask(task)
											navigate(`${selectedWorkspace?.name}/${selectedChannel?.name}/${task?.title}`)
										}} >
										{task?.title}
									</button>
								))}
							</div>
						)}
					</div>
				)

			})}
			{selectedWorkspace?.id && (
				<ItemGroup className="gap-1">
					{channelOrdering?.map((channelId) => {
						const channel = channels?.[channelId]
						const conversation = channel?.conversation ?? {}
						const isActive = view === "channel" && selectedChannel?.id === channel?.id
						return (
							<div key={channel?.id}>
								<button onClick={() => {
									openChannel(channel)
									navigate(`${selectedWorkspace?.name}/${channel?.name}`)
								}
								}
									className={` group w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition ${isActive ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"} `} >

									<Hash className={` w-4 h-4 shrink-0 ${isActive ? "text-zinc-300" : "text-zinc-600 group-hover:text-zinc-400"} `} />
									<span className="flex-1 text-left truncate">
										{channel?.name}
									</span>
									{conversation?.unread > 0 && (
										<span className="text-[10px] font-medium bg-blue-500 text-white min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
											{conversation?.unread}
										</span>
									)
									}
									{isActive && channelTask.length > 0 && (
										<ChevronDown className={` w-3.5 h-3.5 text-zinc-500 transition-transform ${showTask ? "rotate-0" : "-rotate-90"} `} />
									)
									}
								</button>
								{channelTask.length > 0 && selectedChannel?.id === channel.id && showTask && (
									<div className="ml-5 mt-1 mb-2 pl-4 border-l border-zinc-800 space-y-0.5">
										{channelTask?.map((task) => (
											<button key={task?.id}
												className=" w-full text-left text-xs text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50 rounded-md px-2.5 py-1.5 transition truncate "
												onClick={() => {
													openTask(task)
													navigate(`${selectedWorkspace?.name}/${selectedChannel?.name}/${task?.title}`)
												}} >
												{task?.title}
											</button>
										))}
									</div>
								)}
							</div>
						)
					}
					)
					}
				</ItemGroup>
			)
			}
		</div>
	)
}

// export default function Project() {
// const navigate = useNavigate()
// 	const [showTask, setShowTask] = useState(false)
// 	const { setView, selectedWorkspace, selectedChannel, setChannel, setSelectedDm, view, setTask, selectedTask } = useAppState()
// 	const { channels, channelOrdering } = selectedWorkspace
// 	const openChannel = (channel) => {
// 		setChannel(channel)
// 		setView("channel")
// 		setSelectedDm(null)
// 		setShowTask((prev) => !prev)
// 	}
//
// 	const openTask = (task) => {
// 		setTask({ id: task?.id, title: task?.title, show: true })
// 	}
// 	const queryClient = useQueryClient()
//
// 	const channel = queryClient.getQueryData([selectedWorkspace?.id, 'channel', selectedChannel?.id])
//
// 	const channelTask = channel?.tasks ?? []
// 	return (
// 		<div>
// 			<Item className="gap-2 py-2 hover:bg-[#ffffff1a] rounded-md px-2">
// 				<ItemContent>
// 					<ItemTitle className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
// 						CHANNELS
// 					</ItemTitle>
// 				</ItemContent>
// 			</Item>
// 			{selectedWorkspace?.id && <ItemGroup className="gap-0">
// 				{channelOrdering?.map((channelId) => {
// 					const channel = channels?.[channelId]
// 					const conversation = channel?.conversation ?? {}
// 					return (
// 						<div key={channel?.id} className="">
// 							<button
// 								onClick={() => {
// 									openChannel(channel)
// 									navigate(`${selectedWorkspace?.name}/${channel?.name}`)
// 								}
// 								}
// 								className={`
// 										w-full
// 										flex
// 										items-center
// 										gap-3
// 										px-3
// 										py-2.5
// 										rounded-lg
// 										text-sm
// 										transition
// 										${view === "channel" &&
// 										selectedChannel.id === channel.id
// 										? "bg-zinc-800 text-white"
// 										: "text-zinc-500 hover:text-white hover:bg-zinc-800/50"
// 									}
// 									`}
// 							>
//
// 								<Hash className="w-4 h-4" />
//
// 								<span className="flex-1 text-left">
// 									{channel.name}
// 								</span>
//
// 								{conversation?.unread > 0 && (
// 									<span className="text-xs bg-blue-500 text-white min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
// 										{conversation?.unread}
// 									</span>
// 								)}
//
// 							</button>
// 							{(channelTask.length > 0 && selectedChannel?.id === channel.id && showTask) && <div className="flex flex-col gap-2 mt-2 *:text-left px-5">
// 								{channelTask?.map((task) => {
// 									return (
// 										<button key={task?.id} className="text-sm text-zinc-500" onClick={() => {
// 											openTask(task)
// 											navigate(`${selectedWorkspace?.name}/${selectedChannel?.name}/${task?.title}`)
// 										}}>
// 											{task.title}
// 										</button>
// 									)
// 								})}
// 							</div>}
// 						</div>
//
//
//
// 					)
// 				})}
// 			</ItemGroup>}
// 		</div>
//
// 	)
// }
// //
// // <ItemMedia variant="image" className="w-5 h-5">
// // 	<img src={cog} />
// // </ItemMedia>
//
// // <div key={project?.id}>
// //
// // 							<Hash className="w-4 h-4" />
// // 							<NestedList key={project?.id} list={project} isProject={true} setter={setProject} />
// // 							{
// // 								selectedProject?.id === project?.id &&
// // 								<ItemGroup className="gap-0 my-0 py-0 px-7">
// // 									{taskOrdering?.map((taskId) => {
// //
// // 										const task = tasks?.[taskId]
// // 										return (
// // 											<NestedList key={task?.id} list={task} setter={setTask} />
// // 										)
// // 									})}
// // 								</ItemGroup>
// // 							}
// // 						</div>

