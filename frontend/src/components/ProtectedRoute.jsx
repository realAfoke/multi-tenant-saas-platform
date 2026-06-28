import useAuthStore from "../store/authStore.js"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }) {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn())

	return !isLoggedIn ? <Navigate to='/login' replace /> : children
}
