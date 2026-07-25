import { mutationOptions } from "@tanstack/react-query";
import { instance } from "@/api/axios"


export function createProjectMutationOption(queryClient) {
	return mutationOptions({
		mutationFn: async ({ wk, data }) => {
			try {
				const newProject = await instance.post(`workspaces/${wk}/projects/`, { ...data, workspace: wk })
				return newProject?.data
			} catch (error) {
				console.error(error)
				throw error
			}
		},
		onSuccess: (newProject, { wk }) => {
			queryClient.setQueryData([wk, 'projects'], (old) => {
				return {
					...old,
					projects: {
						...(old?.projects ?? {}),
						[newProject?.id]: {
							...(old?.projects?.[newProject?.id] ?? {}),
							...newProject
						}
					},
					projectOrdering: [... new Set([newProject?.id, ...(old?.projectOrdering ?? [])])]
				}
			})
		}
	})
}

export function createTaskMutationOption(queryClient) {
	return mutationOptions({
		mutationFn: async ({ wk, prjId, data }) => {
			try {
				const newProject = await instance.post(`workspaces/${wk}/${prjId}/tasks/`, { ...data, workspace: wk, project: prjId })
				return newProject?.data
			} catch (error) {
				console.error(error)
				throw error
			}
		},
		onSuccess: (newTask, { wk, prjId }) => {
			queryClient.setQueryData([wk, prjId, 'tasks'], (old) => {
				return {
					...(old ?? {}),
					tasks: {
						...(old?.tasks ?? {}),
						[newTask?.id]: {
							...(old?.tasks?.[newTask?.id] ?? {}),
							...newTask
						}
					},
					taskOrdering: [... new Set([newTask?.id, ...(old?.taskOrdering ?? [])])]
				}
			})
		}
	})
}

export function addCommentMutationOption(queryClient) {
	return mutationOptions({
		mutationFn: async ({ id, data }) => {
			try {
				const comment = await instance.post(`workspaces/${id}/comments/`, { ...data })
				return comment?.data
			} catch (error) {
				console.error(error)
				throw error
			}
		},
		onSuccess: (newComment, { id }) => {
			queryClient.setQueryData([id, 'comments'], (old) => ([newComment, ...(old ?? [])]
			))
		}

	})
}
