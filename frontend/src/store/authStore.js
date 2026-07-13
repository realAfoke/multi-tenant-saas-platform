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

export const useAppStore = create(combine({ cacheWorkspace: {}, cacheProjects: {}, cacheTasks: {} }, (set, get) => (
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



// <ItemGroup className="p-2 py-1 gap-1">
// 				{workspaces.ordering?.map((id) => {
// 					const workspace = workspaces.workspace[id]
// 					return (
// 						<Item key={workspace?.id} onClick={() => setToggle(workspace?.id)} className={``}>
// 							<ItemTitle className={`text-[#f7f7f7] text-md capitalize`}>{workspace?.name}</ItemTitle>
// 							<ItemContent>
// 								<ItemDescription>{workspace?.description}</ItemDescription>
// 							</ItemContent>
// 							{toggle == workspace?.id && <NestedList lists={workspace?.projects} setHideDashBoard={setHideDashBoard} />}
// 						</Item>
// 					)
// 				})}
// 			</ItemGroup>



// const { workspaces, ordering } = state.cacheWorkspace
// 				const activeWorkspace = workspaces?.[Number(wkId)]
//
//
// 				return {
// 					cacheWorkspace: {
// 						...state.cacheWorkspace,
// 						workspaces: {
// 							...(workspaces ?? {}),
// 							[Number(wkId)]: {
// 								...(activeWorkspace ?? {}),
// 								projects: {
// 									...(activeWorkspace?.projects ?? {}),
// 									[project.id]: project,
// 								},
// 								projectOrdering: [
// 									...new Set([project.id,
// 									...(activeWorkspace?.projectOrdering ?? [])
// 									]),
// 								],
// 							},
// 						},
// 					},
// 				}

