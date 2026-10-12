import { useState } from "react"
import {
	Search,
	UserPlus,
	Mail,
	X,
	Check,
	Copy,
	Link,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { instance } from "@/api/axios"
import { useAppState } from "@/hooks/apptools"
import { useNavigate } from "react-router-dom"

export default function AddPeople({ open, onOpenChange }) {
	const navigate = useNavigate()
	const { setView, setSelectedDm, selectedDm, setChannel } = useAppState()
	const [search, setSearch] = useState("")
	const [startSearch, setStartSearch] = useState(false)
	const [email, setEmail] = useState("")
	const queryClient = useQueryClient()

	const { data: users } = useQuery({
		queryKey: ['user', search],
		queryFn: async () => {
			try {
				const response = await instance.get(`chat/search-friend/?search=${search}`)
				setStartSearch(false)
				return response.data
			} catch (err) {
				console.error(err)
				throw Error(err)
			}
		},
		enabled: startSearch,
	})
	const openDM = (dm) => {
		setView('dm')
		setSelectedDm(dm)
		setChannel({})
		onOpenChange(false)
		navigate(`/dashboard/chat/${dm?.id}`)
	}
	const sendRequest = useMutation({
		mutationFn: async (user) => {
			const response = await instance.post(`chat/send-connection-request/`, { recipient: user?.id })
			return response.data
		},
		onSuccess: (requestData) => {
			queryClient.setQueryData(['user', search], (old) => old?.map((obj) => obj.id === requestData?.recipient ? { ...obj, isConnected: requestData.status } : obj)

			)
		}
	})

	// const inviteUser = (user) => {
	//
	// 	if (invited.includes(user.id)) return
	//
	// 	setInvited((prev) => [...prev, user.id])
	//
	// 	// Wire your invite mutation here
	// }

	const inviteEmail = () => {

		if (!email.trim()) return

		// Wire email invitation mutation here

		setEmail("")
	}

	return (

		<Dialog open={open} onOpenChange={onOpenChange}>

			<DialogContent className="
				bg-zinc-950
				border-zinc-800
				text-white
				sm:max-w-lg
			">

				<DialogHeader>

					<DialogTitle className="text-xl">
						Add people
					</DialogTitle>

					<DialogDescription className="text-zinc-500">
						Find someone in Orbit or invite them by email.
					</DialogDescription>

				</DialogHeader>


				{/* Search */}

				<div className="relative mt-3 flex gap-1 items-center">

					<Search className="
						absolute
						left-3
						top-1/2
						-translate-y-1/2
						w-4
						h-4
						text-zinc-500
					"/>

					<Input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search by name or username..."
						className="
							pl-9
							h-11
							bg-zinc-900
							border-zinc-800
							text-white
							placeholder:text-zinc-600
						"
					/>
					<Button
						className="outline-none border-none bg-blue-500 p-2 py-1 rounded-xs text-white font-sm"
						onClick={() => {
							setStartSearch(true)
						}}
					>
						search
					</Button>

				</div>


				{/* Search results */}

				<div className="mt-4 max-h-64 overflow-y-auto">

					{users ? (

						users?.length > 0 ? (

							<div className="space-y-1">

								{users?.map((user) => {

									const initial = user?.username ? user.username[0]?.toUpperCase() : user?.firstName[0]?.toUpperCase()

									return (

										<div
											key={user.id}
											className="
												flex
												items-center
												gap-3
												p-3
												rounded-xl
												hover:bg-zinc-900
												transition
											"
										>

											{/* Avatar */}

											<div className="relative">

												<div className="
													w-10
													h-10
													rounded-full
													bg-blue-500
													flex
													items-center
													justify-center
													font-semibold
												">
													{initial}
												</div>

												{user.online && (
													<span className="
														absolute
														bottom-0
														right-0
														w-2.5
														h-2.5
														rounded-full
														bg-green-500
														border-2
														border-zinc-950
													"/>
												)}

											</div>


											{/* User info */}

											<div className="flex-1 min-w-0">

												<p className="text-sm font-medium">
													{`${user?.firstName} ${user?.lastName}`}
												</p>

												<p className="text-xs text-zinc-500 truncate">
													{user?.username}
												</p>

											</div>


											{/* Action */}

											<Button
												size="sm"
												variant="message"
												disabled={!user.isConnected === 'Add friend'}
												onClick={() => openDM(user)
												}
												className="
													border-zinc-700
													bg-zinc-900
													hover:bg-zinc-800
												"
											>message
											</Button>

										</div>

									)
								})}

							</div>

						) : (

							<div className="
								py-10
								text-center
								text-zinc-500
							">

								<Search className="w-8 h-8 mx-auto mb-3 opacity-40" />

								<p className="text-sm">
									No one found
								</p>

								<p className="text-xs mt-1">
									Try searching by email instead.
								</p>

							</div>

						)

					) : (

						<div className="
							py-8
							text-center
							text-zinc-600
						">

							<UserPlus className="w-9 h-9 mx-auto mb-3 opacity-40" />

							<p className="text-sm text-zinc-500">
								Search for someone to add
							</p>

						</div>

					)}

				</div>


				{/* Divider */}

				<div className="flex items-center gap-3 my-4">

					<div className="h-px bg-zinc-800 flex-1" />

					<span className="text-xs text-zinc-600">
						OR
					</span>

					<div className="h-px bg-zinc-800 flex-1" />

				</div>


				{/* Email invitation */}

				<div>

					<p className="text-sm font-medium mb-2">
						Invite by email
					</p>

					<div className="flex gap-2">

						<div className="relative flex-1">

							<Mail className="
								absolute
								left-3
								top-1/2
								-translate-y-1/2
								w-4
								h-4
								text-zinc-500
							"/>

							<Input
								type="email"
								value={email}
								onChange={(e) =>
									setEmail(e.target.value)
								}
								placeholder="friend@example.com"
								className="
									pl-9
									bg-zinc-900
									border-zinc-800
								"
							/>

						</div>

						<Button
							disabled={!email.trim()}
							onClick={inviteEmail}
							className="
								bg-blue-500
								hover:bg-blue-600
							"
						>
							Send invite
						</Button>

					</div>

				</div>


				{/* Invite link */}

				<div className="
					mt-3
					rounded-xl
					border
					border-zinc-800
					bg-zinc-900
					p-4
				">

					<div className="flex items-start gap-3">

						<div className="
							w-9
							h-9
							rounded-lg
							bg-zinc-800
							flex
							items-center
							justify-center
							flex-shrink-0
						">

							<Link className="w-4 h-4 text-zinc-400" />

						</div>

						<div className="flex-1">

							<p className="text-sm font-medium">
								Invite with a link
							</p>

							<p className="text-xs text-zinc-500 mt-1">
								Anyone with the link can request to join.
							</p>

						</div>

						<Button
							variant="ghost"
							size="icon"
							className="text-zinc-500 hover:text-white"
						>
							<Copy className="w-4 h-4" />
						</Button>

					</div>

				</div>

			</DialogContent>

		</Dialog>
	)
}


//  useState } from "react";
// import {
// 	Search,
// 	UserPlus,
// 	MessageCircle,
// } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogDescription,
// } from "@/components/ui/dialog";
// import {
// 	useMutation,
// 	useQuery,
// 	useQueryClient,
// } from "@tanstack/react-query";
// import { instance } from "@/api/axios";
// import { useAppState } from "@/hooks/apptools";
// import { useNavigate } from "react-router-dom";
//
// export default function AddPeople({ open, onOpenChange }) {
// 	const navigate = useNavigate();
//
// 	const {
// 		setView,
// 		setSelectedDm,
// 		setChannel,
// 	} = useAppState();
//
// 	const [search, setSearch] = useState("");
// 	const [startSearch, setStartSearch] = useState(false);
//
// 	const queryClient = useQueryClient();
//
// 	const { data: users, isFetching } = useQuery({
// 		queryKey: ["user", search],
//
// 		queryFn: async () => {
// 			try {
// 				const response = await instance.get(
// 					`chat/search-friend/?search=${search}`
// 				);
//
// 				setStartSearch(false);
//
// 				return response.data;
// 			} catch (err) {
// 				console.error(err);
// 				throw Error(err);
// 			}
// 		},
//
// 		enabled: startSearch,
// 	});
//
// 	const openDM = (dm) => {
// 		setView("dm");
// 		setSelectedDm(dm);
// 		setChannel({});
//
// 		onOpenChange(false);
//
// 		navigate(`/dashboard/chat/${dm?.id}`);
// 	};
//
// 	return (
// 		<Dialog
// 			open={open}
// 			onOpenChange={onOpenChange}
// 		>
// 			<DialogContent
// 				className="
// 					sm:max-w-md
// 					bg-zinc-950
// 					border-zinc-800
// 					text-white
// 					p-0
// 					overflow-hidden
// 				"
// 			>
// 				{/* Header */}
// 				<DialogHeader className="px-5 pt-5 pb-4">
// 					<DialogTitle className="text-lg font-semibold text-white">
// 						New message
// 					</DialogTitle>
//
// 					<DialogDescription className="text-xs text-zinc-500">
// 						Search for someone to start a conversation with.
// 					</DialogDescription>
// 				</DialogHeader>
//
// 				{/* Search */}
// 				<div className="px-5 pb-4">
// 					<div className="relative">
// 						<Search
// 							className="
// 								absolute
// 								left-3
// 								top-1/2
// 								-translate-y-1/2
// 								w-4
// 								h-4
// 								text-zinc-500
// 							"
// 						/>
//
// 						<Input
// 							autoFocus
// 							value={search}
// 							onChange={(e) => setSearch(e.target.value)}
// 							onKeyDown={(e) => {
// 								if (
// 									e.key === "Enter" &&
// 									search.trim()
// 								) {
// 									setStartSearch(true);
// 								}
// 							}}
// 							placeholder="Search by name or username..."
// 							className="
// 								h-11
// 								pl-9
// 								pr-20
// 								bg-zinc-900
// 								border-zinc-800
// 								text-sm
// 								text-white
// 								placeholder:text-zinc-600
// 								focus-visible:ring-1
// 								focus-visible:ring-zinc-700
// 							"
// 						/>
//
// 						<Button
// 							onClick={() => setStartSearch(true)}
// 							disabled={!search.trim() || isFetching}
// 							size="sm"
// 							className="
// 								absolute
// 								right-1
// 								top-1
// 								h-9
// 								bg-blue-500
// 								hover:bg-blue-600
// 								text-white
// 							"
// 						>
// 							{isFetching ? "Searching..." : "Search"}
// 						</Button>
// 					</div>
// 				</div>
//
// 				{/* Results */}
// 				<div className="border-t border-zinc-900">
// 					{users ? (
// 						users.length > 0 ? (
// 							<div className="px-3 py-3">
// 								<p
// 									className="
// 										px-2
// 										pb-2
// 										text-[10px]
// 										font-semibold
// 										tracking-wider
// 										text-zinc-600
// 										uppercase
// 									"
// 								>
// 									People
// 								</p>
//
// 								<div className="space-y-1">
// 									{users.map((user) => {
// 										const initial =
// 											user?.username?.[0]?.toUpperCase() ||
// 											user?.firstName?.[0]?.toUpperCase();
//
// 										return (
// 											<button
// 												key={user.id}
// 												onClick={() => openDM(user)}
// 												className="
// 													group
// 													w-full
// 													flex
// 													items-center
// 													gap-3
// 													rounded-lg
// 													p-2.5
// 													text-left
// 													transition
// 													hover:bg-zinc-900
// 												"
// 											>
// 												{/* Avatar */}
// 												<div className="relative shrink-0">
// 													<div
// 														className="
// 															flex
// 															h-10
// 															w-10
// 															items-center
// 															justify-center
// 															rounded-full
// 															bg-zinc-800
// 															text-sm
// 															font-semibold
// 															text-zinc-300
// 														"
// 													>
// 														{initial}
// 													</div>
//
// 													{user?.online && (
// 														<span
// 															className="
// 																absolute
// 																bottom-0
// 																right-0
// 																h-2.5
// 																w-2.5
// 																rounded-full
// 																bg-green-500
// 																border-2
// 																border-zinc-950
// 															"
// 														/>
// 													)}
// 												</div>
//
// 												{/* User */}
// 												<div className="min-w-0 flex-1">
// 													<p
// 														className="
// 															truncate
// 															text-sm
// 															font-medium
// 															text-zinc-200
// 														"
// 													>
// 														{user?.firstName}{" "}
// 														{user?.lastName}
// 													</p>
//
// 													<p
// 														className="
// 															mt-0.5
// 															truncate
// 															text-xs
// 															text-zinc-600
// 														"
// 													>
// 														@{user?.username}
// 													</p>
// 												</div>
//
// 												{/* Message icon */}
// 												<div
// 													className="
// 														flex
// 														h-8
// 														w-8
// 														shrink-0
// 														items-center
// 														justify-center
// 														rounded-md
// 														text-zinc-600
// 														transition
// 														group-hover:bg-zinc-800
// 														group-hover:text-zinc-300
// 													"
// 												>
// 													<MessageCircle className="h-4 w-4" />
// 												</div>
// 											</button>
// 										);
// 									})}
// 								</div>
// 							</div>
// 						) : (
// 							/* No results */
// 							<div className="px-5 py-12 text-center">
// 								<div
// 									className="
// 										mx-auto
// 										mb-3
// 										flex
// 										h-10
// 										w-10
// 										items-center
// 										justify-center
// 										rounded-full
// 										bg-zinc-900
// 									"
// 								>
// 									<Search className="h-4 w-4 text-zinc-600" />
// 								</div>
//
// 								<p className="text-sm text-zinc-400">
// 									No people found
// 								</p>
//
// 								<p className="mt-1 text-xs text-zinc-600">
// 									Try a different name or username.
// 								</p>
// 							</div>
// 						)
// 					) : (
// 						/* Initial state */
// 						<div className="px-5 py-12 text-center">
// 							<div
// 								className="
// 									mx-auto
// 									mb-3
// 									flex
// 									h-10
// 									w-10
// 									items-center
// 									justify-center
// 									rounded-full
// 									bg-zinc-900
// 								"
// 							>
// 								<UserPlus className="h-4 w-4 text-zinc-600" />
// 							</div>
//
// 							<p className="text-sm text-zinc-400">
// 								Who do you want to message?
// 							</p>
//
// 							<p className="mt-1 text-xs text-zinc-600">
// 								Search for their name or username above.
// 							</p>
// 						</div>
// 					)}
// 				</div>
// 			</DialogContent>
// 		</Dialog>
// 	);
// }
