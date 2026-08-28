import { queryOptions } from "@tanstack/react-query";
import { instance } from "@/api/axios";



export function activityQueryOption(route, id) {
	return queryOptions({
		queryKey: ['activity', route, id],
		queryFn: async ({ queryKey }) => {
			try {
				const [, route, key] = queryKey
				const response = await instance.get(`workspaces/${key}/${route}/`)
				return response.data
			} catch (error) {
				console.error(error)
				throw Error(error)
			}

		},
		enabled: !!id
	})
}
export function notificationQueryOption(wk) {
	return queryOptions({
		queryKey: ['notification', 'workspace', wk],
		queryFn: async ({ queryKey }) => {
			try {
				const [, , wk] = queryKey
				const response = await instance.get(`notification/workspace/${wk}/`)
				return response.data
			} catch (error) {
				console.error(error)
				throw Error(error)
			}
		},
		enabled: !!wk
	})
}

export function fetchRoleQueryOption(id) {
	return queryOptions({
		queryKey: ['role', id],
		queryFn: async () => {
			const response = await instance.get(`workspaces/${id}/role/`)
			return response.data
		},
		enabled: !!id
	})
}
export function fetchUserQueryOption() {
	return queryOptions({
		queryKey: ['user'],
		queryFn: getUser,
	})
}

async function getUser() {
	try {
		const user = await instance.get('users/me')
		return user?.data
	} catch (error) {
		console.error(error)
		throw new Error(error)
	}
}


export function workspaceQueryOption() {
	return queryOptions({
		queryKey: ['workspace'],
		queryFn: async () => {
			try {
				const dashboard = await instance.get('workspaces/')
				const workspaces = dashboard?.data?.map((workspace) => {
					return ({
						...workspace,
						channels: Object.fromEntries(workspace?.projects?.map((obj) => [obj?.id, obj])),
						channelOrdering: [...new Set(workspace?.projects?.map(prj => prj?.id))]
					})
				})
				return {
					workspaces: Object.fromEntries(workspaces?.map((obj) => [obj?.id, obj])),
					ordering: workspaces?.map((obj) => obj?.id)
				}

			} catch (err) {
				console.error(err)
				throw new Error(err)
			}
		}
		// select: (data) => {
		// 	const workspaceMap = Object.fromEntries(data.map((obj) => [obj.id, obj]))
		// 	return {
		// 		workspace: workspaceMap,
		// 		ordering: data.map((obj) => obj.id)
		// 	}
		// }
	})
}


export function channelQueryOption(wkId, channelId) {
	return queryOptions({
		queryKey: [wkId, 'channel', channelId],
		queryFn: async ({ queryKey }) => {
			const [wkId, , channelId] = queryKey
			const channel = await instance.get(`workspaces/${wkId}/project/${channelId}/`)
			return channel?.data
		},
		enabled: !!channelId,
	})
}


export function taskQueryOption(wk, prjId) {
	return queryOptions({
		queryKey: [wk, prjId, 'tasks'],
		queryFn: () => taskFn(wk, prjId),
		enabled: !!prjId,
	})
}

async function taskFn(wk, prjId) {
	try {
		const task = await instance.get(`workspaces/${wk}/${prjId}/tasks/`)
		return {
			tasks: Object.fromEntries(task?.data?.map((obj) => [obj?.id, obj])),
			taskOrdering: task?.data?.map((obj) => obj?.id)
		}
	} catch (error) {
		console.error(error)
		throw new Error(error)
	}
}


export function selectedTaskQueryOption(wk, chl, tk) {
	return queryOptions({
		queryKey: ['task', wk, chl, tk],
		queryFn: async ({ queryKey }) => {
			try {
				const [, wk, chl, tk] = queryKey
				const response = await instance.get(`workspaces/${wk}/${chl}/task/${tk}/`)
				return response.data
			} catch (error) {
				console.error(error)
				throw Error(error)
			}
		},
		enabled: !!tk
	})
}

export function commentQueryOption(taskId) {
	return queryOptions({
		queryKey: [taskId, 'comments'],
		queryFn: async ({ queryKey }) => {
			try {
				const [taskId,] = queryKey
				const comments = await instance.get(`workspaces/${taskId}/comments/`)
				return comments.data
			} catch (err) {
				console.error(err)
			}
		},
		enabled: !!taskId
	})
}

export function dasboardDataQueryOption(id) {
	return queryOptions({
		queryKey: ['dasboard', 'data', id],
		queryFn: () => getDashboardData(id),
		enabled: !!id
	})
}


async function getDashboardData(id) {
	try {
		const data = await instance.get(`workspaces/dashboard/${id}/`)
		return data?.data
	} catch (error) {
		console.error(error)
		return error
	}
}


export function workspaceMemberQueryOption(id) {
	return queryOptions({
		queryKey: ['workspace', id, 'members'],
		queryFn: () => getMembers(id),
		enabled: !!id
	})
}


async function getMembers(id) {
	try {
		const members = await instance.get(`workspaces/${id}/members/`)
		return members?.data
	}
	catch (error) {
		console.error(error)
	}
}
