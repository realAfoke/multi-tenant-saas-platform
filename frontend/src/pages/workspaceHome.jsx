export default function WorkspaceHome() {
	return (
		<div className="h-full overflow-auto">
			<div className="mx-auto flex min-h-full w-full max-w-5xl flex-col justify-center px-6 py-12 lg:px-10">

				{/* Greeting */}
				<div className="max-w-2xl">
					<p className="text-sm font-medium text-blue-400">
						Welcome back
					</p>

					<h1 className="mt-2 text-4xl font-bold tracking-tight text-white">
						What would you like to do?
					</h1>

					<p className="mt-3 text-zinc-500">
						Collaborate with your team or start a conversation with someone.
					</p>
				</div>

				{/* Actions */}
				<div className="mt-10 grid gap-4 sm:grid-cols-2">

					{/* Create workspace */}
					<button
						className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 text-left transition hover:border-zinc-700 hover:bg-zinc-900"
					>
						<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
							+
						</div>

						<h2 className="mt-5 text-lg font-semibold text-white">
							Create a workspace
						</h2>

						<p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-500">
							Bring your team together, create channels, assign tasks, and
							collaborate in one place.
						</p>

						<div className="mt-5 text-sm font-medium text-zinc-400 transition group-hover:text-white">
							Get started →
						</div>
					</button>

					{/* Start chat */}
					<button
						className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 text-left transition hover:border-zinc-700 hover:bg-zinc-900"
					>
						<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
							→
						</div>

						<h2 className="mt-5 text-lg font-semibold text-white">
							Start a chat
						</h2>

						<p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-500">
							Have a private conversation with someone without needing to
							create or join a workspace.
						</p>

						<div className="mt-5 text-sm font-medium text-zinc-400 transition group-hover:text-white">
							Start chatting →
						</div>
					</button>

				</div>

			</div>
		</div>
	)
}
