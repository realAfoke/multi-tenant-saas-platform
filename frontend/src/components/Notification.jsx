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

export default function NotificationPopover() {

	const notifications = [
		{
			id: 1,
			type: "assignment",
			title: "Daniel assigned you a task",
			description: "Authentication API",
			time: "5 minutes ago",
			unread: true,
		},
		{
			id: 2,
			type: "comment",
			title: "Sarah mentioned you in a comment",
			description: "Can you review this?",
			time: "24 minutes ago",
			unread: true,
		},
		{
			id: 3,
			type: "due",
			title: "Task due tomorrow",
			description: "Landing Page",
			time: "1 hour ago",
			unread: false,
		},
	]

	return (
		<Popover>

			<PopoverTrigger asChild>

				<button className="relative p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition">

					<Bell className="w-5 h-5" />

					<span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500" />

				</button>

			</PopoverTrigger>


			<PopoverContent
				align="end"
				className="w-[380px] p-0 bg-zinc-950 border-zinc-800 text-white"
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

					{notifications.map((notification) => (

						<div
							key={notification.id}
							className={`
								flex gap-3 px-5 py-4
								border-b border-zinc-900
								cursor-pointer
								hover:bg-zinc-900
								transition
								${notification.unread
									? "bg-blue-500/[0.03]"
									: ""
								}
							`}
						>

							<div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">

								{notification.type === "assignment" && (
									<UserPlus className="w-4 h-4 text-blue-400" />
								)}

								{notification.type === "comment" && (
									<MessageCircle className="w-4 h-4 text-green-400" />
								)}

								{notification.type === "due" && (
									<CalendarDays className="w-4 h-4 text-yellow-400" />
								)}

							</div>


							<div className="flex-1 min-w-0">

								<div className="flex items-start justify-between gap-2">

									<p className="text-sm text-zinc-200">
										{notification.title}
									</p>

									{notification.unread && (
										<span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
									)}

								</div>

								<p className="text-sm text-zinc-500 mt-1 truncate">
									{notification.description}
								</p>

								<p className="text-xs text-zinc-600 mt-2">
									{notification.time}
								</p>

							</div>

						</div>

					))}

				</div>


				<div className="p-3">

					<button className="w-full py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 transition">
						View all notifications
					</button>

				</div>

			</PopoverContent>

		</Popover>
	)
}
