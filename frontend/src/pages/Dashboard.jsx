import useAuthStore from "@/store/authStore"
import { instance } from "@/api/axios"
import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { ItemGroup, Item, ItemActions, ItemContent, ItemDescription, ItemTitle, ItemMedia } from "@/components/ui/item"

export default function Dashboard() {
	const [workspaces, setWorkspaces] = useState([])
	const loaderData = useLoaderData()
	useEffect(() => {
		setWorkspaces(loaderData)
	})
	// const user = useAuthStore(state => state.user)
	// const userWorkspaces = workspaces.map((workspace) => {
	// 	console.log('WORKSPACE:', workspace)
	// 	return (
	// 		<li key={workspace.id}>{workspace?.name}</li>
	// 	)
	// })
	return (
		<ItemGroup>
			{workspaces.map((workspace) => {
				return (
					<Item>
						<ItemTitle key={workspace.id}>{workspace.name}</ItemTitle>
						<ItemContent>
							<ItemDescription>{workspace.description}</ItemDescription>
						</ItemContent>
					</Item>
				)
			})}
		</ItemGroup>
	)
}


export async function dashboardLoader(params) {
	try {
		const dashboard = await instance.get('workspaces/')
		return dashboard.data
	} catch (err) {
		console.error(err.response.data)
	}
}
