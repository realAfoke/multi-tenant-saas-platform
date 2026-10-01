
import { useState } from "react"
import {
	Mail,
	Link,
	Copy,
	Check,
	UserPlus,
	MoreHorizontal,
	Clock3,
	Shield,
	X,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar"

export default function WorkspaceTeamPanel({
	members = [],
	pendingRequests = [],
	onInvite,
	onCopyInviteLink,
	onMemberClick,
}) {
	const [email, setEmail] = useState("")
	const [copied, setCopied] = useState(false)

	const inviteLink = "https://orbit.app/invite/8xK92Lm"

	const sendInvite = () => {
		if (!email.trim()) return

		onInvite?.(email)
		setEmail("")
	}

	const copyLink = async () => {
		try {
			await navigator.clipboard.writeText(inviteLink)
			setCopied(true)

			setTimeout(() => {
				setCopied(false)
			}, 1500)
		} catch (error) {
			console.error(error)
		}

		onCopyInviteLink?.(inviteLink)
	}

	return (

		<div className="space-y-10 pt-[5rem] pb-[1rem]">

			{/* Header */}
			<div className="border-b border-zinc-800 px-6 py-5">
				<div className="flex items-start justify-between">
					<div>
						<h2 className="text-lg font-semibold">
							Team
						</h2>

						<p className="mt-1 text-sm text-zinc-500">
							Manage people in this workspace
						</p>
					</div>

					<div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-blue-500/10 px-3 text-sm font-medium text-blue-400">
						{members.length}
					</div>
				</div>
			</div>

			<div className="space-y-6 p-5">

				{/* Invite section */}
				<Card className="border-zinc-800 bg-zinc-900">
					<CardContent className="p-5">

						<div className="flex items-start gap-3">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
								<UserPlus size={18} />
							</div>

							<div>
								<h3 className="font-medium text-white">
									Invite people
								</h3>

								<p className="mt-1 text-xs leading-relaxed text-zinc-500">
									Invite teammates to collaborate in this workspace.
								</p>
							</div>
						</div>

						{/* Email */}
						<div className="mt-5">
							<div className="flex gap-2">

								<div className="relative flex-1">
									<Mail
										size={16}
										className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
									/>

									<Input
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												sendInvite()
											}
										}}
										placeholder="name@example.com"
										className="h-10 border-zinc-700 bg-zinc-950 pl-9 text-sm text-white placeholder:text-zinc-600"
									/>
								</div>

								<Button
									onClick={sendInvite}
									disabled={!email.trim()}
									className="h-10 bg-blue-500 px-4 hover:bg-blue-600"
								>
									Invite
								</Button>

							</div>
						</div>

						{/* Divider */}
						<div className="my-5 flex items-center gap-3">
							<div className="h-px flex-1 bg-zinc-800" />
							<span className="text-[11px] uppercase tracking-wider text-zinc-600">
								or
							</span>
							<div className="h-px flex-1 bg-zinc-800" />
						</div>

						{/* Invite link */}
						<div>
							<div className="mb-2 flex items-center gap-2">
								<Link size={14} className="text-zinc-500" />

								<span className="text-xs font-medium text-zinc-400">
									Share invite link
								</span>
							</div>

							<div className="flex gap-2">
								<div className="flex h-9 min-w-0 flex-1 items-center rounded-md border border-zinc-800 bg-zinc-950 px-3">
									<span className="truncate text-xs text-zinc-500">
										{inviteLink}
									</span>
								</div>

								<Button
									variant="outline"
									size="icon"
									onClick={copyLink}
									className="h-9 w-9 shrink-0 border-zinc-700 bg-transparent hover:bg-zinc-800"
								>
									{copied ? (
										<Check
											size={15}
											className="text-emerald-400"
										/>
									) : (
										<Copy size={15} />
									)}
								</Button>
							</div>
						</div>

					</CardContent>
				</Card>

				{/* Pending requests */}
				{pendingRequests.length > 0 && (
					<div>
						<div className="mb-3 flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Clock3
									size={15}
									className="text-amber-400"
								/>

								<h3 className="text-sm font-medium text-white">
									Pending requests
								</h3>

								<span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] text-amber-400">
									{pendingRequests.length}
								</span>
							</div>
						</div>

						<div className="space-y-2">
							{pendingRequests.map((request) => (
								<div
									key={request.id}
									className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-3"
								>
									<Avatar className="h-9 w-9">
										<AvatarImage src={request.avatar} />

										<AvatarFallback>
											{request.name
												?.slice(0, 1)
												?.toUpperCase()}
										</AvatarFallback>
									</Avatar>

									<div className="min-w-0 flex-1">
										<p className="truncate text-sm font-medium">
											{request.name}
										</p>

										<p className="truncate text-xs text-zinc-500">
											{request.email}
										</p>
									</div>

									<Button
										size="sm"
										className="h-8 bg-blue-500 hover:bg-blue-600"
									>
										Accept
									</Button>

									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 text-zinc-500 hover:text-white"
									>
										<X size={15} />
									</Button>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Members */}
				<div>
					<div className="mb-3 flex items-center justify-between">
						<div>
							<h3 className="text-sm font-medium text-white">
								Members
							</h3>

							<p className="mt-0.5 text-xs text-zinc-600">
								Everyone in this workspace
							</p>
						</div>
					</div>

					<div className="overflow-hidden rounded-lg border border-zinc-800">
						{members.map((member, index) => {
							const user = member?.user ?? member

							const firstName =
								user?.firstName ||
								user?.first_name ||
								""

							const lastName =
								user?.lastName ||
								user?.last_name ||
								""

							const name =
								`${firstName} ${lastName}`.trim() ||
								user?.username ||
								user?.email ||
								"Unknown user"

							const initials =
								`${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`
									.toUpperCase() ||
								name.slice(0, 2).toUpperCase()

							const role =
								member?.role ||
								user?.role ||
								"member"

							return (
								<div
									key={user?.id ?? index}
									onClick={() => onMemberClick?.(member)}
									className="group flex cursor-pointer items-center gap-3 border-b border-zinc-800 bg-zinc-900/60 px-4 py-3 last:border-b-0 hover:bg-zinc-900"
								>

									{/* Avatar */}
									<Avatar className="h-9 w-9">
										<AvatarImage src={user?.avatar} />

										<AvatarFallback className="bg-blue-500/15 text-xs text-blue-400">
											{initials}
										</AvatarFallback>
									</Avatar>

									{/* User */}
									<div className="min-w-0 flex-1">
										<div className="flex items-center gap-2">
											<p className="truncate text-sm font-medium text-white">
												{name}
											</p>

											{role === "owner" && (
												<Shield
													size={13}
													className="text-blue-400"
												/>
											)}
										</div>

										<p className="truncate text-xs text-zinc-500">
											{user?.email}
										</p>
									</div>

									{/* Role */}
									<span
										className={`hidden rounded-md px-2 py-1 text-[10px] font-medium capitalize sm:block ${role === "owner"
											? "bg-blue-500/10 text-blue-400"
											: role === "admin"
												? "bg-purple-500/10 text-purple-400"
												: "bg-zinc-800 text-zinc-500"
											}`}
									>
										{role}
									</span>

									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 text-zinc-600 opacity-0 transition group-hover:opacity-100"
										onClick={(e) => {
											e.stopPropagation()
										}}
									>
										<MoreHorizontal size={16} />
									</Button>

								</div>
							)
						})}
					</div>
				</div>

			</div>
		</div>
	)
}
