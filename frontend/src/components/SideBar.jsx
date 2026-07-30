import { ItemGroup, Item, ItemContent, ItemTitle, ItemMedia } from "@/components/ui/item"
import NestedList from "@/components/NestedList"
import searchIcon from "@/assets/search1.svg"
import cog from "@/assets/project.svg"
import edit from "@/assets/edit1.svg"
import closeMenu from '@/assets/close.svg'
import { Fragment, useState, useRef, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import profile from "@/assets/profileIcon.svg"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { workspaceQueryOption, projectQueryOption, taskQueryOption } from "@/queryOptions/queryOptions"
import { useAppState } from "@/hooks/apptools"
import { Button } from "./ui/button"

export default function SideBar(props) {
	const ref = useRef(null)
	const { setToggle, handleToggleWorkspace, toggleWorkspace } = props
	const { setWorkspace, setProject, setTask, selectedWorkspace, selectedProject, selectedTask } = useAppState()
	const [showOptions, setShowOptions] = useState(false)
	const navigate = useNavigate()
	const isProjectSelected = !!selectedProject?.id
	const isWorkspaceSeleted = !!selectedWorkspace?.id
	const queryClient = useQueryClient()

	const { data: userWorkspaces } = useQuery(workspaceQueryOption())
	const { workspaces, ordering } = userWorkspaces ?? {}
	const { data: workspaceProject } = useQuery(projectQueryOption(selectedWorkspace?.id))
	const { projects, projectOrdering } = workspaceProject ?? {}

	const user = queryClient.getQueryData(['user'])
	const { data: projectTasks } = useQuery(taskQueryOption(selectedWorkspace?.id, selectedProject?.id))
	const { tasks, taskOrdering } = projectTasks ?? {}


	useEffect(() => {
		if (!selectedWorkspace?.show) return
		handleToggleWorkspace(false)
	}, [selectedWorkspace?.show])


	const title = isProjectSelected ? 'Add Task' : isWorkspaceSeleted ? 'Add Project' : 'Create New Workspace'
	const path = isProjectSelected ? `${selectedWorkspace?.name}/${selectedProject?.name}/add-new-task` : isWorkspaceSeleted ? `${selectedWorkspace?.name}/add-new-project` : 'create-new-workspace'

	useEffect(() => {
		if (!selectedProject) {
			setProject({ id: null, show: false })

		}
	}, [selectedWorkspace?.id, selectedProject?.id])

	useEffect(() => {
		const handleClick = (e) => {
			if (window.innerWidth >= 780) return
			if (ref.current && !ref.current.contains(e.target)) {
				setToggle(false)
			}
		}
		document.addEventListener('click', handleClick)
		return () => { document.removeEventListener('click', handleClick) }
	}, [])
	return (
		<div ref={ref} className={`py-3 flex h-full flex-col absolute text-white bg-[#000] shadow-lg border-r border-[#f6f3f438] px-2 min-w-60 md:relative md:min-w-[17rem] `}>
			<div className="border-b border-zinc-800 pb-6">

				<div className="flex justify-between items-start">

					<div>

						<h1 className="text-2xl font-bold text-white">
							OrbitSpace
						</h1>

						<p className="text-xs text-gray-500 mt-1">
							Manage all your work
						</p>

					</div>

					<img
						src={closeMenu}
						className=" w-5 h-5 cursor-pointer"
						onClick={() => setToggle(false)}
					/>

				</div>

			</div>
			<div className="mb-[5rem] overflow-auto min-h-full  scrollbar scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-900 md:pb-[6rem]">
				<Item className="gap-2 py-2 hover:bg-[#ffffff1a] rounded-md px-2">

					<ItemMedia variant="image" className="w-5 h-5">
						<img src={searchIcon} className="" />
					</ItemMedia>
					<ItemContent>
						<ItemTitle className="capitalize text-sm w-full">
							Search
						</ItemTitle>
					</ItemContent>
				</Item>
				<div className="mt-6">
					<Button
						variant="outline"
						className="
        w-full
        rounded-xl
        border-zinc-700
        hover:bg-zinc-900
    "
					>
						+ New
					</Button>
				</div>
				<div>
					<Item className="gap-2 py-2 hover:bg-[#ffffff1a] rounded-md px-2 ">
						<ItemMedia variant="image" className="w-5 h-5">
							<img src={cog} />
						</ItemMedia>
						<ItemContent>
							<ItemTitle className="py-2 capitalize text-sm  w-full" onClick={() => {
								setWorkspace((prev) => ({ ...prev, show: false }))
								handleToggleWorkspace((prev) => (!prev))
							}}>
								Workspaces
							</ItemTitle>
						</ItemContent>
					</Item>
					{toggleWorkspace &&
						<ItemGroup className="gap-0 ">
							{
								ordering?.map((id) => {
									const main = workspaces?.[id]
									return (
										<NestedList key={main?.id} list={main} selectedWkId={selectedWorkspace} setter={setWorkspace} />)
								})
							}
						</ItemGroup>
					}
				</div>
				<div>
					<Item className="gap-2 py-2 hover:bg-[#ffffff1a] rounded-md px-2">
						<ItemMedia variant="image" className="w-5 h-5">
							<img src={cog} />
						</ItemMedia>
						<ItemContent>
							<ItemTitle className="capitalize text-sm w-full" onClick={() => {
								setWorkspace((prev) => ({ ...prev, show: !prev.show }))
							}}>
								Project
							</ItemTitle>
						</ItemContent>
					</Item>
					{selectedWorkspace?.show && <ItemGroup className="gap-0">
						{projectOrdering?.map((projectId) => {
							const project = projects?.[projectId]
							return (
								<Fragment key={project?.id}>
									<NestedList key={project?.id} list={project} selectedPrjId={selectedProject} setter={setProject} />
									{
										selectedProject?.id === project?.id &&
										<ItemGroup className="gap-0 my-0 py-0 px-7">
											{taskOrdering?.map((taskId) => {

												const task = tasks?.[taskId]
												return (
													<NestedList key={task?.id} list={task} setter={setTask} />
												)
											})}
										</ItemGroup>
									}
								</Fragment>
							)
						})}
					</ItemGroup>}
				</div>


			</div >
			<Link
				to="profile"
				className="absolute bottom-0 left-0 w-full border-t border-zinc-800 p-4 hover:bg-zinc-900 transition "
			>
				<div className="flex items-center gap-3">

					<img
						src={profile}
						className="w-10 h-10 rounded-full"
					/>

					<div>

						<p className="text-white font-medium">
							{user?.firstName} {user?.lastName}
						</p>

						<p className="text-xs text-gray-500">
							Free Plan
						</p>

					</div>

				</div>

			</Link>
		</div>
	)
}


// return (
// 	<div
// 		ref={ref}
// 		className="absolute md:relative flex h-full w-72 flex-col bg-black border-r border-zinc-800 text-white"
// 	>
//
// 		{/* Header */}
// 		<div className="border-b border-zinc-800 px-6 py-6">
//
// 			<div className="flex items-start justify-between">
//
// 				<div>
//
// 					<h1 className="text-3xl font-bold tracking-tight">
// 						OrbitSpace
// 					</h1>
//
// 					<p className="text-sm text-zinc-500 mt-1">
// 						Manage all your work
// 					</p>
//
// 				</div>
//
// 				<img
// 					src={closeMenu}
// 					className="w-5 h-5 md:hidden cursor-pointer"
// 					onClick={() => setToggle(false)}
// 				/>
//
// 			</div>
//
// 		</div>
//
// 		{/* Navigation */}
//
// 		<div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
//
// 			<Item className="gap-3 rounded-xl px-3 py-3 hover:bg-zinc-900 cursor-pointer">
//
// 				<ItemMedia variant="image" className="w-5 h-5">
// 					<img src={searchIcon} />
// 				</ItemMedia>
//
// 				<ItemContent>
// 					<ItemTitle className="text-sm">
// 						Search
// 					</ItemTitle>
// 				</ItemContent>
//
// 			</Item>
//
// 			<div>
//
// 				<p className="px-3 text-xs uppercase tracking-widest text-zinc-500 mb-3">
// 					Your Workspaces
// 				</p>
//
// 				<div className="space-y-1">
//
// 					{ordering?.map(id => {
//
// 						const workspace = workspaces?.[id]
//
// 						return (
//
// 							<div key={workspace?.id}>
//
// 								<Item
// 									className="gap-3 rounded-xl px-3 py-3 hover:bg-zinc-900 cursor-pointer"
// 									onClick={() => {
// 										setWorkspace(prev => ({
// 											...prev,
// 											show: selectedWorkspace?.id === workspace?.id
// 												? !prev.show
// 												: true
// 										}))
// 										setWorkspace(workspace)
// 									}}
// 								>
//
// 									<ItemMedia variant="image" className="w-5 h-5">
// 										<img src={cog} />
// 									</ItemMedia>
//
// 									<ItemContent>
//
// 										<div className="flex justify-between items-center">
//
// 											<ItemTitle className="text-sm">
// 												{workspace?.name}
// 											</ItemTitle>
//
// 											<span className="text-zinc-500">
// 												{selectedWorkspace?.id === workspace?.id && selectedWorkspace?.show ? "−" : "+"}
// 											</span>
//
// 										</div>
//
// 									</ItemContent>
//
// 								</Item>
//
// 								{selectedWorkspace?.id === workspace?.id &&
// 									selectedWorkspace?.show && (
//
// 										<div className="ml-8 mt-1 space-y-1 border-l border-zinc-800 pl-4">
//
// 											{projectOrdering?.map(projectId => {
//
// 												const project = projects?.[projectId]
//
// 												return (
//
// 													<Fragment key={project?.id}>
//
// 														<NestedList
// 															list={project}
// 															selectedPrjId={selectedProject}
// 															setter={setProject}
// 														/>
//
// 														{selectedProject?.id === project?.id && (
//
// 															<div className="ml-5 mt-1 border-l border-zinc-800 pl-3">
//
// 																{taskOrdering?.map(taskId => {
//
// 																	const task = tasks?.[taskId]
//
// 																	return (
// 																		<NestedList
// 																			key={task?.id}
// 																			list={task}
// 																			setter={setTask}
// 																		/>
// 																	)
//
// 																})}
//
// 															</div>
//
// 														)}
//
// 													</Fragment>
//
// 												)
//
// 											})}
//
// 										</div>
//
// 									)}
//
// 							</div>
//
// 						)
//
// 					})}
//
// 				</div>
//
// 			</div>
//
// 			<Button
// 				variant="outline"
// 				className="w-full rounded-xl border-zinc-700 hover:bg-zinc-900"
// 				onClick={() => navigate(path)}
// 			>
// 				{title}
// 			</Button>
//
// 		</div>
//
// 		<Link
// 			to="profile"
// 			className="border-t border-zinc-800 p-5 hover:bg-zinc-900 transition"
// 		>
//
// 			<div className="flex items-center gap-3">
//
// 				<img
// 					src={profile}
// 					className="w-11 h-11 rounded-full"
// 				/>
//
// 				<div>
//
// 					<p className="font-medium">
// 						{user?.firstName} {user?.lastName}
// 					</p>
//
// 					<p className="text-xs text-zinc-500">
// 						Free Plan
// 					</p>
//
// 				</div>
//
// 			</div>
//
// 		</Link>
//
// 	</div>
// )
