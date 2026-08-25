import { useEffect } from "react"

export function useProject(
	socket,
	queryClient,
	workspaces,
	selectedWorkspace,
	projectName,
	setProject,
	pathNames,
	setSelected,
	sent,
	setSent
) {
	useEffect(() => {
		if (!socket) return
		const ws = socket
		ws.onmessage = (e) => {
			const data = JSON.parse(e.data)
			const cameCaseObj = convertObjKeys(data)
			queryClient.setQueryData(['activity','project-activity', data?.project], old => [cameCaseObj, ...(old ?? [])])
		}
	}, [socket])

	useEffect(() => {

		if (!selectedWorkspace || !projectName) return
		const workspace = workspaces?.[selectedWorkspace?.id]
		const { projects } = workspace ?? {}
		const project = Object.values(projects ?? {})?.find((obj) => obj?.name == projectName)
		if (project) {
			setProject({ id: project?.id, name: project?.name, show: true })
		}

	}, [workspaces, selectedWorkspace, projectName])

	useEffect(() => {
		if (pathNames.length == 3) {
			setSelected('overview')
		} else {
			setSelected(pathNames[pathNames.length - 1])
		}
	}, [pathNames])
	useEffect(() => {
		const timer = setTimeout(() => {
			setSent(false)
		}, [5000])
		return () => clearTimeout(timer)
	}, [sent])


}
