import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ContinueWorking() {

	return (

		<Card className="bg-zinc-900 border-zinc-800">

			<CardContent className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-6">

				<div>

					<p className="text-blue-400 text-sm font-medium">
						Continue Working
					</p>

					<h2 className="text-2xl font-semibold text-white mt-2">
						Authentication API
					</h2>

					<p className="text-zinc-400 mt-2 max-w-xl">
						Implement JWT authentication, refresh token rotation and secure session handling.
					</p>

				</div>

				<Button className="mt-5 lg:mt-0 rounded-xl bg-blue-500">
					Resume →
				</Button>

			</CardContent>

		</Card>

	)
}
