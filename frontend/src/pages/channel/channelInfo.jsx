import { useAppState } from "@/hooks/apptools"
import {
	Hash,
	Users,
	CalendarDays,
	MoreHorizontal,
} from "lucide-react"

export default function ChannelInfo() {
	const { selectedChannel } = useAppState()
	const date = new Date(selectedChannel?.createdOn).toLocaleString('en-Us', {
		month: 'long', year: 'numeric', day: 'numeric'
	})

	return (
		<div className="min-h-full bg-zinc-950 text-zinc-100 pt-[5rem]">
			<div className="mx-auto max-w-3xl px-6 py-8">
				<div className="flex items-start justify-between gap-4">
					<div>
						<div className="mb-1 text-sm text-zinc-500">
							Channel
						</div>

						<h1 className="text-2xl font-semibold tracking-tight">
							Channel info
						</h1>

						<p className="mt-1 text-sm text-zinc-500">
							Information about this channel.
						</p>
					</div>

					<button
						className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
					>
						<MoreHorizontal className="h-5 w-5" />
					</button>
				</div>

				<div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
					<div className="flex items-start gap-4">
						<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-800">
							<Hash className="h-6 w-6 text-zinc-400" />
						</div>

						<div className="min-w-0">
							<h2 className="text-lg font-semibold">
								{selectedChannel?.name || "general"}
							</h2>

							<p className="mt-1 text-sm text-zinc-500">
								{selectedChannel?.description ||
									"No description has been added to this channel."}
							</p>
						</div>
					</div>
				</div>

				{/* Details */}
				<div className="mt-6 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40">
					<div className="flex items-center gap-4 border-b border-zinc-800 px-5 py-4">
						<Users className="h-5 w-5 text-zinc-500" />

						<div>
							<p className="text-sm font-medium text-zinc-200">
								Members
							</p>

							<p className="mt-0.5 text-xs text-zinc-500">
								{`${selectedChannel?.membersCount} people have access to this channel`}
							</p>
						</div>
					</div>

					<div className="flex items-center gap-4 px-5 py-4">
						<CalendarDays className="h-5 w-5 text-zinc-500" />

						<div>
							<p className="text-sm font-medium text-zinc-200">
								Created
							</p>

							<p className="mt-0.5 text-xs text-zinc-500">
								{date}
							</p>
						</div>
					</div>
				</div>

				<div className="mt-6">
					<p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
						Channel ID
					</p>

					<div className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 font-mono text-xs text-zinc-500">
						{selectedChannel?.id || "channel-id"}
					</div>
				</div>
			</div>
		</div>
	)
}
