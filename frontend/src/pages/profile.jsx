import { Camera, Mail, Shield, CreditCard, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LogOutIcon } from "lucide-react"
import { instance } from "@/api/axios"
import { useMutation } from "@tanstack/react-query"

export default function Profile() {

	const logout = useMutation({
		mutationFn: async () => {
			const logoutUser = await instance.post('users/logout/', {})
			return logoutUser?.data
		}
	})

	return (
		<div className="space-y-8 max-w-5xl text-white flex-1">

			<div className="flex justify-between">
				<div>
					<h1 className="text-3xl font-bold">
						Profile
					</h1>

					<p className="text-zinc-400 mt-2">
						Manage your personal information and account settings.
					</p>
				</div>

				<button className="bg-red-400 h-10 p-5 flex items-center rounded-md" onClick={() => logout.mutate()}>
					<LogOutIcon className="text-white" />
				</button>
			</div>
			{/* Profile */}

			<Card className="bg-zinc-900 border-zinc-800">

				<CardContent className="p-7">

					<div className="flex flex-col sm:flex-row sm:items-center gap-6">

						<div className="relative">

							<div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-3xl font-semibold">
								D
							</div>

							<button className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:bg-zinc-700 transition">
								<Camera className="w-4 h-4" />
							</button>

						</div>

						<div>

							<h2 className="text-2xl font-semibold">
								Daniel
							</h2>

							<p className="text-zinc-400 mt-1">
								daniel@example.com
							</p>

							<p className="text-sm text-zinc-500 mt-3">
								Member since July 2026
							</p>

						</div>

					</div>

				</CardContent>

			</Card>

			{/* Personal Information */}

			<Card className="bg-zinc-900 border-zinc-800">

				<CardContent className="p-7">

					<div className="flex items-center justify-between mb-6">

						<div>
							<h2 className="text-xl font-semibold">
								Personal Information
							</h2>

							<p className="text-sm text-zinc-500 mt-1">
								Update your basic account information.
							</p>
						</div>

						<Button
							variant="outline"
							className="rounded-xl border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
						>
							Edit
						</Button>

					</div>

					<div className="grid md:grid-cols-2 gap-6">

						<div>
							<p className="text-xs uppercase tracking-wider text-zinc-500">
								First Name
							</p>

							<p className="text-white mt-2">
								Daniel
							</p>
						</div>

						<div>
							<p className="text-xs uppercase tracking-wider text-zinc-500">
								Last Name
							</p>

							<p className="text-white mt-2">
								Smith
							</p>
						</div>

						<div>
							<p className="text-xs uppercase tracking-wider text-zinc-500">
								Email
							</p>

							<div className="flex items-center gap-2 mt-2">
								<Mail className="w-4 h-4 text-zinc-500" />
								<span className="text-white">
									daniel@example.com
								</span>
							</div>
						</div>

						<div>
							<p className="text-xs uppercase tracking-wider text-zinc-500">
								Plan
							</p>

							<p className="text-blue-400 mt-2">
								Free Plan
							</p>
						</div>

					</div>

				</CardContent>

			</Card>

			{/* Account Settings */}

			<div>

				<h2 className="text-xl font-semibold mb-4">
					Account
				</h2>

				<div className="space-y-3">

					<Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition cursor-pointer">

						<CardContent className="p-5 flex items-center gap-4">

							<div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
								<Shield className="w-5 h-5 text-zinc-400" />
							</div>

							<div className="flex-1">

								<p className="text-white font-medium">
									Security
								</p>

								<p className="text-sm text-zinc-500 mt-1">
									Password, sessions and account security.
								</p>

							</div>

							<ChevronRight className="w-5 h-5 text-zinc-600" />

						</CardContent>

					</Card>

					<Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition cursor-pointer">

						<CardContent className="p-5 flex items-center gap-4">

							<div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
								<CreditCard className="w-5 h-5 text-zinc-400" />
							</div>

							<div className="flex-1">

								<p className="text-white font-medium">
									Plan & Billing
								</p>

								<p className="text-sm text-zinc-500 mt-1">
									View your subscription and billing details.
								</p>

							</div>

							<ChevronRight className="w-5 h-5 text-zinc-600" />

						</CardContent>

					</Card>

				</div>

			</div>

		</div>
	)
}
// import { instance } from "@/api/axios"
// import profile from "@/assets/profileIcon.svg"
// import { useMutation, useQuery } from "@tanstack/react-query"
// import Plan from "@/components/SubscriptionPlans"
// import { Button } from "@/components/ui/button"
// import { fetchUserQueryOption } from "@/queryOptions/queryOptions"
//
//
// export default function Profile() {
//
// 	const { data: user } = useQuery(fetchUserQueryOption())
// 	const { data } = useQuery({
// 		queryKey: ['plan'],
// 		queryFn: getPlans
// 	})
// 	const mutate = useMutation({
// 		mutationFn: (planId) => checkoutPlan(planId),
// 		onSuccess: (url) => {
// 			window.location.href = url?.status
// 		}
// 	})
// 	const subPlans = data?.map((plan) => (<Plan key={plan?.id} plan={plan} handleCheckout={mutate} />))
// 	return (
// 		<div className="h-screen overflow-auto flex flex-col py-8 px-1 md:px-8">
// 			<div className="bg-[#333333] flex flex-col pt-15 m-2 md:self-center md:min-w-100 rounded-sm">
// 				<div className="w-35 h-35 self-center">
// 					<img src={profile} />
// 				</div>
// 				<div className="flex flex-col gap-2 p-5">
// 					<div className="text-[#d0d0d0]">{`Name:${user?.firstName} ${user?.lastName}`}</div>
//
// 					<div className="text-[#d0d0d0]">{`Email:${user?.email}`}</div>
// 				</div>
// 			</div>
// 			<div className="m-2">
// 				<div className=" py-2 flex *:capitalize">
// 					<Button className="text-[#d0d0d0] text-xl font-semibold">
// 						Plan
// 					</Button>
// 					<Button disabled={true} className="text-[#d0d0d0] text-xl font-semibold -z-1">
// 						Manage subscription
// 					</Button>
// 				</div>
// 				<div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]  gap-2">
// 					{subPlans}
// 				</div>
// 			</div>
// 		</div>
// 	)
// }
// async function getPlans() {
// 	try {
// 		const plans = await instance.get('billing/')
// 		return plans?.data
// 	} catch (error) {
// 		console.error(error)
// 	}
// }
//
// async function checkoutPlan(planId) {
// 	try {
// 		const checkout = await instance.post('billing/checkout/', { planId: planId })
// 		return checkout?.data
// 	} catch (error) {
// 		console.error(error)
// 	}
// }
