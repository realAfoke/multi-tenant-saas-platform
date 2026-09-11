import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const useAuthStore = create(combine({ user: '', }, (set, get) => (
	{
		setUser: (user) => {
			// localStorage.setItem('user', JSON.stringify(user)),
			set({ user })
		},
		getUser: () => get().user,

		logout: () => {
			localStorage.removeItem('user'),
				set({ user: null })
		},
		isLoggedIn: () => get().user !== null
	}
)))

export default useAuthStore

export const useAppStore = create(combine({
	view: '',
	selectedDm: {},
	selectedWorkspace: {
		id: null,
		name: '',
		show: false
	},
	selectedChannel: {
		id: null,
		name: '',
		show: false
	},
	selectedTask: {
		id: null,
		title: '',
		show: false
	},
	invites: {
		token: null,
		id: null,
		email: ''
	},
	socket: ''
}
	, (set, get) => (
		{
			setSocket: (socket) => set({ socket: socket }),
			setSelectedWorkspace: (workspace) => {
				set({ selectedWorkspace: workspace ?? {} })
			},
			setSelectedChannel: (channel) => {
				set({ selectedChannel: channel ?? {} })
			},
			setSelectedTask: (task) => {
				set((state) =>
				({
					selectedTask: {
						...state.selectedTask,
						...(task ?? {})
					}
				}
				))
			},
			setInvite: (invite) => {
				set((state) => (
					{
						invites: {
							...state.invites,
							...invite
						}
					}
				))
			},
			setView: (view) => set((state) => ({ view: view })),
			setSelectedDm: (dm) => set((state) => ({ selectedDm: { ...state.selectedDm, ...dm } })),
			getWorkspace: () => get().selectedWorkspace,
			getChannel: () => get().selectedChannel,
			getTask: () => get().selectedTask,
			getDm: () => get().selectedDm,
		}
	)))
