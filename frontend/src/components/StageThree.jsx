import {
	CalendarDays,
	Check,
	CheckSquare,
	FileText,
	Flag,
	Users,
} from "lucide-react"



export default function StageThree({ taskData, members = [] }) {
	const priorityStyles = {
		high: "border-red-500/20 bg-red-500/10 text-red-400",
		normal: "border-green-500/20 bg-green-500/10 text-green-400",
		medium: "border-blue-500/20 bg-blue-500/10 text-blue-400",
	}

	const selectedMembers = members.filter((member) =>
		taskData.members?.includes(member?.member?.id)
	)

	const checklistCount = taskData.checkList?.length || 0


	return (
		<div className="space-y-6">
			{/* Heading */}
			<div>
				<h2 className="text-lg font-semibold text-white">
					Review your task
				</h2>

				<p className="mt-1 text-sm text-zinc-500">
					Make sure everything looks correct before creating the task.
				</p>
			</div>

			{/* Main task */}
			<div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
				{/* Task identity */}
				<div className="p-5">
					<div className="flex items-start gap-3">
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
							<FileText className="h-5 w-5 text-blue-400" />
						</div>

						<div className="min-w-0">
							<h3 className="text-base font-semibold text-white">
								{taskData.title || "Untitled task"}
							</h3>

							<p className="mt-1 text-sm leading-6 text-zinc-400">
								{taskData.description || "No description provided."}
							</p>
						</div>
					</div>
				</div>

				{/* Task metadata */}
				<div className="grid border-t border-zinc-800 sm:grid-cols-3">
					{/* Priority */}
					<div className="border-b border-zinc-800 p-4 sm:border-b-0 sm:border-r">
						<div className="mb-2 flex items-center gap-2">
							<Flag className="h-4 w-4 text-zinc-500" />
							<span className="text-xs text-zinc-500">Priority</span>
						</div>

						<span
							className={`inline-flex rounded-md border px-2 py-1 text-xs font-medium ${priorityStyles[taskData.priority] ||
								"border-zinc-800 bg-zinc-950 text-zinc-400"
								}`}
						>
							{taskData.priority
								? taskData.priority.charAt(0).toUpperCase() +
								taskData.priority.slice(1)
								: "Not set"}
						</span>
					</div>

					{/* Due date */}
					<div className="border-b border-zinc-800 p-4 sm:border-b-0 sm:border-r">
						<div className="mb-2 flex items-center gap-2">
							<CalendarDays className="h-4 w-4 text-zinc-500" />
							<span className="text-xs text-zinc-500">Due date</span>
						</div>

						<p className="text-sm text-zinc-300">
							{taskData.dueDate || "No due date"}
						</p>
					</div>

					{/* Assignees */}
					<div className="p-4">
						<div className="mb-2 flex items-center gap-2">
							<Users className="h-4 w-4 text-zinc-500" />
							<span className="text-xs text-zinc-500">Assignees</span>
						</div>

						<p className="text-sm text-zinc-300">
							{selectedMembers.length}{" "}
							{selectedMembers.length === 1 ? "member" : "members"}
						</p>
					</div>
				</div>
			</div>

			{/* Checklist */}
			<div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
				<div className="mb-4 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<CheckSquare className="h-4 w-4 text-zinc-500" />

						<h3 className="text-sm font-medium text-zinc-200">
							Checklist
						</h3>
					</div>

					<span className="text-xs text-zinc-500">
						{checklistCount} {checklistCount === 1 ? "item" : "items"}
					</span>
				</div>

				{checklistCount > 0 ? (
					<div className="space-y-2">
						{taskData.checkList.map((item) => (
							<div
								key={item.id}
								className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5"
							>
								<div className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-zinc-700">
									{item.status && (
										<Check className="h-3 w-3 text-green-400" />
									)}
								</div>

								<span className="text-sm text-zinc-300">
									{item.title}
								</span>
							</div>
						))}
					</div>
				) : (
					<p className="text-sm text-zinc-600">
						No checklist items added.
					</p>
				)}
			</div>


			{/* Confirmation */}
			<div className="rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-3">
				<p className="text-sm text-zinc-400">
					Everything looks good? Click{" "}
					<span className="font-medium text-zinc-200">
						Create task
					</span>{" "}
					below to add this task to the channel.
				</p>
			</div>
		</div>
	)
}
// import {
// 	Paperclip,
// } from "lucide-react"
//
// export default function StageThree({ taskData }) {
// 	console.log(taskData)
// 	return (
//
// 		<div className="space-y-6">
//
// 			<div>
//
// 				<p className="text-sm text-blue-400 font-medium">
// 					Step 3
// 				</p>
//
// 				<h2 className="text-xl font-semibold mt-1">
// 					Extras
// 				</h2>
//
// 				<p className="text-sm text-zinc-500 mt-1">
// 					Add files and review your task.
// 				</p>
//
// 			</div>
//
// 			<div className="rounded-xl border border-dashed border-zinc-700 p-6 flex items-center gap-4 hover:border-blue-500 transition cursor-pointer">
//
// 				<div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
//
// 					<Paperclip className="w-5 h-5 text-zinc-400" />
//
// 				</div>
//
// 				<div>
//
// 					<p className="text-sm text-white">
// 						Add attachments
// 					</p>
//
// 					<p className="text-xs text-zinc-500 mt-1">
// 						Attach files related to this task
// 					</p>
//
// 				</div>
//
// 			</div>
//
// 			<div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-4">
//
// 				<h3 className="font-medium">
// 					Task summary
// 				</h3>
//
// 				<div>
//
// 					<p className="text-xs text-zinc-500">
// 						Task
// 					</p>
//
// 					<p className="text-sm text-white mt-1">
// 						{taskData.title || "Untitled task"}
// 					</p>
//
// 				</div>
//
// 				<div>
//
// 					<p className="text-xs text-zinc-500">
// 						Description
// 					</p>
//
// 					<p className="text-sm text-zinc-300 mt-1 line-clamp-3">
// 						{taskData.description || "No description"}
// 					</p>
//
// 				</div>
//
// 				<div className="flex gap-6">
//
// 					<div>
//
// 						<p className="text-xs text-zinc-500">
// 							Priority
// 						</p>
//
// 						<p className="text-sm mt-1 text-white">
// 							{taskData.priority || "Not set"}
// 						</p>
//
// 					</div>
//
// 					<div>
//
// 						<p className="text-xs text-zinc-500">
// 							Due date
// 						</p>
//
// 						<p className="text-sm mt-1">
// 							{taskData.dueDate || "Not set"}
// 						</p>
//
// 					</div>
//
// 				</div>
// 				<ul className="">
// 					{taskData.checkList.map((list) => (
// 						<li key={list.id} className="text-gray-400 p-2">{list?.title}</li>
// 					))}
// 				</ul>
//
// 			</div>
//
// 		</div>
//
// 	)
// }
