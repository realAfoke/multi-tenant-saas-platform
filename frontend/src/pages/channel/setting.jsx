import { Hash, Save, Archive, Trash2 } from "lucide-react"

export default function ChannelSettings({ channel }) {
	return (
		<div className="min-h-full bg-zinc-950 text-zinc-100">
			<div className="mx-auto max-w-3xl px-6 py-8">
				{/* Header */}
				<div className="mb-8">
					<div className="mb-1 flex items-center gap-2 text-sm text-zinc-500">
						<Hash className="h-4 w-4" />
						{channel?.name || "backend"}
					</div>

					<h1 className="text-2xl font-semibold tracking-tight">
						Channel settings
					</h1>

					<p className="mt-1 text-sm text-zinc-500">
						Manage this channel's settings.
					</p>
				</div>

				{/* General */}
				<section>
					<div className="mb-4">
						<h2 className="text-sm font-semibold text-zinc-200">
							General
						</h2>

						<p className="mt-1 text-xs text-zinc-500">
							Update the basic information for this channel.
						</p>
					</div>

					<div className="space-y-5 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
						{/* Channel name */}
						<div>
							<label className="mb-2 block text-sm font-medium text-zinc-300">
								Channel name
							</label>

							<div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-900 focus-within:border-zinc-700">
								<span className="pl-3 text-zinc-600">
									#
								</span>

								<input
									type="text"
									defaultValue={channel?.name || "backend"}
									className="w-full bg-transparent px-2 py-2.5 text-sm text-zinc-200 outline-none"
								/>
							</div>
						</div>

						{/* Description */}
						<div>
							<label className="mb-2 block text-sm font-medium text-zinc-300">
								Description
							</label>

							<textarea
								rows={4}
								defaultValue={channel?.description || ""}
								placeholder="What is this channel about?"
								className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-zinc-700"
							/>
						</div>

						{/* Save */}
						<div className="flex justify-end border-t border-zinc-800 pt-5">
							<button
								type="button"
								className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500"
							>
								<Save className="h-4 w-4" />
								Save changes
							</button>
						</div>
					</div>
				</section>

				{/* Archive */}
				<section className="mt-10">
					<div className="mb-4">
						<h2 className="text-sm font-semibold text-zinc-200">
							Archive channel
						</h2>

						<p className="mt-1 text-xs text-zinc-500">
							Archived channels are no longer active but can be restored later.
						</p>
					</div>

					<div className="flex items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
						<div>
							<p className="text-sm font-medium text-zinc-200">
								Archive this channel
							</p>

							<p className="mt-1 text-xs text-zinc-500">
								Keep the channel and its history without allowing new activity.
							</p>
						</div>

						<button
							type="button"
							className="flex shrink-0 items-center gap-2 rounded-lg border border-zinc-700 px-3.5 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white"
						>
							<Archive className="h-4 w-4" />
							Archive
						</button>
					</div>
				</section>

				{/* Danger zone */}
				<section className="mt-10">
					<div className="mb-4">
						<h2 className="text-sm font-semibold text-red-400">
							Danger zone
						</h2>

						<p className="mt-1 text-xs text-zinc-500">
							These actions can permanently affect this channel.
						</p>
					</div>

					<div className="flex items-center justify-between gap-4 rounded-xl border border-red-900/40 bg-red-950/10 p-5">
						<div>
							<p className="text-sm font-medium text-zinc-200">
								Delete this channel
							</p>

							<p className="mt-1 text-xs text-zinc-500">
								Permanently remove this channel and its content.
							</p>
						</div>

						<button
							type="button"
							className="flex shrink-0 items-center gap-2 rounded-lg border border-red-900/60 px-3.5 py-2 text-sm text-red-400 hover:bg-red-950/30 hover:text-red-300"
						>
							<Trash2 className="h-4 w-4" />
							Delete channel
						</button>
					</div>
				</section>
			</div>
		</div>
	)
}
