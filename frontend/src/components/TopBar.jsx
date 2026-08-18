import profile from "@/assets/profileIcon.svg"
import searchIcon from "@/assets/search1.svg"
import menuIcon from "@/assets/menu3.svg"
import NotificationPopover from "./NotificationPopover"

export default function TopBar({ setToggle, toggle }) {
	return (
		<header className="h-16 border-b border-zinc-800 bg-black flex items-center justify-between px-6">
			<div className="flex gap-2">
				{!toggle &&
					<img
						src={menuIcon}
						className=" w-8 h-8  cursor-pointer"
						onClick={(e) => {
							e.stopPropagation()
							setToggle(true)
						}}
					/>}
				<h1 className="text-white text-lg font-semibold">
					Orbit
				</h1>
			</div>

			<div className="flex items-center gap-4">

				<div className="hidden md:flex items-center gap-2 bg-zinc-900 rounded-xl px-4 h-10 border border-zinc-800">

					<img
						src={searchIcon}
						className="w-4 h-4 opacity-60"
					/>

					<input
						placeholder="Search..."
						className="bg-transparent outline-none text-white placeholder:text-zinc-500"
					/>

				</div>

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
