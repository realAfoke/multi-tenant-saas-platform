import {
	User,
	Bell,
	Shield,
	Palette,
	Globe,
	LogOut,
	ChevronRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function Settings() {
	return (
		<div className="max-w-4xl space-y-8 text-white">

			<div>
				<h1 className="text-3xl font-bold">
					Settings
				</h1>

				<p className="text-zinc-400 mt-2">
					Manage your preferences and account settings.
				</p>
			</div>

			<div className="space-y-3">

				<Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition cursor-pointer">
					<CardContent className="p-5 flex items-center gap-4">

						<div className="w-11 h-11 rounded-xl bg-zinc-800 flex items-center justify-center">
							<User className="w-5 h-5 text-zinc-400" />
						</div>

						<div className="flex-1">
							<p className="font-medium">
								Account
							</p>

							<p className="text-sm text-zinc-500 mt-1">
								Manage your name, email and account information.
							</p>
						</div>

						<ChevronRight className="w-5 h-5 text-zinc-600" />

					</CardContent>
				</Card>

				<Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition cursor-pointer">
					<CardContent className="p-5 flex items-center gap-4">

						<div className="w-11 h-11 rounded-xl bg-zinc-800 flex items-center justify-center">
							<Bell className="w-5 h-5 text-zinc-400" />
						</div>

						<div className="flex-1">
							<p className="font-medium">
								Notifications
							</p>

							<p className="text-sm text-zinc-500 mt-1">
								Choose which updates you want to receive.
							</p>
						</div>

						<ChevronRight className="w-5 h-5 text-zinc-600" />

					</CardContent>
				</Card>

				<Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition cursor-pointer">
					<CardContent className="p-5 flex items-center gap-4">

						<div className="w-11 h-11 rounded-xl bg-zinc-800 flex items-center justify-center">
							<Shield className="w-5 h-5 text-zinc-400" />
						</div>

						<div className="flex-1">
							<p className="font-medium">
								Security
							</p>

							<p className="text-sm text-zinc-500 mt-1">
								Password, active sessions and security options.
							</p>
						</div>

						<ChevronRight className="w-5 h-5 text-zinc-600" />

					</CardContent>
				</Card>

				<Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition cursor-pointer">
					<CardContent className="p-5 flex items-center gap-4">

						<div className="w-11 h-11 rounded-xl bg-zinc-800 flex items-center justify-center">
							<Palette className="w-5 h-5 text-zinc-400" />
						</div>

						<div className="flex-1">
							<p className="font-medium">
								Appearance
							</p>

							<p className="text-sm text-zinc-500 mt-1">
								Customize how OrbitSpace looks.
							</p>
						</div>

						<span className="text-sm text-zinc-500 mr-2">
							Dark
						</span>

						<ChevronRight className="w-5 h-5 text-zinc-600" />

					</CardContent>
				</Card>

				<Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition cursor-pointer">
					<CardContent className="p-5 flex items-center gap-4">

						<div className="w-11 h-11 rounded-xl bg-zinc-800 flex items-center justify-center">
							<Globe className="w-5 h-5 text-zinc-400" />
						</div>

						<div className="flex-1">
							<p className="font-medium">
								Language & Region
							</p>

							<p className="text-sm text-zinc-500 mt-1">
								Choose your language and regional preferences.
							</p>
						</div>

						<span className="text-sm text-zinc-500 mr-2">
							English
						</span>

						<ChevronRight className="w-5 h-5 text-zinc-600" />

					</CardContent>
				</Card>

			</div>

			<Card className="bg-zinc-900 border-zinc-800">

				<CardContent className="p-5">

					<button className="flex items-center gap-3 text-red-400 hover:text-red-300 transition">

						<LogOut className="w-5 h-5" />

						<span className="font-medium">
							Log out
						</span>

					</button>

				</CardContent>

			</Card>

		</div>
	)
}
