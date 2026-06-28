import useAuthStore from "@/store/authStore"
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
		<ItemGroup>
			{workspaces?.map((workspace) => {
				return (
					<Item key={workspace.id}>
						<ItemTitle>{workspace.name}</ItemTitle>
						<ItemContent>
							<ItemDescription>{workspace.description}</ItemDescription>
						</ItemContent>
					</Item>
				)
			})}
		</ItemGroup>
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
