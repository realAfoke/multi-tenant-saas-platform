import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, LogOut, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function WrongAccount({
	inviteEmail,
	currentEmail,
	onSwitchAccount,
}) {
	const navigate = useNavigate()
	return (
		<div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">

			<div className="w-full max-w-md">

				<h1 className="text-3xl font-bold text-center mb-10">
					OrbitSpace
				</h1>

				<Card className="bg-zinc-900 border-zinc-800">

					<CardContent className="p-8">

						<div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto">

							<AlertCircle className="w-7 h-7 text-amber-400" />

						</div>

						<div className="text-center mt-6">

							<h2 className="text-xl font-semibold">
								Wrong account
							</h2>

							<p className="text-zinc-400 mt-3 leading-relaxed">
								This invitation was sent to:
							</p>

							<p className="text-white font-medium mt-2">
								{inviteEmail}
							</p>

							<p className="text-zinc-500 mt-4 text-sm leading-relaxed">
								You're currently signed in as:
							</p>

							<p className="text-zinc-300 text-sm mt-1">
								{currentEmail}
							</p>

						</div>

						<div className="mt-7 p-4 rounded-xl bg-zinc-950 border border-zinc-800">

							<p className="text-sm text-zinc-400 text-center">
								Sign out and log in with the account
								that received this invitation.
							</p>

						</div>

						<Button
							onClick={() => onSwitchAccount()}
							className="w-full h-12 mt-6 rounded-xl bg-blue-500 hover:bg-blue-600"
						>
							<LogOut className="w-4 h-4 mr-2" />
							Switch account
						</Button>

					</CardContent>

				</Card>

			</div>

		</div>
	)
}


// <Button
// 	variant="ghost"
// 	onClick={() => onCancel(true)}
// 	className="w-full mt-2 text-zinc-500 hover:text-white"
// >
// 	<ArrowLeft className="w-4 h-4 mr-2" />
// 	Go back
// </Button>
//

