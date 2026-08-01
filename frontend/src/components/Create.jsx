import { Input } from "./ui/input"
import { Card, CardTitle, CardContent, CardHeader } from "./ui/card"
import { Button } from "./ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProjectMutationOption, createTaskMutationOption } from "@/mutationOptions/mutationOption"
import { useAppState } from "@/hooks/apptools"


export default function Create() {
	const { prjName } = useParams()
	const { selectedWorkspace, selectedProject, selectedTask } = useAppState()
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	
	// console.log('q:',queryClient)
	const createProject = useMutation(createProjectMutationOption(queryClient))
	const createTask = useMutation(createTaskMutationOption(queryClient))

	let text = 'Create A New Workspace'

	useEffect(() => {
		if (selectedWorkspace?.name && selectedProject?.name) {
			navigate(`/dashboard/${selectedWorkspace?.name}/${selectedProject?.name}/add-new-task`, { replace: true })
		} else if (selectedWorkspace?.name) {
			navigate(`/dashboard/${selectedWorkspace?.name}/add-new-project`, { replace: true })
		}
		else {
			navigate('/dashboard/create-new-workspace', { replace: true })
		}

	}, [selectedWorkspace?.name, selectedProject?.name, selectedTask?.name])

	return (
		<div className="flex flex-col h-screen items-center py-10">
			<div className=" text-white font-semibold text-2xl  py-5 max-w-90 tracking-4 leading-8">{text}</div>
			<Card className='bg-inherit md:min-w-120'>
				<div className="flex flex-col">
					<CardHeader>
						<CardTitle className='text-white capitalize my-3'>
							Add new {prjName ? 'Task' : 'Project'}
						</CardTitle>
					</CardHeader>
					<CardContent className='flex flex-col gap-7'>
						<div className="*:my-2">
							<label className="text-white">
								Project Name
							</label>
							<Input placeholder='enter project name' className='bg-[#fffefe30] border-0 text-white outline-none rounded-sm p-3 py-5' value={name} onChange={(e) => setName(e.target.value)} />
						</div>
						<div className="*:my-2 flex flex-col">
							<label className="text-white">
								Project description
							</label>
							<textarea className="min-h-30 p-3 bg-[#fffefe30] rounded-sm outline text-white" placeholder="short project description" value={description} onChange={(e) => setDescription(e.target.value)}>
							</textarea>
						</div>
					</CardContent>
					<div className="self-end m-2 mr-8" onClick={async () => {
						prjName ? createTask.mutate({ wk: selectedWorkspace?.id, prjId: selectedProject?.id, data: { title: name, description: description } }) : createProject.mutate({ wk: selectedWorkspace?.id, data: { name: name, description: description } })
					}}>
						<Button className='bg-blue-500 text-white p-4 rounded-sm shadow-lg'>
							{prjName ? 'create task' : 'create project'}
						</Button>
					</div>


				</div>
			</Card>

		</div>
	)
}


// #010113eb
