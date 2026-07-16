import { ItemContent, Item, ItemTitle } from "./ui/item"
export default function NestedList(props) {
	const { list, setter, selectedPrjId, selectedWkId } = props
	return (
		<Item className={`py-2 my-0 hover:bg-[#ffffff1a] rounded-md px-2 ${selectedPrjId?.id === list?.id ? 'bg-emerald-400 text-black' : selectedWkId?.id === list?.id ? 'bg-blue-400 text-black' : ''}`}>
			<ItemContent>
				<ItemTitle className="lowercase w-full text-sm" onClick={() => setter((prev) => {
					return prev.id === list?.id ? { ...prev, id: 0, show: false } : { id: Number(list?.id), name: list?.name, show: true }
				})}>
					{list?.name || list?.title}
				</ItemTitle>
			</ItemContent>
		</Item>
	)


}
