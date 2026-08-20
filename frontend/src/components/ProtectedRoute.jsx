import { Outlet } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useAppHook } from "@/hooks/appHook.js"
import { fetchUserQueryOption, workspaceQueryOption, projectQueryOption, fetchRoleQueryOption } from "@/queryOptions/queryOptions"
import { useParams, Navigate } from "react-router-dom"
import { useAppState } from "@/hooks/apptools"
import { useEffect, useState } from "react"
import SideBar from "@/components/SideBar"
import TopBar from "./TopBar"
import { useRealTimeUpdate } from "@/hooks/appHook.js"


export default function ProtectedRoute() {
	const { wkName, projectName, taskId } = useParams()
	const [toggle, setToggle] = useState(false)
	const [toggleWorkspace, setToggleWorkspace] = useState(false)


	const { setWorkspace, setSocket, setProject, setTask, selectedWorkspace, selectedProject } = useAppState()
	const { data: userWorkspaces } = useQuery(workspaceQueryOption())

	const { data: project } = useQuery(projectQueryOption(selectedWorkspace?.id, selectedProject?.id))
	const { workspaces } = userWorkspaces ?? {}

	const { data: user } = useQuery(fetchUserQueryOption())
	useAppHook(workspaces, wkName, setWorkspace, selectedWorkspace, project, projectName, setProject, taskId, setTask, user)
	useRealTimeUpdate(setSocket)

	useQuery(fetchRoleQueryOption(selectedWorkspace?.id))

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

				<main className="flex-1 overflow-auto bg-zinc-950 scrollbar scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-900">
					<div className="max-w-7xl mx-auto px-6 py-8">
						<Outlet context={{ setToggle }} />
					</div>
				</main>
			</div>

		</div>
	)
}
