import { instance } from "@/api/axios"
import { useAppState } from "@/hooks/apptools"
import { useMutation } from "@tanstack/react-query"
import { sendInviteMutationOption } from "@/mutationOptions/mutationOption"
import { useState } from "react"


export default function SendInviteDialog(props) {
	const { handleShowInvite } = props
	const { selectedWorkspace } = useAppState()

	const [email, setEmail] = useState('')
	const sendInvite = useMutation(sendInviteMutationOption(selectedWorkspace?.id, email, handleShowInvite))
	return (
		< div className="fixed inset-0 z-50 flex items-center justify-center px-4">
			<div className="absolute inset-0 bg-black/60" />

			<div className="relative w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl">

				<div className="flex items-start justify-between px-5 py-4 border-b border-zinc-800">
					<div>
						<h3 className="text-base font-semibold text-white">
							Invite people
						</h3>

						<p className="text-sm text-zinc-500 mt-1">
							Add people to Acme Inc.
						</p>
					</div>

					<button className="w-8 h-8 flex items-center justify-center rounded-md text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition">
						×
					</button>
				</div>

				<div className="p-5">

					<label className="block text-sm font-medium text-zinc-300 mb-2">
						Email address
					</label>

					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="name@example.com"
						className="
					w-full h-10 rounded-lg
					border border-zinc-800
					bg-zinc-950
					px-3
					text-sm text-white
					placeholder:text-zinc-600
					outline-none
					focus:border-zinc-600
				"
					/>

					<p className="text-xs text-zinc-600 mt-2">
						You can invite multiple people by separating emails with commas.
					</p>

				</div>

				<div className="flex justify-end gap-2 px-5 py-4 border-t border-zinc-800">
					<button className="h-9 px-4 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition" onClick={() => handleShowInvite(prev => !prev)}>
						Cancel
					</button>

					<button className="h-9 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-sm font-medium text-white transition" onClick={() => sendInvite.mutate()}>
						Send invite
					</button>
				</div>

			</div>
		</div>

	)

}
