import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import TaskCard from "@/components/TaskCard"

export default function Board() {
	const { selectedProject, selectedWorkspace } = useAppState()
	const statuses = [
		["In Progress", 4],
		["Todo", 18],
		["Review", 2],
		["Done", 14],
	]
	const tasks = [
		{
			id: 1,
			title: "Authentication API",
			description: "Implement JWT authentication, refresh token rotation and secure session handling.",
			priority: "High",
			assignee: "Daniel",
			dueDate: "Tomorrow",
			comments: 6,
			attachments: 2,
		},
		{
			id: 2,
			title: "Landing Page",
			description: "Build the responsive landing page following the new OrbitSpace design.",
			priority: "Medium",
			assignee: "Sarah",
			dueDate: "Jul 31",
			comments: 3,
			attachments: 1,
		},
		{
			id: 3,
			title: "Billing Integration",
			description: "Connect Stripe checkout and customer portal.",
			priority: "Low",
			assignee: "Michael",
			dueDate: "Aug 2",
			comments: 1,
			attachments: 0,
		},
	]

	return (
		<div className="space-y-8">
			<div>

				<h1 className="text-3xl font-bold text-white">
					Board
				</h1>

				<p className="text-zinc-400 mt-2">
					View and manage every task in this project.
				</p>

			</div>

			<Card className="bg-zinc-900 border-zinc-800">

				<CardContent className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-6">

					<div>

						<p className="text-blue-400 text-sm font-medium">
							Continue Working
						</p>

						<h2 className="text-2xl font-semibold text-white mt-2">
							Authentication API
						</h2>

						<p className="text-zinc-400 mt-2 max-w-xl">
							Implement JWT authentication, refresh token rotation and secure session handling.
						</p>

					</div>

					<Button className="mt-5 lg:mt-0 rounded-xl bg-blue-500">
						Resume →
					</Button>

				</CardContent>

			</Card>

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
					{tasks.map(task => (
						<TaskCard
							key={task.id}
							task={task}
						/>
					))}
				</div>


			</div>

		</div>
	)
}
