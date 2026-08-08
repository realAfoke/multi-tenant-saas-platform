import { useNavigate } from "react-router-dom"
import { CardContent, Card } from "../ui/card"
import { useAppState } from "@/hooks/apptools"
import { dateFormatter } from "@/utils/appUtil"
import { MoreVerticalIcon } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProjectMutationOption } from "@/mutationOptions/mutationOption"


export default function Grid({ project }) {
	const { setProject } = useAppState()
	const navigate = useNavigate()
	const lastUpdated = dateFormatter(project?.updatedAt)
	const stats = ['active', 'inactive', 'done']
	const { selectedWorkspace } = useAppState()
	const queryClient = useQueryClient()

	const updatedProject = useMutation(updateProjectMutationOption(queryClient))
	return (
		<Card
			key={project.id}
			className={` bg-zinc-900 border-zinc-800 hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative`}
			onClick={() => {
				setProject(project)
				navigate(`${project?.name}`)
			}
			}
		>
			<MoreVerticalIcon className="w-4 h-4 absolute right-3 text-white top-3" onClick={(e) => { e.stopPropagation() }} />
			<div className="shadow-lg absolute right-0 top-7 flex flex-col gap-3 bg-black *:text-white p-3 *:text-xs ">
				{stats.map((stat) => (
					<div key={stat} className={`${project?.status === stat ? 'bg-orange-400' : ''} p-1 px-2`} onClick={(e) => {
						e.stopPropagation()
						if (e.target.innerText?.value === project?.status) return
						updatedProject.mutate({
							wk: selectedWorkspace?.id,
							prjId: project?.id,
							data: {
								status: e.target.innerText
							}
						})
					}}>{stat}</div>
				))}
			</div>
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
