import { instance } from "@/api/axios"
import { useLoaderData, Link, useLocation, useParams } from "react-router-dom"
import { ItemContent, Item, ItemDescription, ItemTitle, ItemGroup } from "@/components/ui/item"
import { useAppStore } from "@/store/authStore"
import { useEffect } from "react"



export default function Workspace() {
	const { id } = useParams()
	const queryClient=useQuerycl
	const workspace = useAppStore(state => state.cacheWorkspace?.[id])
	// const workspace = useAppStore(state => state.getWorkspace(id))
	const setWorkspace = useAppStore(state => state.setWorkspace)
	const wkData = useLoaderData()
	useEffect(() => {
		setWorkspace(wkData)
	})
	return (
		<>
			<div className="">
				<div>
					<ItemGroup className="gap-1">
						{workspace?.projects?.map((project) => {
							return (
								<Link key={project?.id} to={`/dashboard/${project.id}/`}>
									<Item className="flex flex-col items-start gap-0 hover:bg-[#dbd8f1d9] py-1">
										<ItemTitle className="text-md capitalize">{project.name}</ItemTitle>
										<ItemContent>
											<ItemDescription>{project?.description}</ItemDescription>
										</ItemContent>
									</Item>
								</Link>
							)
						})}
					</ItemGroup>

				</div>
				<div></div>
			</div>
		</>
	)
}



export async function workspaceLoader(params) {
	const { id } = params.params
	try {
		const wkDetail = await instance.get(`workspaces/${id}/`)
		return wkDetail.data
	} catch (error) {
		console.error('ERROR:', error)
	}
}
