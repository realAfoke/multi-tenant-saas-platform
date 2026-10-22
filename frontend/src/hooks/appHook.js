import { useEffect } from "react"
import { instance } from "@/api/axios"
import { getIndexedDb } from "@/utils/appUtil"

export function useRealTimeUpdate(setSocket, workspaces) {
	useEffect(() => {
		const ws = new WebSocket(`wss://localhost/ws/user/`)
		ws.onopen = () => {
			console.log('Connection successfull ')
			setSocket(ws)
		}

		ws.onerror = (e) => {
			console.error('Connection Error:', e)
		}
		ws.onclose = () => console.log('connection closed!!!')
		return () => ws.close()
	}, [workspaces, setSocket])
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
	conversationId,
	conversations,
	setSelectedDm,
	selectedChannel,
	selectedDm,
	setIndexedDB,
) {
	useEffect(() => {
		const indexDb = async () => {
			const db = await getIndexedDb()
			setIndexedDB(db)
		}

		indexDb()
	},)
	useEffect(() => {
		console.log('effect:',wkName)
		if (selectedWorkspace?.id && !wkName) {
			setWorkspace({})
			return
		}
		const workspace = Object.values(workspaces ?? {}).find((wk) => {
			return wk?.name === wkName
		})
		if (workspace) {
			setWorkspace({ ...workspace, show: true })

		}
	}, [workspaces, wkName, selectedWorkspace?.id, setWorkspace])

	useEffect(() => {
		if (selectedChannel?.id && !channelName) {
			setChannel({})
			return
		}
		if (
			channelName &&
			(
				!selectedChannel?.name ||
				selectedChannel.name !== channelName
			)
		) {
			const { channels = {} } = selectedWorkspace ?? {}
			const channel = Object.values(channels)?.find(
				obj => obj?.name === channelName
			)
			setChannel(channel)
			setSelectedDm({})
			setView('channel')
		}
	}, [selectedWorkspace, channelName, selectedChannel?.id, selectedChannel?.name, setChannel, setSelectedDm, setView])

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
	}, [channel, taskName, setTask])



	useEffect(() => {
		if (selectedDm?.id && !conversationId) {
			setSelectedDm({})
			return
		}
		const fetchUser = async (conversationId) => {
			try {
				const response = await instance.get(`users/${conversationId}/`)
				return response.data
			} catch (error) {
				console.error(error)
			}
		}
		if (conversationId && !selectedDm?.id) {

			const setDm = async () => {
				let conversation = conversations?.find(
					conv => conv?.id === Number(conversationId)
				)

				if (!conversation && conversations) {
					conversation = await fetchUser(conversationId)
				}
				if (!conversation) return
				setSelectedDm(conversation)
				setChannel({})
				setView('dm')
			}
			setDm()
		}
	}, [conversationId, conversations, selectedDm?.id, setSelectedDm, setChannel, setView])
}
