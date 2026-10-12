import RemoveUserDialog from "@/components/setting/RemoveUserDialog"
import SendInviteDialog from "@/components/setting/SendInviteDialog"
import UpdateMember from "@/components/setting/UpdateMember"
import { useAppState } from "@/hooks/apptools"
import { workspaceMemberQueryOption } from "@/queryOptions/queryOptions"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
export default function WorkspaceMembers() {
	const [showRemoveDialog, setShowRemoveDialog] = useState(false)
	const [showInvite, setShowInvite] = useState(false)
	const [openMemberMenu, setOpenMemberMenu] = useState(false)
	const { selectedWorkspace } = useAppState()


	const { data: members } = useQuery(workspaceMemberQueryOption(selectedWorkspace?.id))
	return (
		<section className="flex-1 min-w-0 h-screen flex flex-col pt-[5rem]">
			<div>
				<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
					<div>
						<h2 className="text-base font-semibold text-white">
							Members
						</h2>

						<p className="text-sm text-zinc-500 mt-1">
							Manage people in this workspace.
						</p>
					</div>

					<button className="h-9 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-sm font-medium text-white transition" onClick={() => setShowInvite(prev => !prev)}>
						Invite people
					</button>
				</div>

				<div className="relative mb-4">
					<svg
						className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
						/>
					</svg>

					<input
						type="text"
						placeholder="Search members..."
						className="
									w-full h-10 rounded-lg
									border border-zinc-800
									bg-zinc-900
									pl-9 pr-3
									text-sm text-white
									placeholder:text-zinc-600
									outline-none
									focus:border-zinc-600
								"
					/>
				</div>
			</div>

			<div className="flex-1 rounded-xl border border-zinc-800 h-screen overflow-auto pb-5">

				<div className="hidden sm:grid grid-cols-[1fr_120px_40px] gap-4 px-5 py-3 bg-zinc-900/70 border-b border-zinc-800">
					<p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
						Member
					</p>

					<p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
						Role
					</p>
				</div>
				{members?.map((member) => {
					const user = member?.user ?? {}
					const role = member?.role
					const initial = user?.firstName?.[0]?.toUpperCase()
					return (
						< div key={member?.id} className="grid grid-cols-1 sm:grid-cols-[1fr_120px_40px] gap-3 sm:gap-4 items-center px-5 py-4 bg-zinc-900/40 border-b border-zinc-800" >
							<div className="flex items-center gap-3 min-w-0">
								<div className="w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center text-sm font-semibold text-zinc-200">
									{initial}
								</div>

								<div className="min-w-0">
									<p className="text-sm font-medium text-zinc-200 truncate">
										{`${user?.firstName} ${user?.lastName}`}
									</p>

									<p className="text-xs text-zinc-600 truncate mt-0.5">
										{user?.email}
									</p>
								</div>
							</div>

							<span className="text-xs text-zinc-400">
								{role}
							</span>
							{role !== 'owner' &&
								<div className="relative">
									<button
										onClick={() => setOpenMemberMenu((prev) => prev === member?.id ? false : member?.id)}
										className="flex w-8 h-8 items-center justify-center rounded-md text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition"
									>
										•••
									</button>
									{openMemberMenu === member?.id && <UpdateMember currentRole={role} workspace={selectedWorkspace} memberId={member?.id} />}
								</div>
							}
						</div>
					)
				})}
			</div>
			{
				showRemoveDialog && <RemoveUserDialog setShowRemoveDialog={setShowRemoveDialog} member={showRemoveDialog} />
			}
			{showInvite && <SendInviteDialog handleShowInvite={setShowInvite} />}
		</section >
	)
}

// <div className="min-h-screen bg-zinc-950 overflow-y-auto px-4 py-10">
// 		<div className="w-full max-w-5xl mx-auto">
//
// 			{/* Header */}
// 			<div className="mb-8">
// 				<h1 className="text-xl font-semibold text-white">
// 					Workspace Settings
// 				</h1>
//
// 				<p className="text-sm text-zinc-500 mt-1">
// 					Manage your workspace.
// 				</p>
// 			</div>
// /		</div>
// </div>
// <div key={member?.id} className="flex justify-between sm:grid sm:grid-cols-[1fr_175px] gap-3 sm:gap-4 items-center px-5 py-4 bg-zinc-900/40 border-b border-zinc-800">
// 							<div className="flex items-center gap-3 min-w-0 ">
// 								<div className="relative shrink-0">
// 									<div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-sm font-semibold text-white">
// 										{initial}
// 									</div>
//
// 									<span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500 border-2 border-zinc-950" />
// 								</div>
//
// 								<div className="min-w-0">
// 									<p className="text-sm font-medium text-zinc-200 truncate">
// {`${user?.firstName} ${user?.lastName}`}
// 									</p>
//
// 									<p className="text-xs text-zinc-600 truncate mt-0.5">
// {user?.email}
// 									</p>
// 								</div>
// 							</div>
//
// 							<div className="flex justify-between items-center gap-5">
// 								<span className="text-xs text-zinc-400 flex-1">
// 									{role}
// 								</span>
//
// 								<button className="sm:flex w-8 h-8 items-center justify-center rounded-md text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition">
// 									•••
// 								</button>
// 							</div>
// 						</div>
