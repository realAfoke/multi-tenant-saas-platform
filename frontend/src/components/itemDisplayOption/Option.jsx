import { useNavigate } from "react-router-dom"
import { CardContent, Card } from "../ui/card"
import { useAppState } from "@/hooks/apptools"
import { dateFormatter } from "@/utils/appUtil"
export default function Grid({ project }) {
	const { setProject } = useAppState()
	const navigate = useNavigate()
	const lastUpdated = dateFormatter(project?.updatedAt)
	return (
		<Card
			key={project.id}
			className="bg-zinc-900 border-zinc-800 hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
			onClick={() => {
				setProject(project)
				navigate(`${project?.name}`)
			}
			}
		>
			<CardContent className="p-7">

				<div className="flex items-center justify-between">

					<h3 className="text-xl font-semibold text-white">
						{project.name}
					</h3>

					<span className="text-xs px-3 py-1 rounded-full bg-blue-500/15 text-blue-300">
						{project.status}
					</span>

				</div>

				<p className="text-zinc-400 mt-4 leading-relaxed">
					{project.description}
				</p>

				<div className="mt-8 flex items-center justify-between">

					<p className="text-sm text-zinc-500">
						Last updated
					</p>

					<p className="text-sm text-white">
						{lastUpdated}
					</p>

				</div>

			</CardContent>

		</Card>
	)
}
