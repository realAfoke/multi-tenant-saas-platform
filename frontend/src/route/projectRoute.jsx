import { useAppState } from "@/hooks/apptools";
import { projectQueryOption, workspaceQueryOption } from "@/queryOptions/queryOptions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Outlet, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { PanelRightCloseIcon } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import User from "@/components/User"
import CreateTask from "@/components/CreateTask";
import { Input } from "@/components/ui/input";
import { instance } from "@/api/axios";

export default function ProjectRoute() {
	const [selected, setSelected] = useState('overview')
	const navigate = useNavigate()
	const location = useLocation()
	const [email, setEmail] = useState('')
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
	const [sent, setSent] = useState(false)
	const [toggleCreateTask, setToggleCreateTask] = useState(false)


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

	useEffect(() => {
		const timer = setTimeout(() => {
			setSent(false)
		}, [5000])
		return () => clearTimeout(timer)
	}, [sent])

	const sendInvite = useMutation({
		mutationFn: async () => {
			const inviteSent = await instance.post(`workspaces/${project?.workspace}/invite/`, { email: email, project: project?.id })
			return inviteSent?.data
		},
		onSuccess: () => {
			setSent(true)
		}
	})
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
				<Button className="rounded-xl capitalize bg-blue-500 hover:bg-blue-600 h-11 px-6" onClick={() => setToggleCreateTask(prev => !prev)}>
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

			<div className={`grid  ${showMoreMembers ? 'grid-cols-1 md:grid-cols-[1.6fr_0.7fr]' : 'grid-cols-1'} gap-3 `}>
				<div className="flex-1">
					<Outlet context={{ project, showMoreMembers, memberDisplay, members }} />
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
									<Input className="p-4 h-10 rounded-sm text-white" placeholder="Enter email to send an invite" value={email} onChange={(e) => setEmail(e.target.value)} />
									<Button className={`${sent ? 'bg-green-400 p-2' : ''} text-white p-4`}
										onClick={() => sendInvite.mutate()}>{sent ? 'sent' : 'send'}</Button>
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

			{toggleCreateTask && <div className={`overflow-auto h-screen absolute top-0 w-full left-0 backdrop-blur-sm bg-[rgba(0,0,0,0.4)] p-5`}>
				<CreateTask project={project} handleCreateTask={setToggleCreateTask} />
			</div>
			}
		</div >
	)
}


