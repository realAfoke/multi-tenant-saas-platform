import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const useAuthStore = create(combine({ user: localStorage.getItem('user'), }, (set, get) => (
	{
		setUser: (user) => {
			localStorage.setItem('user', JSON.stringify(user)),
				set({ user })
		},
		logout: () => {
			localStorage.removeItem('user'),
				set({ user: null })
		},
		isLoggedIn: () => get().user !== null
	}
)))

export default useAuthStore



export const appState = {
	user: null,
	setUser: (data) => localStorage.setItem('user', data),
	logout: () => localStorage.removeItem('user')
}

