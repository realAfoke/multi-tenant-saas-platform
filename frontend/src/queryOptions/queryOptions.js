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
		return {
			workspaces: Object.fromEntries(dashboard?.data?.map((obj) => [obj?.id, obj])),
			ordering: dashboard?.data?.map((obj) => obj?.id)
		}

	} catch (err) {
		console.error(err)
		throw new Error(err)
	}
}

export function projectQueryOption(wkId) {
	return queryOptions({
		queryKey: [wkId, 'projects'],
		queryFn: () => projectFn(wkId),
		enabled: !!wkId,
		// select: (data) => {
		// 	const projectMap = Object.fromEntries(data.map((obj) => [obj.id, obj]))
		// 	return {
		// 		projects: projectMap,
		// 		projectOrdering: data.map((obj) => obj.id)
		// 	}
		// },
	})
}

async function projectFn(wkId) {
	try {
		const projects = await instance.get(`workspaces/${wkId}/projects/`)
		return {
			projects: Object.fromEntries(projects?.data?.map((obj) => [obj?.id, obj])),
			projectOrdering: projects?.data?.map((obj) => obj?.id)
		}
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


