export default function Workspace() {
	return (
		<div className="h-full overflow-auto">
			<div className="flex min-h-full items-center justify-center px-6 py-12">
				<div className="w-full max-w-xl text-center">

					<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
						#
					</div>

					<h1 className="mt-6 text-3xl font-bold tracking-tight text-white">
						Welcome to your workspace
					</h1>

					<p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-500">
						Choose a channel from the sidebar to start collaborating with
						your team.
					</p>

				</div>
			</div>
		</div>
	)
}
//
//
//
// import { instance } from "@/api/axios"
// import { useLoaderData, Link, useLocation, useParams } from "react-router-dom"
// import { ItemContent, Item, ItemDescription, ItemTitle, ItemGroup } from "@/components/ui/item"
// import { useAppStore } from "@/store/authStore"
// import { useEffect } from "react"
//
//
//
// export default function Workspace() {
// 	const { id } = useParams()
// 	const queryClient=useQuerycl
// 	const workspace = useAppStore(state => state.cacheWorkspace?.[id])
// 	// const workspace = useAppStore(state => state.getWorkspace(id))
// 	const setWorkspace = useAppStore(state => state.setWorkspace)
// 	const wkData = useLoaderData()
// 	useEffect(() => {
// 		setWorkspace(wkData)
// 	})
// 	return (
// 		<>
// 			<div className="">
// 				<div>
// 					<ItemGroup className="gap-1">
// 						{workspace?.projects?.map((project) => {
// 							return (
// 								<Link key={project?.id} to={`/dashboard/${project.id}/`}>
// 									<Item className="flex flex-col items-start gap-0 hover:bg-[#dbd8f1d9] py-1">
// 										<ItemTitle className="text-md capitalize">{project.name}</ItemTitle>
// 										<ItemContent>
// 											<ItemDescription>{project?.description}</ItemDescription>
// 										</ItemContent>
// 									</Item>
// 								</Link>
// 							)
// 						})}
// 					</ItemGroup>
//
// 				</div>
// 				<div></div>
// 			</div>
// 		</>
// 	)
// }
//
//
//
// export async function workspaceLoader(params) {
// 	const { id } = params.params
// 	try {
// 		const wkDetail = await instance.get(`workspaces/${id}/`)
// 		return wkDetail.data
// 	} catch (error) {
// 		console.error('ERROR:', error)
// 	}
// }
