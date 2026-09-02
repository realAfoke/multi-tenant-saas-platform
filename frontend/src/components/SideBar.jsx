import { ItemGroup, Item, ItemContent, ItemTitle, ItemMedia } from "@/components/ui/item"
import NestedList from "@/components/NestedList"
import searchIcon from "@/assets/search1.svg"
import cog from "@/assets/project.svg"
import closeMenu from '@/assets/close.svg'
import { Fragment, useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import profile from "@/assets/profileIcon.svg"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { workspaceQueryOption, taskQueryOption } from "@/queryOptions/queryOptions"
import { useAppState } from "@/hooks/apptools"
import { Button } from "./ui/button"
import Project from "./sidebar/Project"
import { UserPlus } from "lucide-react"
import DirectMessage from "./sidebar/DirectMessage"

export default function SideBar(props) {
	const ref = useRef(null)

	const { setToggle, handleToggleWorkspace, toggleWorkspace, setShowAddPeople } = props
	const { setWorkspace, selectedWorkspace } = useAppState()
	const [showOptions, setShowOptions] = useState(false)
	const queryClient = useQueryClient()

	const { data: userWorkspaces } = useQuery(workspaceQueryOption())
	const { workspaces, ordering } = userWorkspaces ?? {}
	const { channels, channelOrdering } = workspaces?.[selectedWorkspace?.id] ?? {}

	const user = queryClient.getQueryData(['user'])
	const openDM = (person) => {
		setSelectedDM(person)
		setView("dm")
		setMessage("")
	}



	useEffect(() => {
		if (!selectedWorkspace?.show) return
		handleToggleWorkspace(false)
	}, [selectedWorkspace?.show])


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
		<div ref={ref} className={`py-3 flex h-full flex-col absolute text-white bg-zinc-900 shadow-lg border-r border-[#f6f3f438] px-2 w-[calc(100%-30%)] md:relative md:min-w-[18rem] z-99 `}>
			<div className="border-b border-zinc-800 pb-4">

				<div className="flex justify-between items-start border-b border-zinc-800 pb-1">

					<div>

						<h1 className={`${selectedWorkspace?.id ? 'text-xs text-gray-500 mt-1' : 'text-2xl font-bold text-white'}`}>
							{selectedWorkspace?.id ? `Workspace` : 'OrbitSpace'}
						</h1>

						<p className={`${selectedWorkspace?.id ? 'font-semibold capitalize truncate mt-1' : 'text-xs text-gray-500 mt-1'}`}>
							{selectedWorkspace?.id ? `${selectedWorkspace?.name}` : 'Manage all your work'}
						</p>

					</div>

					<img
						src={closeMenu}
						className=" w-5 h-5 cursor-pointer"
						onClick={() => setToggle(false)}
					/>

				</div>

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
				<Button onClick={() => setShowAddPeople(true)} className="capitalize">
					<UserPlus />
					Add people
				</Button>

				{!selectedWorkspace?.id && <div>
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
										<NestedList key={main?.id} list={main} isWorkspace={true} setter={setWorkspace} />)
								})
							}
						</ItemGroup>
					}
				</div>
				}
				{selectedWorkspace?.id && <Project channelOrdering={channelOrdering} channels={channels} />
				}
				<DirectMessage />

			</div >

			<Link
				to="profile"
				className="bg-inherit absolute bottom-0 left-0 w-full border-t border-zinc-800 p-4 hover:bg-zinc-900 transition "
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
// <div className="mt-6">
// 					<Button
// 						variant="outline"
// 						className="w-full rounded-xl border-zinc-700 hover:bg-zinc-900"
// 					>
// 						+ New
// 					</Button>
// 				</div>
// <Item className="gap-2 py-2 hover:bg-[#ffffff1a] rounded-md px-2">
//
// 	<ItemMedia variant="image" className="w-5 h-5">
// 		<img src={searchIcon} className="" />
// 	</ItemMedia>
//
// 	<ItemContent>
// 		<ItemTitle className="capitalize text-sm w-full">
// 			Search
// 		</ItemTitle>
// 	</ItemContent>
// </Item>

