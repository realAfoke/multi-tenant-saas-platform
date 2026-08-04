import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { dateFormatter } from "@/utils/appUtil"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { useAppState } from "@/hooks/apptools"

export default function ProjectOverview() {
	const { wkName, projectName } = useParams()
	const { project, showMoreMembers, memberDisplay, members } = useOutletContext()
	const navigate = useNavigate()
	const { setTask } = useAppState()
	const lastUpdatedTask = (project?.tasks) ?? []
	const lastUpdated = dateFormatter(lastUpdatedTask[0]?.updatedAt)

	return (
		<div className="space-y-8">
			<div className={`${showMoreMembers ? 'hidden md:flex' : 'flex'} flex-col gap-5`}>
				<Card className="bg-zinc-900 border-zinc-800">

					<CardContent className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-6">

						<div>

							<p className="text-blue-400 text-sm font-medium">
								Continue Working
							</p>

							<h2 className="text-2xl font-semibold text-white mt-2">
								{lastUpdatedTask[0]?.title}
							</h2>

							<p className="text-zinc-400 mt-2 max-w-xl">
								{lastUpdatedTask[0]?.description}
							</p>
							<p className="text-zinc-500 mt-1">
								{`Last opend ${lastUpdated}`}
							</p>
						</div>

						<Button className="mt-5 lg:mt-0 rounded-xl bg-blue-500" onClick={() => {
							setTask({ id: lastUpdatedTask[0]?.id, title: lastUpdatedTask[0]?.title, show: true })
							navigate(`/dashboard/${wkName}/${projectName}/${lastUpdatedTask[0]?.title}`)
						}}
						>
							Resume →
						</Button>

					</CardContent>

				</Card>


				{/* Body */}

				<div className="grid xl:grid-cols-[2fr_1fr] gap-6">

					<Card className="bg-zinc-900 border-zinc-800">

						<CardContent className="p-7">

							<h2 className="text-xl font-semibold text-white">
								Recent Activity
							</h2>

							<div className="space-y-6 mt-6">

								<div>

									<p className="text-white">
										Sarah completed Homepage Design
									</p>

									<p className="text-sm text-zinc-500 mt-1">
										2 hours ago
									</p>

								</div>

								<div>

									<p className="text-white">
										Michael uploaded UI Mockups
									</p>

									<p className="text-sm text-zinc-500 mt-1">
										Yesterday
									</p>

								</div>

								<div>

									<p className="text-white">
										Emma moved Hero Section to Review
									</p>

									<p className="text-sm text-zinc-500 mt-1">
										3 days ago
									</p>

								</div>

							</div>

						</CardContent>

					</Card>

					<div className="space-y-6">

						{!showMoreMembers && <Card className="bg-zinc-900 border-zinc-800">
							<CardContent className="p-7">
								<h2 className="text-xl font-semibold text-white">
									Team
								</h2>
								<div className="flex -space-x-4 mt-6">
									{memberDisplay?.map((member) => {
										const { user = {} } = member ?? {}
										const name = user?.firstName?.slice(0, 1)?.toUpperCase()
										return (
											<div key={user?.id} className="flex justify-center items-center rounded-full font-bold text-lg w-12 h-12 bg-blue-500 border-2 border-zinc-900">{name}</div>
										)
									})}
									{members?.length > 1 &&
										<button
											type="button"
											className="ml-5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
											onClick={() => setShowMoreMembers(prev => !prev)}
										>
											{showMoreMembers ? 'show less' : 'show more'}
										</button>
									}
								</div>
								<p className="text-zinc-400 mt-6 leading-relaxed">
									{`${members?.length} members are collaborating in this project.`}
								</p>
							</CardContent>
						</Card>
						}

						<Card className="bg-zinc-900 border-zinc-800">

							<CardContent className="p-6">

								<h3 className="text-lg font-semibold text-white">
									Files
								</h3>

								<p className="text-zinc-500 mt-3">
									23 shared files
								</p>

								<Button
									variant="ghost"
									className="mt-5 p-0 text-blue-400 hover:text-blue-300"
								>
									Open Files →
								</Button>

							</CardContent>

						</Card>

					</div>

				</div>


			</div>
		</div >
	)
}


// <Card className="bg-zinc-900 border-zinc-800">
//
// 	<CardContent className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-6">
//
// 		<div>
//
// 			<p className="text-blue-400 text-sm font-medium">
// 				Continue Working
// 			</p>
//
// 			<h2 className="text-xl font-semibold text-white mt-2">
// 				{lastUpdatedTask[0]?.title}
// 			</h2>
//
// 			<p className="text-zinc-500 mt-1">
// 				{`Last opend ${lastUpdated}`}
// 			</p>
//
// 		</div>
//
// 		<Button className="rounded-xl mt-5 lg:mt-0 bg-blue-500 hover:bg-blue-600">
// 			Resume →
// 		</Button>
//
// 	</CardContent>
//
// </Card>
//


// <div className={`grid  ${showMoreMembers ? 'grid-cols-1 md:grid-cols-[1.6fr_0.7fr]' : 'grid-cols-1'} gap-3 `}>
