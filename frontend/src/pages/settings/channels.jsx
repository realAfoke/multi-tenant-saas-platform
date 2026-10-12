import { useAppState } from "@/hooks/apptools"
export default function WkChannel() {
	const { selectedWorkspace } = useAppState()
	console.log(selectedWorkspace)
	const channels = selectedWorkspace?.channels ?? {}
	const ordering = selectedWorkspace?.channelOrdering ?? []
	return (
		<section className="flex-1 min-w-0 pt-[5rem] flex flex-col">

			<div>
				<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
					<div>
						<h2 className="text-base font-semibold text-white">
							Channels
						</h2>

						<p className="text-sm text-zinc-500 mt-1">
							Manage channels in this workspace.
						</p>
					</div>

					<button className="h-9 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-sm font-medium text-white transition">
						Create channel
					</button>
				</div>

				<div className="relative mb-4">
					<svg
						className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
						/>
					</svg>

					<input
						type="text"
						placeholder="Search channels..."
						className="
				w-full h-10 rounded-lg
				border border-zinc-800
				bg-zinc-900
				pl-9 pr-3
				text-sm text-white
				placeholder:text-zinc-600
				outline-none
				focus:border-zinc-600
			"
					/>
				</div>
			</div>

			<div className="rounded-xl border border-zinc-800 overflow-auto flex-1">

				<div className="hidden sm:grid grid-cols-[1fr_100px_110px_40px] gap-4 px-5 py-3 bg-zinc-900/70 border-b border-zinc-800">
					<p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
						Channel
					</p>

					<p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
						Type
					</p>

					<p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
						Members
					</p>
				</div>
				{ordering.map((id) => {
					const channel = channels?.[id]
					return (
						<div className="grid grid-cols-1 sm:grid-cols-[1fr_100px_110px_40px] gap-3 sm:gap-4 items-center px-5 py-4 bg-zinc-900/40 border-b border-zinc-800">

							<div className="min-w-0">
								<p className="text-sm font-medium text-zinc-200 truncate">
									{`#${channel?.name}`}
								</p>

								<p className="text-xs text-zinc-600 mt-0.5">
									{channel?.description}
								</p>
							</div>

							<span className="text-xs text-zinc-500">
								Public
							</span>

							<span className="text-xs text-zinc-500">
						{`${channel?.membersCount} members`}
							</span>

							<button className="hidden sm:flex w-8 h-8 items-center justify-center rounded-md text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition">
								•••
							</button>
						</div>

					)
				})}

			</div>

		</section>
	)
}
