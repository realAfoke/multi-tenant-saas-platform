import { useState } from "react"
import { Check, Plus, X } from "lucide-react"

export default function TaskChecklist() {
	const [items, setItems] = useState([])
	const [input, setInput] = useState("")

	const addItem = () => {
		const title = input.trim()

		if (!title) return

		setItems((current) => [
			...current,
			{
				id: crypto.randomUUID(),
				title,
				completed: false,
			},
		])

		setInput("")
	}

	const toggleItem = (id) => {
		setItems((current) =>
			current.map((item) =>
				item.id === id
					? { ...item, completed: !item.completed }
					: item
			)
		)
	}

	const removeItem = (id) => {
		setItems((current) =>
			current.filter((item) => item.id !== id)
		)
	}

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			event.preventDefault()
			addItem()
		}
	}

	return (
		<div>
			<div className="mb-3">
				<label className="text-sm font-medium text-zinc-300">
					Checklist
				</label>

				<p className="mt-1 text-xs text-zinc-600">
					Break this task into smaller steps.
				</p>
			</div>

			{/* Items */}
			{items.length > 0 && (
				<div className="mb-3 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
					{items.map((item, index) => (
						<div
							key={item.id}
							className={`flex items-center gap-3 px-3 py-3 ${index !== items.length - 1
									? "border-b border-zinc-800"
									: ""
								}`}
						>
							<button
								type="button"
								onClick={() => toggleItem(item.id)}
								className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${item.completed
										? "border-blue-500 bg-blue-600"
										: "border-zinc-700 hover:border-zinc-500"
									}`}
							>
								{item.completed && (
									<Check className="h-3 w-3 text-white" />
								)}
							</button>

							<span
								className={`flex-1 text-sm ${item.completed
										? "text-zinc-600 line-through"
										: "text-zinc-300"
									}`}
							>
								{item.title}
							</span>

							<button
								type="button"
								onClick={() => removeItem(item.id)}
								className="text-zinc-600 hover:text-zinc-300"
							>
								<X className="h-4 w-4" />
							</button>
						</div>
					))}
				</div>
			)}

			<div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3">
				<Plus className="h-4 w-4 shrink-0 text-zinc-600" />

				<input
					type="text"
					value={input}
					onChange={(event) => setInput(event.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Add checklist item..."
					className="h-11 w-full bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-600"
				/>

				{input.trim() && (
					<button
						type="button"
						onClick={addItem}
						className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-blue-400 hover:bg-blue-500/10"
					>
						Add
					</button>
				)}
			</div>
		</div>
	)
}
