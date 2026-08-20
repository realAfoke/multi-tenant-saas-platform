import { useQuery } from "@tanstack/react-query"
import { fetchUserQueryOption } from "@/queryOptions/queryOptions"
import { useOutletContext } from "react-router-dom"


export default function Home() {
	const { data: user } = useQuery(fetchUserQueryOption())
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
}
