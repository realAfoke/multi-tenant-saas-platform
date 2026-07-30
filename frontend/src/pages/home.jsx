import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { fetchUserQueryOption, workspaceQueryOption } from "@/queryOptions/queryOptions"


export default function Home() {
	const { data: workspaces } = useQuery(workspaceQueryOption())
	const { data: user } = useQuery(fetchUserQueryOption())
	console.log('home:', workspaces)
	// const 
	const assignedTasks = [
		{
			id: 1,
			title: "Authentication API",
			workspace: "Development",
			status: "In Progress",
		},
		{
			id: 2,
			title: "Landing Page",
			workspace: "Marketing",
			status: "Review",
		},
		{
			id: 3,
			title: "Billing",
			workspace: "Finance",
			status: "Todo",
		},
	]
	return (
		<div className="mb-10">
			<h1 className="text-4xl font-bold text-white">
				Welcome back 👋
			</h1>

			<p className="text-zinc-400 mt-3 max-w-2xl">
				Everything assigned to you, all in one place. Pick up where you left off.
			</p>
			<Card className="bg-zinc-900 border-zinc-800 hover:border-blue-500 transition-all">
				<CardContent className="p-8 md:p-10 bg-zinc-900 border-zinc-800 hover:border-blue-500 hover:-translate-y-1 transition-all duration-300"
				>

					<div className="text-sm text-blue-400 font-medium">
						Continue Working
					</div>

					<h2 className="text-2xl text-white font-semibold mt-2">
						Landing Page Redesign
					</h2>

					<p className="text-zinc-400 mt-2">
						Marketing Website
					</p>

					<Button className="mt-6 rounded-xl bg-blue-500">
						Resume →
					</Button>

				</CardContent >
			</Card >
			<h2 className="text-2xl text-white font-semibold mt-10 mb-5">
				Assigned To You
			</h2>
			<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
				{assignedTasks.map(task => (

					<Card key={task?.id} className="bg-zinc-900 border-zinc-800 hover:border-blue-500 transition-all">
						<CardContent className="p-8">

							<h3 className="text-white font-semibold">
								{task?.title}
							</h3>

							<p className="text-zinc-400 text-sm mt-2">
								{task?.workspace}
							</p>

							<span className="inline-block mt-4 text-xs bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full">
								{task?.status}
							</span>

						</CardContent>
						...
					</Card>
				))}
			</div>
			<h2 className="text-2xl text-white font-semibold mt-10 mb-5">
				Your Workspaces
			</h2>
			<div className="grid md:grid-cols-3 gap-6">
				<Card className="bg-zinc-900 border-zinc-800 hover:border-blue-500 cursor-pointer transition-all">
					<CardContent className="p-6">

						<h3 className="text-xl text-white font-semibold">
							Marketing
						</h3>

						<p className="text-zinc-400 mt-2">
							8 active projects
						</p>

					</CardContent>
				</Card>
			</div>
		</div >
	)
}
