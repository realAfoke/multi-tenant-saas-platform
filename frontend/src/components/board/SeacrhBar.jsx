import { Search } from "lucide-react"

export default function SearchBar() {

	return (

		<div className="flex items-center gap-3 w-full lg:w-80 h-11 rounded-xl bg-zinc-900 border border-zinc-800 px-4">

			<Search className="w-4 h-4 text-zinc-500" />

			<input
				placeholder="Search tasks..."
				className="bg-transparent outline-none flex-1 text-white placeholder:text-zinc-500"
			/>

		</div>

	)
}
