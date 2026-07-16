import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const useAuthStore = create(combine({ user: localStorage.getItem('user'), }, (set, get) => (
	{
		setUser: (user) => {
			localStorage.setItem('user', JSON.stringify(user)),
				set({ user })
		},
		logout: () => {
			localStorage.removeItem('user'),
				set({ user: null })
		},
		isLoggedIn: () => get().user !== null
	}
)))

export default useAuthStore

export const useAppStore = create(combine({ cacheWorkspace: {}, cacheProjects: {}, cacheTasks: {}, comments: {} }, (set, get) => (
	{
		setApp: (data) => {
			set((state) => {
				return {
					...state,
					cacheWorkspace: { ...(state.cacheWorkspace ?? {}), ...data.allWorkspace },
					cacheProjects: { ...(state.cacheProjects ?? {}), ...data.allProjects },
					cacheTasks: { ...(state.cacheTasks ?? {}), ...data.allTasks },
				}
			})
		},
		setWorkspace: (workpace) => {
			console.log(workpace)
			set((state) => {
				const { cacheWorkspace } = state ?? {}
				const { workspaces, ordering } = cacheWorkspace

				return {
					...state,
					cacheWorkspace: {
						...cacheWorkspace,
						workspaces: {
							...(workspaces ?? {}),
							[workpace?.id]: {
								...(workspaces?.[workpace?.id] ?? {}), ...workpace
							}
						},
						ordering: [
							...new Set([workpace.id, ...(ordering ?? [])])
						]
					}
				}
			})
		},
		setWkProject: (project, id) => {
			set((state) => {
				const wkId = Number(id)
				const { cacheProjects } = state
				const { projects } = cacheProjects ?? {}
				const { cacheWorkspace } = state ?? {}
				const { workspaces, ordering } = cacheWorkspace ?? {}
				const activeWorkspace = workspaces?.[wkId] ?? {}

				return {
					...state,
					cacheWorkspace: {
						...cacheWorkspace,
						workspaces: {
							...workspaces,
							[wkId]: {
								...activeWorkspace,
								projects: [
									...new Set([project.id,
									...(activeWorkspace?.projects ?? [])
									])
								]
							},
						},
						ordering: [...new Set([wkId, ...(ordering ?? [])])]
					},
					cacheProjects: {
						...(cacheProjects ?? {}),
						projects: {
							...projects,
							[project.id]: {
								...(projects?.[project.id] ?? {}),
								...project
							},
						},
						// projectOrdering: [...new Set([project.id, ...(projectOrdering ?? [])])]
					}
				}

			})
		},
		setTask: (task, id) => {
			set((state) => {
				const prjId = Number(id)
				const { cacheProjects } = state
				const { projects } = cacheProjects ?? {}
				const activeProject = projects?.[prjId] ?? {}
				const { workspace } = activeProject
				const { cacheTasks } = state ?? {}
				const { tasks } = cacheTasks ?? {}
				const { cacheWorkspace } = state ?? {}
				const { workspaces, ordering } = cacheWorkspace ?? {}
				const activeWorkspace = workspaces?.[workspace] ?? {}

				return {
					...state,
					cacheWorkspace: {
						...cacheWorkspace,
						workspaces: {
							...workspaces,
							[workspace]: {
								...activeWorkspace,
								projects: [
									...new Set([activeProject?.id,
									...(activeWorkspace?.projects ?? [])
									])
								]
							},
							ordering: [...new Set([workspace, ...(ordering ?? [])])]
						}
					},

					cacheProjects: {
						...cacheProjects,
						projects: {
							...projects,
							[prjId]: {
								...activeProject,
								tasks: [
									...new Set([task?.id,
									...(activeProject?.tasks ?? [])
									])
								]
							}
						},
						// projectOrdering: [... new Set([prjId, ...(projectOrdering ?? [])])]
					},
					cacheTasks: {
						...cacheTasks,
						tasks: {
							...tasks,
							[task.id]: {
								...(tasks?.[task.id] ?? {}),
								...task
							},
						},
						// taskOrdering: [...new Set([task.id, ...(taskOrdering ?? [])])]
					}
				}

			})
		},
		setComment: (comment, taskId) => {
			set((state) => {
				const { commentObj, commentKeys } = comment
				const tasks = state.cacheTasks?.tasks
				const projects = state.cacheProjects?.projects
				const selectedTask = tasks?.[taskId] ?? {}
				const projectTask = projects?.[selectedTask?.project] ?? {}
				const wk = projectTask?.workspace
				// const commentIds = Object.keys(comment)
				return {
					...state,
					cacheWorkspace: {
						...(state.cacheWorkspace),
						workspaces: {
							...(state.cacheWorkspace?.workspaces ?? {}),
							[wk]: {
								...(wk ?? {}),
								projects: [
									...new Set([projectTask?.id, ...(wk.projects ?? [])])
								]

							}
						}
					},
					cacheProjects: {
						...(state.cacheProjects),
						projects: {
							...(projects ?? {}),
							[projectTask?.id]: {
								...(projectTask ?? {}),
								tasks: [
									...new Set([taskId, ...(projectTask?.tasks ?? [])])
								]
							}
						}
					},
					cacheTasks: {
						...state.cacheTasks,
						tasks: {
							...(tasks ?? {}),
							[taskId]: {
								...(tasks?.[taskId] ?? {}),
								comments: [...new Set(...commentKeys ?? [])]

							}
						}
					},
					comments: {
						...state.comments,
						...commentObj
					}
				}
			})
		},
		getWorkspace: () => (
			get(id).cacheWorkspace?.workspaces?.[id]
		),
		getProject: () => (
			get().cacheProjects?.projects?.[id]
		),
		getTask: (id) => (
			get().cacheTasks?.tasks?.[id]
		)
	}
)))
