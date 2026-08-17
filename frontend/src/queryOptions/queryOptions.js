import { queryOptions } from "@tanstack/react-query";
import { instance } from "@/api/axios";



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
		queryFn: workspaceFn,
		// select: (data) => {
		// 	const workspaceMap = Object.fromEntries(data.map((obj) => [obj.id, obj]))
		// 	return {
		// 		workspace: workspaceMap,
		// 		ordering: data.map((obj) => obj.id)
		// 	}
		// }
	})
}

async function workspaceFn() {
	try {
		const dashboard = await instance.get('workspaces/')
		const workspaces = dashboard?.data?.map((workspace) => {
			return ({
				...workspace,
				projects: Object.fromEntries(workspace?.projects?.map((obj) => [obj?.id, obj])),
				projectOrdering: [...new Set(workspace?.projects?.map(prj => prj?.id))]
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

export function projectQueryOption(wkId, projectId) {
	return queryOptions({
		queryKey: [wkId, 'project', projectId],
		queryFn: async ({ queryKey }) => {
			const [wkId, , projectId] = queryKey
			const project = await instance.get(`workspaces/${wkId}/project/${projectId}/`)
			return project?.data
		},
		enabled: !!projectId,
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


export function selectedTaskQueryOption(wk, prj, tk) {
	return queryOptions({
		queryKey: ['task', wk, prj, tk],
		queryFn: async ({ queryKey }) => {
			try {
				const [, wk, prj, tk] = queryKey
				const response = await instance.get(`workspaces/${wk}/${prj}/task/${tk}/`)
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
		queryFn: () => getTaskComments(taskId),
		enabled: !!taskId
	})
}

const getTaskComments = async (taskId) => {
	try {
		const comments = await instance.get(`workspaces/${taskId}/comments/`)
		return comments.data
	} catch (err) {
		console.error(err)
	}
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
