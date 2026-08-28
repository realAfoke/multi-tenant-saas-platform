import { useEffect } from "react";

export function useRealTimeUpdate(setSocket, workspaces) {
	useEffect(() => {
		if (!workspaces) return
		const workspaceIds = [...new Set(Object.keys(workspaces ?? {}))].join(",")
		const ws = new WebSocket(`wss://localhost/ws/user/?workspaces=${workspaceIds}`)
		ws.onopen = () => {
			console.log('Connection successfull ')
			setSocket(ws)
		}

		ws.onmessage = (e) => {
			console.log(JSON.parse(e.data))
		}
		ws.onerror = (e) => {
			console.error('Connection Error:', e)
		}
		ws.onclose = () => console.log('connection closed!!!')
		return () => ws.close()
	}, [workspaces])
}
export function useAppHook(workspaces, wkName, setWorkspace, selectedWorkspace, channel, channelName, setChannel, taskId, setTask, setView) {

	useEffect(() => {
		if (workspaces && !wkName) {
			setWorkspace({ id: null, name: '', show: false })
		}
		if (!workspaces || !wkName) return
		const workspace = Object.values(workspaces ?? {}).find(wk => wk?.name == wkName)
		if (workspace) {
			setWorkspace({ id: workspace?.id, name: wkName, show: true })
		}
	}, [workspaces, wkName])

	useEffect(() => {
		const workspace = workspaces?.[selectedWorkspace?.id]
		const { channels = {} } = workspace ?? {}
		const channel = Object.values(channels)?.find(obj => obj?.name === channelName)
		if (!channel || !channelName) return
		setChannel({ id: channel?.id, name: channel?.name, show: true })
		setView('channel')
	}, [channel, channelName, selectedWorkspace, workspaces])

	useEffect(() => {
		if (!channel || !taskId) return
		const tasks = (channel?.tasks) ?? []
		const task = tasks?.find((tsk) => tsk?.id == taskId)
		if (task) {
			setTask({ id: task?.id, title: task?.title, show: false })
		}
	}, [channel, taskId])
}
