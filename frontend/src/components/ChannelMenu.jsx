import {
	MoreHorizontal,
	ListPlus,
	Users,
	Info,
	Bell,
	Settings,
} from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

export default function ChannelMenu({ channel }) {
	const navigate = useNavigate()
	const { wkName, channelName } = useParams()
	return (
		<div className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl">
			{/* Channel header */}
			<div className="border-b border-zinc-800 px-4 py-3">
				<p className="text-sm font-medium text-white">
					#{channel?.name}
				</p>

				<p className="mt-0.5 text-xs text-zinc-500">
					Channel
				</p>
			</div>

			{/* Actions */}
			<div className="p-1.5">
				<button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white" onClick={() => navigate(`/${wkName}/${channelName}/create-task`)}>
					<ListPlus className="h-4 w-4 text-zinc-500" />
					<span>Create task</span>
				</button>

				<button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white" onClick={() => navigate(`/${wkName}/${channelName}/members`)}>
					<Users className="h-4 w-4 text-zinc-500" />
					<span>View members</span>
				</button>

				<button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white" onClick={() => navigate(`/${wkName}/${channelName}/info`)}>
					<Info className="h-4 w-4 text-zinc-500" />
					<span>Channel info</span>
				</button>

				<div className="my-1 border-t border-zinc-800" />

				<button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white" onClick={() => navigate(`/${wkName}/${channelName}/setting`)}>
					<Settings className="h-4 w-4 text-zinc-500" />
					<span>Channel settings</span>
				</button>
			</div>
		</div>
	)
}
