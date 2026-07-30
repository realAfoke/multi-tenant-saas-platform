import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Workspace() {

	const projects = [
		{
			id: 1,
			name: "Landing Page Redesign",
			description: "Modernize the public website and improve conversions.",
			status: "Active",
			lastUpdated: "2 hours ago",
		},
		{
			id: 2,
			name: "Brand Assets",
			description: "Organize logos, illustrations and marketing resources.",
			status: "Planning",
			lastUpdated: "Yesterday",
		},
		{
			id: 3,
			name: "SEO Campaign",
			description: "Increase organic traffic across all landing pages.",
			status: "Review",
			lastUpdated: "3 days ago",
		},
	]

	return (
		<div className="space-y-10">

			<div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

				<div>

					<p className="text-blue-400 text-sm font-medium">
						Workspace
					</p>

					<h1 className="text-4xl font-bold text-white mt-2">
						Marketing
					</h1>

					<p className="text-zinc-400 mt-3 max-w-2xl leading-relaxed">
						Manage campaigns, branding and every project that shapes
						how customers experience your company.
					</p>

				</div>

				<Button className="rounded-xl bg-blue-500 hover:bg-blue-600 h-11 px-6">
					New Project
				</Button>

			</div>

			<div>

				<div className="flex items-center justify-between mb-5">

					<h2 className="text-2xl font-semibold text-white">
						Projects
					</h2>

					<div className="flex gap-2">

						<Button
							variant="secondary"
							className="rounded-xl bg-zinc-900 text-white hover:bg-zinc-800"
						>
							All
						</Button>

						<Button
							variant="ghost"
							className="rounded-xl text-zinc-400 hover:text-white"
						>
							Active
						</Button>

						<Button
							variant="ghost"
							className="rounded-xl text-zinc-400 hover:text-white"
						>
							Archived
						</Button>

					</div>

				</div>

				<div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">

					{projects.map(project => (

						<Card
							key={project.id}
							className="bg-zinc-900 border-zinc-800 hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
						>

							<CardContent className="p-7">

								<div className="flex items-center justify-between">

									<h3 className="text-xl font-semibold text-white">
										{project.name}
									</h3>

									<span className="text-xs px-3 py-1 rounded-full bg-blue-500/15 text-blue-300">
										{project.status}
									</span>

								</div>

								<p className="text-zinc-400 mt-4 leading-relaxed">
									{project.description}
								</p>

								<div className="mt-8 flex items-center justify-between">

									<p className="text-sm text-zinc-500">
										Last updated
									</p>

									<p className="text-sm text-white">
										{project.lastUpdated}
									</p>

								</div>

							</CardContent>

						</Card>

					))}

				</div>

			</div>

			<div className="grid xl:grid-cols-[1.4fr_0.8fr] gap-6">

				<Card className="bg-zinc-900 border-zinc-800">

					<CardContent className="p-7">

						<h2 className="text-xl font-semibold text-white">
							Recent Activity
						</h2>

						<div className="mt-6 space-y-5">

							<div className="flex justify-between">

								<div>

									<p className="text-white">
										Sarah completed Homepage Design
									</p>

									<p className="text-zinc-500 text-sm mt-1">
										Landing Page Redesign
									</p>

								</div>

								<p className="text-zinc-500 text-sm">
									2h ago
								</p>

							</div>

							<div className="flex justify-between">

								<div>

									<p className="text-white">
										Michael uploaded Brand Guidelines
									</p>

									<p className="text-zinc-500 text-sm mt-1">
										Brand Assets
									</p>

								</div>

								<p className="text-zinc-500 text-sm">
									Yesterday
								</p>

							</div>

							<div className="flex justify-between">

								<div>

									<p className="text-white">
										Emma moved SEO Audit to Review
									</p>

									<p className="text-zinc-500 text-sm mt-1">
										SEO Campaign
									</p>

								</div>

								<p className="text-zinc-500 text-sm">
									3 days ago
								</p>

							</div>

						</div>

					</CardContent>

				</Card>

				<Card className="bg-zinc-900 border-zinc-800">

					<CardContent className="p-7">

						<h2 className="text-xl font-semibold text-white">
							Team
						</h2>

						<div className="flex -space-x-3 mt-6">

							<div className="w-12 h-12 rounded-full bg-blue-500 border-2 border-zinc-900" />
							<div className="w-12 h-12 rounded-full bg-red-500 border-2 border-zinc-900" />
							<div className="w-12 h-12 rounded-full bg-green-500 border-2 border-zinc-900" />
							<div className="w-12 h-12 rounded-full bg-yellow-500 border-2 border-zinc-900" />
							<div className="w-12 h-12 rounded-full bg-purple-500 border-2 border-zinc-900" />

						</div>

						<p className="text-zinc-400 mt-6 leading-relaxed">
							12 members are collaborating inside this workspace.
						</p>

					</CardContent>

				</Card>

			</div>

		</div>
	)
}


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
// 	const workspace = useAppStore(state => state.cacheWorkspace?.[id])
// 	// const workspace = useAppStore(state => state.getWorkspace(id))
// 	const setWorkspace = useAppStore(state => state.setWorkspace)
// 	const wkData = useLoaderData()
// 	useEffect(() => {
// 		setWorkspace(wkData)
// 	})
// 	return (
// 		<>
// 			<div className="mb-10">
// 				<h1 className="text-4xl font-bold text-white">
// 					{workspace?.name}
// 				</h1>
//
// 				<p className="text-zinc-400 mt-3 max-w-2xl">
// 					{workspace?.description ||
// 						"Manage projects, collaborate with your team and keep everything organized in one place."}
// 				</p>
// 			</div>
//
// 			<div className="flex items-center justify-between mb-6">
// 				<h2 className="text-2xl font-semibold text-white">
// 					Projects
// 				</h2>
//
// 				<Button className="rounded-xl bg-blue-500 hover:bg-blue-600">
// 					+ New Project
// 				</Button>
// 			</div>
//
// 			<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//
// 				{workspace?.projects?.map(project => (
// 					<Card
// 						key={project.id}
// 						className="
//                     bg-zinc-900
//                     border-zinc-800
//                     hover:border-blue-500
//                     hover:-translate-y-1
//                     transition-all
//                     duration-300
//                     cursor-pointer
//                 "
// 					>
// 						<CardContent className="p-6">
//
// 							<h3 className="text-white text-xl font-semibold">
// 								{project.name}
// 							</h3>
//
// 							<p className="text-zinc-400 mt-3">
// 								{project.description}
// 							</p>
//
// 							<div className="mt-6 text-blue-400 text-sm font-medium">
// 								Open Project →
// 							</div>
//
// 						</CardContent>
// 					</Card>
// 				))}
//
// 			</div>
// 		</>
// 	)
// }
//
//
//
export async function workspaceLoader(params) {
	const { id } = params.params
	try {
		const wkDetail = await instance.get(`workspaces/${id}/`)
		return wkDetail.data
	} catch (error) {
		console.error('ERROR:', error)
	}
}
