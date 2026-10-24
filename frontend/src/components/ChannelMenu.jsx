import {
	ListPlus,
	Users,
	Info,
	Settings,
} from "lucide-react"
import { useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function ChannelMenu({ channel, setShowChannelMenu }) {
	const ref = useRef(null)
	const navigate = useNavigate()
	const { wkName, channelName } = useParams()
	useEffect(() => {
		const toggleOfChannelMenu = (e) => {
			if (ref.current && !ref.current.contains(e.target)) {
				setShowChannelMenu(false)
			}
		}
		document.addEventListener('click', toggleOfChannelMenu)
		return () => document.removeEventListener('click', toggleOfChannelMenu)
	})
	const menuList = [
		{
			content: 'Create task',
			icon: <ListPlus className="h-4 w-4 text-zinc-500" />,
			link: 'create-task'
		},
		{
			content: 'View members',
			icon: <Users className="h-4 w-4 text-zinc-500" />,
			link: 'members'
		},
		{
			content: 'Channel info',
			icon: <Info className="h-4 w-4 text-zinc-500" />,
			link: 'info'
		},
		{
			content: 'Channel settings',
			icon: <Settings className="h-4 w-4 text-zinc-500" />,
			link: 'setting'
		}
	]
	return (
		<div ref={ref} className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl">
			<div className="border-b border-zinc-800 px-4 py-3">
				<p className="text-sm font-medium text-white">
					#{channel?.name}
				</p>

				<p className="mt-0.5 text-xs text-zinc-500">
					Channel
				</p>
			</div>

			<div className="p-1.5">
				{
					menuList.map((list) => (
						<button key={list.content} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white" onClick={(e) => {
							e.stopPropagation()
							navigate(`/${wkName}/${channelName}/${list.link}`)
							setShowChannelMenu(false)
						}}>
							{list.icon}
							<span>{list.content}</span>
						</button>

					))
				}
			</div>
		</div>
	)
}

