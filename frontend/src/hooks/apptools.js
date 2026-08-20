import { useAppStore } from "@/store/authStore"

export const useAppState = () => {
	const selectedWorkspace = useAppStore(s => s.selectedWorkspace)
	const selectedProject = useAppStore(s => s.selectedProject)
	const selectedTask = useAppStore(s => s.selectedTask)
	const setWorkspace = useAppStore(s => s.setSelectedWorkspace)
	const setProject = useAppStore(s => s.setSelectedProject)
	const setTask = useAppStore(s => s.setSelectedTask)
	const setInvite = useAppStore(s => s.setInvite)
	const inviteDetail = useAppStore(s => s.invites)
	const socket = useAppStore(s => s.socket)
	const setSocket = useAppStore(s => s.setSocket)
	return { setInvite, inviteDetail, selectedWorkspace, selectedProject, selectedTask, setWorkspace, setProject, setTask, socket, setSocket }
}
