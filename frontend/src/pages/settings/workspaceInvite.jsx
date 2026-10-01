import { instance } from "@/api/axios"
import { useAppState } from "@/hooks/apptools"
import { dateFormatter } from "@/utils/appUtil"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useParams } from "react-router-dom"
export default function WorkspaceInvitations() {
	const { wkName } = useParams()
	const { selectedWorkspace } = useAppState()

	const { data: invites } = useQuery({
		queryKey: [wkName, 'invites'],
		queryFn: async () => {
			try {
				const response = await instance.get(`workspaces/${selectedWorkspace?.id}/invites/`)
				return response.data
			} catch (error) {
				console.error(error)
				throw Error(error)
			}

		}
	})
	console.log('invites:', invites)
	const [openMemberMenu, setOpenMemberMenu] = useState(false)
	const [hide, setHide] = useState(false)
	return (
		<section className="flex-1 flex flex-col min-w-0 pt-[5rem] h-screen overflow-hidden">

			<div>
				<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
					<div>
						<h2 className="text-base font-semibold text-white">
							Invitations
						</h2>

						<p className="text-sm text-zinc-500 mt-1">
							Manage invitations sent to this workspace.
						</p>
					</div>

					<button className="h-9 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-sm font-medium text-white transition">
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
						placeholder="Search invitations..."
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

			<div className="rounded-xl border border-zinc-800 h-screen overflow-auto flex-1 scrollbar-thumb-blue-500 scrollbar-track-black scrollbar-thumb-3 mb-5">

				<div className="hidden sm:grid grid-cols-[1fr_110px_40px] gap-4 px-5 py-3 bg-zinc-900/70 border-b border-zinc-800">
					<p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
						Email
					</p>

					<p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
						Status
					</p>
				</div>
				{invites?.map((invite) => {
					const time = dateFormatter(invite?.updatedAt)
					return (
						<div className="grid grid-cols-1 sm:grid-cols-[1fr_110px_40px] gap-3 sm:gap-4 items-center px-5 py-4 bg-zinc-900/40 border-b border-zinc-800">

							<div className="min-w-0">
								<p className="text-sm font-medium text-zinc-200 truncate">
									{invite?.inviteeEmail}
								</p>
								<p className="text-xs text-zinc-600 mt-0.5">
									{time}
								</p>
							</div>

							<span className="text-xs text-amber-400">
								{invite?.status}
							</span>
							<div className="relative">
								<button
									onClick={() => setOpenMemberMenu(prev => !prev)}
									className="flex w-8 h-8 items-center justify-center rounded-md text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition"
								>
									•••
								</button>

								{openMemberMenu &&
									<div className="absolute right-0 top-10 z-20 w-44 rounded-lg border border-zinc-800 bg-zinc-900 p-1 shadow-xl">

										<button
											className="w-full text-left px-3 py-2 rounded-md text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
										>
											Resend invitation
										</button>

										<div className="my-1 border-t border-zinc-800" />

										<button
											className="w-full text-left px-3 py-2 rounded-md text-sm text-red-400 hover:bg-red-500/10 transition"
										>
											Cancel invitation
										</button>

									</div>
								}
							</div>
						</div>

					)

				})}

			</div>
			{hide &&
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">

					<div className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-2xl">

						<div className="mb-5">
							<h3 className="text-base font-semibold text-white">
								Cancel invitation?
							</h3>

							<p className="text-sm text-zinc-500 mt-1">
								This will cancel the invitation sent to mike@example.com.
							</p>
						</div>

						<div className="flex justify-end gap-2">
							<button
								className="h-9 px-4 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
							>
								Keep invitation
							</button>

							<button
								className="h-9 px-4 rounded-lg bg-red-500/10 text-sm font-medium text-red-400 hover:bg-red-500/20 transition"
							>
								Cancel invitation
							</button>
						</div>

					</div>
				</div>
			}
		</section>
	)
}



