
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ProjectOverview() {
	return (
		<div className="space-y-8">

			{/* Header */}

			<div>

				<p className="text-blue-400 text-sm font-medium">
					Marketing
				</p>

				<div className="flex flex-wrap items-center gap-4 mt-2">

					<h1 className="text-4xl font-bold text-white">
						Landing Page Redesign
					</h1>

					<span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">
						Active
					</span>

				</div>

				<p className="text-zinc-400 max-w-3xl mt-4 leading-relaxed">
					Modern redesign of the company's public website with a focus
					on performance, accessibility and conversions.
				</p>

			</div>

			{/* Tabs */}

			<div className="border-b border-zinc-800">

				<div className="flex gap-8 overflow-x-auto">

					<button className="border-b-2 border-blue-500 pb-4 text-white font-medium whitespace-nowrap">
						Overview
					</button>

					<button className="pb-4 text-zinc-500 hover:text-white whitespace-nowrap">
						Board
					</button>

					<button className="pb-4 text-zinc-500 hover:text-white whitespace-nowrap">
						Files
					</button>

					<button className="pb-4 text-zinc-500 hover:text-white whitespace-nowrap">
						Discussion
					</button>

					<button className="pb-4 text-zinc-500 hover:text-white whitespace-nowrap">
						Timeline
					</button>

				</div>

			</div>

			{/* Continue */}

			<Card className="bg-zinc-900 border-zinc-800">

				<CardContent className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-6">

					<div>

						<p className="text-blue-400 text-sm font-medium">
							Continue Working
						</p>

						<h2 className="text-xl font-semibold text-white mt-2">
							Authentication API
						</h2>

						<p className="text-zinc-500 mt-1">
							Last opened yesterday
						</p>

					</div>

					<Button className="rounded-xl mt-5 lg:mt-0 bg-blue-500 hover:bg-blue-600">
						Resume →
					</Button>

				</CardContent>

			</Card>

			{/* Body */}

			<div className="grid xl:grid-cols-[2fr_1fr] gap-6">

				<Card className="bg-zinc-900 border-zinc-800">

					<CardContent className="p-7">

						<h2 className="text-xl font-semibold text-white">
							Recent Activity
						</h2>

						<div className="space-y-6 mt-6">

							<div>

								<p className="text-white">
									Sarah completed Homepage Design
								</p>

								<p className="text-sm text-zinc-500 mt-1">
									2 hours ago
								</p>

							</div>

							<div>

								<p className="text-white">
									Michael uploaded UI Mockups
								</p>

								<p className="text-sm text-zinc-500 mt-1">
									Yesterday
								</p>

							</div>

							<div>

								<p className="text-white">
									Emma moved Hero Section to Review
								</p>

								<p className="text-sm text-zinc-500 mt-1">
									3 days ago
								</p>

							</div>

						</div>

					</CardContent>

				</Card>

				<div className="space-y-6">

					<Card className="bg-zinc-900 border-zinc-800">

						<CardContent className="p-6">

							<h3 className="text-lg font-semibold text-white">
								Members
							</h3>

							<div className="flex -space-x-3 mt-5">

								<div className="w-11 h-11 rounded-full bg-blue-500 border-2 border-zinc-900"></div>
								<div className="w-11 h-11 rounded-full bg-green-500 border-2 border-zinc-900"></div>
								<div className="w-11 h-11 rounded-full bg-yellow-500 border-2 border-zinc-900"></div>
								<div className="w-11 h-11 rounded-full bg-red-500 border-2 border-zinc-900"></div>

							</div>

							<p className="text-zinc-500 mt-5">
								8 members
							</p>

						</CardContent>

					</Card>

					<Card className="bg-zinc-900 border-zinc-800">

						<CardContent className="p-6">

							<h3 className="text-lg font-semibold text-white">
								Files
							</h3>

							<p className="text-zinc-500 mt-3">
								23 shared files
							</p>

							<Button
								variant="ghost"
								className="mt-5 p-0 text-blue-400 hover:text-blue-300"
							>
								Open Files →
							</Button>

						</CardContent>

					</Card>

				</div>

			</div>

		</div>
	)
}



// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
//
// export default function ProjectOverview() {
//
// 	return (
// 		<div className="space-y-10">
//
// 			{/* Header */}
//
// 			<div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">
//
// 				<div>
//
// 					<p className="text-blue-400 text-sm font-medium">
// 						Marketing
// 					</p>
//
// 					<h1 className="text-4xl font-bold text-white mt-2">
// 						Landing Page Redesign
// 					</h1>
//
// 					<p className="text-zinc-400 mt-3 max-w-2xl leading-relaxed">
// 						Modern redesign of the company's public website with
// 						a focus on performance, accessibility and conversions.
// 					</p>
//
// 				</div>
//
// 				<span className="self-start lg:self-auto bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm">
// 					Active
// 				</span>
//
// 			</div>
//
// 			{/* Continue */}
//
// 			<Card className="bg-zinc-900 border-zinc-800 hover:border-blue-500 transition">
//
// 				<CardContent className="p-8">
//
// 					<p className="text-blue-400 font-medium">
// 						Pick up where you left off
// 					</p>
//
// 					<h2 className="text-2xl font-semibold text-white mt-3">
// 						Authentication API
// 					</h2>
//
// 					<p className="text-zinc-400 mt-2">
// 						Last opened yesterday
// 					</p>
//
// 					<Button className="mt-6 rounded-xl bg-blue-500 hover:bg-blue-600">
// 						Resume →
// 					</Button>
//
// 				</CardContent>
//
// 			</Card>
//
// 			{/* Quick Access */}
//
// 			<div>
//
// 				<h2 className="text-2xl text-white font-semibold mb-5">
// 					Quick Access
// 				</h2>
//
// 				<div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
//
// 					<Card className="bg-zinc-900 border-zinc-800 hover:border-blue-500 cursor-pointer hover:-translate-y-1 transition">
//
// 						<CardContent className="p-7">
//
// 							<h3 className="text-xl text-white font-semibold">
// 								Board
// 							</h3>
//
// 							<p className="text-zinc-400 mt-3">
// 								View and organize project tasks.
// 							</p>
//
// 						</CardContent>
//
// 					</Card>
//
// 					<Card className="bg-zinc-900 border-zinc-800 hover:border-blue-500 cursor-pointer hover:-translate-y-1 transition">
//
// 						<CardContent className="p-7">
//
// 							<h3 className="text-xl text-white font-semibold">
// 								Files
// 							</h3>
//
// 							<p className="text-zinc-400 mt-3">
// 								Designs, documents and shared assets.
// 							</p>
//
// 						</CardContent>
//
// 					</Card>
//
// 					<Card className="bg-zinc-900 border-zinc-800 hover:border-blue-500 cursor-pointer hover:-translate-y-1 transition">
//
// 						<CardContent className="p-7">
//
// 							<h3 className="text-xl text-white font-semibold">
// 								Discussion
// 							</h3>
//
// 							<p className="text-zinc-400 mt-3">
// 								Keep everyone on the same page.
// 							</p>
//
// 						</CardContent>
//
// 					</Card>
//
// 					<Card className="bg-zinc-900 border-zinc-800 hover:border-blue-500 cursor-pointer hover:-translate-y-1 transition">
//
// 						<CardContent className="p-7">
//
// 							<h3 className="text-xl text-white font-semibold">
// 								Timeline
// 							</h3>
//
// 							<p className="text-zinc-400 mt-3">
// 								View important milestones.
// 							</p>
//
// 						</CardContent>
//
// 					</Card>
//
// 				</div>
//
// 			</div>
//
// 			{/* Bottom */}
//
// 			<div className="grid xl:grid-cols-[1.5fr_0.8fr] gap-6">
//
// 				<Card className="bg-zinc-900 border-zinc-800">
//
// 					<CardContent className="p-7">
//
// 						<h2 className="text-xl font-semibold text-white">
// 							Recent Activity
// 						</h2>
//
// 						<div className="mt-6 space-y-6">
//
// 							<div className="flex justify-between">
//
// 								<div>
//
// 									<p className="text-white">
// 										Sarah completed Homepage Design
// 									</p>
//
// 									<p className="text-zinc-500 text-sm mt-1">
// 										2 hours ago
// 									</p>
//
// 								</div>
//
// 							</div>
//
// 							<div>
//
// 								<p className="text-white">
// 									Michael uploaded UI Mockups
// 								</p>
//
// 								<p className="text-zinc-500 text-sm mt-1">
// 									Yesterday
// 								</p>
//
// 							</div>
//
// 							<div>
//
// 								<p className="text-white">
// 									Emma moved Hero Section to Review
// 								</p>
//
// 								<p className="text-zinc-500 text-sm mt-1">
// 									3 days ago
// 								</p>
//
// 							</div>
//
// 						</div>
//
// 					</CardContent>
//
// 				</Card>
//
// 				<Card className="bg-zinc-900 border-zinc-800">
//
// 					<CardContent className="p-7">
//
// 						<h2 className="text-xl font-semibold text-white">
// 							Members
// 						</h2>
//
// 						<div className="flex -space-x-3 mt-6">
//
// 							<div className="w-12 h-12 rounded-full bg-blue-500 border-2 border-zinc-900"></div>
// 							<div className="w-12 h-12 rounded-full bg-green-500 border-2 border-zinc-900"></div>
// 							<div className="w-12 h-12 rounded-full bg-yellow-500 border-2 border-zinc-900"></div>
// 							<div className="w-12 h-12 rounded-full bg-red-500 border-2 border-zinc-900"></div>
//
// 						</div>
//
// 						<p className="text-zinc-400 mt-6">
// 							8 members working on this project.
// 						</p>
//
// 					</CardContent>
//
// 				</Card>
//
// 			</div>
//
// 		</div>
// 	)
// }
