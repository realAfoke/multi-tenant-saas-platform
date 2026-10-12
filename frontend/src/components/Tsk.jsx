import { useState } from "react";
import {
	Check,
	ChevronDown,
	CalendarDays,
	Plus,
	X,
} from "lucide-react";
import AssigneePicker from "./AssigneePicker";
import TaskChecklist from "./CheckList";

export default function CreateTask() {
	const [priority, setPriority] = useState("Normal");
	const [assignees, setAssignees] = useState([]);
	const [checklist, setChecklist] = useState([]);
	const members = [
		{ id: 1, name: "John Doe", email: "john@example.com" },
		{ id: 2, name: "Sarah Smith", email: "sarah@example.com" },
		{ id: 3, name: "Michael", email: "michael@example.com" },
		{ id: 4, name: "David", email: "david@example.com" },
	]
	return (
		<div className="min-h-full bg-zinc-950 px-6 py-10 text-zinc-100">
			<div className="mx-auto max-w-3xl">
				{/* Header */}
				<div className="mb-8">
					<div className="mb-2 text-sm text-zinc-500">
						# backend
					</div>

					<h1 className="text-2xl font-semibold tracking-tight">
						Create task
					</h1>

					<p className="mt-1 text-sm text-zinc-500">
						Create a task for this channel.
					</p>
				</div>

				{/* Form */}
				<div className="space-y-7">
					{/* Title */}
					<div>
						<label className="mb-2 block text-sm font-medium text-zinc-300">
							Task title
						</label>

						<input
							type="text"
							placeholder="What needs to be done?"
							className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-zinc-600"
						/>
					</div>

					{/* Description */}
					<div>
						<label className="mb-2 block text-sm font-medium text-zinc-300">
							Description
						</label>

						<textarea
							rows={5}
							placeholder="Describe what this task is about..."
							className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-zinc-600"
						/>
					</div>

					<div className="h-px bg-zinc-900" />

					{/* Priority + Due date */}
					<div className="grid gap-5 sm:grid-cols-2">
						{/* Priority */}
						<div>
							<label className="mb-2 block text-sm font-medium text-zinc-300">
								Priority
							</label>

							<button
								type="button"
								className="flex w-full items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm"
							>
								<span>{priority}</span>
								<ChevronDown className="h-4 w-4 text-zinc-500" />
							</button>
						</div>

						{/* Due date */}
						<div>
							<label className="mb-2 block text-sm font-medium text-zinc-300">
								Due date
							</label>

							<button
								type="button"
								className="flex w-full items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-500"
							>
								<CalendarDays className="h-4 w-4" />
								<span>No due date</span>
							</button>
						</div>
					</div>

					{/* Assignees */}
					<AssigneePicker members={members} />
					{/* Checklist */}
					<div>
						<div className="mb-3">
							<label className="text-sm font-medium text-zinc-300">
								Checklist
							</label>

							<p className="mt-1 text-xs text-zinc-600">
								Break this task into smaller steps.
							</p>
						</div>

						<div className="space-y-2">
							{checklist.map((item) => (
								<div
									key={item.id}
									className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5"
								>
									<div className="h-4 w-4 rounded border border-zinc-700" />

									<span className="flex-1 text-sm text-zinc-400">
										{item.title}
									</span>

									<button type="button">
										<X className="h-4 w-4 text-zinc-600 hover:text-zinc-300" />
									</button>
								</div>
							))}
						</div>
						<TaskChecklist />
					</div>

					{/* Actions */}
					<div className="flex items-center justify-end gap-3 border-t border-zinc-900 pt-6">
						<button
							type="button"
							className="rounded-lg px-4 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
						>
							Cancel
						</button>

						<button
							type="button"
							className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500"
						>
							Create task
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}






// <div>
// 			<div className="mb-2 flex items-center justify-between">
// 				<label className="text-sm font-medium text-zinc-300">
// 					Assignees
// 				</label>
//
// 				<button
// 					type="button"
// 					className="text-xs text-zinc-500 hover:text-zinc-300"
// 				>
// 					+ Add assignee
// 				</button>
// 			</div>
//
// 			<div className="min-h-12 rounded-lg border border-zinc-800 bg-zinc-900 p-2">
// 				{assignees.length === 0 ? (
// 					<div className="flex h-8 items-center px-2 text-sm text-zinc-600">
// 						No assignees
// 					</div>
// 				) : (
// 					<div className="flex flex-wrap gap-2">
// 						{assignees.map((assignee) => (
// 							<div
// 								key={assignee.id}
// 								className="flex items-center gap-2 rounded-md bg-zinc-800 px-2.5 py-1.5 text-xs"
// 							>
// 								<div className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-700">
// 									{assignee.name.charAt(0)}
// 								</div>
//
// 								<span>{assignee.name}</span>
//
// 								<button type="button">
// 									<X className="h-3.5 w-3.5 text-zinc-500 hover:text-zinc-200" />
// 								</button>
// 							</div>
// 						))}
// 					</div>
// 				)}
// 			</div>
// 		</div>
//

