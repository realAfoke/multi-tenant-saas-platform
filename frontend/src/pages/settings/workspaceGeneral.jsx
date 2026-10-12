import { instance } from "@/api/axios"
import { useAppState } from "@/hooks/apptools"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
export default function WorkspaceGeneral() {
	const { selectedWorkspace } = useAppState()
	const [name, setName] = useState(selectedWorkspace?.name)
	const [description, setDescription] = useState(selectedWorkspace?.description)
	const queryClient = useQueryClient()
	const updateWorkspace = useMutation({
		mutationFn: async (action) => {
			console.log('action:', action)
			let response;
			switch (action) {
				case 'patch': response = await instance.patch(`workspaces/${selectedWorkspace?.id}/`, { name: name, descrition: description })
					break;
				case 'delete': response = await instance.delete(`workspace/${selectedWorkspace?.id}/`)
					break;
			}
			return response.data
		},
		onSuccess: (update) => {
			queryClient.setQueryData(['workspace'], (old) => {
				return {
					...old,
					workspaces: {
						...(old?.workspaces ?? {}),
						[update?.id]: {
							...(old?.workspaces?.[update?.id] ?? {}),
							...update
						}
					}
				}
			})
		}
	})
	return (
		< section className="flex-1 max-w-2xl pt-[5rem]" >

			<div className="mb-6">
				<h2 className="text-base font-semibold text-white">
					General
				</h2>

				<p className="text-sm text-zinc-500 mt-1">
					Update your workspace information.
				</p>
			</div>

			<div className="rounded-xl border border-zinc-800 bg-zinc-900/40">

				<div className="p-5 border-b border-zinc-800">
					<label className="text-sm font-medium text-zinc-300">
						Workspace icon
					</label>

					<div className="flex items-center gap-4 mt-3">
						<div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center text-xl font-semibold text-white">
							A
						</div>

						<button className="h-9 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm text-zinc-300 transition">
							Change
						</button>
					</div>
				</div>

				<div className="p-5 border-b border-zinc-800">
					<label className="block text-sm font-medium text-zinc-300 mb-2">
						Workspace name
					</label>

					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						// readOnly
						className="w-full h-10 rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-sm text-white outline-none"
					/>
				</div>

				<div className="p-5">
					<label className="block text-sm font-medium text-zinc-300 mb-2">
						Description
					</label>

					<textarea
						rows={3}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Describe your workspace..."
						className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-3 text-sm text-white placeholder:text-zinc-600 resize-none outline-none focus:border-zinc-600 transition"
					/>
				</div>

			</div>

			<div className="flex justify-end mt-4 *:mx-2">
				<button className="h-10 px-5 rounded-lg bg-red-900 hover:bg-blue-600 text-sm font-medium text-gray-400 transition" onClick={() => updateWorkspace.mutate('delete')}>
					Delete workspace
				</button>

				<button className="h-10 px-5 rounded-lg bg-blue-500 hover:bg-blue-600 text-sm font-medium text-white transition" onClick={() => updateWorkspace.mutate('patch')}>
					Save changes
				</button>
			</div>

		</section >

	)
}
