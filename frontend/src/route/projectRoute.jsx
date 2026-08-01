import { useAppState } from "@/hooks/apptools";
import { projectQueryOption, workspaceQueryOption } from "@/queryOptions/queryOptions";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";


export default function ProjectRoute() {
	const { projectName } = useParams()
	const { selectedWorkspace, selectedProject, setProject } = useAppState()
	const { data: allWorkspaces } = useQuery(workspaceQueryOption())
	const { workspaces = {} } = allWorkspaces ?? {}

	useEffect(() => {

		if (!selectedWorkspace || !projectName) return
		const workspace = workspaces?.[selectedWorkspace?.id]
		const { projects } = workspace ?? {}
		const project = Object.values(projects ?? {})?.find((obj) => obj?.name == projectName)
		if (project) {
			setProject({ id: project?.id, name: project?.name, show: true })
		}

	}, [workspaces, selectedWorkspace, projectName])
	return (
		<div>
			<Outlet />
		</div>
	)
}
