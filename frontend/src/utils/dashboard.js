export function normalise(workspaces) {
	const allWorkspace = { workspaces: {}, ordering: [] }
	const allProjects = { projects: {} }
	const allTasks = { tasks: {} }
	workspaces?.forEach((wk) => {
		const normWk = { ...wk, projects: [] }
		wk.projects?.map((project) => {
			normWk.projects.push(project.id)
			allProjects.projects[project.id] = { ...project, workspace: wk.id, tasks: [] }
			// allProjects.projectOrdering.push(project.id)
			project?.projectTasks?.map((task) => {
				allProjects.projects[project.id].tasks.push(task.id)
				allTasks.tasks[task.id] = { ...task, workspace: wk.id, project: project.id }
				// allTasks.taskOrdering?.push(task.id)
			})

		})
		allWorkspace.workspaces[normWk?.id] = normWk
		allWorkspace.ordering?.push(normWk.id)
	})
	return { allWorkspace, allProjects, allTasks }
}


