import {
	ArrowLeft,
	ArrowRight,
	ArrowLeftIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTaskMutationOption } from "@/mutationOptions/mutationOption"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import User from "./User.jsx"
import StageOne from "./StageOne.jsx"
import StageTwo from "./StageTwo.jsx"
import StageThree from "./StageThree.jsx"

export default function CreateTask({ project, handleCreateTask }) {
	const members = project?.projectMembers
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const [stage, setStage] = useState(1)

	const [addMembers, setAddMembers] = useState(false)
	const [taskData, setTaskData] = useState({
		title: "Trigonometry",
		description: "learn basic trigonometry",
		priority: "normal",
		dueDate: "",
		members: [23, 32],
		checkList: [{ id: 1, title: 'learn consine', status: false }, { id: 2, title: 'learn sine', status: false }, { id: 3, title: 'learn tangent', status: false }],
		attachments: [],
	})

	const createTask = useMutation(
		createTaskMutationOption(queryClient)
	)


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

	const handleSubmit = () => {

		createTask.mutate(
			{
				wk: project?.workspace,
				prjId: project?.id,

				data: {
					title: taskData.title,
					description: taskData.description,
					priority: taskData.priority,
					// due_date: taskData.dueDate,
					members: taskData.members,
					checkList: taskData.checkList,
				},
			},
			{
				onSuccess: () => {
					navigate("board")
					handleCreateTask(false)
				},
			}
		)
	}

	const setTaskMembers = (update) => {
		setTaskData((prev) => ({
			...prev,
			members: typeof update === 'function' ? update(prev.members) : update
		}))
	}

	return (

		<div className={` max-w-4xl mx-auto text-white`}>

			<div className="mb-8">

				<button
					className="flex items-center gap-2 text-zinc-500 hover:text-white transition mb-5"
					onClick={() => handleCreateTask(false)}
				>
					<ArrowLeft className="w-4 h-4" />
					Back
				</button>

			</div>

			<div className="flex items-center mb-8">

				{[
					["1", "Details"],
					["2", "Planning"],
					["3", "Extras"],
				].map(([number, label], index) => {

					const current = Number(number) === stage
					const completed = Number(number) < stage

					return (
						<div
							key={number}
							className="flex items-center flex-1"
						>

							<div className="flex items-center gap-3">

								<div
									className={`
										w-9 h-9 rounded-full
										flex items-center justify-center
										text-sm font-semibold
										transition
										${current || completed
											? "bg-blue-500 text-white"
											: "bg-zinc-900 text-zinc-500 border border-zinc-800"
										}
									`}
								>
									{number}
								</div>

								<span
									className={
										current
											? "text-white text-sm font-medium"
											: "text-zinc-500 text-sm"
									}
								>
									{label}
								</span>

							</div>

							{index < 2 && (
								<div
									className={`
										h-px flex-1 mx-4
										${stage > index + 1
											? "bg-blue-500"
											: "bg-zinc-800"
										}
									`}
								/>
							)}

						</div>
					)
				})}

			</div>


			<div className={`flex gap-2`}>
				<Card className="bg-zinc-900 flex-3 border-zinc-800">

					<CardContent className="p-7">
						{stage === 1 && <StageOne taskData={taskData} updateTask={updateTask} />}
						{stage === 2 && <StageTwo taskData={taskData} updateTask={updateTask} setTaskData={setTaskData} handleAddMember={setAddMembers} members={members} />}
						{stage === 3 && <StageThree taskData={taskData} updateTask={updateTask} />}
						<div className="flex justify-between border-t border-zinc-800 mt-8 pt-6">

							{stage > 1 ? (

								<Button
									variant="outline"
									onClick={previousStage}
									className="rounded-xl border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
								>
									<ArrowLeftIcon className="w-4 h-4 mr-2" />
									Back
								</Button>

							) : (

								<Button
									variant="outline"
									onClick={() => handleCreateTask(false)}
									className="rounded-xl border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
								>
									Cancel
								</Button>

							)}


							{stage < 3 ? (

								<Button
									disabled={
										stage === 1 &&
										!taskData.title.trim()
									}
									onClick={nextStage}
									className="rounded-xl bg-blue-500 hover:bg-blue-600"
								>
									Continue
									<ArrowRight className="w-4 h-4 ml-2" />
								</Button>

							) : (

								<Button
									disabled={
										!taskData.title.trim() ||
										createTask.isPending
									}
									onClick={handleSubmit}
									className="rounded-xl bg-blue-500 hover:bg-blue-600 px-6"
								>
									{createTask.isPending
										? "Creating..."
										: "Create Task"
									}
								</Button>

							)}

						</div>

					</CardContent>

				</Card>
				{addMembers && <div className="p-3 border-l border-red-zinc flex-1">
					<div className="max-h-64 overflow-auto">
						{members?.map((member) => (
							<User key={member?.id} member={member} projectMembers={taskData.members} addUserToProject={setTaskMembers} />
						))}
					</div>
				</div>
				}
			</div>


		</div>
	)
}

