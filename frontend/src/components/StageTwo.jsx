import { useRef, useState } from "react"
import {
	CheckSquare,
	Plus,
	Paperclip,
	X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AssigneePicker from "./AssigneePicker"



const formatFileSize = (bytes) => {
	if (!bytes) return ""

	if (bytes < 1024) {
		return `${bytes} B`
	}

	if (bytes < 1024 * 1024) {
		return `${(bytes / 1024).toFixed(1)} KB`
	}

	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}


export default function StageTwo({
	taskData,
	updateTask,
	setTaskData,
	members = [],
}) {
	console.log(taskData)
	const [checklistInput, setChecklistInput] = useState("")
	const checklistId = useRef(4)


	const addChecklistItem = () => {
		const title = checklistInput.trim()

		if (!title) return

		setTaskData((prev) => ({
			...prev,
			checkList: [
				...prev.checkList,
				{
					id: checklistId.current++,
					title,
					status: false,
				},
			],
		}))

		setChecklistInput("")
	}

	const removeChecklistItem = (id) => {
		setTaskData((prev) => ({
			...prev,
			checkList: prev.checkList.filter((item) => item.id !== id),
		}))
	}

	const handleChecklistKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault()
			addChecklistItem()
		}
	}

	const toggleMember = (memberId) => {
		setTaskData((prev) => {
			const exists = prev.members.includes(memberId)

			return {
				...prev,
				members: exists
					? prev.members.filter((id) => id !== memberId)
					: [...prev.members, memberId],
			}
		})
	}

	return (
		<div className="space-y-6">

			<AssigneePicker />
			<div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2">
				<div>
					<div className="mb-3 flex items-center gap-2">
						<CheckSquare className="h-4 w-4 text-zinc-500" />

						<h2 className="text-sm font-medium text-zinc-200">
							Checklist
						</h2>
					</div>

					<div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
						<div className="space-y-2 flex items-center overflow-auto">
							{taskData.checkList.map((item) => (
								<div
									key={item.id}
									className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5"
								>
									<div className="h-4 w-4 shrink-0 rounded border border-zinc-700" />

									<p className="flex-1 text-sm text-zinc-300">
										{item.title}
									</p>

									<button
										type="button"
										onClick={() => removeChecklistItem(item.id)}
										className="text-zinc-600 transition hover:text-red-400"
									>
										<X className="h-4 w-4" />
									</button>
								</div>
							))}
						</div>

						<div className="mt-3 flex gap-2">
							<Input
								value={checklistInput}
								onChange={(e) => setChecklistInput(e.target.value)}
								onKeyDown={handleChecklistKeyDown}
								placeholder="Add checklist item..."
								className="border-zinc-800 bg-zinc-950 text-white"
							/>

							<Button
								type="button"
								variant="outline"
								onClick={addChecklistItem}
								disabled={!checklistInput.trim()}
								className="shrink-0 border-zinc-800 bg-zinc-950 hover:bg-zinc-800"
							>
								<Plus className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>

				{/* Attachments */}
				<div className="">
					<div className="mb-4 flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Paperclip className="h-4 w-4 text-zinc-500" />

							<h3 className="text-sm font-medium text-zinc-200">
								Attachments
							</h3>
						</div>

						<span className="text-xs text-zinc-500">
							{taskData.attachments?.length || 0}
						</span>
					</div>

					{taskData.attachments?.length > 0 ? (
						<div className="space-y-2">
							{taskData.attachments.map((file, index) => (
								<div
									key={file.id || index}
									className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5"
								>
									<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-900">
										<Paperclip className="h-4 w-4 text-zinc-500" />
									</div>

									<div className="min-w-0 flex-1">
										<p className="truncate text-sm text-zinc-300">
											{file.name || "Attachment"}
										</p>

										{file.size && (
											<p className="text-xs text-zinc-600">
												{formatFileSize(file.size)}
											</p>
										)}
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="rounded-lg border border-dashed border-zinc-800 bg-zinc-950 px-6 py-8 text-center">
							<div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900">
								<Paperclip className="h-5 w-5 text-zinc-500" />
							</div>

							<p className="mt-3 text-sm text-zinc-400">
								No attachments added
							</p>

							<p className="mt-1 text-xs text-zinc-600">
								You can add files when creating the task.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
// import {
// 	PlusIcon,
// 	CalendarDays,
// 	UserPlus,
// 	Flag,
// 	CheckSquare,
// } from "lucide-react"
//
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { useState, useRef } from "react"
//
// export default function StageTwo({ taskData, updateTask, setTaskData, handleAddMember, members }) {
// 	const [checkListInput, setCheckListInput] = useState("");
// 	const priorities = ["high", "normal", "medium"]
// 	let checkListId = useRef(1)
//
// 	const [addCheckList, setAddCheckList] = useState(false)
// 	// const isPriority = taskData.priority === priority
// 	const red = taskData.priority === 'high'
// 	const green = taskData.priority === 'normal'
// 	const blue = taskData.priority === 'medium'
//
// 	let priorityColor = red ? 'bg-red-500/20 border-red-500 text-red-400' : blue ? 'bg-blue-500/20 border-blue-500 text-blue-400' : green ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white'
//
// 	return (
// 		<div className="space-y-5">
//
// 			<div>
// 				<p className="text-sm text-zinc-500 mt-1">
// 					Set priority, deadline and ownership.
// 				</p>
//
// 			</div>
//
// 			<div className="flex flex-wrap gap-2">
// 				<div className="flex-1">
// 					<div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
//
// 						<div className="flex items-center gap-3 mb-4">
//
// 							<div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
//
// 								<Flag className="w-5 h-5 text-red-400" />
//
// 							</div>
//
// 							<div>
//
// 								<p className="text-sm text-white">
// 									Priority
// 								</p>
//
// 								<p className="text-xs text-zinc-500">
// 									How urgent is this task?
// 								</p>
//
// 							</div>
//
// 						</div>
//
//
// 						<div className="flex gap-2">
//
// 							{priorities.map((priority) => (
//
// 								<button
// 									key={priority}
// 									onClick={() =>
// 										updateTask(
// 											"priority",
// 											priority
// 										)
// 									}
// 									className={`
// 												px-4 py-2
// 												rounded-lg
// 												text-sm
// 												border
// 												transition
// 												${priorityColor}
// 											`}
// 								>
// 									{priority}
// 								</button>
//
// 							))}
//
// 						</div>
//
// 					</div>
//
// 					<div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
//
// 						<div className="flex items-center gap-3 mb-4">
//
// 							<div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
//
// 								<CalendarDays className="w-5 h-5 text-zinc-400" />
//
// 							</div>
//
// 							<div>
//
// 								<p className="text-sm text-white">
// 									Due Date
// 								</p>
//
// 								<p className="text-xs text-zinc-500">
// 									When should this be finished?
// 								</p>
//
// 							</div>
//
// 						</div>
//
//
// 						<Input
// 							type="date"
// 							value={taskData.dueDate}
// 							onChange={(e) =>
// 								updateTask(
// 									"dueDate",
// 									e.target.value
// 								)
// 							}
// 							className="bg-zinc-900 border-zinc-800"
// 						/>
//
// 					</div>
//
// 					<div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5" onClick={() => handleAddMember((prev) => !prev)}>
//
// 						<div className="flex items-center gap-3">
//
// 							<div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
//
// 								<UserPlus className="w-5 h-5 text-zinc-400" />
//
// 							</div>
//
// 							<div>
//
// 								<p className="text-sm text-white">
// 									Assignee
// 								</p>
//
// 								{taskData.members.length < 1 &&
// 									<p className="text-xs text-zinc-500 mt-1">
// 										Assign this task to someone
// 									</p>
// 								}
// 								<div className="flex items-center gap-2">
// 									<div className="flex -space-x-4">
// 										{taskData?.members?.slice(0, 10)?.map((id) => {
// 											const mem = members?.find((member) => member?.member?.id == id)
// 											const user = mem?.member?.user ?? {}
// 											return (<User key={user.id} user={user} />)
// 										})}
// 									</div>
//
// 									<p className="text-gray-400 text-xs">{`${taskData.members.length}${taskData.members.length > 10 ? '+' : ''} members selected`}</p>
// 								</div>
//
//
// 							</div>
//
// 						</div>
//
// 					</div>
//
// 				</div>
// 				<div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
//
// 					<div className="flex items-center justify-between">
//
// 						<div className="flex items-center gap-3">
//
// 							<div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
//
// 								<CheckSquare className="w-5 h-5 text-zinc-400" />
//
// 							</div>
//
// 							<div>
//
// 								<p className="text-sm text-white">
// 									Checklist
// 								</p>
//
// 								<p className="text-xs text-zinc-500 mt-1">
// 									Add steps to complete the task
// 								</p>
//
// 							</div>
//
// 						</div>
//
// 						<Button
// 							variant="ghost"
// 							onClick={() =>
// 								setAddCheckList(true)
// 							}
// 							className="text-blue-400"
// 						>
// 							<PlusIcon className="w-4 h-4" />
// 						</Button>
//
// 					</div>
//
// 					{addCheckList && (
// 						<div className="mt-4 border-t border-zinc-800 pt-4">
//
//
// 							<Input
// 								value={checkListInput}
// 								onChange={(e) => setCheckListInput(e.target.value)}
// 								onKeyDown={(e) => {
// 									if (e.key === "Enter") {
// 										e.preventDefault();
//
// 										const title = checkListInput.trim();
//
// 										if (!title) return;
//
// 										setTaskData((prev) => ({
// 											...prev,
// 											checkList: [
// 												...prev.checkList,
// 												{
// 													id: checkListId.current,
// 													title,
// 													status: false,
// 												},
// 											],
// 										}));
// 										checkListId.current = checkListId.current + 1
//
// 										setCheckListInput("");
// 									}
// 								}}
// 								placeholder="Add checklist item..."
// 								className="text-white bg-zinc-900 border-zinc-800"
// 							/>
//
// 						</div>
// 					)}
// 					<div className="mt-2">{taskData.checkList.map((list) => (
// 						<p key={list?.id} className="p-1">
// 							<span className="text-gray-200">{list?.id}.</span>
// 							<span className="text-gray-200">{list?.title}</span>
// 						</p>
// 					))}</div>
//
// 				</div>
// 			</div>
//
// 		</div>
//
// 	)
//
// }
//
//
//
// function User({ user }) {
// 	const initials = `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase()
// 	return (
// 		<div className="flex items-center gap-3 rounded-xl hover:bg-zinc-800/60 transition-colors group">
// 			<div className="relative shrink-0">
// 				{user?.profilePic ? (
// 					<img src={user.profilePic} className="w-11 h-11 rounded-full object-cover" />
// 				) : (
// 					<div className="w-8 h-8 rounded-full bg-blue-500 shadow-lg border-1 border-black flex items-center justify-center text-white font-semibold">
// 						{initials}
// 					</div>
// 				)
// 				}
// 			</div>
// 		</div>
// 	)
//
// }
//<div>
// 	<div className="mb-3 flex items-center gap-2">
// 		<UserPlus className="h-4 w-4 text-zinc-500" />
//
// 		<h2 className="text-sm font-medium text-zinc-200">
// 			Assignees
// 		</h2>
// 	</div>
//
// 	<div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
// 		<div className="mb-4 flex items-center justify-between">
// 			<p className="text-sm text-zinc-400">
// 				Select members responsible for this task.
// 			</p>
//
// 			<span className="text-xs text-zinc-500">
// 				{taskData.members.length} selected
// 			</span>
// 		</div>
//
// 		<div className="space-y-2">
// 			{members.map((member) => {
// 				const memberData = member?.member
// 				const user = memberData?.user
// 				const memberId = memberData?.id
//
// 				if (!user || !memberId) return null
//
// 				const selected = taskData.members.includes(memberId)
//
// 				return (
// 					<button
// 						key={memberId}
// 						type="button"
// 						onClick={() => toggleMember(memberId)}
// 						className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition ${selected
// 							? "border-blue-500/40 bg-blue-500/10"
// 							: "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
// 							}`}
// 					>
// 						<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xs font-medium text-zinc-300">
// 							{user.first_name?.[0] ||
// 								user.username?.[0] ||
// 								"U"}
// 						</div>
//
// 						<div className="min-w-0 flex-1">
// 							<p className="truncate text-sm text-zinc-200">
// 								{user.first_name || user.username}
// 							</p>
//
// 							{user.email && (
// 								<p className="truncate text-xs text-zinc-500">
// 									{user.email}
// 								</p>
// 							)}
// 						</div>
//
// 						<div
// 							className={`flex h-5 w-5 items-center justify-center rounded border ${selected
// 								? "border-blue-500 bg-blue-600"
// 								: "border-zinc-700"
// 								}`}
// 						>
// 							{selected && (
// 								<span className="text-xs text-white">✓</span>
// 							)}
// 						</div>
// 					</button>
// 				)
// 			})}
// 		</div>
// 	</div>
// </div>

