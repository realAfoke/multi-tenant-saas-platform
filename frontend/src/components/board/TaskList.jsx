import TaskCard from "./TaskCard"

export default function TaskList() {

	const tasks = [
		{
			id: 1,
			title: "Authentication API",
			description: "Implement JWT authentication, refresh token rotation and secure session handling.",
			priority: "High",
			assignee: "Daniel",
			dueDate: "Tomorrow",
			comments: 6,
			attachments: 2,
		},
		{
			id: 2,
			title: "Landing Page",
			description: "Build the responsive landing page following the new OrbitSpace design.",
			priority: "Medium",
			assignee: "Sarah",
			dueDate: "Jul 31",
			comments: 3,
			attachments: 1,
		},
		{
			id: 3,
			title: "Billing Integration",
			description: "Connect Stripe checkout and customer portal.",
			priority: "Low",
			assignee: "Michael",
			dueDate: "Aug 2",
			comments: 1,
			attachments: 0,
		},
	]

	return (
		<div className="grid xl:grid-cols-2 gap-5">
			{tasks.map(task => (
				<TaskCard
					key={task.id}
					task={task}
				/>
			))}
		</div>
	)
}
