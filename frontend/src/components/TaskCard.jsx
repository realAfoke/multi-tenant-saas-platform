import { Card, CardContent } from "@/components/ui/card"
import {
	MessageCircle,
	Paperclip,
	CalendarDays,
} from "lucide-react"
import { useParams, useNavigate } from "react-router-dom"
import { useAppState } from "@/hooks/apptools"

export default function TaskCard({ task }) {
	const { wkName, projectName } = useParams()
	const { setTask } = useAppState()
	const navigate = useNavigate()

	return (
		<Card
			className="
				bg-zinc-900
				border-zinc-800
				hover:border-blue-500
				transition-all
				duration-200
				cursor-pointer
				hover:-translate-y-1
			"
			onClick={() => {
				setTask(task)
				navigate(`/dashboard/${wkName}/${projectName}/${task?.title}`)
			}}
		>

			<CardContent className="p-5">

				<div className="flex items-start justify-between">

					<div>

						<h3 className="text-white font-semibold text-lg">
						</h3>

						<p className="text-sm text-zinc-400 mt-2 leading-relaxed line-clamp-2">
							{task.description}
						</p>

					</div>

					<span
						className={`text-xs font-medium
							${task.priority === "High"
								? "text-red-400"
								: task.priority === "Medium"
									? "text-yellow-400"
									: "text-green-400"
							}
						`}
					>
						{task.priority}
					</span>

				</div>

				<div className="border-t border-zinc-800 my-5" />

				<div className="flex items-center justify-between">

					<div className="flex items-center gap-2 text-zinc-400">

						<div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-semibold text-white">
							{task?.assignee?.charAt(0)}
						</div>

						<div>

							<p className="text-sm text-white">
								{task?.assignee}
							</p>

							<div className="flex items-center gap-1 text-xs">

								<CalendarDays className="w-3 h-3" />

								<span>
									{task?.dueDate}
								</span>

							</div>

						</div>

					</div>

					<div className="flex items-center gap-4 text-zinc-500">

						<div className="flex items-center gap-1">

							<MessageCircle className="w-4 h-4 text-white" />

							<span className="text-xs text-white">
								{task?.comment}
							</span>

						</div>

						<div className="flex items-center gap-1">

							<Paperclip className="w-4 h-4 text-white" />

							<span className="text-xs">
								{task?.attachments}
							</span>

						</div>

					</div>

				</div>

			</CardContent>

		</Card>

	)
}
