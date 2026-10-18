import { useState } from "react"
import { Check, UserPlus, ChevronDown, Search, X } from "lucide-react"

export default function AssigneePicker({ members = [] }) {
	const [open, setOpen] = useState(false)
	const [search, setSearch] = useState("")
	const [selected, setSelected] = useState([])

	const filteredMembers = members.filter((member) =>
		member.name.toLowerCase().includes(search.toLowerCase())
	)

	const toggleMember = (member) => {
		setSelected((current) => {
			const exists = current.some((item) => item.id === member.id)

			if (exists) {
				return current.filter((item) => item.id !== member.id)
			}

			return [...current, member]
		})
	}

	const removeMember = (memberId) => {
		setSelected((current) =>
			current.filter((member) => member.id !== memberId)
		)
	}

	return (
		<div className="relative">
			{/* Label */}
			<div className="mb-3 flex items-center gap-2">
				<UserPlus className="h-4 w-4 text-zinc-500" />

				<h2 className="text-sm font-medium text-zinc-200">
					Assignees
				</h2>
			</div>


			<button
				type="button"
				onClick={() => setOpen((value) => !value)}
				className="flex min-h-12 w-full items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-left hover:border-zinc-700"
			>
				<div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
					{selected.length === 0 && (
						<span className="px-1 text-sm text-zinc-600">
							Add assignees
						</span>
					)}

					{selected.map((member) => (
						<span
							key={member.id}
							className="flex items-center gap-1.5 rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-300"
							onClick={(event) => event.stopPropagation()}
						>
							<span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-700 text-[10px]">
								{member.name.charAt(0)}
							</span>

							{member.name}

							<button
								type="button"
								onClick={() => removeMember(member.id)}
								className="ml-0.5 text-zinc-500 hover:text-white"
							>
								<X className="h-3 w-3" />
							</button>
						</span>
					))}
				</div>

				<ChevronDown
					className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform ${open ? "rotate-180" : ""
						}`}
				/>
			</button>

			{/* Dropdown */}
			{open && (
				<div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl">
					{/* Search */}
					<div className="border-b border-zinc-800 p-2">
						<div className="flex items-center gap-2 rounded-lg bg-zinc-950 px-3">
							<Search className="h-4 w-4 shrink-0 text-zinc-600" />

							<input
								autoFocus
								value={search}
								onChange={(event) =>
									setSearch(event.target.value)
								}
								placeholder="Search members..."
								className="h-9 w-full bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-600"
							/>
						</div>
					</div>

					{/* Members */}
					<div className="max-h-64 overflow-y-auto p-1.5">
						{filteredMembers.length === 0 ? (
							<div className="px-3 py-8 text-center text-sm text-zinc-600">
								No members found
							</div>
						) : (
							filteredMembers.map((member) => {
								const isSelected = selected.some(
									(item) => item.id === member.id
								)

								return (
									<button
										key={member.id}
										type="button"
										onClick={() => toggleMember(member)}
										className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-zinc-800"
									>
										{/* Avatar */}
										<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xs font-medium text-zinc-300">
											{member.name.charAt(0)}
										</div>

										{/* Name */}
										<div className="min-w-0 flex-1">
											<p className="truncate text-sm text-zinc-200">
												{member.name}
											</p>

											{member.email && (
												<p className="truncate text-xs text-zinc-600">
													{member.email}
												</p>
											)}
										</div>

										<div
											className={`flex h-5 w-5 items-center justify-center rounded border ${isSelected
												? "border-blue-500 bg-blue-600"
												: "border-zinc-700"
												}`}
										>
											{isSelected && (
												<Check className="h-3.5 w-3.5 text-white" />
											)}
										</div>
									</button>
								)
							})
						)}
					</div>

					<div className="flex items-center justify-between border-t border-zinc-800 px-3 py-2">
						<span className="text-xs text-zinc-600">
							{selected.length} selected
						</span>

						<button
							type="button"
							onClick={() => setOpen(false)}
							className="rounded-md bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-700 hover:text-white"
						>
							Done
						</button>
					</div>
				</div>
			)}
		</div>
	)
}
