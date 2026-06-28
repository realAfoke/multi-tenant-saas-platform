import { instance } from "@/api/axios"
import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { ItemGroup, Item, ItemActions, ItemContent, ItemDescription, ItemTitle, ItemMedia } from "@/components/ui/item"

export default function Dashboard() {
	const [workspaces, setWorkspaces] = useState([])
	const loaderData = useLoaderData()
	useEffect(() => {
		setWorkspaces(loaderData || [])

	})
	return (
		<div className="min-h-screen bg-[#d4d4d4b8] overflow-auto">
			<div className="text-2xl font-semibold bg-[#040435eb] p-3 text-white shadow-lg">
				Orbit
			</div>
			<ItemGroup className="">
				{workspaces?.map((workspace) => {
					return (
						<Item key={workspace.id} className="flex flex-col items-start gap-0 hover:bg-[#dbd8f1d9]">
							<ItemTitle className="text-md capitalize">{workspace.name}</ItemTitle>
							<ItemContent>
								<ItemDescription>{workspace.description}</ItemDescription>
							</ItemContent>
						</Item>
					)
				})}
			</ItemGroup>
		</div>
	)
}


export async function dashboardLoader() {
	try {
		const user = localStorage.getItem('user')
		if (!user) return
		const dashboard = await instance.get('workspaces/')
		return dashboard.data
	} catch (err) {
		console.error(err.response.data)
	}


}
// #040435b8
//
// #040435eb
