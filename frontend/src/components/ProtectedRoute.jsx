import { Children } from "react"
import useAuthStore from "../store/authStore.js"
import { Navigate, replace } from "react-router-dom"

export default function ProtectedRoute({ children }) {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn())
	if (!isLoggedIn) {
		return <Navigate to='/login' replace />
	}

	return children
}
