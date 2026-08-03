import { useAppState } from "@/hooks/apptools";
import { projectQueryOption, workspaceQueryOption } from "@/queryOptions/queryOptions";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { PanelRightCloseIcon } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import User from "@/components/User"

export default function ProjectRoute() {
	const [selected, setSelected] = useState('overview')
	const navigate = useNavigate()
	const location = useLocation()
	const pathNames = location.pathname.split('/').filter((ptName) => ptName != '')
	const { projectName } = useParams()
	const { selectedWorkspace, setProject, selectedProject } = useAppState()
	const { data: allWorkspaces } = useQuery(workspaceQueryOption())
	const { workspaces = {} } = allWorkspaces ?? {}
	const { data: project } = useQuery(projectQueryOption(selectedWorkspace?.id, selectedProject?.id))
	const [showMoreMembers, setShowMoreMembers] = useState(false)
	const [activeTab, setActiveTab] = useState("members");
	const { members } = project ?? []
	let memberDisplay = members?.length > 5 && !showMoreMembers ? members?.slice(0, 5) : members

	const mainTabs = ['board', 'files', 'discussion', 'timeline']

	const tabs = [
		{ id: "members", label: "Members" },
		{ id: "requests", label: "Requests" },
		{ id: "details", label: "Project Details" },
	];

	useEffect(() => {
		if (pathNames.length == 3) {
			setSelected('overview')
		} else {
			setSelected(pathNames[pathNames.length - 1])
		}
	}, [pathNames])
	useEffect(() => {

		if (!selectedWorkspace || !projectName) return
		const workspace = workspaces?.[selectedWorkspace?.id]
		const { projects } = workspace ?? {}
		const project = Object.values(projects ?? {})?.find((obj) => obj?.name == projectName)
		if (project) {
			setProject({ id: project?.id, name: project?.name, show: true })
		}

	}, [workspaces, selectedWorkspace, projectName])
	return (
		<div className="space-y-8">
			<div className="flex justify-between items-center">

				<div>
					<p onClick={() => navigate(`../${project?.workspaceName}`)} className="text-blue-400 text-sm font-medium">
						{project?.workspaceName}
					</p>

					<div className="flex flex-wrap items-center gap-4 mt-2">

						<h1 className="text-4xl font-bold text-white">
							{project?.name}
						</h1>

						<span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">
							Active
						</span>

					</div>

					<p className="text-zinc-400 max-w-3xl mt-4 leading-relaxed">
						{project?.description}
					</p>
				</div>
				<Button className="rounded-xl capitalize bg-blue-500 hover:bg-blue-600 h-11 px-6" onClick={() => navigate('create-project')}>
					New Task
				</Button>


			</div>

			{/* Tabs */}

			<div className="border-b border-zinc-800 flex justify-between">

				<div className="flex gap-8 overflow-x-auto">
					<button className={`${selected == 'overview' ? 'border-b-2 border-blue-500 text-white' : 'text-zinc-500 hover:text-white'} pb-4 text-white font-medium whitespace-nowrap`} onClick={() => {
						setSelected('overview')
						navigate('./', { replace: true })
					}}>
						Overview
					</button>

					{mainTabs.map((tab) => (
						<button key={tab} className={`${selected == tab ? 'border-b-2 border-blue-500 text-white' : 'text-zinc-500 hover:text-white'} pb-4 text-white font-medium whitespace-nowrap`} onClick={() => {
							setSelected(tab)
							navigate(`${tab}`, { replace: true })
						}}>
							{tab}
						</button>

					))}


				</div>
				<Button
					variant="ghost"
					size="icon"
					className="text-zinc-500 hover:text-white"
					onClick={() => setShowMoreMembers(prev => !prev)}
				>
					<PanelRightCloseIcon className="w-5 h-5 hover:bg-transparent" />
				</Button>



			</div>

			<div className="flex gap-2 ">
				<div className="flex-2">
					<Outlet context={{ project, showMoreMembers, memberDisplay, members }} />
				</div>
				{showMoreMembers &&
					<div className="flex-1 bg-zinc-900/50 overflow-y-auto">
						<div className="flex border-b border-gray-700 bg-zinc-950">
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
							{activeTab === "members" && (
								<div className="max-h-64 overflow-auto">
									{memberDisplay?.map((member) => (
										<User key={member?.user?.id} member={member} />
									))}
								</div>
							)}

							{activeTab === "requests" && <PendingRequests />}
							{activeTab === "details" && <ProjectDetails />}
						</div>
					</div>
				}
			</div>

		</div >
	)
}
