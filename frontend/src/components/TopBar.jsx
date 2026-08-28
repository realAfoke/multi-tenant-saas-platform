import profile from "@/assets/profileIcon.svg"
import searchIcon from "@/assets/search1.svg"
import NotificationPopover from "./NotificationPopover"
import MenuIcon from "./MenuIcon"
import { useAppState } from "@/hooks/apptools"
import { Button } from "./ui/button"
import { Hash, MoreHorizontal } from "lucide-react"

export default function TopBar({ setToggle, toggle }) {
	const { selectedChannel } = useAppState()
	return (
		<header className="h-16 absolute w-full top-0 border-b z-999 hidden md:flex lg:flex border-zinc-800 bg-black items-center justify-between px-6">
			<div className="flex items-center gap-3">
				<MenuIcon setToggle={setToggle} toggle={toggle} />
				<div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center">
					<Hash className="w-5 h-5 text-zinc-400" />
				</div>
				<div className="text-white">
					<h1 className="text-white font-semibold">{selectedChannel?.name}</h1>
					<span className="text-xs text-zinc-500">Team conersation</span>
				</div>
			</div>
			<div className="flex items-center gap-2 relative">
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
