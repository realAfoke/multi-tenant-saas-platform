import { useAppState } from "@/hooks/apptools"
import { ItemContent, Item, ItemTitle } from "./ui/item"
import { useNavigate } from "react-router-dom"

export default function NestedList(props) {
	const navigate = useNavigate()
	const { selectedProject, selectedWorkspace } = useAppState()
	const { list, setter, isWorkspace, isProject } = props
	const workspaceRoute = `${isWorkspace ? list?.name : selectedWorkspace?.name}`
	const projectRoute = `${workspaceRoute}${isProject ? '/' + list?.name : selectedProject ? '/' + selectedProject?.name : ''}`
	const taskRoute = `${workspaceRoute}${projectRoute}$/${list?.title}`
	return (
		<Item className={`p-2 px-5 my-0 hover:bg-[#ffffff1a] rounded-md px-2 ${selectedProject?.id === list?.id ? 'bg-emerald-400 text-black' : selectedWorkspace?.id === list?.id ? 'bg-blue-400 text-black' : ''}`}>
			<ItemContent>
				<ItemTitle className="lowercase w-full text-sm" onClick={() => {
					setter({ id: Number(list?.id), name: list?.name || list?.title, show: true })
					const route = isWorkspace ? workspaceRoute : isProject ? projectRoute : taskRoute
					console.log(route)
					navigate(route.trim())
				}}>
					{list?.name || list?.title}
				</ItemTitle>
			</ItemContent>
		</Item>
	)
}

