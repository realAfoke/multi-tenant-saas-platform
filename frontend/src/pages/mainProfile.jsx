import { fetchUserQueryOption } from "@/queryOptions/queryOptions"
import { useQuery } from "@tanstack/react-query"
export default function Profile() {
	const { data: user } = useQuery(fetchUserQueryOption())
	const initial = user?.firstName?.[0]?.toUpperCase()
	return (
		<div className="min-h-screen bg-zinc-950 overflow-y-auto px-4 py-10 mt-[5rem]">
			<div className="w-full max-w-2xl mx-auto">

				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-xl font-semibold text-white">
							Profile
						</h1>

						<p className="text-sm text-zinc-500 mt-1">
							Manage your personal information.
						</p>
					</div>

					<button className="h-9 px-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm text-zinc-200 transition">
						Edit profile
					</button>
				</div>

				<div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
					<div className="flex items-center gap-5">

						<div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-semibold text-white">
							{initial}
						</div>

						<div>
							<h2 className="text-lg font-semibold text-white">
								{`${user?.firstName} ${user?.lastName}`}
							</h2>

							<p className="text-sm text-zinc-500 mt-1">
								{`@${user?.username}`}
							</p>

							<p className="text-xs text-zinc-600 mt-1">
								{user?.email}
							</p>
						</div>

					</div>
				</div>

				<div className="mt-8">
					<h2 className="text-sm font-semibold text-zinc-200">
						Personal information
					</h2>

					<div className="mt-3 rounded-xl border border-zinc-800 overflow-hidden">

						<div className="px-5 py-4 bg-zinc-900/40 border-b border-zinc-800">
							<p className="text-xs text-zinc-500">
								Display name
							</p>

							<p className="text-sm text-zinc-200 mt-1">
								{`${user?.firstName} ${user?.lastName}`}
							</p>
						</div>

						<div className="px-5 py-4 bg-zinc-900/40 border-b border-zinc-800">
							<p className="text-xs text-zinc-500">
								Username
							</p>

							<p className="text-sm text-zinc-200 mt-1">
								{user?.email}
							</p>
						</div>

						<div className="px-5 py-4 bg-zinc-900/40">
							<p className="text-xs text-zinc-500">
								Email
							</p>

							<p className="text-sm text-zinc-200 mt-1">
								{`${user?.email}`}
							</p>
						</div>

					</div>
				</div>

				<div className="mt-8">
					<h2 className="text-sm font-semibold text-zinc-200">
						Account
					</h2>

					<div className="mt-3 rounded-xl border border-zinc-800 overflow-hidden">

						<button className="w-full px-5 py-4 bg-zinc-900/40 hover:bg-zinc-900 flex items-center justify-between border-b border-zinc-800 transition">
							<div className="text-left">
								<p className="text-sm text-zinc-200">
									Password
								</p>
								<p className="text-xs text-zinc-600 mt-1">
									Change your account password
								</p>
							</div>

							<span className="text-xs text-zinc-500">
								Change
							</span>
						</button>

						<button className="w-full px-5 py-4 bg-zinc-900/40 hover:bg-zinc-900 flex items-center justify-between transition">
							<div className="text-left">
								<p className="text-sm text-zinc-200">
									Notifications
								</p>
								<p className="text-xs text-zinc-600 mt-1">
									Manage your notification preferences
								</p>
							</div>

							<span className="text-xs text-zinc-500">
								Manage
							</span>
						</button>

					</div>
				</div>

			</div>
		</div>
	)
}
