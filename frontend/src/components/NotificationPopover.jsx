import {
	Bell,
	Check,
	MessageCircle,
	UserPlus,
	CalendarDays,
	AtSign,
} from "lucide-react"

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { notificationQueryOption } from "@/queryOptions/queryOptions"
import { useAppState } from "@/hooks/apptools"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { dateFormatter } from "@/utils/appUtil"
import { instance } from "@/api/axios"


export default function NotificationPopover() {
	const { selectedWorkspace, socket } = useAppState()
	const queryClient = useQueryClient()

	useEffect(() => {
		if (!socket) return
		const ws = socket
		ws.onmessage = (e) => {
			const newData = JSON.parse(e.data)
			if (newData?.type !== 'notification') return
			const { data = {} } = newData
			queryClient.setQueryData(['notification', 'workspace', selectedWorkspace?.id], (old) => [data, ...(old ?? [])])
		}
	}, [socket])
	const { data: notifications } = useQuery(notificationQueryOption(selectedWorkspace?.id))
	const noOfUnread = notifications?.filter((notification) => !notification?.read)?.length
	const { wkName } = useParams()
	const navigate = useNavigate()
	const [open, setOpen] = useState(false)

	const markNotification = useMutation({
		mutationFn: async (id) => {
			const response = await instance.patch(`notification/${id}/detail/`, { read: 'opened' })
			return response.data
		},
		onSuccess: (newData) => {
			queryClient.setQueryData(['notification', 'workspace', selectedWorkspace?.id], old => old?.map(obj => obj.id === newData?.id ? newData : obj)
			)
		}
	})

	return (
		<Popover open={open} onOpenChange={setOpen} className="">

			<PopoverTrigger asChild>

				<button className="relative p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition">

					<Bell className="w-5 h-5" />

					{!!noOfUnread && <div className="absolute -top-1 -right-1 rounded-full bg-blue-500 p-1">
						<p className="  text-white text-xs ">{noOfUnread}</p>

					</div>
					}
				</button>

			</PopoverTrigger>


			<PopoverContent
				align="end"
				className="w-screen md:w-[380px] p-0 bg-zinc-950 text-white border border-zinc-900 rounded-xs"
			>

				<div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">

					<div>

						<h3 className="font-semibold">
							Notifications
						</h3>

						<p className="text-xs text-zinc-500 mt-1">
							2 unread notifications
						</p>

					</div>

					<button className="text-xs text-blue-400 hover:text-blue-300">
						Mark all read
					</button>

				</div>


				<div className="max-h-[420px] overflow-y-auto">

					{notifications?.map((notification) => {
						const time = dateFormatter(notification.createdAt)
						return (
							<Link to={`/dashboard/${selectedWorkspace?.name}/${notification?.project}/${notification?.task}`}
								onClick={() => {
									markNotification.mutate(notification?.id)
									setOpen(false)
								}
								}
								key={notification.id}
								className={`
							flex
							items-start
							gap-2
							p-3
							border-b
							transition
							cursor-pointer
							${notification.read
										? "bg-black-900/50 border-zinc-800"
										: "bg-zinc-900 border-zinc-400"

									}
							hover:border-zinc-600
						`}

							>

								<div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">

									{notification.type === "assignment" && (
										<UserPlus className="w-5 h-5 text-blue-400" />
									)}

									{notification.type === "comment" && (
										<MessageCircle className="w-3 h-3 text-green-400" />
									)}

									{notification.type === "due" && (
										<CalendarDays className="w-2 h-2 text-yellow-400" />
									)}

								</div>


								<div className="flex-1 min-w-0">

									<div className="flex items-start justify-between gap-2">

										<p className="text-xs font-bold text-zinc-200">
											{notification.title}
										</p>

										{notification.unread && (
											<span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
										)}

									</div>

									<p className="text-sm text-zinc-500 truncate">
										{notification?.description || notification?.message}
									</p>

									<p className="text-xs text-zinc-600">
										{time}
									</p>

								</div>

							</Link>

						)
					})}

				</div>
				<button className="w-full py-2  text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 transition" onClick={() => {
					setOpen(false)
					navigate(`${wkName}/notifications`)
				}}>
					View all notifications
				</button>


			</PopoverContent>

		</Popover>
	)
}


// 	className={`
// 	flex gap-2 p-2
// 	border-b border-zinc-900
// 	cursor-pointer
// 	hover:bg-zinc-900
// 	transition
// 	${notification.unread
// 			? "bg-blue-500/[0.03]"
// 			: ""
// 		}
// `}

