import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const useAuthStore = create(combine({ user: null, }, (set,get) => (
	{
		setUser: (user) => set(user),
		logout: () => set({ user: null }),
		isLoggedIn: () => get().user !== null
	}
)))

export default useAuthStore
