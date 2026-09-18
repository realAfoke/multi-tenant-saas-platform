import { Outlet } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useAppHook } from "@/hooks/appHook.js"
import { fetchUserQueryOption, workspaceQueryOption, channelQueryOption, fetchRoleQueryOption, activityQueryOption, conversationsQueryOption } from "@/queryOptions/queryOptions"
import { convertObjKeys, saveMessageOffline } from "@/utils/appUtil";
import { useParams, Navigate } from "react-router-dom"
import { useAppState } from "@/hooks/apptools"
import TopBar from "@/components/TopBar"
import SideBar from "@/components/SideBar"
import { useRealTimeUpdate } from "@/hooks/appHook.js"
import { useEffect, useState } from "react"
import AddPeople from "@/components/AddFriendUi"


export default function ProtectedRoute() {
	const { wkName, channelName, taskId, conversationId } = useParams()
	const [toggle, setToggle] = useState(false)
	const [toggleWorkspace, setToggleWorkspace] = useState(false)
	const [hidechannelDetail, setHidechannelDetail] = useState(false)
	const queryClient = useQueryClient()

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
	useQuery(activityQueryOption('activity', selectedWorkspace?.id))

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
		setIndexedDB
	)
	useRealTimeUpdate(setSocket)

	// console.log('userWorkspaces:',userWorkspaces,'workspaces:',workspaces)
	useQuery(fetchRoleQueryOption(selectedWorkspace?.id))


	useEffect(() => {
		if (!socket) return
		const ws = socket
		ws.onmessage = async (e) => {
			const rawData = JSON.parse(e.data)
			const camelCaseData = convertObjKeys(rawData)
			if ('lastMessage' in camelCaseData) {
				if (camelCaseData?.chatType === 'project') {
					queryClient.setQueryData(['workspace'], (old) => {
						const ordering = old?.ordering ?? []
						const workspaces = old?.workspaces ?? {}
						const wkId = camelCaseData?.workspace
						const mainWk = workspaces?.[wkId] ?? {}
						const channelOrdering = mainWk.channelOrdering ?? []
						const channels = mainWk?.channels ?? {}
						const channelId = camelCaseData?.project
						const mainChannel = channels?.[channelId] ?? {}
						const newConv = {
							...old,
							workspaces: {
								...workspaces,
								[wkId]: {
									...mainWk,
									channels: {
										...channels,
										[channelId]: {
											...mainChannel,
											conversation: {
												...(mainChannel?.conversation ?? {}),
												...camelCaseData
											}
										}
									},
									channelOrdering: [... new Set([channelId, ...channelOrdering])]
								},
							},
							ordering: [...new Set([wkId, ...ordering])]
						}
						setWorkspace(newConv?.workspaces?.wkId)
						return newConv
					})
					return
				}
				queryClient.setQueryData(['user', 'conversations'], (old) => {
					if (camelCaseData?.receiver?.id === user?.id) return
					const convoIds = new Map(old.map(convo => [convo.id, convo]))
					convoIds.set(camelCaseData?.id, camelCaseData)
					return Array.from(convoIds.values())
				})
				setSelectedDm(camelCaseData)
				return
			}
			const chatType = camelCaseData?.workspace ? 'channel' : 'chat'
			await saveMessageOffline(camelCaseData, chatType)
			queryClient.setQueryData(['messages', camelCaseData?.conversation], (old) => {
				// 	//remember to create a message id store mapping for easy insert
				const messgId = new Map(old?.map(obj => [obj.id || obj.clientId, obj]))
				messgId.set(camelCaseData?.clientId, camelCaseData)
				return Array.from(messgId.values())
			}
			)

			if (ws && ws.readyState === WebSocket.OPEN) {
				console.log('inside received')
				const data = { messageId: camelCaseData?.id, status: 'received', conversation: camelCaseData?.conversation }
				if (!camelCaseData?.channel) {
					data['receiver'] = camelCaseData?.sender
				}
				ws.send(JSON.stringify(data))
			}
		}
	}, [conversationId, socket])

	// useEffect(() => {
	// 	if (!socket || channelName || conversationId) return
	// 	socket.onmessage = (e) => {
	// 		let data = JSON.parse(e.data)
	// 		data = convertObjKeys(data)
	// 		if ('lastMessage' in data) {
	// 			queryClient.setQueryData(['user', 'conversations'], (old) => {
	// 				const convoIds = new Map(old.map(convo => [convo.id, convo]))
	// 				convoIds.set(data?.id, data)
	// 				const newA = Array.from(convoIds.values())
	// 				console.log('old:', old)
	// 				console.log('new:', newA)
	// 				return newA
	// 			})
	// 			return
	// 		}
	// 		if (data && !data?.channelId) {
	// 			if (socket && socket.readyState === WebSocket.OPEN) {
	// 				const ACKNOWLEDGEMENT = { messageId: data?.id, 'status': 'received', conversation: data?.conversation, receiver: data?.sender, sender: user?.firstName }
	// 				socket.send(JSON.stringify(ACKNOWLEDGEMENT))
	// 			}
	// 		}
	// 	}
	// }, [socket])

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
				<main className="flex-1 self-center overflow-auto scrollbar scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-900 px-5 w-[100%] md:w-[clamp(70%,80%,90%)]">
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



