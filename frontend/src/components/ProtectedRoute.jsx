import { Navigate, useLocation } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useAppHook } from "@/hooks/appHook.js"
import { fetchUserQueryOption, workspaceQueryOption, projectQueryOption, taskQueryOption } from "@/queryOptions/queryOptions"
import { useParams, useNavigate } from "react-router-dom"
import { useAppState } from "@/hooks/apptools"
import { useEffect } from "react"

export default function ProtectedRoute() {
	const navigate = useNavigate()
	const location = useLocation()
	const { wkName, prjName, id } = useParams()
	const { setWorkspace, setProject, setTask, selectedWorkspace, selectedProject, selectedTask } = useAppState()
	const { data: userWorkspaces } = useQuery(workspaceQueryOption())
	let { data: workspaceProjects } = useQuery(projectQueryOption(selectedWorkspace?.id, selectedProject?.id))
	const { data: projectTasks } = useQuery(taskQueryOption(selectedWorkspace?.id, selectedProject?.id))

	const { tasks } = projectTasks ?? {}
	const { projects } = workspaceProjects ?? {}
	const { workspaces } = userWorkspaces ?? {}

	const { data: user } = useQuery(fetchUserQueryOption())
	useAppHook(workspaces, wkName, setWorkspace, projects, prjName, setProject, tasks, id, setTask)

	useEffect(() => {
		if (location?.pathname?.includes('profile')) {
			navigate('/dashboard/profile')
			return
		}
		if (!selectedTask?.id) return
		navigate(`/dashboard/${selectedWorkspace?.name}/${selectedProject?.name}/task/${selectedTask?.id}/`)
	}, [selectedTask?.id], location?.pathname)

	return !user ? <Navigate to='/login' replace /> : <Outlet />

}
