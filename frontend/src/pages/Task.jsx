import { useAppStore } from "@/store/authStore"
import { useParams } from "react-router-dom"

export default function Task() {
	const { id } = useParams()
	const getTask = useAppStore(state => state.getTask)
	const task = getTask(id)
	console.log('TASK:', task)
	return (
		<div>
			hello fucking task
		</div>
	)

}
