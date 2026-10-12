import { useNavigate } from "react-router-dom"

export default function DashboardHome() {
	const navigate = useNavigate()

	return (
		<div className="h-full overflow-auto">
			<div className="mx-auto flex min-h-full w-full max-w-5xl items-center px-6 py-12 lg:px-10">
				<div className="w-full">

					<div className="max-w-2xl">
						<p className="text-sm font-medium text-blue-400">
							Welcome back
						</p>

						<h1 className="mt-2 text-4xl font-bold tracking-tight text-white">
							What would you like to do?
						</h1>

						<p className="mt-3 text-zinc-500">
							Start a conversation or bring your team together in a workspace.
						</p>
					</div>

					<div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-3xl">

						<button className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 text-left transition hover:border-zinc-700 hover:bg-zinc-900" onClick={() => navigate('create-workspace')}>
							<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-400">
								+
							</div>

							<h2 className="mt-5 text-lg font-semibold text-white">
								Create a workspace
							</h2>

							<p className="mt-2 text-sm leading-relaxed text-zinc-500">
								Bring your team together and collaborate through channels.
							</p>

							<p className="mt-5 text-sm font-medium text-zinc-400 group-hover:text-white">
								Get started →
							</p>
						</button>

						<button className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 text-left transition hover:border-zinc-700 hover:bg-zinc-900">
							<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
								💬
							</div>

							<h2 className="mt-5 text-lg font-semibold text-white">
								Start a conversation
							</h2>

							<p className="mt-2 text-sm leading-relaxed text-zinc-500">
								Chat directly with someone without needing a workspace.
							</p>

							<p className="mt-5 text-sm font-medium text-zinc-400 group-hover:text-white">
								Start chatting →
							</p>
						</button>

					</div>

				</div>
			</div>
		</div>
	)
}
