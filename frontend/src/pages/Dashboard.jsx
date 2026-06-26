import useAuthStore from "@/store/authStore"

export default function Dashboard() {
	const user = useAuthStore(state => state.user)
	console.log('USER:', user)
	return (
		<div className="text-red-500">
			hello from dashboard
		</div>
	)
}
