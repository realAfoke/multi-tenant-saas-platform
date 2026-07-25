import { ItemContent, Item, ItemTitle } from "./ui/item"
export default function NestedList(props) {
	const { list, setter, selectedPrjId, selectedWkId } = props
	const isProject = selectedPrjId?.id === list?.id
	const isWorkspace = selectedWkId?.id === list?.id
	return (
		<Item className={`p-2 px-5 my-0 hover:bg-[#ffffff1a] rounded-md px-2 ${isProject ? 'bg-emerald-400 text-black' : isWorkspace ? 'bg-blue-400 text-black' : ''}`}>
			<ItemContent>
				<ItemTitle className="lowercase w-full text-sm" onClick={() => setter({ id: Number(list?.id), name: list?.name || list?.title, show: true })}>
					{list?.name || list?.title}
				</ItemTitle>
			</ItemContent>
		</Item>
	)
}
