import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";


export default function Collapsible({
	title,
	children,
	defaultOpen = false,
}) {
	const [open, setOpen] = useState(defaultOpen);

	return (
		<div className="w-full rounded-md border-2 border-gray-700 bg-zinc-950 shadow-lg overflow-hidden">
			<button
				onClick={() => setOpen(!open)}
				className="flex w-full items-center justify-between bg-zinc-900 px-4 py-3 text-white hover:bg-zinc-800 transition"
			>
				<span className="font-medium">{title}</span>

				{open ? (
					<ChevronDown size={18} />
				) : (
					<ChevronRight size={18} />
				)}
			</button>

			<div
				className={`transition-all duration-300 overflow-hidden ${open ? "max-h-[500px]" : "max-h-0"
					}`}
			>
				<div className="p-3">{children}</div>
			</div>
		</div>
	);
}
