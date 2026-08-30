import { useAppStore } from "@/store/authStore"

export const useAppState = () => {
	const selectedWorkspace = useAppStore(s => s.selectedWorkspace)
	const selectedChannel = useAppStore(s => s.selectedChannel)
	const selectedTask = useAppStore(s => s.selectedTask)
	const setWorkspace = useAppStore(s => s.setSelectedWorkspace)
	const setChannel = useAppStore(s => s.setSelectedChannel)
	const setTask = useAppStore(s => s.setSelectedTask)
	const setInvite = useAppStore(s => s.setInvite)
	const inviteDetail = useAppStore(s => s.invites)
	const socket = useAppStore(s => s.socket)
	const setSocket = useAppStore(s => s.setSocket)
	const view = useAppStore(s => s.view)
	const setView = useAppStore(s => s.setView)
	const selectedDm = useAppStore(s => s.selectedDm)
	const setSelectedDm = useAppStore(s => s.setSelectedDm)
	const message = useAppStore(s => s.message)
	const setMessage = useAppStore(s => s.setMessage)
	return {
		setInvite,
		inviteDetail,
		selectedWorkspace,
		selectedTask,
		setWorkspace,
		setChannel,
		selectedChannel,
		setTask,
		socket,
		setSocket,
		view,
		setView,
		selectedDm,
		setSelectedDm,
		message,
		setMessage
	}
}
