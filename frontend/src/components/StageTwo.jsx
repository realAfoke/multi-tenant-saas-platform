import {
	PlusIcon,
	CalendarDays,
	UserPlus,
	Flag,
	CheckSquare,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useRef } from "react"

export default function StageTwo({ taskData, updateTask, setTaskData, handleAddMember, members }) {
	const [checkListInput, setCheckListInput] = useState("");
	const priorities = ["high", "normal", "medium"]
	let checkListId = useRef(1)

	const [addCheckList, setAddCheckList] = useState(false)
	// const isPriority = taskData.priority === priority
	const red = taskData.priority === 'high'
	const green = taskData.priority === 'normal'
	const blue = taskData.priority === 'medium'

	let priorityColor = red ? 'bg-red-500/20 border-red-500 text-red-400' : blue ? 'bg-blue-500/20 border-blue-500 text-blue-400' : green ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white'

	return (
		<div className="space-y-5">

			<div>

				<p className="text-sm text-blue-400 font-medium">
					Step 2
				</p>

				<h2 className="text-xl font-semibold mt-1">
					Plan the task
				</h2>

				<p className="text-sm text-zinc-500 mt-1">
					Set priority, deadline and ownership.
				</p>

			</div>

			<div className="flex flex-wrap gap-2">
				<div className="flex-1">
					<div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

						<div className="flex items-center gap-3 mb-4">

							<div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">

								<Flag className="w-5 h-5 text-red-400" />

							</div>

							<div>

								<p className="text-sm text-white">
									Priority
								</p>

								<p className="text-xs text-zinc-500">
									How urgent is this task?
								</p>

							</div>

						</div>


						<div className="flex gap-2">

							{priorities.map((priority) => (

								<button
									key={priority}
									onClick={() =>
										updateTask(
											"priority",
											priority
										)
									}
									className={`
												px-4 py-2
												rounded-lg
												text-sm
												border
												transition
												${priorityColor}
											`}
								>
									{priority}
								</button>

							))}

						</div>

					</div>

					<div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

						<div className="flex items-center gap-3 mb-4">

							<div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">

								<CalendarDays className="w-5 h-5 text-zinc-400" />

							</div>

							<div>

								<p className="text-sm text-white">
									Due Date
								</p>

								<p className="text-xs text-zinc-500">
									When should this be finished?
								</p>

							</div>

						</div>


						<Input
							type="date"
							value={taskData.dueDate}
							onChange={(e) =>
								updateTask(
									"dueDate",
									e.target.value
								)
							}
							className="bg-zinc-900 border-zinc-800"
						/>

					</div>

					<div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5" onClick={() => handleAddMember((prev) => !prev)}>

						<div className="flex items-center gap-3">

							<div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">

								<UserPlus className="w-5 h-5 text-zinc-400" />

							</div>

							<div>

								<p className="text-sm text-white">
									Assignee
								</p>

								{taskData.members.length < 1 &&
									<p className="text-xs text-zinc-500 mt-1">
										Assign this task to someone
									</p>
								}
								<div className="flex items-center gap-2">
									<div className="flex -space-x-4">
										{taskData.members.slice(0, 10).map((id) => {
											const mem = members.find((member) => member?.member?.id == id)
											const user = mem?.member?.user ?? {}
											return (<User key={user.id} user={user} />)
										})}
									</div>

									<p className="text-gray-400 text-xs">{`${taskData.members.length}${taskData.members.length > 10 ? '+' : ''} members selected`}</p>
								</div>


							</div>

						</div>

					</div>

				</div>
				<div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

					<div className="flex items-center justify-between">

						<div className="flex items-center gap-3">

							<div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">

								<CheckSquare className="w-5 h-5 text-zinc-400" />

							</div>

							<div>

								<p className="text-sm text-white">
									Checklist
								</p>

								<p className="text-xs text-zinc-500 mt-1">
									Add steps to complete the task
								</p>

							</div>

						</div>

						<Button
							variant="ghost"
							onClick={() =>
								setAddCheckList(true)
							}
							className="text-blue-400"
						>
							<PlusIcon className="w-4 h-4" />
						</Button>

					</div>

					{addCheckList && (
						<div className="mt-4 border-t border-zinc-800 pt-4">


							<Input
								value={checkListInput}
								onChange={(e) => setCheckListInput(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();

										const title = checkListInput.trim();

										if (!title) return;

										setTaskData((prev) => ({
											...prev,
											checkList: [
												...prev.checkList,
												{
													id: checkListId.current,
													title,
													status: false,
												},
											],
										}));
										checkListId.current = checkListId.current + 1

										setCheckListInput("");
									}
								}}
								placeholder="Add checklist item..."
								className="text-white bg-zinc-900 border-zinc-800"
							/>

						</div>
					)}
					<div className="mt-2">{taskData.checkList.map((list) => (
						<p key={list?.id} className="p-1">
							<span className="text-gray-200">{list?.id}.</span>
							<span className="text-gray-200">{list?.title}</span>
						</p>
					))}</div>

				</div>
			</div>

		</div>

	)

}



function User({ user }) {
	const initials = `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase()
	return (
		<div className="flex items-center gap-3 rounded-xl hover:bg-zinc-800/60 transition-colors group">
			<div className="relative shrink-0">
				{user?.profilePic ? (
					<img src={user.profilePic} className="w-11 h-11 rounded-full object-cover" />
				) : (
					<div className="w-8 h-8 rounded-full bg-blue-500 shadow-lg border-1 border-black flex items-center justify-center text-white font-semibold">
						{initials}
					</div>
				)
				}
			</div>
		</div>
	)

}
