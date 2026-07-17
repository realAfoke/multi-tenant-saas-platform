import Members from "./Membersh"
import { Input } from "./ui/input"
import { Card, CardTitle, CardContent, CardHeader } from "./ui/card"
import { Button } from "./ui/button"
import { useAppStore } from "@/store/authStore"
import { useOutletContext, useParams, useNavigate } from "react-router-dom"
import { instance } from "@/api/axios"
import { useEffect, useState } from "react"

export default function Create() {
	const { wkName, prjName } = useParams()
	const { selectedWorkspace, selectedProject, setToggleWorkspace, selectedTask } = useOutletContext()
	const navigate = useNavigate()
	const workspace = useAppStore(state => state.cacheWorkspace.workspaces?.[selectedWorkspace?.id])
	const { projects } = useAppStore(state => state.cacheProjects)
	const addProject = useAppStore(state => state.setWkProject)
	const addTask = useAppStore(state => state.setTask)
	const addWorkspace = useAppStore(state => state.setWorkspace)
	const project = projects?.[selectedProject?.id]
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')

	let endpoint = ''
	let text = 'Create A New Workspace'
	let setter = addWorkspace
	if (selectedWorkspace?.id) {
		endpoint = `${selectedWorkspace?.id}/${selectedProject.id ? selectedProject?.id + '/tasks/' : 'projects/'}`
		text = `Create a new ${project ? `Task in ${project.name} of ${workspace.name}` : `Project in ${workspace?.name}`}`
		setter = selectedProject?.id ? addTask : addProject
	}
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


	// useEffect(() => {
	// 	if (selectedWorkspace?.name && selectedProject?.id) {
	// 		navigate(`/dashboard/${selectedWorkspace?.name}/${selectedProject?.name}/add-new-task`, { replace: true })
	// 	} else if (selectedWorkspace?.name) {
	// 		navigate(`/dashboard/${selectedWorkspace?.name}/add-new-project`, { replace: true })
	// 	}
	// 	else {
	// 		navigate('/dashboard/create-new-workspace', { replace: true })
	// 	}
	//
	// }, [selectedWorkspace?.wkName, selectedProject?.id])
	// useEffect(() => {
	// 	if (wkName) {
	// 		setSelectedWorkspace((prev) => ({ ...prev, wkName: selectedWorkspace?.id, show: true }))
	// 	}
	// 	if (prjName) {
	// 		setSelectedProject((prev) => ({ ...prev, wkName: selectedProject?.id, show: true }))
	// 	}
	//
	// }, [])

	async function create() {
		try {
			const nameField = selectedProject?.id ? 'title' : 'name'
			const createObj = await instance.post(`workspaces/${endpoint}`, { [nameField]: name, description: description, workspace: selectedWorkspace?.id, project: selectedProject?.id })
			setter(createObj.data, selectedProject?.id || selectedWorkspace?.id)
			if (!wkName) {
				setToggleWorkspace(true)
			}
			setDescription('')
			setName('')
		} catch (error) {
			console.error('Error:', error)
		}
	}
	return (
		<div className="flex flex-col h-screen items-center">
			<div className=" text-white font-semibold text-2xl  py-5 max-w-90 tracking-4 leading-8">{text}</div>
			<Card className='bg-inherit md:min-w-120'>
				<div className="flex flex-col">
					<CardHeader>
						<CardTitle className='text-white capitalize my-3'>
							Add new {project ? 'Task' : 'Project'}
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
					<div className="self-end m-2 mr-8" onClick={async () => await create()}>
						<Button className='bg-blue-500 text-white p-4 rounded-sm shadow-lg'>
							Create Project
						</Button>
					</div>


				</div>
			</Card>

		</div>
	)
}


// #010113eb
