import { Outlet } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useAppHook } from "@/hooks/appHook.js"
import { fetchUserQueryOption, workspaceQueryOption, channelQueryOption, fetchRoleQueryOption, activityQueryOption } from "@/queryOptions/queryOptions"
import { useParams, Navigate } from "react-router-dom"
import { useAppState } from "@/hooks/apptools"
import TopBar from "@/components/TopBar"
import SideBar from "@/components/SideBar"
import { useRealTimeUpdate } from "@/hooks/appHook.js"
import MenuIcon from "@/components/MenuIcon"
import { useState } from "react"
import AddPeople from "@/components/AddFriendUi"


export default function ProtectedRoute() {
	const { wkName, channelName, taskId } = useParams()
	const [toggle, setToggle] = useState(false)
	const [toggleWorkspace, setToggleWorkspace] = useState(false)
	const [hidechannelDetail, setHidechannelDetail] = useState(false)

	const { setWorkspace, setSocket, setChannel, setTask, selectedWorkspace, selectedChannel, setView } = useAppState()
	const { data: userWorkspaces } = useQuery(workspaceQueryOption())

	const { data: channel } = useQuery(channelQueryOption(selectedWorkspace?.id, selectedChannel?.id))
	const { workspaces } = userWorkspaces ?? {}

	const { data: user } = useQuery(fetchUserQueryOption())
	useQuery(activityQueryOption('activity', selectedWorkspace?.id))
	useAppHook(workspaces, wkName, setWorkspace, selectedWorkspace, channel, channelName, setChannel, taskId, setTask, setView)
	useRealTimeUpdate(setSocket, workspaces)

	// console.log('userWorkspaces:',userWorkspaces,'workspaces:',workspaces)
	useQuery(fetchRoleQueryOption(selectedWorkspace?.id))

	const [showAddPeople, setShowAddPeople] = useState(false)
	if (!user) {
		<Navigate to='/login' replace />
		return
	}

	return (
		<div className={`flex h-screen bg-zinc-950 overflow-hidden relative`}>

			{toggle && 
				<div className="">
					<SideBar
						setToggle={setToggle}
						toggleWorkspace={toggleWorkspace}
						handleToggleWorkspace={setToggleWorkspace}
						setShowAddPeople={setShowAddPeople}
					/>
				</div>
			 }

			<div className="flex flex-col flex-1 overflow-hidden relative">
				<TopBar setToggle={setToggle} toggle={toggle} />
				<main className="flex-1 overflow-auto scrollbar scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-900 md:mx-[8rem] px-2">
					<AddPeople
						open={showAddPeople}
						onOpenChange={setShowAddPeople}
					/>
					<Outlet context={{ setToggle, hidechannelDetail, setHidechannelDetail }} />
				</main>
			</div>

		</div>
	)
}



