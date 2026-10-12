import { instance } from "@/api/axios"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CreateWorkspace() {
	const [workspace, setWorkspace] = useState({ name: '', description: '' })
	const navigate = useNavigate()
	const createWorkspace = useMutation({
		mutationFn: async () => {
			const response = await instance.post('workspaces/', workspace)
			return response.data
		},
		onSuccess: (response) => {
			const route = `/${response?.name}/general`
			navigate(route)
		}
	})
	return (
		<div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
			<div className="w-full max-w-md">

				<div className="text-center mb-8">
					<h1 className="text-2xl font-semibold text-white">
						Create a workspace
					</h1>

					<p className="text-sm text-zinc-500 mt-2">
						Bring your team together in one place.
					</p>
				</div>

				<div className="space-y-6">

					<div>
						<label className="block text-sm font-medium text-zinc-300 mb-3">
							Workspace icon
						</label>

						<button className="w-20 h-20 rounded-xl border border-dashed border-zinc-700 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-600 transition flex flex-col items-center justify-center">
							<span className="text-2xl text-zinc-500">+</span>
							<span className="text-[10px] text-zinc-600 mt-1">
								Add icon
							</span>
						</button>
					</div>

					<div>
						<label className="block text-sm font-medium text-zinc-300 mb-2">
							Workspace name
						</label>

						<input
							type="text"
							value={workspace.name}
							onChange={(e) => setWorkspace((prev) => ({ ...prev, name: e.target.value }))}
							placeholder="e.g. Acme Inc."
							className="w-full h-11 rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-zinc-600 transition"
						/>
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
							value={workspace.description}
							onChange={(e) => setWorkspace((prev) => ({ ...prev, description: e.target.value }))}
							placeholder="What is this workspace for?"
							className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm text-white placeholder:text-zinc-600 resize-none outline-none focus:border-zinc-600 transition"
						/>
					</div>

					<button className="w-full h-11 rounded-lg bg-blue-500 hover:bg-blue-600 text-sm font-medium text-white transition" onClick={() => createWorkspace.mutate()}>
						Create workspace
					</button>

				</div>
			</div>
		</div>
	)
}
