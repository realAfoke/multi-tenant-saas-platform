
import {
	CalendarDays,
	Mail,
	MessageCircle,
	MoreHorizontal,
	UserRound,
	X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function UserProfile({ user, onClose }) {
	const navigate = useNavigate()

	if (!user) return null

	const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
				onClick={onClose}
			/>

			{/* Side Panel */}
			<div className="fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-zinc-950 border-l border-zinc-800 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-200">

				{/* Header */}
				<div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-zinc-950/90 backdrop-blur border-b border-zinc-800">
					<h2 className="text-sm font-semibold text-zinc-300">Profile</h2>
					<button
						onClick={onClose}
						className="p-1.5 rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				{/* Cover */}
				<div className="h-28 bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-950" />

				{/* Content */}
				<div className="px-6 pb-8">
					{/* Avatar + actions */}
					<div className="-mt-12 flex items-end justify-between">
						<div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-zinc-950 bg-blue-600 text-3xl font-semibold text-white">
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

						<Button
							variant="ghost"
							size="icon"
							className="mb-1 text-zinc-500 hover:bg-zinc-800 hover:text-white"
						>
							<MoreHorizontal className="h-5 w-5" />
						</Button>
					</div>

					{/* Name */}
					<div className="mt-3">
						<h1 className="text-xl font-bold text-white">{fullName}</h1>
						{user.username && (
							<p className="mt-0.5 text-sm text-zinc-500">@{user.username}</p>
						)}
					</div>

					{/* Online status */}
					<div className="mt-2 flex items-center gap-2">
						<span className="h-2.5 w-2.5 rounded-full bg-green-500" />
						<span className="text-sm text-zinc-400">Online</span>
					</div>

					{/* Message button */}
					<div className="mt-5">
						<Button
							className="w-full bg-blue-600 text-white hover:bg-blue-500"
							onClick={() => {
								navigate(`/chat/${user?.id}`)
								onClose()
							}}
						>
							<MessageCircle className="mr-2 h-4 w-4" />
							Message
						</Button>
					</div>

					{/* About */}
					<div className="mt-7">
						<h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
							About
						</h2>
						<p className="mt-2 text-sm leading-relaxed text-zinc-300">
							{user.bio || "No information has been added about this person yet."}
						</p>
					</div>

					{/* Details */}
					<div className="mt-7 space-y-4">
						<div className="flex gap-3">
							<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
								<UserRound className="h-4 w-4 text-zinc-400" />
							</div>
							<div>
								<p className="text-xs text-zinc-500">Role</p>
								<p className="text-sm text-zinc-300">Developer</p>
							</div>
						</div>

						{user.email && (
							<div className="flex gap-3">
								<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
									<Mail className="h-4 w-4 text-zinc-400" />
								</div>
								<div className="min-w-0">
									<p className="text-xs text-zinc-500">Email</p>
									<p className="truncate text-sm text-zinc-300">{user.email}</p>
								</div>
							</div>
						)}

						<div className="flex gap-3">
							<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
								<CalendarDays className="h-4 w-4 text-zinc-400" />
							</div>
							<div>
								<p className="text-xs text-zinc-500">Joined</p>
								<p className="text-sm text-zinc-300">January 2026</p>
							</div>
						</div>
					</div>

					{/* Shared channels */}
					<div className="mt-8">
						<div className="flex items-center justify-between mb-3">
							<div>
								<h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
									Shared channels
								</h2>
								<p className="text-xs text-zinc-600 mt-0.5">
									Channels you both belong to
								</p>
							</div>
							<span className="text-xs text-zinc-500">3</span>
						</div>

						<div className="space-y-1.5">
							{["general", "development", "random"].map((channel) => (
								<div
									key={channel}
									className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-zinc-900 transition cursor-pointer"
								>
									<div className="flex items-center gap-2.5">
										<span className="text-zinc-500">#</span>
										<span className="text-sm text-zinc-300">{channel}</span>
									</div>
									<span className="text-xs text-zinc-500">View</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
// import {
// 	CalendarDays,
// 	Mail,
// 	MessageCircle,
// 	MoreHorizontal,
// 	UserRound,
// 	X,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useNavigate } from "react-router-dom"
//
// export default function UserProfile({ user, onClose }) {
// 	const navigate = useNavigate()
//
// 	if (!user) return null
//
// 	const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
//
// 	return (
// 		<div className="fixed z-50 w-[360px] max-h-[80vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 text-white shadow-2xl">
// 			{/* Close button */}
// 			<button
// 				onClick={onClose}
// 				className="absolute top-3 right-3 z-10 rounded-full p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
// 			>
// 				<X className="h-4 w-4" />
// 			</button>
//
// 			{/* Cover */}
// 			<div className="h-20 bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-950 rounded-t-2xl" />
//
// 			{/* Content */}
// 			<div className="px-5 pb-5">
// 				{/* Avatar */}
// 				<div className="-mt-10 flex items-end justify-between">
// 					<div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-zinc-950 bg-blue-600 text-2xl font-semibold text-white">
// 						{user.avatar ? (
// 							<img
// 								src={user.avatar}
// 								alt={fullName}
// 								className="h-full w-full object-cover"
// 							/>
// 						) : (
// 							user.firstName?.[0]?.toUpperCase()
// 						)}
// 					</div>
//
// 					<Button
// 						variant="ghost"
// 						size="icon"
// 						className="mb-1 text-zinc-500 hover:bg-zinc-800 hover:text-white"
// 					>
// 						<MoreHorizontal className="h-4 w-4" />
// 					</Button>
// 				</div>
//
// 				{/* Name */}
// 				<div className="mt-2">
// 					<h1 className="text-lg font-bold">{fullName}</h1>
// 					{user.username && (
// 						<p className="text-sm text-zinc-500">@{user.username}</p>
// 					)}
// 				</div>
//
// 				{/* Online status */}
// 				<div className="mt-1.5 flex items-center gap-2">
// 					<span className="h-2 w-2 rounded-full bg-green-500" />
// 					<span className="text-xs text-zinc-400">Online</span>
// 				</div>
//
// 				{/* Message button */}
// 				<div className="mt-4">
// 					<Button
// 						className="w-full bg-blue-600 text-white hover:bg-blue-500"
// 						onClick={() => navigate(`/chat/${user?.id}`)}
// 					>
// 						<MessageCircle className="mr-2 h-4 w-4" />
// 						Message
// 					</Button>
// 				</div>
//
// 				{/* About */}
// 				<div className="mt-5">
// 					<h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
// 						About
// 					</h2>
// 					<p className="mt-1.5 text-sm leading-relaxed text-zinc-300">
// 						{user.bio || "No information has been added about this person yet."}
// 					</p>
// 				</div>
//
// 				{/* Details */}
// 				<div className="mt-5 space-y-3">
// 					<div className="flex gap-3">
// 						<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
// 							<UserRound className="h-4 w-4 text-zinc-400" />
// 						</div>
// 						<div>
// 							<p className="text-xs text-zinc-500">Role</p>
// 							<p className="text-sm text-zinc-300">Developer</p>
// 						</div>
// 					</div>
//
// 					{user.email && (
// 						<div className="flex gap-3">
// 							<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
// 								<Mail className="h-4 w-4 text-zinc-400" />
// 							</div>
// 							<div className="min-w-0">
// 								<p className="text-xs text-zinc-500">Email</p>
// 								<p className="truncate text-sm text-zinc-300">{user.email}</p>
// 							</div>
// 						</div>
// 					)}
//
// 					<div className="flex gap-3">
// 						<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
// 							<CalendarDays className="h-4 w-4 text-zinc-400" />
// 						</div>
// 						<div>
// 							<p className="text-xs text-zinc-500">Joined</p>
// 							<p className="text-sm text-zinc-300">January 2026</p>
// 						</div>
// 					</div>
// 				</div>
//
// 				{/* Shared channels */}
// 				<div className="mt-5">
// 					<div className="flex items-center justify-between mb-2">
// 						<h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
// 							Shared channels
// 						</h2>
// 						<span className="text-xs text-zinc-500">3</span>
// 					</div>
//
// 					<div className="space-y-1.5">
// 						{["general", "development", "random"].map((channel) => (
// 							<div
// 								key={channel}
// 								className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-zinc-900 transition cursor-pointer"
// 							>
// 								<div className="flex items-center gap-2">
// 									<span className="text-zinc-500">#</span>
// 									<span className="text-sm text-zinc-300">{channel}</span>
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }
