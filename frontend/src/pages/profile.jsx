import { instance } from "@/api/axios"
import profile from "@/assets/profileIcon.svg"
import useAuthStore from "@/store/authStore"
import { useMutation, useQuery } from "@tanstack/react-query"
import Plan from "@/components/SubscriptionPlans"
import { Button } from "@/components/ui/button"
import { redirect } from "react-router-dom"
export default function Profile() {
	const user = useAuthStore(state => state.user)

	const { data } = useQuery({
		queryKey: ['plan'],
		queryFn: getPlans
	})
	const mutate = useMutation({
		mutationFn: (planId) => checkoutPlan(planId),
		onSuccess: (url) => {
			console.log(url)
			redirect(url?.data)
		}
	})
	const subPlans = data?.map((plan) => (<Plan key={plan?.id} plan={plan} handleCheckout={mutate} />))
	return (
		<div className="h-screen overflow-auto flex flex-col py-8 px-1 md:px-8">
			<div className="bg-[#333333] flex flex-col pt-15 m-2 md:self-center md:min-w-100 rounded-sm">
				<div className="w-35 h-35 self-center">
					<img src={profile} />
				</div>
				<div className="flex flex-col gap-2 p-5">
					<div className="text-[#d0d0d0]">{`Name:${user?.firstName} ${user?.lastName}`}</div>

					<div className="text-[#d0d0d0]">{`Email:${user?.email}`}</div>
				</div>
			</div>
			<div className="m-2">
				<div className=" py-2 flex *:capitalize">
					<Button className="text-[#d0d0d0] text-xl font-semibold">
						Plan
					</Button>
					<Button className="text-[#d0d0d0] text-xl font-semibold">
						Manage subscription
					</Button>
				</div>
				<div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]  gap-2">
					{subPlans}
				</div>
			</div>
		</div>
	)
}
async function getPlans() {
	try {
		const plans = await instance.get('billing/')
		return plans?.data
	} catch (error) {
		console.error(error)
	}
}

async function checkoutPlan(planId) {
	try {
		const checkout = await instance.post('billing/checkout/', { planId: planId })
		return checkout?.data
	} catch (error) {
		console.error(error)
	}
}
