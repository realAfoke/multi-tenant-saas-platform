import { queryOptions } from "@tanstack/react-query";
import { instance } from "@/api/axios";



export function fetchUserQueryOption() {
	return queryOptions({
		queryKey: ['user'],
		queryFn: getUser,
	})
}

async function getUser() {
	try {
		const user = await instance.get('users/me')
		return user.data
	} catch (error) {
		console.error(error)
		throw new Error(error)
	}
}


export function workspaceQueryOption() {
	return queryOptions({
		queryKey: ['workspace'],
		queryFn: workspaceFn,
		select: (data) => {
			const workspaceMap = Object.fromEntries(data.map((obj) => [obj.id, obj]))
			return {
				workspace: workspaceMap,
				ordering: data.map((obj) => obj.id)
			}
		}
	})
}

async function workspaceFn() {
	try {
		const dashboard = await instance.get('workspaces/')
		return dashboard.data
	} catch (err) {
		console.error(err)
		throw new Error(err)
	}
}

export function projectQueryOption(id) {
	return queryOptions({
		queryKey: [id],
		queryFn: () => projectFn(id),
		enabled: !!id,
		select: (data) => {
			const projectMap = Object.fromEntries(data.map((obj) => [obj.id, obj]))
			return {
				project: projectMap,
				ordering: data.map((obj) => obj.id)
			}
		},
		// onsuccess: (projects, id) => {
		// 	queryClient.setQueryData(['workspace'], (oldWorkspace) => {
		// 		const workspace = oldWorkspace.workspace?.[id]
		// 		return {
		// 			...oldWorkspace,
		// 			workspace: {
		// 				...oldWorkspace.workspace,
		// 				[id]: {
		// 					...oldWorkspace.workspace?.[id],
		// 					...workspace,
		// 					projectIds: projects.map((obj) => obj.id)
		// 				}
		// 			}
		// 		}
		// 	})
		// }


	})
}

async function projectFn(id) {
	try {
		// if (!id) return
		const projects = await instance.get(`workspaces/${id}/projects/`)
		return projects?.data
	} catch (error) {
		console.error(error)
		throw new Error(error)
	}
}



