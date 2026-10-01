import { useAppState } from "@/hooks/apptools"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { instance } from "@/api/axios"


export default function CreateChannel() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const { selectedWorkspace, setChannel } = useAppState()



	const createChannel = useMutation({
		mutationFn: async () => {
			try {
				const newProject = await instance.post(`workspaces/${selectedWorkspace?.id}/channels/`, {
					name: name,
					description: description,
					workspace: selectedWorkspace?.id
				})
				return newProject?.data
			} catch (error) {
				console.error(error)
				throw error
			}
		},
		onSuccess: (newChannel) => {
			queryClient.setQueryData(['workspace'], (old) => {
				const workspaces = (old?.workspaces) ?? {}
				const workspace = workspaces?.[selectedWorkspace?.id] ?? {}
				const channels = workspace?.channels ?? {}
				const channelOrdering = workspace?.channelOrdering ?? []
				return {
					...old,
					workspaces: {
						...workspaces,
						[selectedWorkspace?.id]: {
							...workspace,
							channels: {
								...channels,
								[newChannel?.id]: newChannel
							},
							channelOrdering: [...new Set([newChannel?.id, ...(channelOrdering)])]
						}
					},
				}
			})
			setChannel(newChannel)
			navigate(`/${selectedWorkspace?.name}/${newChannel?.name}`)
		}
	})
	return (
		<div className="min-h-screen bg-zinc-950 overflow-y-auto px-4 py-12">
			<div className="w-full max-w-md mx-auto">

				<div className="mb-8">
					<h1 className="text-2xl font-semibold text-white">
						Create a channel
					</h1>

					<p className="text-sm text-zinc-500 mt-2">
						Channels help organize conversations and work.
					</p>
				</div>

				<div className="space-y-6">

					<div>
						<label className="block text-sm font-medium text-zinc-300 mb-2">
							Channel name
						</label>

						<div className="relative">
							<span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600">
								#
							</span>

							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="e.g. marketing"
								className="
									w-full h-11 rounded-lg
									border border-zinc-800
									bg-zinc-900
									pl-8 pr-3
									text-sm text-white
									placeholder:text-zinc-600
									outline-none
									focus:border-zinc-600
									transition
								"
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-zinc-300 mb-2">
							Description
							<span className="text-zinc-600 font-normal ml-1">
								(optional)
							</span>
						</label>

						<textarea
							rows={3}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="What will this channel be used for?"
							className="
								w-full rounded-lg
								border border-zinc-800
								bg-zinc-900
								px-3 py-3
								text-sm text-white
								placeholder:text-zinc-600
								resize-none
								outline-none
								focus:border-zinc-600
								transition
							"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-zinc-300 mb-3">
							Channel type
						</label>

						<div className="space-y-2">

							<button className="w-full text-left p-3 rounded-lg border border-blue-500/40 bg-blue-500/5">
								<div className="flex items-start gap-3">
									<div className="mt-0.5 w-4 h-4 rounded-full border-[5px] border-blue-500 bg-zinc-950" />

									<div>
										<p className="text-sm font-medium text-zinc-200">
											Public
										</p>

										<p className="text-xs text-zinc-500 mt-0.5">
											Anyone in this workspace can access it.
										</p>
									</div>
								</div>
							</button>

							<button className="w-full text-left p-3 rounded-lg border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 transition">
								<div className="flex items-start gap-3">
									<div className="mt-0.5 w-4 h-4 rounded-full border border-zinc-600" />

									<div>
										<p className="text-sm font-medium text-zinc-300">
											Private
										</p>

										<p className="text-xs text-zinc-500 mt-0.5">
											Only invited members can access it.
										</p>
									</div>
								</div>
							</button>

						</div>
					</div>
					<div>
						<label className="block text-sm font-medium text-zinc-300 mb-2">
							Channel members
						</label>

						<button className="w-full h-11 rounded-lg border border-zinc-800 bg-zinc-900 px-3 flex items-center justify-between text-left hover:border-zinc-700 transition">
							<span className="text-sm text-zinc-500">
								Add members
							</span>

							<span className="text-zinc-600">
								+
							</span>
						</button>

						<p className="text-xs text-zinc-600 mt-2">
							Choose who can access this private channel.
						</p>
					</div>
					<div className="flex items-center justify-end gap-3 pt-2">
						<button className="h-10 px-4 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 transition">
							Cancel
						</button>

						<button className="h-10 px-5 rounded-lg bg-blue-500 hover:bg-blue-600 text-sm font-medium text-white transition" onClick={() => createChannel.mutate()}>
							Create channel
						</button>
					</div>

				</div>
			</div>
		</div>
	)
}
