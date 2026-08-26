import profile from "@/assets/profileIcon.svg"
import searchIcon from "@/assets/search1.svg"
import NotificationPopover from "./NotificationPopover"
import MenuIcon from "./MenuIcon"

export default function TopBar({ setToggle, toggle }) {
	return (
		<header className="h-16 border-b z-999 hidden md:flex lg:flex border-zinc-800 bg-black items-center justify-between px-6">
			<MenuIcon setToggle={setToggle} toggle={toggle} />
			<div className="flex items-center gap-4">
				<button className="w-10 h-10 rounded-xl hover:bg-zinc-900 flex items-center justify-center">
					<img src={searchIcon} className="w-5 h-5" />
				</button>
				<NotificationPopover />
				<img
					src={profile}
					className="w-10 h-10 rounded-full"
				/>

			</div>
		</header>
	)
}
