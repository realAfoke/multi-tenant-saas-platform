import { useQuery } from "@tanstack/react-query"
import PricingCard from "@/components/PricingCard"
import { instance } from "@/api/axios"


export default function Pricing() {

	const { data: plans, isLoading } = useQuery({
		queryKey: ["plans"],
		queryFn: getPlans
	})


	function handleSelect(plan) {
		console.log("Selected plan:", plan)

		// later:
		// navigate(`/signup?plan=${plan.id}`)
	}


	if (isLoading) {
		return (
			<div className="min-h-screen bg-black flex items-center justify-center">
				<p className="text-white">
					Loading plans...
				</p>
			</div>
		)
	}


	return (

		<div className="min-h-screen bg-black px-6 lg:px-20 py-32">

			<div className="max-w-6xl mx-auto">


				<div className="text-center">

					<span className="text-blue-400 uppercase tracking-widest text-sm">
						Pricing
					</span>


					<h1 className="text-white text-5xl lg:text-6xl font-black mt-5">
						Plans that grow with your team
					</h1>


					<p className="text-gray-400 max-w-2xl mx-auto mt-6 leading-8">
						Start small and upgrade whenever your team needs
						more collaboration power.
					</p>

					<div className="mt-10 flex justify-center">

						<div className="bg-zinc-900 border border-zinc-800 rounded-full p-1 flex">

							<button
								className="
                px-6
                py-3
                rounded-full
                bg-blue-500
                text-white
                text-sm
                font-medium
            "
							>
								Monthly
							</button>


							<button
								className="
                px-6
                py-3
                rounded-full
                text-gray-400
                text-sm
                font-medium
            "
							>
								Yearly
							</button>

						</div>

					</div>
				</div>



				<div className="
                    grid
                    md:grid-cols-2
                    lg:grid-cols-3
                    gap-8
                    mt-20
                ">


					{
						plans?.map((plan) => (

							<PricingCard
								key={plan.id}
								plan={plan}
								popular={plan.name === "Pro"}
								onSelect={handleSelect}
							/>

						))
					}


				</div>


			</div>


		</div>

	)
}



async function getPlans() {

	try {

		const response = await instance.get("billing/")

		return response.data

	} catch (error) {

		console.error(error)

		return []

	}

}



// <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
