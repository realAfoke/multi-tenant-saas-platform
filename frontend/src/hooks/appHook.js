import { useEffect } from "react";

export function useAppHook(workspaces, wkName, setSelectedWorkspace, projects, prjName, setSelectedProject, tasks, id, setSelectedTask) {

	useEffect(() => {
		// console.log('got here nigga')
		if (!workspaces || !wkName) return
		const workspace = Object.values(workspaces ?? {}).find(wk => wk?.name == wkName)
		if (workspace) {
			setSelectedWorkspace({ id: workspace?.id, name: wkName, show: true })
		}
	}, [workspaces, wkName])

	useEffect(() => {
		if (prjName) {
			localStorage.setItem('prjName', prjName)
		}
		let storedName = localStorage.getItem('prjName')

		if (!projects || !storedName) return
		const project = Object.values(projects ?? {}).find((prj) => prj?.name == storedName)
		if (project) {
			setSelectedProject({ id: project?.id, name: project?.name, show: true })
			localStorage.removeItem('prjName')
		}

	}, [projects, prjName])

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
