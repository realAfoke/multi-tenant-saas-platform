import { Outlet, useNavigate } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useAppHook } from "@/hooks/appHook.js"
import { fetchUserQueryOption, workspaceQueryOption, channelQueryOption, fetchRoleQueryOption, conversationsQueryOption } from "@/queryOptions/queryOptions"
import { useParams, useLocation } from "react-router-dom"
import { useAppState } from "@/hooks/apptools"
import TopBar from "@/components/TopBar"
import SideBar from "@/components/SideBar"
import { useRealTimeUpdate } from "@/hooks/appHook.js"
import { useEffect, useState } from "react"
// import { handleChannelUpdate } from "@/service/channel";
import { handleConversationUpdate } from "@/service/conversation";
import { handleMessageUpdate } from "@/service/message";
import { convertObjKeys } from "@/utils/appUtil"
import handleChannelMembers from "@/service/channelMember"
import { handleChannelUpdate } from "@/service/channel"


export default function ProtectedRoute() {
	const location = useLocation()
	const navigate = useNavigate()
	const { wkName, channelName, taskId, conversationId } = useParams()
	const [toggle, setToggle] = useState(false)
	const [toggleWorkspace, setToggleWorkspace] = useState(false)
	const [hidechannelDetail, setHidechannelDetail] = useState(false)
	const queryClient = useQueryClient()
	const isCreatePage = ['/create-workspace', `/${wkName}/create-channel`].includes(location.pathname)

	const {
		socket,
		setSelectedDm,
		setWorkspace,
		setSocket,
		setChannel,
		setTask,
		selectedWorkspace,
		selectedChannel,
		setView,
		selectedDm,
		setIndexedDB
	} = useAppState()

	const { data: userWorkspaces } = useQuery(workspaceQueryOption())
	const { data: channel } = useQuery(channelQueryOption(selectedWorkspace?.id, selectedChannel?.id))
	const { workspaces } = userWorkspaces ?? {}
	const { data: user } = useQuery(fetchUserQueryOption())
	const { data: conversations } = useQuery(conversationsQueryOption())

	useAppHook(
		workspaces,
		wkName,
		setWorkspace,
		selectedWorkspace,
		channel,
		channelName,
		setChannel,
		taskId,
		setTask,
		setView,
		conversationId,
		conversations,
		setSelectedDm,
		selectedChannel,
		selectedDm,
		setIndexedDB,
		navigate
	)

	useRealTimeUpdate(setSocket, workspaces)

	useQuery(fetchRoleQueryOption(selectedWorkspace?.id))


	useEffect(() => {
		if (!socket) return
		const ws = socket
		const handleRealTimeUpdate = async (e) => {
			const rawData = JSON.parse(e.data)
			const camelCaseData = convertObjKeys(rawData)

			switch (camelCaseData?.tag) {
				case 'channel': handleChannelUpdate(queryClient, camelCaseData)
					break;
				case 'member': handleChannelMembers(queryClient, camelCaseData)
					break;
				case 'conversation': handleConversationUpdate(queryClient, camelCaseData, setWorkspace, setSelectedDm, user)
					break;
				case 'message': handleMessageUpdate(queryClient, camelCaseData, ws)
					break;
			}
		}
		ws.addEventListener('message', handleRealTimeUpdate)
		return () => ws.removeEventListener('update', handleRealTimeUpdate)
	}, [conversationId, socket, queryClient, setWorkspace, setSelectedDm, user])

	return (
		<div className={`flex h-screen bg-zinc-950 overflow-hidden relative`}>

			{toggle &&
				<div className="">
					{!isCreatePage && <SideBar
						setToggle={setToggle}
						toggleWorkspace={toggleWorkspace}
						handleToggleWorkspace={setToggleWorkspace}
					// setShowAddPeople={setShowAddPeople}
					/>
					}
				</div>
			}
			<div className="flex flex-col flex-1 overflow-hidden relative">
				{!isCreatePage && <TopBar setToggle={setToggle} toggle={toggle} />}
				<main className="flex-1 overflow-auto scrollbar scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-900 px-5 w-full">
					<Outlet context={{ setToggle, hidechannelDetail, setHidechannelDetail }} />
				</main>
			</div>
		</div>
	)
}
