

export default function RemoveUserDialog(props) {
	const { setShowRemoveDialog, member } = props
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center px-4">

			<div
				className="absolute inset-0 bg-black/60"
				onClick={() => setShowRemoveDialog(false)}
			/>

			<div className="relative w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-2xl">

				<h3 className="text-base font-semibold text-white">
					{`Remove ${member} ?`}
				</h3>

				<p className="mt-2 text-sm leading-5 text-zinc-500">
					{`${member} will lose access to this workspace.`}
				</p>

				<div className="flex justify-end gap-2 mt-6">
					<button
						onClick={() => setShowRemoveDialog(false)}
						className="h-9 px-4 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
					>
						Cancel
					</button>

					<button
						className="h-9 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-sm font-medium text-white transition"
					>
						Remove
					</button>
				</div>

			</div>
		</div>

	)
}
