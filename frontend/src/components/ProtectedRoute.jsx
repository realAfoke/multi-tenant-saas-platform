import useAuthStore from "../store/authStore.js"
import { Navigate } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { fetchUserQueryOption } from "@/queryOptions/fetchUserQueryOptions.js"
import { useQuery } from "@tanstack/react-query"

export default function ProtectedRoute() {
	const { data: user, isLoading } = useQuery(fetchUserQueryOption())
	return !user ? <Navigate to='/login' replace /> : <Outlet />

}
