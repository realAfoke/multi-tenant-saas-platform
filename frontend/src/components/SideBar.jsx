import { ItemGroup, Item, ItemContent, ItemTitle, ItemMedia } from "@/components/ui/item"
import NestedList from "@/components/NestedList"
import searchIcon from "@/assets/search1.svg"
import cog from "@/assets/project.svg"
import edit from "@/assets/edit1.svg"
import closeMenu from '@/assets/close.svg'
import { useAppStore } from "@/store/authStore"
import { Fragment, useState, useRef, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import useAuthStore from "@/store/authStore"
import profile from "@/assets/profileIcon.svg"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { instance } from "@/api/axios"
import { workspaceQueryOption, projectQueryOption } from "@/queryOptions/queryOptions"


export default function SideBar(props) {
	const ref = useRef(null)
	const { setToggle, handleWk, handleProject, selectedWorkspace, selectedProject, handleToggleWorkspace, toggleWorkspace, handleTask } = props
	// const { workspaces, ordering } = useAppStore(state => state.cacheWorkspace)
	// const { projects } = useAppStore(state => state.cacheProjects)
	const { tasks } = useAppStore(state => state.cacheTasks)
	const [showOptions, setShowOptions] = useState(false)
	const navigate = useNavigate()
	const isProjectSelected = !!selectedProject?.id
	const isWorkspaceSeleted = !!selectedWorkspace?.id
	// const user = useAuthStore(state => state.getUser())
	const queryClient = useQueryClient()

	const { data: projects } = useQuery(projectQueryOption(selectedWorkspace?.id))
	const user = queryClient.getQueryData(['user'])
	const { data: workspaces } = useQuery(workspaceQueryOption())
	const { workspace, ordering } = workspaces ?? {}


	//toggle workspace list off i.e hide the list when a workspace is selected
	useEffect(() => {
		if (!selectedWorkspace?.show) return
		handleToggleWorkspace(false)
	}, [selectedWorkspace?.show])


	// useEffect(() => {
	// 	if (!projects || !selectedWorkspace?.id) return
	// 	queryClient.setQueryData(['workspace'], (old) => {
	// 		console.log('project:', projects)
	// 		const { workspace = {} } = old ?? {}
	// 		const next = {
	// 			...old,
	// 			workspace: {
	// 				...workspace,
	// 				[selectedWorkspace?.id]: {
	// 					...(workspace?.[selectedWorkspace?.id] ?? {}),
	// 					projectIds: projects.map((project) => project?.id)
	// 				}
	// 			}
	// 		}
	// 		console.log('next:', next)
	// 		return next
	// 	})
	// }, [projects, selectedWorkspace?.id, queryClient])


	const title = isProjectSelected ? 'Add Task' : isWorkspaceSeleted ? 'Add Project' : 'Create New Workspace'
	const path = isProjectSelected ? `${selectedWorkspace?.name}/${selectedProject?.name}/add-new-task` : isWorkspaceSeleted ? `${selectedWorkspace?.name}/add-new-project` : 'create-new-workspace'

	useEffect(() => {
		const projects = workspaces?.[selectedWorkspace?.id]?.projects
		if (!projects?.includes(selectedProject?.id)) {
			handleProject({ id: null, show: false })
		}
	}, [selectedWorkspace?.id])

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
		<div ref={ref} className={`flex h-full flex-col absolute text-white bg-[#000] shadow-lg border-r border-[#f6f3f438] px-2 min-w-60 md:relative md:min-w-[17rem] `}>
			<div className="flex justify-between items-center">
				<div className="text-2xl font-semibolf p-3 text-white shadow-md">Orbit</div>
				<div>
					<img src={closeMenu} className="w-5 h-5 md:w-5 md:h-5 cursor-pointer" onClick={() =>
						setToggle(false)
					} />
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
				<Item className={`gap-2 py-2 ${!showOptions ? 'hover:bg-[#ffffff1a]' : ''} rounded-md px-2`}>

					<ItemMedia variant="image" className="w-4 h-4 self-start">
						<img src={edit} />
					</ItemMedia>
					<ItemContent >
						<ItemTitle onClick={() => setShowOptions((prev) => !prev)} className="capitalize text-sm w-full" >
							New
						</ItemTitle>
						{showOptions && <ItemGroup className="gap-0">
							<Item className="py-2 my-0 hover:bg-[#ffffff1a] rounded-md px-2" onClick={() => {
								navigate(path, { state: { wkId: selectedWorkspace?.id, prjId: selectedProject?.id } })
							}}>
								<ItemContent>
									<ItemTitle className="capitalize text-sm w-full">
										{title}
									</ItemTitle>
								</ItemContent>
							</Item>
						</ItemGroup>
						}

					</ItemContent>
				</Item>
				<div>
					<Item className="gap-2 py-2 hover:bg-[#ffffff1a] rounded-md px-2 ">
						<ItemMedia variant="image" className="w-5 h-5">
							<img src={cog} />
						</ItemMedia>
						<ItemContent>
							<ItemTitle className="capitalize text-sm  w-full" onClick={() => {
								handleWk((prev) => ({ ...prev, show: false }))
								handleToggleWorkspace((prev) => (!prev))
							}}>
								Workspaces
							</ItemTitle>
						</ItemContent>
					</Item>
					{toggleWorkspace &&
						<ItemGroup className="gap-0 px-10 ">
							{
								ordering?.map((id) => {
									const main = workspace?.[id]
									return (
										<NestedList key={main?.id} list={main} selectedWkId={selectedWorkspace} setter={handleWk} />)
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
								handleWk((prev) => ({ ...prev, show: !prev.show }))
							}}>
								Project
							</ItemTitle>
						</ItemContent>
					</Item>
					{selectedWorkspace?.show && <ItemGroup className="gap-0 px-10">
						{projects?.ordering?.map((projectId) => {
							const project = projects?.project?.[projectId]
							return (
								<Fragment key={project?.id}>
									<NestedList key={project?.id} list={project} selectedPrjId={selectedProject} setter={handleProject} />
									{
										selectedProject?.id === project?.id &&
										<ItemGroup className="gap-0 my-0 py-0 px-7">
											{project?.tasks?.map((taskId) => {
												const task = tasks?.[taskId]
												return (
													<NestedList key={task?.id} list={task} setter={handleTask} />
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
			<Link to="profile" className="bg-inherit shadow-lg absolute bottom-0 w-full py-5">
				<div className="flex items-center justify-start gap-1">
					<div className="w-7 rounded-full h-7">
						<img src={profile} className="object-fit-contain rounded-full" />
					</div>
					{`${user?.firstName} ${user?.lastName}`}
				</div>
			</Link>
		</div>
	)
}


