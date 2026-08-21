import {
	Bell,
	Check,
	MessageCircle,
	CheckCircle2,
	UserPlus,
	CalendarDays,
	AtSign,
	Clock,
	MoreHorizontal,
} from "lucide-react"
import { notificationQueryOption } from "@/queryOptions/queryOptions"
import { useAppState } from "@/hooks/apptools"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { dateFormatter } from "@/utils/appUtil"

export default function Notifications() {
	const { selectedWorkspace } = useAppState()
	const { data: notifications } = useQuery(notificationQueryOption(selectedWorkspace?.id))

	// const notifications = [
	// 	{
	// 		id: 1,
	// 		type: "comment",
	// 		title: "Sarah commented on Authentication API",
	// 		description: "The refresh token flow looks good.",
	// 		time: "10 minutes ago",
	// 		unread: true,
	// 	},
	// 	{
	// 		id: 2,
	// 		type: "task",
	// 		title: "Authentication API moved to In Progress",
	// 		description: "Daniel started working on the task.",
	// 		time: "2 hours ago",
	// 		unread: true,
	// 	},
	// 	{
	// 		id: 3,
	// 		type: "mention",
	// 		title: "Michael mentioned you",
	// 		description: "Can you review the latest API documentation?",
	// 		time: "Yesterday",
	// 		unread: true,
	// 	},
	// 	{
	// 		id: 4,
	// 		type: "complete",
	// 		title: "Homepage Design was completed",
	// 		description: "The task was marked as completed.",
	// 		time: "Yesterday",
	// 		unread: false,
	// 	},
	// 	{
	// 		id: 5,
	// 		type: "due",
	// 		title: "Pricing Component is due tomorrow",
	// 		description: "Marketing · Landing Page Redesign",
	// 		time: "2 days ago",
	// 		unread: false,
	// 	},
	// ]

	const icon = (type) => {
		switch (type) {
			case 'comment': return <MessageCircle className="w-3 h-3 text-blue-400" />
			case 'mention': return <AtSign className="w-5 h-5 text-purple-400" />
			case 'complete': return <CheckCircle2 className="w-5 h-5 text-green-400" />
			case 'assignment': return <UserPlus className="w-5 h-5 text-blue-400" />
			case 'due': return <Clock className="w-5 h-5 text-yellow-400" />
			default: return <Bell className="w-5 h-5 text-zinc-400" />
		}
	}

	return (
		<div className=" max-w-4xl mx-auto space-y-8 text-white">


			<div className="flex items-end justify-between gap-4">

				<div>
					<div className="flex items-center gap-3">

						<div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">

							<Bell className="w-5 h-5 text-blue-400" />

						</div>

						<h1 className="text-3xl font-bold">
							Notifications
						</h1>

					</div>


					<p className="text-zinc-400 mt-2">
						Stay up to date with activity that matters to you.
					</p>

				</div>

				<button className="text-sm text-blue-400 hover:text-blue-300 transition">
					Mark all as read
				</button>

			</div>


			<div className="flex items-center gap-2 overflow-x-auto">

				<button className="px-4 py-2 rounded-xl bg-blue-500 text-white text-sm whitespace-nowrap">
					All
				</button>

				<button className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white whitespace-nowrap transition">
					Unread
				</button>

				<button className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white whitespace-nowrap transition">
					Mentions
				</button>

			</div>

			<div className="space-y-2">
				{notifications?.map(notification => {
					const time = dateFormatter(notification.createdAt)
					return (
						<div
							key={notification.id}
							className={`
							flex
							items-start
							gap-2
							p-3
							rounded-xl
							border
							transition
							cursor-pointer
							${notification.unread
									? "bg-zinc-900 border-zinc-700"
									: "bg-zinc-900/50 border-zinc-800"
								}
							hover:border-zinc-600
						`}
						>
							<div className="w-7 h-7 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
								{icon(notification.type)}
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-start justify-between gap-4">
									<div>
										<div className="flex items-center gap-2">
											<p className="font-medium text-sm text-white">
												{notification.title}
											</p>
											{notification.unread && (
												<span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
											)}
										</div>
										<p className="text-sm text-zinc-400 mt-1 leading-relaxed">
											{notification.description || notification.message}
										</p>

									</div>

									<button className="text-zinc-600 hover:text-white shrink-0">
										<MoreHorizontal className="w-5 h-5" />
									</button>

								</div>

								<p className="text-xs text-zinc-600">
									{time}
								</p>

							</div>

						</div>

					)
				})}

			</div>

		</div>
	)
}
