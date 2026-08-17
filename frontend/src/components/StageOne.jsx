import { Input } from "@/components/ui/input"
export default function StageOne({ taskData, updateTask }) {
	return (

		<div className="space-y-6">

			<div>

				<p className="text-sm text-blue-400 font-medium">
					Step 1
				</p>

				<h2 className="text-xl font-semibold mt-1">
					Task details
				</h2>

				<p className="text-sm text-zinc-500 mt-1">
					Describe what needs to be done.
				</p>

			</div>


			<div>

				<label className="text-sm font-medium text-zinc-300">
					Task Name
				</label>

				<Input
					value={taskData.title}
					onChange={(e) =>
						updateTask("title", e.target.value)
					}
					placeholder="e.g. Implement authentication API"
					className="text-white mt-2 px-5 h-12 bg-zinc-950 border-zinc-800"
				/>

			</div>


			<div>

				<label className="text-sm font-medium text-zinc-300">
					Description
				</label>

				<textarea
					rows={8}
					value={taskData.description}
					onChange={(e) =>
						updateTask(
							"description",
							e.target.value
						)
					}
					placeholder="Describe what needs to be done..."
					className="
										mt-2
										w-full
										rounded-xl
										bg-zinc-950
										border
										border-zinc-800
										text-white
										placeholder:text-zinc-600
										outline-none
										p-4
										resize-none
										focus:border-blue-500
									"
				/>

			</div>

		</div>

	)
}
