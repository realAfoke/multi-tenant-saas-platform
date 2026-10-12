import {
	CalendarDays,
	Flag,
} from "lucide-react"


export default function StageOne({ taskData, updateTask }) {
	const priorities = [
		{
			value: "high",
			label: "High",
			color: "text-red-400 border-red-500/30 bg-red-500/10",
			active: "border-red-500 bg-red-500/20",
		},
		{
			value: "normal",
			label: "Normal",
			color: "text-green-400 border-green-500/30 bg-green-500/10",
			active: "border-green-500 bg-green-500/20",
		},
		{
			value: "medium",
			label: "Medium",
			color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
			active: "border-blue-500 bg-blue-500/20",
		},
	]

	return (
		<div className="space-y-6">
			<div>
				<label className="mb-2 block text-sm font-medium text-zinc-300">
					Task title
				</label>
				<input
					type="text"
					value={taskData.title}
					onChange={(e) => updateTask("title", e.target.value)}
					placeholder="What needs to be done?"
					className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
				/>
			</div>
			<div className="flex items-center gap-4 flex-wrap">
				<div className="flex-1">
					<label className="mb-2 block text-sm font-medium text-zinc-300">
						Description
					</label>

					<textarea
						rows={5}
						value={taskData.description}
						onChange={(e) => updateTask("description", e.target.value)}
						placeholder="Describe what this task is about..."
						className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
					/>
				</div>

				<div className="flex items-center gap-5">
					<div>
						<div className="mb-3 flex items-center gap-2">
							<Flag className="h-4 w-4 text-zinc-500" />

							<h2 className="text-sm font-medium text-zinc-200">
								Priority
							</h2>
						</div>

						<div className="flex flex-wrap gap-3">
							{priorities.map((priority) => {
								const selected = taskData.priority === priority.value

								return (
									<button
										key={priority.value}
										type="button"
										onClick={() => updateTask("priority", priority.value)}
										className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${selected
											? priority.active
											: "border-zinc-800 bg-zinc-900 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
											}`}
									>
										{priority.label}
									</button>
								)
							})}
						</div>
					</div>

					<div>
						<div className="mb-3 flex items-center gap-2">
							<CalendarDays className="h-4 w-4 text-zinc-500" />

							<h2 className="text-sm font-medium text-zinc-200">
								Due date
							</h2>
						</div>

						<input
							type="date"
							value={taskData.dueDate}
							onChange={(e) => updateTask("dueDate", e.target.value)}
							className="border-zinc-800 bg-zinc-900 text-white text-sm p-3"
						/>
					</div>
				</div>
			</div>

		</div>
	)
}


// export default function StageOne({ taskData, updateTask }) {
// 	return (
//
// 		<div className="space-y-6">
// 			<div>
// 				<label className="mb-2 block text-sm font-medium text-zinc-300">
// 					Task title
// 				</label>
//
// 				<input
// 					type="text"
// 					value={taskData.title}
// 					onChange={(e) =>
// 						updateTask("title", e.target.value)
// 					}
//
// 					placeholder="What needs to be done?"
// 					className="text-white w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none placeholder:text-white focus:border-zinc-600"
// 				/>
// 			</div>
//
// 			<div>
// 				<label className="mb-2 block text-sm font-medium text-zinc-300">
// 					Description
// 				</label>
//
// 				<textarea
// 					rows={5}
// 					value={taskData.description}
// 					onChange={(e) =>
// 						updateTask(
// 							"description",
// 							e.target.value
// 						)
// 					}
// 					placeholder="Describe what this task is about..."
// 					className="text-white w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none placeholder:text-white focus:border-zinc-600"
// 				/>
// 			</div>
// 		</div>
//
// 	)
// }

// <div>
//
// 	<p className="text-sm text-blue-400 font-medium">
// 		Step 1
// 	</p>
//
// 	<h2 className="text-xl font-semibold mt-1">
// 		Task details
// 	</h2>
//
// 	<p className="text-sm text-zinc-500 mt-1">
// 		Describe what needs to be done.
// 	</p>
//
// </div>
//
//
// <div>
//
// 	<label className="text-sm font-medium text-zinc-300">
// 		Task Name
// 	</label>
//
// 	<Input
// 		value={taskData.title}
// 		onChange={(e) =>
// 			updateTask("title", e.target.value)
// 		}
// 		placeholder="e.g. Implement authentication API"
// 		className="text-white mt-2 px-5 h-12 bg-zinc-950 border-zinc-800"
// 	/>
//
// </div>
//
//
// <div>
//
// 	<label className="text-sm font-medium text-zinc-300">
// 		Description
// 	</label>
//
// 	<textarea
// 		rows={8}
// 		value={taskData.description}
// 		onChange={(e) =>
// 			updateTask(
// 				"description",
// 				e.target.value
// 			)
// 		}
// 		placeholder="Describe what needs to be done..."
// 		className="
// 							mt-2
// 							w-full
// 							rounded-xl
// 							bg-zinc-950
// 							border
// 							border-zinc-800
// 							text-white
// 							placeholder:text-zinc-600
// 							outline-none
// 							p-4
// 							resize-none
// 							focus:border-blue-500
// 						"
// 	/>
//
// </div>
//