// <div className="grid grid-cols-1 sm:grid-cols-[1fr_110px_40px] gap-3 sm:gap-4 items-center px-5 py-4 bg-zinc-900/40 border-b border-zinc-800">
//
// 					<div className="min-w-0">
// 						<p className="text-sm font-medium text-zinc-200 truncate">
// 							mike@example.com
// 						</p>
// 						<p className="text-xs text-zinc-600 mt-0.5">
// 							Invited 2 days ago
// 						</p>
// 					</div>
//
// 					<span className="text-xs text-amber-400">
// 						Pending
// 					</span>
// 					<div className="relative">
// 						<button
// 							onClick={() => setOpenMemberMenu(prev => !prev)}
// 							className="flex w-8 h-8 items-center justify-center rounded-md text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition"
// 						>
// 							•••
// 						</button>
//
// 						{openMemberMenu &&
// 							<div className="absolute right-0 top-10 z-20 w-44 rounded-lg border border-zinc-800 bg-zinc-900 p-1 shadow-xl">
//
// 								<button
// 									className="w-full text-left px-3 py-2 rounded-md text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
// 								>
// 									Resend invitation
// 								</button>
//
// 								<div className="my-1 border-t border-zinc-800" />
//
// 								<button
// 									className="w-full text-left px-3 py-2 rounded-md text-sm text-red-400 hover:bg-red-500/10 transition"
// 								>
// 									Cancel invitation
// 								</button>
//
// 							</div>
// 						}
// 					</div>
// 				</div>
//
//
// 				<div className="grid grid-cols-1 sm:grid-cols-[1fr_110px_40px] gap-3 sm:gap-4 items-center px-5 py-4 bg-zinc-900/40 border-b border-zinc-800">
//
//
// 					<div className="min-w-0">
// 						<p className="text-sm font-medium text-zinc-200 truncate">
// 							mike@example.com
// 						</p>
// 						<p className="text-xs text-zinc-600 mt-0.5">
// 							Invited 2 days ago
// 						</p>
// 					</div>
//
// 					<span className="text-xs text-amber-400">
// 						Pending
// 					</span>
// 					<div className="relative">
// 						<button
// 							onClick={() => setOpenMemberMenu(prev => !prev)}
// 							className="flex w-8 h-8 items-center justify-center rounded-md text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition"
// 						>
// 							•••
// 						</button>
//
// 						{openMemberMenu &&
// 							<div className="absolute right-0 top-10 z-20 w-44 rounded-lg border border-zinc-800 bg-zinc-900 p-1 shadow-xl">
//
// 								<button
// 									className="w-full text-left px-3 py-2 rounded-md text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
// 								>
// 									Resend invitation
// 								</button>
//
// 								<div className="my-1 border-t border-zinc-800" />
//
// 								<button
// 									className="w-full text-left px-3 py-2 rounded-md text-sm text-red-400 hover:bg-red-500/10 transition"
// 								>
// 									Cancel invitation
// 								</button>
//
// 							</div>
// 						}
// 					</div>
// 				</div>
//
//
// 				<div className="grid grid-cols-1 sm:grid-cols-[1fr_110px_40px] gap-3 sm:gap-4 items-center px-5 py-4 bg-zinc-900/40 border-b border-zinc-800">
//
// 					<div className="min-w-0">
// 						<p className="text-sm font-medium text-zinc-200 truncate">
// 							mike@example.com
// 						</p>
// 						<p className="text-xs text-zinc-600 mt-0.5">
// 							Invited 2 days ago
// 						</p>
// 					</div>
//
// 					<span className="text-xs text-amber-400">
// 						Pending
// 					</span>
// 					<div className="relative">
// 						<button
// 							onClick={() => setOpenMemberMenu(prev => !prev)}
// 							className="flex w-8 h-8 items-center justify-center rounded-md text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition"
// 						>
// 							•••
// 						</button>
//
// 						{openMemberMenu &&
// 							<div className="absolute right-0 top-10 z-20 w-44 rounded-lg border border-zinc-800 bg-zinc-900 p-1 shadow-xl">
//
// 								<button
// 									className="w-full text-left px-3 py-2 rounded-md text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
// 								>
// 									Resend invitation
// 								</button>
//
// 								<div className="my-1 border-t border-zinc-800" />
//
// 								<button
// 									className="w-full text-left px-3 py-2 rounded-md text-sm text-red-400 hover:bg-red-500/10 transition"
// 								>
// 									Cancel invitation
// 								</button>
//
// 							</div>
// 						}
// 					</div>
// 				</div>
//
//
// 				<div className="grid grid-cols-1 sm:grid-cols-[1fr_110px_40px] gap-3 sm:gap-4 items-center px-5 py-4 bg-zinc-900/40 border-b border-zinc-800">
//
//
// 					<div className="min-w-0">
// 						<p className="text-sm font-medium text-zinc-200 truncate">
// 							mike@example.com
// 						</p>
// 						<p className="text-xs text-zinc-600 mt-0.5">
// 							Invited 2 days ago
// 						</p>
// 					</div>
//
// 					<span className="text-xs text-amber-400">
// 						Pending
// 					</span>
// 					<div className="relative">
// 						<button
// 							onClick={() => setOpenMemberMenu(prev => !prev)}
// 							className="flex w-8 h-8 items-center justify-center rounded-md text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition"
// 						>
// 							•••
// 						</button>
//
// 						{openMemberMenu &&
// 							<div className="absolute right-0 top-10 z-20 w-44 rounded-lg border border-zinc-800 bg-zinc-900 p-1 shadow-xl">
//
// 								<button
// 									className="w-full text-left px-3 py-2 rounded-md text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
// 								>
// 									Resend invitation
// 								</button>
//
// 								<div className="my-1 border-t border-zinc-800" />
//
// 								<button
// 									className="w-full text-left px-3 py-2 rounded-md text-sm text-red-400 hover:bg-red-500/10 transition"
// 								>
// 									Cancel invitation
// 								</button>
//
// 							</div>
// 						}
// 					</div>
// 				</div>
//
//
// 				<div className="grid grid-cols-1 sm:grid-cols-[1fr_110px_40px] gap-3 sm:gap-4 items-center px-5 py-4 bg-zinc-900/40 border-b border-zinc-800">
//
// 					<div className="min-w-0">
// 						<p className="text-sm font-medium text-zinc-200 truncate">
// 							mike@example.com
// 						</p>
// 						<p className="text-xs text-zinc-600 mt-0.5">
// 							Invited 2 days ago
// 						</p>
// 					</div>
//
// 					<span className="text-xs text-amber-400">
// 						Pending
// 					</span>
// 					<div className="relative">
// 						<button
// 							onClick={() => setOpenMemberMenu(prev => !prev)}
// 							className="flex w-8 h-8 items-center justify-center rounded-md text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition"
// 						>
// 							•••
// 						</button>
//
// 						{openMemberMenu &&
// 							<div className="absolute right-0 top-10 z-20 w-44 rounded-lg border border-zinc-800 bg-zinc-900 p-1 shadow-xl">
//
// 								<button
// 									className="w-full text-left px-3 py-2 rounded-md text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
// 								>
// 									Resend invitation
// 								</button>
//
// 								<div className="my-1 border-t border-zinc-800" />
//
// 								<button
// 									className="w-full text-left px-3 py-2 rounded-md text-sm text-red-400 hover:bg-red-500/10 transition"
// 								>
// 									Cancel invitation
// 								</button>
//
// 							</div>
// 						}
// 					</div>
// 				</div>
//
//
// 				<div className="grid grid-cols-1 sm:grid-cols-[1fr_110px_40px] gap-3 sm:gap-4 items-center px-5 py-4 bg-zinc-900/40 border-b border-zinc-800">
//
// 					<div className="min-w-0">
// 						<p className="text-sm font-medium text-zinc-200 truncate">
// 							mike@example.com
// 						</p>
// 						<p className="text-xs text-zinc-600 mt-0.5">
// 							Invited 2 days ago
// 						</p>
// 					</div>
//
// 					<span className="text-xs text-amber-400">
// 						Pending
// 					</span>
// 					<div className="relative">
// 						<button
// 							onClick={() => setOpenMemberMenu(prev => !prev)}
// 							className="flex w-8 h-8 items-center justify-center rounded-md text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition"
// 						>
// 							•••
// 						</button>
//
// 						{openMemberMenu &&
// 							<div className="absolute right-0 top-10 z-20 w-44 rounded-lg border border-zinc-800 bg-zinc-900 p-1 shadow-xl">
//
// 								<button
// 									className="w-full text-left px-3 py-2 rounded-md text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
// 								>
// 									Resend invitation
// 								</button>
//
// 								<div className="my-1 border-t border-zinc-800" />
//
// 								<button
// 									className="w-full text-left px-3 py-2 rounded-md text-sm text-red-400 hover:bg-red-500/10 transition"
// 								>
// 									Cancel invitation
// 								</button>
//
// 							</div>
// 						}
// 					</div>
// 				</div>
//
//
// 				<div className="grid grid-cols-1 sm:grid-cols-[1fr_110px_40px] gap-3 sm:gap-4 items-center px-5 py-4 bg-zinc-900/40 border-b border-zinc-800">
//
// 					<div className="min-w-0">
// 						<p className="text-sm font-medium text-zinc-200 truncate">
// 							mike@example.com
// 						</p>
// 						<p className="text-xs text-zinc-600 mt-0.5">
// 							Invited 2 days ago
// 						</p>
// 					</div>
//
// 					<span className="text-xs text-amber-400">
// 						Pending
// 					</span>
// 					<div className="relative">
// 						<button
// 							onClick={() => setOpenMemberMenu(prev => !prev)}
// 							className="flex w-8 h-8 items-center justify-center rounded-md text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition"
// 						>
// 							•••
// 						</button>
//
// 						{openMemberMenu &&
// 							<div className="absolute right-0 top-10 z-20 w-44 rounded-lg border border-zinc-800 bg-zinc-900 p-1 shadow-xl">
//
// 								<button
// 									className="w-full text-left px-3 py-2 rounded-md text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
// 								>
// 									Resend invitation
// 								</button>
//
// 								<div className="my-1 border-t border-zinc-800" />
//
// 								<button
// 									className="w-full text-left px-3 py-2 rounded-md text-sm text-red-400 hover:bg-red-500/10 transition"
// 								>
// 									Cancel invitation
// 								</button>
//
// 							</div>
// 						}
// 					</div>
// 				</div>
//
//
// 				<div className="grid grid-cols-1 sm:grid-cols-[1fr_110px_40px] gap-3 sm:gap-4 items-center px-5 py-4 bg-zinc-900/40 border-b border-zinc-800">
//
// 					<div className="min-w-0">
// 						<p className="text-sm font-medium text-zinc-200 truncate">
// 							jane@example.com
// 						</p>
//
// 						<p className="text-xs text-zinc-600 mt-0.5">
// 							Invited 5 days ago
// 						</p>
// 					</div>
//
// 					<span className="text-xs text-amber-400">
// 						Pending
// 					</span>
//
// 					<button className="hidden sm:flex w-8 h-8 items-center justify-center rounded-md text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition">
// 						•••
// 					</button>
// 				</div>
//
// 				<div className="grid grid-cols-1 sm:grid-cols-[1fr_110px_40px] gap-3 sm:gap-4 items-center px-5 py-4 bg-zinc-900/40">
//
// 					<div className="min-w-0">
// 						<p className="text-sm font-medium text-zinc-200 truncate">
// 							oliver@example.com
// 						</p>
//
// 						<p className="text-xs text-zinc-600 mt-0.5">
// 							Invited 12 days ago
// 						</p>
// 					</div>
//
// 					<span className="text-xs text-zinc-600">
// 						Expired
// 					</span>
//
// 					<div className="relative border-5 border-green-500">
// 						<button
// 							className="flex w-8 h-8 items-center justify-center rounded-md text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition"
// 						>
// 							•••
// 						</button>
//
// 						<div className="absolute right-0 top-10 z-99 w-44 rounded-lg border border-zinc-800 bg-zinc-900 p-1 shadow-xl">
//
// 							<button className="w-full text-left px-3 py-2 rounded-md text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition">
// 								Resend invitation
// 							</button>
//
// 							<div className="my-1 border-t border-zinc-800" />
//
// 							<button className="w-full text-left px-3 py-2 rounded-md text-sm text-red-400 hover:bg-red-500/10 transition">
// 								Delete invitation
// 							</button>
//
// 						</div>
// 					</div>
// 				</div>
//

