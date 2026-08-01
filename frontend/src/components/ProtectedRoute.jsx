import { Navigate, useLocation } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useAppHook } from "@/hooks/appHook.js"
import { fetchUserQueryOption, workspaceQueryOption, taskQueryOption } from "@/queryOptions/queryOptions"
import { useParams, useNavigate } from "react-router-dom"
import { useAppState } from "@/hooks/apptools"
import { useEffect, useState } from "react"
import SideBar from "@/components/SideBar"
import TopBar from "./TopBar"


export default function ProtectedRoute() {
	const navigate = useNavigate()
	const location = useLocation()
	const { wkName, projectName, id } = useParams()
	const [toggle, setToggle] = useState(false)
	const [toggleWorkspace, setToggleWorkspace] = useState(false)


	const { setWorkspace, setProject, setTask, selectedWorkspace, selectedProject, selectedTask } = useAppState()
	const { data: userWorkspaces } = useQuery(workspaceQueryOption())
	const { data: projectTasks } = useQuery(taskQueryOption(selectedWorkspace?.id, selectedProject?.id))

	const { tasks } = projectTasks ?? {}
	const { workspaces } = userWorkspaces ?? {}

	const { data: user } = useQuery(fetchUserQueryOption())
	useAppHook(workspaces, wkName, setWorkspace, selectedWorkspace, projectName, setProject, tasks, id, setTask)

	useEffect(() => {
		if (location?.pathname?.includes('profile')) {
			navigate('/dashboard/profile')
			return
		}
		if (!selectedTask?.id) return
		navigate(`/dashboard/${selectedWorkspace?.name}/${selectedProject?.name}/task/${selectedTask?.id}/`)
	}, [selectedTask?.id], location?.pathname)

	if (!user) {
		<Navigate to='/login' replace />
		return
	}

	return (
		<div className="flex h-screen bg-black overflow-hidden">

			{toggle && (
				<div className="">
					<SideBar
						setToggle={setToggle}
						toggleWorkspace={toggleWorkspace}
						handleToggleWorkspace={setToggleWorkspace}
					/>
				</div>
			)}

			<div className="flex flex-col flex-1 overflow-hidden">
				<TopBar setToggle={setToggle} toggle={toggle} />

				<main className="flex-1 overflow-auto bg-zinc-950">
					<div className="max-w-7xl mx-auto px-6 py-8">
						<Outlet context={{ setToggle }} />
					</div>
				</main>
			</div>

		</div>
	)
}
