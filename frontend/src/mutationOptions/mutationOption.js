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
			queryClient.setQueryData(['workspace'], (old) => {
				const workspaces = (old?.workspaces) ?? {}
				const workspace = workspaces?.[wk] ?? {}
				const projects = workspace?.projects ?? {}
				const projectOrdering = workspace?.projectOrdering ?? []
				return {
					...old,
					workspaces: {
						...workspaces,
						[wk]: {
							...workspace,
							projects: {
								...projects,
								[newProject?.id]: newProject
							},
							projectOrdering: [...new Set([newProject?.id, ...(projectOrdering)])]
						}
					},
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
			queryClient.setQueryData([wk, 'project', prjId], (old) => {
				return {
					...old,
					tasks: [newTask, ...(old?.tasks ?? [])]
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
