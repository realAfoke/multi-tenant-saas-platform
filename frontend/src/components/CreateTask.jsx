import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppState } from "@/hooks/apptools"
import { instance } from "@/api/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import StageOne from "./StageOne"
import StageTwo from "./StageTwo"
import StageThree from "./StageThree"

export default function CreateTask({
	members,
	handleCreateTask,
}) {

	const { selectedChannel, selectedWorkspace } = useAppState()
	// const navigate = useNavigate()

	const [stage, setStage] = useState(1)

	const [taskData, setTaskData] = useState({
		title: "",
		description: "",
		priority: "normal",
		dueDate: null,
		members: [],
		checkList: [],
		attachments: [],
	})
	const queryClient = useQueryClient()

	const updateTask = (field, value) => {
		setTaskData((prev) => ({
			...prev,
			[field]: value,
		}))
	}

	const nextStage = () => {
		if (stage < 3) {
			setStage((prev) => prev + 1)
		}
	}

	const previousStage = () => {
		if (stage > 1) {
			setStage((prev) => prev - 1)
		}
	}

	const createTask = useMutation({
		mutationFn: async () => {
			const response = await instance.post(`workspaces/channel/${selectedChannel?.id}/tasks/`, { ...taskData, channel: selectedChannel?.id })
			return response.data
		},
		onSuccess: (newTask) => {
			queryClient.setQueryData([selectedWorkspace?.id, 'channel', selectedChannel?.id], (old) => {
				const taskIdsAndValue = new Map(old?.tasks?.map(obj => [obj.id, obj]))
				taskIdsAndValue.set(newTask?.id, newTask)
				const newUpdate = Array.from(taskIdsAndValue.values())
				const ret = {
					...old ?? {},
					tasks: newUpdate
				}
				console.log('ret:', ret)
				return ret
			})
		}
	})

	return (
		<div className="min-h-full bg-zinc-950 text-white pt-[4rem]">
			{/* Header */}
			<div className="px-4 py-5 md:px-8">
				<div className="mx-auto max-w-4xl">
					<h1 className="text-xl font-semibold">Create task</h1>
					<p className="mt-1 text-sm text-zinc-500">
						Create and assign a task to your team.
					</p>

					{/* Progress */}
					<div className="mt-6 flex items-center gap-3">
						{[
							{ id: 1, label: "Details" },
							{ id: 2, label: "Planning" },
							{ id: 3, label: "Extras" },
						].map((item, index) => (
							<div key={item.id} className="flex items-center gap-3">
								<div className="flex items-center gap-2">
									<div
										className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${stage >= item.id
											? "bg-blue-600 text-white"
											: "border border-zinc-700 text-zinc-500"
											}`}
									>
										{item.id}
									</div>

									<span
										className={`hidden text-sm sm:block ${stage >= item.id
											? "text-zinc-200"
											: "text-zinc-500"
											}`}
									>
										{item.label}
									</span>
								</div>

								{index < 2 && (
									<div className="h-px w-8 bg-zinc-800 sm:w-16" />
								)}
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="mx-auto max-w-4xl px-4 py-4 md:px-8">
				{stage === 1 && (
					<StageOne
						taskData={taskData}
						updateTask={updateTask}
					/>
				)}

				{stage === 2 && (
					<StageTwo
						taskData={taskData}
						updateTask={updateTask}
						setTaskData={setTaskData}
						members={members}
					/>
				)}

				{stage === 3 && (
					<StageThree
						taskData={taskData}
					/>
				)}
			</div>

			<div className="px-4 py-4 md:px-8">
				<div className="mx-auto flex max-w-4xl items-center justify-between">
					<Button
						variant="ghost"
						onClick={() => {
							if (stage === 1) {
								handleCreateTask(false)
							} else {
								previousStage()
							}
						}}
						className="text-zinc-400 hover:bg-zinc-900 hover:text-white"
					>
						<ArrowLeft className="mr-2 h-4 w-4" />

						{stage === 1 ? "Cancel" : "Back"}
					</Button>

					{stage < 3 ? (
						<Button
							onClick={nextStage}
							disabled={stage === 1 && !taskData.title.trim()}
							className="bg-blue-600 hover:bg-blue-500"
						>
							Continue
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					) : (
						<Button
							onClick={() => createTask.mutate()}
							disabled={!taskData.title.trim()}
							className="bg-blue-600 hover:bg-blue-500"
						>
							Create task
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}
