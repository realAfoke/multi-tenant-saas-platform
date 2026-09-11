import { useEffect } from "react"
import { instance } from "@/api/axios"

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

	// useEffect(() => {
	// 	const db =indexedDB.open('orbit', 1)
	// 	console.log(db)
	// }, [])
}
export function useAppHook(
	workspaces,
	wkName,
	setWorkspace,
	selectedWorkspace,
	channel,
	channelName,
	setChannel,
	taskName,
	setTask,
	setView,
	userId,
	conversations,
	setSelectedDm,
	selectedChannel,
	selectedDm,
) {
	useEffect(() => {
		if (!selectedWorkspace?.id && wkName) {
			const workspace = Object.values(workspaces ?? {}).find(wk => wk?.name === wkName)
			if (workspace) {
				setWorkspace({ ...workspace, show: true })
			}
		}
	}, [workspaces, selectedWorkspace, wkName])

	useEffect(() => {
		if (!selectedChannel?.name && channelName) {
			const { channels = {} } = selectedWorkspace ?? {}
			const channel = Object.values(channels)?.find(
				obj => obj?.name === channelName
			)
			setChannel(channel)
			setSelectedDm({})
			setView('channel')
		}
	}, [selectedWorkspace])

	useEffect(() => {
		if (!channel || !taskName) {
			setTask({})
			return
		}
		const tasks = (channel?.tasks) ?? []

		const task = tasks?.find(
			(tsk) => tsk?.title === taskName
		)
		if (task) {
			setTask({ id: task?.id, title: task?.title, show: false })
		}
	}, [channel, taskName])



	useEffect(() => {
		const fetchUser = async (userId) => {
			try {
				const response = await instance.get(`users/${userId}/`)
				return response.data
			} catch (error) {
				console.error(error)
			}
		}
		if (userId && !selectedDm?.id) {

			const setDm = async () => {
				let user = conversations?.find(
					conv => conv.receiver?.id === userId
				)

				if (!user) {
					user = await fetchUser(userId)
				}
				if (!user) return
				setSelectedDm(user)
				setChannel({})
				setView('dm')
			}
			setDm()
		}


	}, [userId, conversations, setSelectedDm])
}
