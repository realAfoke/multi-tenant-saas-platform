import {
	ArrowLeft,
	Check,
	ShieldCheck,
	CreditCard,
	LockKeyhole,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Checkout() {
	return (
		<div className="min-h-screen bg-zinc-950 text-white px-4 py-8 md:px-8 lg:px-16">

			<div className="max-w-6xl mx-auto">

				{/* Header */}

				<div className="flex items-center justify-between mb-10">

					<div className="text-2xl font-bold">
						OrbitSpace
					</div>

					<button className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition">
						<ArrowLeft className="w-4 h-4" />
						Back
					</button>

				</div>

				<div className="max-w-2xl mb-8">

					<p className="text-blue-400 text-sm font-medium">
						Upgrade
					</p>

					<h1 className="text-3xl md:text-4xl font-bold mt-2">
						Complete your upgrade
					</h1>

					<p className="text-zinc-400 mt-3">
						You're upgrading your OrbitSpace plan.
					</p>

				</div>

				<div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-6 items-start">

					{/* Order Summary */}

					<Card className="bg-zinc-900 border-zinc-800">

						<CardContent className="p-7">

							<div className="flex items-start justify-between">

								<div>

									<p className="text-sm text-zinc-500">
										Selected Plan
									</p>

									<h2 className="text-2xl font-semibold mt-2">
										Pro
									</h2>

								</div>

								<div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center">
									<CreditCard className="w-5 h-5 text-blue-400" />
								</div>

							</div>

							<div className="mt-8">

								<p className="text-3xl font-bold">
									₦12,000
									<span className="text-sm font-normal text-zinc-500">
										/ month
									</span>
								</p>

							</div>

							<div className="border-t border-zinc-800 my-7" />

							<div className="space-y-4">

								<div className="flex items-center gap-3">
									<Check className="w-4 h-4 text-blue-400" />
									<span className="text-sm text-zinc-300">
										Unlimited projects
									</span>
								</div>

								<div className="flex items-center gap-3">
									<Check className="w-4 h-4 text-blue-400" />
									<span className="text-sm text-zinc-300">
										Team collaboration
									</span>
								</div>

								<div className="flex items-center gap-3">
									<Check className="w-4 h-4 text-blue-400" />
									<span className="text-sm text-zinc-300">
										Advanced workspace features
									</span>
								</div>

							</div>

							<div className="border-t border-zinc-800 my-7" />

							<div className="space-y-3 text-sm">

								<div className="flex justify-between">
									<span className="text-zinc-500">
										Subtotal
									</span>

									<span>
										₦12,000
									</span>
								</div>

								<div className="flex justify-between">
									<span className="text-zinc-500">
										Tax
									</span>

									<span className="text-zinc-400">
										Calculated at checkout
									</span>
								</div>

								<div className="flex justify-between pt-3 border-t border-zinc-800">
									<span className="font-medium">
										Total
									</span>

									<span className="font-semibold">
										₦12,000
									</span>
								</div>

							</div>

						</CardContent>

					</Card>

					{/* Payment */}

					<Card className="bg-zinc-900 border-zinc-800">

						<CardContent className="p-7">

							<div className="flex items-center justify-between">

								<div>

									<h2 className="text-xl font-semibold">
										Payment
									</h2>

									<p className="text-sm text-zinc-500 mt-1">
										Complete your payment securely.
									</p>

								</div>

								<div className="flex items-center gap-2 text-zinc-500 text-xs">
									<LockKeyhole className="w-4 h-4" />
									Secure
								</div>

							</div>

							{/* Stripe Payment Element goes here */}

							<div className="mt-7 rounded-xl border border-zinc-800 bg-zinc-950 p-5 min-h-[300px] flex items-center justify-center">

								<div className="text-center max-w-sm">

									<div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto">
										<CreditCard className="w-5 h-5 text-zinc-500" />
									</div>

									<p className="text-zinc-300 mt-4 font-medium">
										Payment details
									</p>

									<p className="text-sm text-zinc-600 mt-2">
										Your Stripe Payment Element will appear here.
									</p>

								</div>

							</div>

							<Button className="w-full h-12 mt-6 rounded-xl bg-blue-500 hover:bg-blue-600 text-white">
								Pay ₦12,000
							</Button>

							<div className="flex items-center justify-center gap-2 text-xs text-zinc-600 mt-5">

								<ShieldCheck className="w-4 h-4" />

								<span>
									Payments securely processed by Stripe
								</span>

							</div>

						</CardContent>

					</Card>

				</div>

			</div>

		</div>
	)
}
