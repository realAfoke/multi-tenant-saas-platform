import {
	ArrowLeft,
	CalendarDays,
	UserPlus,
	Flag,
	CheckSquare,
	Paperclip,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTaskMutationOption } from "@/mutationOptions/mutationOption"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CreateTask({ project, handleCreateTask }) {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const createTask = useMutation(createTaskMutationOption(queryClient))

	return (
		<div className="max-w-5xl mx-auto space-y-8 text-white">

			<div>
				<button className="flex items-center gap-2 text-zinc-500 hover:text-white transition mb-5" onClick={() => {
					handleCreateTask(false)
				}}>
					<ArrowLeft className="w-4 h-4" />
					Back
				</button>

				<p className="text-blue-400 text-sm font-medium">
					{project?.name}
				</p>

				<h1 className="text-3xl font-bold mt-2">
					Create Task
				</h1>

				<p className="text-zinc-400 mt-2">
					Add a piece of work to this project.
				</p>
			</div>

			<Card className="bg-zinc-900 border-zinc-800">
				<CardContent className="p-7 space-y-7">

					<div>
						<label className="text-sm font-medium text-zinc-300">
							Task Name
						</label>

						<Input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="e.g. Implement authentication API"
							className="mt-2 px-5 h-12 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600"
						/>
					</div>

					<div>
						<label className="text-sm font-medium text-zinc-300">
							Description
						</label>

						<textarea
							rows={6}
							placeholder="Describe what needs to be done..."
							className="mt-2 w-full rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-600 outline-none p-4 resize-none focus:border-blue-500"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>

					<div className="grid md:grid-cols-2 gap-5">

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

								<button className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
									High
								</button>

								<button className="px-4 py-2 rounded-lg border border-zinc-800 text-zinc-500 text-sm hover:text-white">
									Medium
								</button>

								<button className="px-4 py-2 rounded-lg border border-zinc-800 text-zinc-500 text-sm hover:text-white">
									Low
								</button>

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
								className="bg-zinc-900 border-zinc-800 text-white"
							/>

						</div>

					</div>

					<div className="grid md:grid-cols-2 gap-5">

						<div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

							<div className="flex items-center gap-3">
								<UserPlus className="w-5 h-5 text-zinc-400" />

								<div>
									<p className="text-sm text-white">
										Assignee
									</p>

									<p className="text-xs text-zinc-500 mt-1">
										Assign this task to someone
									</p>
								</div>
							</div>

						</div>

						<div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

							<div className="flex items-center gap-3">
								<CheckSquare className="w-5 h-5 text-zinc-400" />

								<div>
									<p className="text-sm text-white">
										Checklist
									</p>

									<p className="text-xs text-zinc-500 mt-1">
										Add steps to complete the task
									</p>
								</div>
							</div>

						</div>

					</div>

					<div className="rounded-xl border border-dashed border-zinc-700 p-5 flex items-center gap-4 hover:border-blue-500 transition cursor-pointer">

						<div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
							<Paperclip className="w-5 h-5 text-zinc-400" />
						</div>

						<div>
							<p className="text-sm text-white">
								Add attachments
							</p>

							<p className="text-xs text-zinc-500 mt-1">
								Attach files related to this task
							</p>
						</div>

					</div>

					<div className="flex justify-end gap-3 pt-3">

						<Button
							variant="outline"
							className="rounded-xl border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
						>
							Cancel
						</Button>

						<Button className="rounded-xl bg-blue-500 hover:bg-blue-600 px-6" onClick={() => {
							createTask.mutate({
								wk: project?.workspace, prjId: project?.id, data: {
									title: title,
									description: description
								}
							},
								{
									onSuccess: () => {
										navigate('board')
										handleCreateTask(false)
									}
								})
						}}>
							Create Task
						</Button>

					</div>

				</CardContent>
			</Card>

		</div>
	)
}
