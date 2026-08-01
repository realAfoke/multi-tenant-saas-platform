import { useEffect } from "react";

export function useAppHook(workspaces, wkName, setSelectedWorkspace, selectedWorkspace, projectName, setSelectedProject, tasks, id, setSelectedTask) {

	useEffect(() => {
		// console.log('got here nigga')
		if (!workspaces || !wkName) return
		const workspace = Object.values(workspaces ?? {}).find(wk => wk?.name == wkName)
		if (workspace) {
			setSelectedWorkspace({ id: workspace?.id, name: wkName, show: true })
		}
	}, [workspaces, wkName])


	useEffect(() => {
		if (id) {
			localStorage.setItem('id', id)
		}
		let storedId = localStorage.getItem('id')
		if (!tasks || !storedId) return
		const task = tasks?.[Number(storedId)]
		if (task) {
			setSelectedTask({ id: task?.id, name: task?.title, show: true })
			localStorage.removeItem('id')
		}
	}, [tasks, id])
}
