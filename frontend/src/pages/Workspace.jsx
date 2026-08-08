import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { workspaceMemberQueryOption, workspaceQueryOption } from "@/queryOptions/queryOptions"
import { Outlet, useNavigate } from "react-router-dom"
import Grid from "@/components/itemDisplayOption/Option"
import { useState } from "react"
import User from "@/components/User"
import { useLocation } from "react-router-dom"
import { useAppState } from "@/hooks/apptools"
// import Collapsible from "@/components/Collapsable"
import {
	PanelRightClose,
	// PanelRightOpen,
	// CalendarDays,
	// CheckCircle2,
	// Circle,
	// Paperclip,
} from "lucide-react"
import { Input } from "@/components/ui/input"


export default function Workspace() {
	const { selectedWorkspace } = useAppState()
	const navigate = useNavigate()
	const [filter, setFilter] = useState('all')
	const location = useLocation()
	const [showMoreProject, setShowMoreProject] = useState(false)
	const [showMoreMembers, setShowMoreMembers] = useState(false)

	const { data: allWorkspace } = useQuery(workspaceQueryOption())
	const { workspaces } = allWorkspace ?? {}
	const workspace = workspaces?.[selectedWorkspace?.id]
	// console.log('workspace:', workspace)
	let { projects, projectOrdering } = workspace ?? {}
	// const projects
	let ordering = projectOrdering?.filter((projectId) => filter === 'all' || projects?.[projectId]?.status === filter)

	ordering = ordering?.length > 4 && !showMoreProject ? ordering?.slice(0, 6) : ordering
	const { data: members } = useQuery(workspaceMemberQueryOption(workspace?.id))
	let memberDisplay = members?.length > 5 && !showMoreMembers ? members?.slice(0, 5) : members

	const tabs = [
		{ id: "members", label: "Members" },
		{ id: "requests", label: "Requests" },
		{ id: "details", label: "Project Details" },
	];

	const [activeTab, setActiveTab] = useState("members");
	return (
		<div className="space-y-10">
			<div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
				<div>
					<p className="text-blue-400 text-sm font-medium">
						Workspace
					</p>
					<h1 className="text-4xl font-bold text-white mt-2">
						{workspace?.name}
					</h1>
					<p className="text-zinc-400 mt-3 max-w-2xl leading-relaxed">
						{workspace?.description}
					</p>
				</div>
				<Button className="rounded-xl bg-blue-500 hover:bg-blue-600 h-11 px-6" onClick={() => navigate('create-project')}>
					New Project
				</Button>
			</div>
			<div className={`grid  ${showMoreMembers ? 'grid-cols-1 md:grid-cols-[1.6fr_0.7fr]' : 'grid-cols-1'} gap-3 `}>
				<div className={`${showMoreMembers ? 'hidden md:flex' : 'flex'} flex-col gap-5 `}>
					<div>
						<div className="flex items-center justify-between mb-5">
							<h2 className="text-2xl font-semibold text-white">
								Projects
							</h2>
							<div className="flex gap-2">
								<Button
									variant="secondary"
									className="rounded-xl bg-zinc-900 text-green-500 hover:bg-zinc-800"

									onClick={() => setFilter('all')}
								>
									All
								</Button>

								<Button
									variant="ghost"
									className="rounded-xl text-zinc-400 hover:text-blue-500"
									onClick={() => setFilter('active')}
								>
									Active
								</Button>

								<Button
									variant="ghost"
									className="rounded-xl text-zinc-400 hover:text-blue-500"

									onClick={() => setFilter('archived')}
								>
									Archived
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="text-zinc-500 hover:text-white"
									onClick={() => setShowMoreMembers(prev => !prev)}
								>
									<PanelRightClose className="w-5 h-5" />
								</Button>

							</div>


						</div>

						<div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">

							{ordering?.map((projectId) => (<Grid key={projectId} project={projects?.[projectId]} />))
							}
							{projectOrdering?.length > 6 &&
								(
									<Button className="text-gray-400 justify-self-end col-span-full" onClick={() => setShowMoreProject(prev => !prev)}>{showMoreProject ? 'show less' : 'show more'}</Button>
								)
							}
						</div>

					</div>

					<div className={`grid ${showMoreMembers ? 'xl:grid-cols-1' : 'xl:grid-cols-[1.4fr_0.8fr]'} gap-6 overflow-hidden`}>

						<Card className="bg-zinc-900 border-zinc-800">

							<CardContent className="p-7">

								<h2 className="text-xl font-semibold text-white">
									Recent Activity
								</h2>

								<div className="mt-6 space-y-5">

									<div className="flex justify-between">

										<div>

											<p className="text-white">
												Sarah completed Homepage Design
											</p>

											<p className="text-zinc-500 text-sm mt-1">
												Landing Page Redesign
											</p>

										</div>

										<p className="text-zinc-500 text-sm">
											2h ago
										</p>

									</div>

									<div className="flex justify-between">

										<div>

											<p className="text-white">
												Michael uploaded Brand Guidelines
											</p>

											<p className="text-zinc-500 text-sm mt-1">
												Brand Assets
											</p>

										</div>

										<p className="text-zinc-500 text-sm">
											Yesterday
										</p>

									</div>

									<div className="flex justify-between">

										<div>

											<p className="text-white">
												Emma moved SEO Audit to Review
											</p>

											<p className="text-zinc-500 text-sm mt-1">
												SEO Campaign
											</p>

										</div>

										<p className="text-zinc-500 text-sm">
											3 days ago
										</p>

									</div>

								</div>

							</CardContent>

						</Card>
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
									{`${members?.length} members are collaborating inside this workspace.`}
								</p>
							</CardContent>
						</Card>
						}
					</div>
				</div>
				{showMoreMembers &&
					<div className="w-1/3 bg-zinc-900/50 pt-5 absolute bottom-0 backdrop-blur-sm bg-[rgba(0,0,0,0.5)] h-full overflow-hidden right-0">
						<div className="flex border-b border-gray-700 bg-zinc-950 ">
							{tabs.map((tab) => (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`px-4 py-3 text-sm ${activeTab === tab.id
										? "border-b-2 border-blue-500 text-white"
										: "text-gray-400 hover:text-white"
										}`}
								>
									{tab.label}
								</button>
							))}
						</div>

						<div className="p-3 border-l border-zinc-800">
							<div>
								<div className="flex gap-2">
									<Input className="p-4 h-10 rounded-sm text-white" placeholder="Enter email to send an invite" />
									<Button className="text-white p-4">send</Button>
								</div>
							</div>
							{activeTab === "members" && (
								<div className="max-h-64 overflow-auto my-5">
									{memberDisplay?.map((member) => (
										<User key={member.user.id} member={member} />
									))}
								</div>
							)}

							{activeTab === "requests" && <PendingRequests />}
							{activeTab === "details" && <ProjectDetails />}
						</div>
					</div>

				}
			</div>
			{location.pathname.includes('create-project') &&
				<div className="overflow-auto h-screen absolute top-0 w-full left-0 backdrop-blur-sm bg-[rgba(0,0,0,0.4)] p-5">
					<Outlet context={{ workspace, members }} />
				</div>
			}
		</div>
	)
}


// <div className="space-y-3">
// 	<Collapsible title="Members" defaultOpen>
// 		<div className="max-h-64 overflow-auto">
// 			{memberDisplay?.map((member) => (
// 				<User key={member.user.id} member={member} />
// 			))}
// 		</div>
// 	</Collapsible>
//
// 	<Collapsible title="Project Details">
// 		<ProjectDetails />
// 	</Collapsible>
//
// 	<Collapsible title="Pending Requests">
// 		<PendingRequests />
// 	</Collapsible>
//
// 	<Collapsible title="Tasks">
// 		<TaskList />
// 	</Collapsible>
// </div>

