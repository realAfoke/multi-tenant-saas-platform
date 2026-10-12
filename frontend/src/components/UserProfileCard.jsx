import {
	MessageCircle,
	MoreHorizontal,
	UserRound,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function UserProfileCard({ user }) {
	if (!user) return null

	const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()

	return (
		<div className="w-[320px] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl">

			{/* Cover */}
			<div className="h-20 bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-950" />

			<div className="px-5 pb-5">

				{/* Avatar */}
				<div className="-mt-10 mb-3">
					<div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-zinc-950 bg-blue-600 text-2xl font-semibold text-white">
						{user.avatar ? (
							<img
								src={user.avatar}
								alt={fullName}
								className="h-full w-full object-cover"
							/>
						) : (
							user.firstName?.[0]?.toUpperCase()
						)}
					</div>
				</div>

				{/* Name + menu */}
				<div className="flex items-start justify-between gap-3">
					<div className="min-w-0">
						<h2 className="truncate text-lg font-semibold text-white">
							{fullName}
						</h2>

						{user.username && (
							<p className="mt-0.5 truncate text-sm text-zinc-500">
								@{user.username}
							</p>
						)}
					</div>

					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8 shrink-0 text-zinc-500 hover:bg-zinc-900 hover:text-white"
					>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</div>

				{/* Status */}
				<div className="mt-3 flex items-center gap-2">
					<span className="h-2 w-2 rounded-full bg-green-500" />
					<span className="text-xs text-zinc-400">
						Online
					</span>
				</div>

				{/* Role */}
				<div className="mt-5">
					<p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-zinc-600">
						Role
					</p>

					<p className="text-sm text-zinc-300">
						Developer
					</p>
				</div>

				{/* About */}
				{user.bio && (
					<div className="mt-4">
						<p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-zinc-600">
							About
						</p>

						<p className="text-sm leading-5 text-zinc-400">
							{user.bio}
						</p>
					</div>
				)}

				<div className="my-5 border-t border-zinc-800" />

				{/* Actions */}
				<div className="grid grid-cols-2 gap-2">
					<Button className="bg-blue-600 text-white hover:bg-blue-500">
						<MessageCircle className="mr-2 h-4 w-4" />
						Message
					</Button>

					<Button
						variant="outline"
						className="border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white"
					>
						<UserRound className="mr-2 h-4 w-4" />
						Profile
					</Button>
				</div>

			</div>
		</div>
	)
}
// import { MoreHorizontal, MessageCircle, UserRound } from "lucide-react"
// import { Button } from "@/components/ui/button"
//
// export default function UserProfileCard({ user }) {
// 	if (!user) return null
//
// 	return (
// 		<div className="w-[320px] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl">
// 			{/* Cover */}
// 			<div className="h-20 bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-950" />
//
// 			{/* Profile */}
// 			<div className="px-5 pb-5">
// 				{/* Avatar */}
// 				<div className="-mt-10 mb-3">
// 					<div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-zinc-950 bg-zinc-800 text-2xl font-semibold text-zinc-300">
// 						{user.avatar ? (
// 							<img
// 								src={user.avatar}
// 								alt={user.name}
// 								className="h-full w-full rounded-full object-cover"
// 							/>
// 						) : (
// 							user.name?.charAt(0)?.toUpperCase()
// 						)}
// 					</div>
// 				</div>
//
// 				{/* Name + menu */}
// 				<div className="flex items-start justify-between gap-3">
// 					<div className="min-w-0">
// 						<h2 className="truncate text-lg font-semibold text-white">
// 							{user.name}
// 						</h2>
//
// 						{user.username && (
// 							<p className="truncate text-sm text-zinc-500">
// 								@{user.username}
// 							</p>
// 						)}
// 					</div>
//
// 					<Button
// 						variant="ghost"
// 						size="icon"
// 						className="h-8 w-8 shrink-0 text-zinc-500 hover:bg-zinc-900 hover:text-white"
// 					>
// 						<MoreHorizontal className="h-4 w-4" />
// 					</Button>
// 				</div>
//
// 				{/* Status */}
// 				<div className="mt-3 flex items-center gap-2">
// 					<span className="h-2 w-2 rounded-full bg-green-500" />
//
// 					<span className="text-xs text-zinc-400">
// 						{user.status || "Online"}
// 					</span>
// 				</div>
//
// 				{/* Bio */}
// 				{user.bio && (
// 					<div className="mt-5">
// 						<p className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-600">
// 							About
// 						</p>
//
// 						<p className="text-sm leading-5 text-zinc-400">
// 							{user.bio}
// 						</p>
// 					</div>
// 				)}
//
// 				{/* Divider */}
// 				<div className="my-5 border-t border-zinc-800" />
//
// 				{/* Actions */}
// 				<div className="grid grid-cols-2 gap-2">
// 					<Button
// 						className="bg-blue-600 text-white hover:bg-blue-500"
// 					>
// 						<MessageCircle className="mr-2 h-4 w-4" />
// 						Message
// 					</Button>
//
// 					<Button
// 						variant="outline"
// 						className="border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white"
// 					>
// 						<UserRound className="mr-2 h-4 w-4" />
// 						Profile
// 					</Button>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }
