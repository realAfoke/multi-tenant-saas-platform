import { ItemGroup, Item, ItemContent, ItemTitle, ItemMedia } from "@/components/ui/item"
import searchIcon from "@/assets/search1.svg"
import cog from "@/assets/project.svg"
import closeMenu from '@/assets/close.svg'
import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { workspaceQueryOption, fetchRoleQueryOption } from "@/queryOptions/queryOptions"
import { useAppState } from "@/hooks/apptools"
import Project from "./sidebar/Project"
import {
	Plus,
	ChevronRight,
	Settings,
	UserPlus,
} from "lucide-react"
import DirectMessage from "./sidebar/DirectMessage"

export default function SideBar(props) {
	const ref = useRef(null)
	const navigate = useNavigate()

	const [showAddPeople, setShowAddPeople] = useState(false)
	const { setToggle, handleToggleWorkspace, toggleWorkspace } = props
	const { setWorkspace, selectedWorkspace } = useAppState()

	const { data: userWorkspaces } = useQuery(workspaceQueryOption())
	const { workspaces, ordering } = userWorkspaces ?? {}


	const { data: profile } = useQuery(fetchRoleQueryOption(selectedWorkspace?.id))
	const user = profile?.user
	// const openDM = (person) => {
	// 	setSelectedDM(person)
	// 	setView("dm")
	// 	setMessage("")
	// }



	useEffect(() => {
		if (!selectedWorkspace?.show) return
		handleToggleWorkspace(false)
	}, [selectedWorkspace?.show,handleToggleWorkspace])


	useEffect(() => {
		const handleClick = (e) => {
			if (window.innerWidth >= 780) return
			if (ref.current && !ref.current.contains(e.target)) {
				setToggle(false)
			}
		}
		document.addEventListener('click', handleClick)
		return () => { document.removeEventListener('click', handleClick) }
	}, [setToggle])
	return (
		<div ref={ref} className={`py-3 flex h-full flex-col absolute text-white bg-zinc-900 shadow-lg border-r border-[#f6f3f438] px-2 w-[13rem] md:w-[18em] md:relative z-99 `}>
			<div className="relative border-b border-zinc-800 pb-3 mb-3">
				<div className="flex items-center justify-between flex-1">

					<button
						onClick={() => handleToggleWorkspace((prev) => !prev)}
						className="flex flex-1 items-center gap-2 min-w-0 px-2 py-2 rounded-lg hover:bg-zinc-800 transition"
					>
						<div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
							<span className="text-sm font-bold text-white">
								{selectedWorkspace?.name?.[0]?.toUpperCase() || "O"}
							</span>
						</div>

						<div className="min-w-0 text-left">
							<p className="text-sm font-semibold text-white truncate">
								{selectedWorkspace?.name || "OrbitSpace"}
							</p>

							<p className="text-[11px] text-zinc-500">
								Workspace
							</p>
						</div>

					</button>

					<img
						src={closeMenu}
						className="w-5 h-5 cursor-pointer opacity-60 hover:opacity-100"
						onClick={() => setToggle(false)}
					/>

				</div>

				{(selectedWorkspace?.id && ['admin', 'owner'].includes(profile?.role) && toggleWorkspace) && (
					<div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-lg border border-zinc-800 bg-zinc-950 shadow-xl p-1">

						<button
							onClick={() => setShowAddPeople(true)}
							className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
						>
							<UserPlus className="w-4 h-4 text-zinc-500" />
							<span>Invite people</span>
						</button>

						<button
							onClick={() => {
								handleToggleWorkspace(false)
								navigate(`/${selectedWorkspace.name}/create-channel`)
							}}
							className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
						>
							<Plus className="w-4 h-4 text-zinc-500" />
							<span>Create channel</span>
						</button>

						<button
							onClick={() => {
								handleToggleWorkspace(false)
								navigate(`/${selectedWorkspace.name}/settings`)
							}}
							className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
						>
							<Settings className="w-4 h-4 text-zinc-500" />
							<span>settings</span>
						</button>

					</div>
				)}
			</div>
			<div className="mb-[4rem] overflow-auto h-screen  scrollbar scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-900">
				<div className="hidden md:flex items-center gap-2 bg-black px-4 h-10">
					<img
						src={searchIcon}
						className="w-4 h-4 opacity-60"
					/>
					<input
						placeholder="Search..."
						className="bg-transparent outline-none text-white placeholder:text-zinc-500 border-none"
					/>
				</div>

				{!selectedWorkspace?.id && <div>
					<Item className="gap-2 py-2 hover:bg-[#ffffff1a] rounded-md px-2 ">
						<ItemMedia variant="image" className="w-5 h-5">
							<img src={cog} />
						</ItemMedia>
						<ItemContent className="flex-row justify-between items-center">
							<ItemTitle className="py-2 capitalize text-sm  w-full" onClick={() => {
								handleToggleWorkspace((prev) => (!prev))
							}}>
								Workspaces
							</ItemTitle>

						</ItemContent>
						<button className="flex items-center justify-center w-6 h-6 rounded-md text-zinc-500 hover:text-white hover:bg-zinc-800 transition" onClick={() =>
							navigate(`/create-workspace`)
						} >
							<Plus className="w-4 h-4" />

						</button>

					</Item>
					{toggleWorkspace &&
						<ItemGroup className="gap-0 ">
							{
								ordering?.map((id) => {
									const main = workspaces?.[id]
									return (
										<Link key={main?.id} to={`/${main?.name}/general`} onClick={() => {
											setWorkspace({ ...main, show: true })
										}}
											className={`p-2 px-5 my-0 hover:bg-[#ffffff1a] rounded-md ${selectedWorkspace?.id === main?.id
												? 'bg-blue-400 text-black'
												: ''
												}`}
										>
											{main.name}
										</Link>
									)
								})
							}
						</ItemGroup>
					}
				</div>
				}
				{selectedWorkspace?.id && <Project />
				}
				<DirectMessage setShowAddPeople={setShowAddPeople} showAddPeople={showAddPeople} />

			</div >
			<Link
				to="profile"
				className="
		absolute
		bottom-0
		left-0
		w-full
		border-t
		border-zinc-800
		bg-zinc-900
		px-3
		py-3
		hover:bg-zinc-800/70
		transition
	"
			>
				<div className="flex items-center gap-3">

					<div className="
			w-9
			h-9
			rounded-full
			bg-zinc-700
			flex
			items-center
			justify-center
			overflow-hidden
			shrink-0
		">
						<img
							src={profile}
							className="w-full h-full object-cover"
						/>
					</div>

					<div className="min-w-0 flex-1">

						<p className="text-sm font-medium text-zinc-200 truncate">
							{user?.firstName} {user?.lastName}
						</p>

						<p className="text-[11px] text-zinc-500">
							Free Plan
						</p>

					</div>

					<ChevronRight className="w-4 h-4 text-zinc-600" />

				</div>
			</Link>
		</div>
	)
}

