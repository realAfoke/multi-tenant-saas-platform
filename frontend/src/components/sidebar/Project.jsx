import NestedList from "../NestedList"
import { ItemGroup, Item, ItemContent, ItemTitle, ItemMedia } from "@/components/ui/item"
import { Fragment } from "react"

export default function Project(props) {
	const { selectedWorkspace, selectedProject, projectOrdering, setWorkspace, projects, setProject, tasks, taskOrdering, setTask } = props
	return (
		<div>
			<Item className="gap-2 py-2 hover:bg-[#ffffff1a] rounded-md px-2">
				<ItemContent>
					<ItemTitle className="capitalize text-sm w-full" onClick={() => {
						setWorkspace((prev) => ({ ...prev, show: !prev.show }))
					}}>
		CHANNELS
					</ItemTitle>
				</ItemContent>
			</Item>
			{selectedWorkspace?.show && <ItemGroup className="gap-0">
				{projectOrdering?.map((projectId) => {
					const project = projects?.[projectId]
					return (
						<Fragment key={project?.id}>
							<NestedList key={project?.id} list={project} isProject={true} setter={setProject} />
							{
								selectedProject?.id === project?.id &&
								<ItemGroup className="gap-0 my-0 py-0 px-7">
									{taskOrdering?.map((taskId) => {

										const task = tasks?.[taskId]
										return (
											<NestedList key={task?.id} list={task} setter={setTask} />
										)
									})}
								</ItemGroup>
							}
						</Fragment>
					)
				})}
			</ItemGroup>}
		</div>

	)
}
//
// <ItemMedia variant="image" className="w-5 h-5">
// 	<img src={cog} />
// </ItemMedia>

