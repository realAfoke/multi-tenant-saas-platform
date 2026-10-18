import { instance } from "@/api/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export default function UpdateMember({ currentRole, workspace, memberId }) {
	const roles = ['owner', 'admin', 'member']
	const queryClient = useQueryClient()
	const update = useMutation({
		mutationFn: async ({ role }) => {
			const response = await instance.patch(`workspaces/${workspace?.id}/workspace/role/`, { role: role, memberId: memberId })
			return response.data
		},
		onSuccess: (update) => {
			queryClient.setQueryData(['workspace', workspace?.id, 'members'], old => {
				const oldValsId = new Map(old?.map(obj => [obj.id, obj]))
				oldValsId.set(update?.id, update)
				const newUp = Array.from(oldValsId.values())
				return newUp
			})
		}
	})
	return (
		<div className="absolute right-0 top-10 z-20 w-44 rounded-lg border border-zinc-800 bg-zinc-900 p-1 shadow-xl">

			<div className="relative group">
				<button
					className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
				>
					<span className="text-sm">Change role</span>
					<span className="text-zinc-600">›</span>
				</button>

				<div className="absolute right-full top-0 mr-1 hidden group-hover:block w-32 rounded-lg border border-zinc-800 bg-zinc-900 p-1 shadow-xl">
					{roles.filter((role) => role !== currentRole).map((role) => (
						<button key={role} className="w-full text-left px-3 py-2 rounded-md text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white transition" onClick={() => update.mutate({ role })}>
							{role}
						</button>
					)
					)}

				</div>
			</div>

			<div className="my-1 border-t border-zinc-800" />

			<button
				// onClick={() => setShowRemoveDialog(`${user?.firstName} ${user?.lastName}`)}
				className="w-full text-left px-3 py-2 rounded-md text-xs text-red-400 hover:bg-red-500/10 transition"
			>
				Remove from workspace
			</button>
		</div>

	)
}
