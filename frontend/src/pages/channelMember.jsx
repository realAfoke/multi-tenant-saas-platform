import { instance } from "@/api/axios"
import { Search, UserPlus, MoreHorizontal } from "lucide-react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useAppState } from "@/hooks/apptools"

export default function ChannelMembers({ channel }) {

	const { selectedChannel } = useAppState()
	const { data: channelMembers } = useQuery({
		queryKey: ['channel', selectedChannel?.id],
		queryFn: async ({ queryKey }) => {
			const [, id] = queryKey
			try {
				const response = await instance.get(`workspaces/${id}/channel-members/`)
				return response.data
			} catch (err) {
				console.error(err)
				throw new Error(err.message, { cause: err })
			}
		},
		enabled: !!selectedChannel?.id
	})
	const queryClient = useQueryClient()
	const user = queryClient.getQueryData(['user'])
	return (
		<div className="min-h-full bg-zinc-950 text-zinc-100 pt-[5rem]">
			<div className="mx-auto max-w-3xl px-6 py-8">
				<div className="flex items-start justify-between gap-4">
					<div>
						<div className="mb-1 text-sm text-zinc-500">
							#{channel?.name}
						</div>

						<h1 className="text-2xl font-semibold tracking-tight">
							Channel members
						</h1>

						<p className="mt-1 text-sm text-zinc-500">
							People who have access to this channel.
						</p>
					</div>

					<button className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500">
						<UserPlus className="h-4 w-4" />
						Add members
					</button>
				</div>

				<div className="relative mt-8">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

					<input
						type="text"
						placeholder="Search members..."
						className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900 pl-9 pr-4 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-zinc-700"
					/>
				</div>

				<div className="mb-3 mt-7">
					<p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
						{`Members ${channelMembers?.length}`}
					</p>
				</div>

				<div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40">
					{channelMembers?.map((member) => {
						const role = member?.role
						member = member?.member?.user
						const initial = member?.firstName?.[0]?.toUpperCase()
						return (
							<div key={member?.id} className="flex items-center justify-between border-b border-zinc-800 px-4 py-3.5">
								<div className="flex min-w-0 items-center gap-3">
									<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-sm font-medium">
										{initial}
									</div>

									<div className="min-w-0">
										<p className="truncate text-sm font-medium text-zinc-200">
											{member?.id === user?.id
												? 'You'
												: `${member?.firstName} ${member?.lastName}`}
										</p>

										<p className="truncate text-xs text-zinc-500">
											{member?.email}
										</p>
									</div>
								</div>

								<div className="flex items-center gap-3">
									<span className="hidden rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-400 sm:block">
										{role}
									</span>

									<button className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200">
										<MoreHorizontal className="h-4 w-4" />
									</button>
								</div>
							</div>

						)

					})}
				</div>
			</div>
		</div>
	)
}
