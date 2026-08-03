import { useQuery } from "@tanstack/react-query"
import { fetchUserQueryOption, workspaceQueryOption } from "@/queryOptions/queryOptions"
import { useOutletContext } from "react-router-dom"


export default function Home() {
	const { data: workspaces } = useQuery(workspaceQueryOption())
	const { data: user } = useQuery(fetchUserQueryOption())
	const workspaceId = workspaces?.ordering[0]
	// const { data: assignedTasks } = useQuery(dasboardDataQueryOption(workspaceId))
	const { setToggle } = useOutletContext()
	return (
		<div className="mb-10">
			<h1 className="text-4xl font-bold text-white">
				Welcome, {user?.firstName}
			</h1>

			<div onClick={() => setToggle(prev => (!prev))} className="mt-5 flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-4">
				<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
					→
				</div>

				<div>
					<p className="text-sm font-medium text-white">
						Select a workspace to get started
					</p>
					<p className="mt-0.5 text-xs text-zinc-500">
						Choose a workspace to view your tasks and start working.
					</p>
				</div>
			</div>
		</div>
	)
	// return (
	// 	<div className="mb-10">
	// 		<h1 className="text-4xl font-bold text-white">
	// 			{`Welcome ${user?.firstName}`}
	// 		</h1>
	//
	// 	</div >
	// )
}
// <p className="text-zinc-400 mt-3 max-w-2xl">
// 	Everything assigned to you, all in one place. Pick up where you left off.
// </p>
// {
// 	assignedTasks?.length - 1 > 0 ? (
// 		<Card className="bg-zinc-900 border-zinc-800 hover:border-blue-500 transition-all">
// 			<CardContent className="p-8 md:p-10 bg-zinc-900 border-zinc-800 hover:border-blue-500 hover:-translate-y-1 transition-all duration-300"
// 			>
//
// 				<div className="text-sm text-blue-400 font-medium">
// 					Continue Working
// 				</div>
//
// 				<h2 className="text-2xl text-white font-semibold mt-2">
// 					Landing Page Redesign
// 				</h2>
//
// 				<p className="text-zinc-400 mt-2">
// 					Marketing Website
// 				</p>
//
// 				<Button className="mt-6 rounded-xl bg-blue-500">
// 					Resume →
// 				</Button>
//
// 			</CardContent >
// 		</Card >) : (
// 	<div className="rounded-xl p-8 text-center">
// 		<div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
// 			<span className="text-lg">📋</span>
// 		</div>
//
// 		<h3 className="text-sm font-semibold text-white">
// 			No active task
// 		</h3>
//
// 		<p className="mt-1 text-sm text-zinc-500">
// 			You don’t have a task in progress right now.
// 		</p>
// 	</div>
// )
// }
// 			<h2 className="text-2xl text-white font-semibold mt-10 mb-5">
// 				Assigned To You
// 			</h2>
// 			<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
// 				{assignedTasks?.length > 0 ? (
// 					assignedTasks.map((task) => (
// 						<Card
// 							key={task?.id}
// 							className="bg-zinc-900 border-zinc-800 hover:border-blue-500 transition-all"
// 						>
// 							<CardContent className="p-8">
// 								<h3 className="text-white font-semibold">
// 									{task?.title}
// 								</h3>
//
// 								<p className="text-zinc-400 text-sm mt-2">
// 									{task?.workspace}
// 								</p>
//
// 								<span className="inline-block mt-4 text-xs bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full">
// 									{task?.status}
// 								</span>
// 							</CardContent>
//
// 							...
// 						</Card>
// 					))
// 				) :
// 					(
// 						<div className="rounded-xl p-8 text-center">
// 							<div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
// 								<span className="text-lg">🗂️</span>
// 							</div>
//
// 							<h3 className="text-sm font-semibold text-white">
// 								No recent tasks
// 							</h3>
//
// 							<p className="mt-1 text-sm text-zinc-500">
// 								Your recently assigned tasks will appear here.
// 							</p>
// 						</div>
// 					)
// 				}
// 			</div>
// 			<h2 className="text-2xl text-white font-semibold mt-10 mb-5">
// 				Your Workspaces
// 			</h2>
// 			<div className="grid md:grid-cols-3 gap-6">
// 				<Card className="bg-zinc-900 border-zinc-800 hover:border-blue-500 cursor-pointer transition-all">
// 					<CardContent className="p-6">
//
// 						<h3 className="text-xl text-white font-semibold">
// 							Marketing
// 						</h3>
//
// 						<p className="text-zinc-400 mt-2">
// 							8 active projects
// 						</p>
//
// 					</CardContent>
// 				</Card>
// 			</div>
