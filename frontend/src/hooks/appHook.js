import { useEffect } from "react";

export function useAppHook(workspaces, wkName, setWorkspace, selectedWorkspace, project, projectName, setProject, taskId, setTask) {

	useEffect(() => {
		if (!workspaces || !wkName) return
		const workspace = Object.values(workspaces ?? {}).find(wk => wk?.name == wkName)
		if (workspace) {
			setWorkspace({ id: workspace?.id, name: wkName, show: true })
		}
	}, [workspaces, wkName])

	useEffect(() => {
		const workspace = workspaces?.[selectedWorkspace?.id]
		const { projects = {} } = workspace ?? {}
		const project = Object.values(projects)?.find(obj => obj?.name === projectName)
		if (!project || !projectName) return
		setProject({ id: project?.id, name: project?.name, show: true })
	}, [project, projectName, selectedWorkspace, workspaces])

	useEffect(() => {
		if (!project || !taskId) return
		const tasks = (project?.tasks) ?? []
		const task = tasks?.find((tsk) => tsk?.title == taskId)
		if (task) {
			setTask({ id: task?.id, title: task?.title, show: false })
		}
	}, [project, taskId])

}
