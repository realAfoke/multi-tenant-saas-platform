import { MoreHorizontal, Check } from "lucide-react"

const User = (props) => {
	const { member = {} } = props
	const { user, role } = member
	const addUserToProject = props?.addUserToProject ?? {}
	const projectMembers = props?.projectMembers ?? []
	const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()
	const initials = `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase()
	const isOnline = true

	return (
		<div className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800/60 transition-colors group" onClick={() => addUserToProject((prev) => {
			return prev.includes(member?.id) ? prev.filter(id => id != member?.id) : [...prev, member?.id]
		})}>
			{/* Profile picture */}
			{projectMembers.includes(user?.id) && <Check className="w-4 h-4" />}
			<div className="relative shrink-0">
				{user?.profilePic ? (
					<img src={user.profilePic} alt={fullName} className="w-11 h-11 rounded-full object-cover" />
				) : (
					<div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
						{initials}
					</div>
				)
				}
				{/* Online indicator */}
				{isOnline && (
					<span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-zinc-900" />)}
			</div>
			{/* User information */}
			<div className="flex-1 min-w-0">
				<p className="text-sm font-semibold text-white truncate">
					{fullName}
				</p>
				<p className="text-xs text-zinc-400 truncate mt-0.5">
					{role ?? "Member"}
				</p> </div>
			{/* More menu */}
			<button type="button" onClick={() => onMenuClick?.(user)} className=" shrink-0 p-2 rounded-lg text-zinc-500 opacity-0 group-hover:opacity-100 hover:text-white hover:bg-zinc-700 transition-all " aria-label={`More options for ${fullName}`} >
				<MoreHorizontal className="w-4 h-4" />
			</button> </div>
	)
}

export default User
