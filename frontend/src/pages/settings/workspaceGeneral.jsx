


export default function WorkspaceGeneral() {
	return (
		< section className="flex-1 max-w-2xl pt-[5rem]" >

			<div className="mb-6">
				<h2 className="text-base font-semibold text-white">
					General
				</h2>

				<p className="text-sm text-zinc-500 mt-1">
					Update your workspace information.
				</p>
			</div>

			<div className="rounded-xl border border-zinc-800 bg-zinc-900/40">

				{/* Icon */}
				<div className="p-5 border-b border-zinc-800">
					<label className="text-sm font-medium text-zinc-300">
						Workspace icon
					</label>

					<div className="flex items-center gap-4 mt-3">
						<div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center text-xl font-semibold text-white">
							A
						</div>

						<button className="h-9 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm text-zinc-300 transition">
							Change
						</button>
					</div>
				</div>

				{/* Name */}
				<div className="p-5 border-b border-zinc-800">
					<label className="block text-sm font-medium text-zinc-300 mb-2">
						Workspace name
					</label>

					<input
						type="text"
						value="Acme Inc."
						readOnly
						className="w-full h-10 rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-sm text-white outline-none"
					/>
				</div>

				{/* Description */}
				<div className="p-5">
					<label className="block text-sm font-medium text-zinc-300 mb-2">
						Description
					</label>

					<textarea
						rows={3}
						placeholder="Describe your workspace..."
						className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-3 text-sm text-white placeholder:text-zinc-600 resize-none outline-none focus:border-zinc-600 transition"
					/>
				</div>

			</div>

			<div className="flex justify-end mt-4 *:mx-2">
				<button className="h-10 px-5 rounded-lg bg-red-900 hover:bg-blue-600 text-sm font-medium text-gray-400 transition">
					Delete workspace
				</button>

				<button className="h-10 px-5 rounded-lg bg-blue-500 hover:bg-blue-600 text-sm font-medium text-white transition">
					Save changes
				</button>
			</div>

		</section >

	)
}
