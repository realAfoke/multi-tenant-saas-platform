import searchIcon from "@/assets/search1.svg"
import NotificationPopover from "./NotificationPopover"
import MenuIcon from "./MenuIcon"
import { useAppState } from "@/hooks/apptools"
import { Button } from "./ui/button"
import { Hash, MoreHorizontal } from "lucide-react"

export default function TopBar({ setToggle, toggle }) {
	const { selectedChannel, view, selectedDm } = useAppState()
	return (
		<header className="h-16 absolute w-full bg-red-500 top-0 border-b flex border-zinc-800 bg-zinc-950 items-center justify-between px-2 md:px-6">
			<div className="flex items-center gap-3">
				{!toggle && <MenuIcon setToggle={setToggle} toggle={toggle} />}
				{view && (
					<>
						{selectedChannel?.id && view === 'channel' ? <Channel channel={selectedChannel} /> : <PrivateDm profile={selectedDm} />}

					</>
				)}
			</div>
			<div className="flex items-center md:gap-2 relative">
				<button className="w-10 h-10 rounded-xl hover:bg-zinc-900 flex items-center justify-center">
					<img src={searchIcon} className="w-5 h-5" />
				</button>
				<NotificationPopover />
				<Button
					variant="ghost"
					size="icon"
					className="text-zinc-500 hover:text-white"
				>
					<MoreHorizontal className="w-5 h-5" />
				</Button>
			</div>
		</header>
	)
}


function Channel({ channel }) {
	return (
		<>
			<div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center">
				<Hash className="w-5 h-5 text-zinc-400" />
			</div>
			<div className="text-white">
				<h1 className="text-white font-semibold">{channel?.name}</h1>
				<span className="text-xs text-zinc-500 block -mt-1">Team conersation</span>
			</div>

		</>
	)
}

function PrivateDm({ profile }) {
	const initial = profile?.firstName?.[0]?.toUpperCase()
	return (
		<div className="flex items-center gap-3">

			<div className="relative">

				<div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-sm font-semibold">
					{initial}
				</div>

				{profile?.online && (
					<span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-zinc-950" />
				)}

			</div>


			<div>

				<h1 className="font-semibold">
					{profile?.username}
				</h1>
			</div>

		</div>

	)
}
