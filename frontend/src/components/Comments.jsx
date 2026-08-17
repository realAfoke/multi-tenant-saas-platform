import { ItemDescription, Item, ItemTitle, ItemContent } from "./ui/item";
import time from "@/assets/time.svg"
import { TimerIcon } from "lucide-react";


export default function Comments(props) {
	const { comment = {} } = props ?? {}
	const user = comment?.user?.user ?? {}
	console.log(comment)
	const date = new Date(comment?.createdAt)
	const time = `${date.getHours()}:${date.getMinutes()} PM`
	return (
		<div className="flex gap-3">

			<div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-sm font-semibold shrink-0">
				{user?.email?.slice(0, 1)?.toUpperCase()}
			</div>

			<div>

				<div className="flex items-center gap-2">
					<p className="text-sm font-medium">
						{`${user?.firstName} ${user?.lastName}`}
					</p>

					<span className="text-xs text-zinc-600">
						{time}
					</span>
				</div>

				<p className="text-zinc-400  leading-relaxed">
					{comment?.content}
				</p>

			</div>

		</div>

	)
}

// <Item className="bg-black rounded-sm flex justify-between items-center">
// 			<ItemContent>
// 				<ItemTitle className="font-semibold text-white">
// 					{user?.email}
// 				</ItemTitle>
// 				<ItemDescription className="text-[#dad4d4]">
// 					{comment?.content}
// 				</ItemDescription>
// 			</ItemContent>
// 			<div>
// 				<img src={time} className="w-4 h-4" />
// 			</div>
// 		</Item>

