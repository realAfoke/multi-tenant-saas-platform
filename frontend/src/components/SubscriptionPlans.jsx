import { ItemGroup, Item, ItemTitle, ItemContent } from "./ui/item"
import { CardDescription, Card, CardTitle, CardContent } from "./ui/card"
import { Button } from "./ui/button"
export default function Plan(props) {
	const { plan = {}, handleCheckout } = props ?? {}
	const { features = {} } = plan
	return (
		<Card className="gap-0 p-0 m-0 rounded:md">
			<CardContent className="min-h-full bg-[#333333] p-5 flex  md:p-10 flex-col gap-5 hover:scale-103">
				<CardTitle className="">
					<Button onClick={() => handleCheckout.mutate(plan?.id)} className={`${plan?.name === 'Business' ? 'bg-orange-500' : plan?.name === 'Pro' ? 'bg-purple-500' : 'bg-blue-500'} rounded-sm shadow-lg py-5 w-full`}>
						{`Get ${plan?.name}`}
					</Button>
				</CardTitle>
				<div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-3">
					<ItemGroup className="flex order-2 gap-1">

						{Object.entries(features).map(([key, val]) => {
							return (
								<Item className="text-white my-0 py-0">
									<ItemContent className="flex-row ">
										<div className="text-white">{key}</div>
										<div className="text-white">{val}</div>
									</ItemContent>
								</Item>
							)
						})}
					</ItemGroup>
					<div className="order-1 p-4 *:my-1 border border-blue-100 rounded-md">
						<div className="h-7 w-7 rounded-full border-9 border-blue-800">
							<div className="bg-white rounded-full h-full w-full">
							</div>
						</div>
						<div>
							<div className="text-white text-lg font-semibold">
								{`${plan?.price}${plan?.currency}`}
							</div>
							<div className="text-gray-400 text-sm">Billed monthly</div>
						</div>
					</div>
				</div>

				<div className="text-white">
					{plan?.description}
				</div>
			</CardContent>
		</Card>
	)
}
