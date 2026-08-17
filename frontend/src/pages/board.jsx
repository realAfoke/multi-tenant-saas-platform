import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import TaskCard from "@/components/TaskCard"
import { useAppState } from "@/hooks/apptools"
import { useQuery } from "@tanstack/react-query"
import { taskQueryOption } from "@/queryOptions/queryOptions"
import { useOutletContext } from "react-router-dom"

export default function Board() {
	const { project } = useOutletContext()
	const tasks = (project?.tasks) ?? []
	const statuses = [
		["In Progress", 4],
		["Todo", 18],
		["Review", 2],
		["Done", 14],
	]

	return (
		<div className="space-y-8">
			<div>

				<p className="text-zinc-400 mt-2">
					View and manage every task in this project.
				</p>

			</div>

			<div className="space-y-6">

				<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
					<div className="flex gap-3 flex-wrap">

						{statuses.map(([name, count], index) => (

							<Button
								key={name}
								variant={index === 0 ? "default" : "outline"}
								className={
									index === 0
										? "rounded-xl bg-blue-500 hover:bg-blue-600"
										: "rounded-xl border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
								}
							>
								{name} ({count})
							</Button>

						))}

					</div>

					<div className="flex items-center gap-3 w-full lg:w-80 h-11 rounded-xl bg-zinc-900 border border-zinc-800 px-4">

						<Search className="w-4 h-4 text-zinc-500" />

						<input
							placeholder="Search tasks..."
							className="bg-transparent outline-none flex-1 text-white placeholder:text-zinc-500"
						/>

					</div>


				</div>
				<div className="grid xl:grid-cols-2 gap-5">
					{tasks?.map(task => {
						return (
							<TaskCard
								key={task?.id}
								task={task}
							/>
						)
					}
					)}
				</div>


			</div>

		</div>
	)
}

