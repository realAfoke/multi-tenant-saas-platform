import { Button } from "@/components/ui/button"

export default function PricingCard({
	plan,
	onSelect,
	popular = false
}) {
	const colors = {
		Business: "bg-indigo-500",
		Pro: "bg-blue-500",
		Free: "bg-zinc-700"
	}
	return (
		<div
			className={`
relative
bg-black
rounded-2xl
p-8
border
transition-all
duration-300
hover:-translate-y-2
${popular
					? "border-blue-500 scale-105 shadow-[0_0_40px_rgba(59,130,246,0.25)]"
					: "border-zinc-800 hover:border-blue-500"}
`}>

			{popular && (
				<div className="
                    absolute
                    -top-4
                    left-1/2
                    -translate-x-1/2
                    bg-blue-500
                    text-white
                    px-5
                    py-2
                    rounded-full
                    text-sm
                ">
					Most Popular
				</div>
			)}


			<h3 className="text-white text-2xl font-bold">
				{plan.name}
			</h3>


			<p className="text-gray-400 mt-3">
				{plan.description}
			</p>


			<div className="mt-8">

				<span className="text-white text-5xl font-black">
					₦{plan.price}
				</span>

				<span className="text-gray-500">
					/month
				</span>

			</div>


			<Button
				onClick={() => onSelect(plan)}
				className={`
                    w-full
                    mt-8
                    rounded-full
                    ${colors[plan.name] ?? "bg-blue-500"}
                `}
			>
				Choose {plan.name}
			</Button>


			<div className="mt-8 space-y-4">

				{Object.entries(plan.features ?? {}).map(([key, value]) => (
					<div
						key={key}
						className="flex items-center justify-between py-3 border-b border-zinc-800 last:border-none"
					>
						<span className="text-gray-400 capitalize">
							{key}
						</span>

						<span className="text-white font-medium">
							{value}
						</span>
					</div>
				))}

			</div>

		</div>
	)
}

// className={`relative bg-black border ${popular ? "border-blue-500 border-2" : "border-zinc-800"} rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300`}>
// 					<div
// key = { key }
// className = "flex justify-between text-sm"
// 	>
//
// 						<span className="text-gray-400">
// 							{key}
// 						</span>
//
// 						<span className="text-white">
// 							{value}
// 						</span>
//
// 					</div >
//

