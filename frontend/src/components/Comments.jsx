import { ItemDescription, Item, ItemTitle, ItemContent } from "./ui/item";
import time from "@/assets/time.svg"


export default function Comments(props) {
	const { comment } = props
	const { user } = comment
	return (
		<Item className="bg-black rounded-sm flex justify-between items-center">
			<ItemContent>
				<ItemTitle className="font-semibold text-white">
					{user?.email}
				</ItemTitle>
				<ItemDescription className="text-[#dad4d4]">
					{comment?.content}
				</ItemDescription>
			</ItemContent>
			<div>
				<img src={time} className="w-4 h-4" />
			</div>
		</Item>
	)
}
