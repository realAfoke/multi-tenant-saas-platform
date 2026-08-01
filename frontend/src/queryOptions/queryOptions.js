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
				projectOrdering: workspace?.projects?.map(prj => prj?.id)
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
		queryKey: [wkId, 'projects', projectId],
		queryFn: () => projectFn(wkId, projectId),
		enabled: !!projectId,
		// select: (data) => {
		// 	const projectMap = Object.fromEntries(data.map((obj) => [obj.id, obj]))
		// 	return {
		// 		projects: projectMap,
		// 		projectOrdering: data.map((obj) => obj.id)
		// 	}
		// },
	})
}

async function projectFn(wkId, projectId) {
	try {
		const project = await instance.get(`workspaces/${wkId}/project/${projectId}/`)
		return project?.data
		// return {
		// 	projects: Object.fromEntries(projects?.data?.map((obj) => [obj?.id, obj])),
		// 	projectOrdering: projects?.data?.map((obj) => obj?.id)
		// }
	} catch (error) {
		console.error(error)
		throw new Error(error)
	}
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
		queryFn: () => getDashboardData(id)
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
		queryFn: () => getMembers(id)
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
