import { Button } from "@/components/ui/button"

export default function StatusFilter() {

	const statuses = [
		["In Progress", 4],
		["Todo", 18],
		["Review", 2],
		["Done", 14],
	]

	return (

		<div className="flex gap-3 flex-wrap">

			{statuses.map(([name, count], index) => (

				<Button
					key={name}
					variant={index === 0 ? "default" : "outline"}
					className={
						index === 0
							? "rounded-xl bg-blue-500 hover:bg-blue-600"
							: "rounded-xl border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
					}
				>
					{name} ({count})
				</Button>

			))}

		</div>

	)
}
