import {
	Paperclip,
} from "lucide-react"

export default function StageThree({ taskData }) {
	console.log(taskData)
	return (

		<div className="space-y-6">

			<div>

				<p className="text-sm text-blue-400 font-medium">
					Step 3
				</p>

				<h2 className="text-xl font-semibold mt-1">
					Extras
				</h2>

				<p className="text-sm text-zinc-500 mt-1">
					Add files and review your task.
				</p>

			</div>

			<div className="rounded-xl border border-dashed border-zinc-700 p-6 flex items-center gap-4 hover:border-blue-500 transition cursor-pointer">

				<div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">

					<Paperclip className="w-5 h-5 text-zinc-400" />

				</div>

				<div>

					<p className="text-sm text-white">
						Add attachments
					</p>

					<p className="text-xs text-zinc-500 mt-1">
						Attach files related to this task
					</p>

				</div>

			</div>

			<div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-4">

				<h3 className="font-medium">
					Task summary
				</h3>

				<div>

					<p className="text-xs text-zinc-500">
						Task
					</p>

					<p className="text-sm text-white mt-1">
						{taskData.title || "Untitled task"}
					</p>

				</div>

				<div>

					<p className="text-xs text-zinc-500">
						Description
					</p>

					<p className="text-sm text-zinc-300 mt-1 line-clamp-3">
						{taskData.description || "No description"}
					</p>

				</div>

				<div className="flex gap-6">

					<div>

						<p className="text-xs text-zinc-500">
							Priority
						</p>

						<p className="text-sm mt-1 text-white">
							{taskData.priority || "Not set"}
						</p>

					</div>

					<div>

						<p className="text-xs text-zinc-500">
							Due date
						</p>

						<p className="text-sm mt-1">
							{taskData.dueDate || "Not set"}
						</p>

					</div>

				</div>
		<ul className="">
		{taskData.checkList.map((list)=>(
			<li key={list.id} className="text-gray-400 p-2">{list?.title}</li>
		))}
		</ul>

			</div>

		</div>

	)
}
