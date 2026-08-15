import {
	Search,
	Plus,
	FileText,
	Image,
	Folder,
	Download,
	MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Files() {

	const files = [
		{
			id: 1,
			name: "API Documentation.pdf",
			type: "PDF",
			size: "1.2 MB",
			owner: "Daniel",
			updated: "Yesterday",
		},
		{
			id: 2,
			name: "Landing Page Design.fig",
			type: "Design",
			size: "4.8 MB",
			owner: "Sarah",
			updated: "2 hours ago",
		},
		{
			id: 3,
			name: "Brand Guidelines.png",
			type: "Image",
			size: "2.4 MB",
			owner: "Michael",
			updated: "3 days ago",
		},
		{
			id: 4,
			name: "Project Assets",
			type: "Folder",
			size: "—",
			owner: "Emma",
			updated: "4 days ago",
		},
	]

	return (
		<div className="space-y-8 text-white">

			{/* Header */}

			<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">

				<div>

					<h1 className="text-3xl font-bold">
						Files
					</h1>

					<p className="text-zinc-400 mt-2">
						Everything shared in this project.
					</p>

				</div>

				<Button className="rounded-xl bg-blue-500 hover:bg-blue-600">
					<Plus className="w-4 h-4 mr-2" />
					Upload File
				</Button>

			</div>

			{/* Search */}

			<div className="flex items-center gap-3 w-full max-w-xl h-11 rounded-xl bg-zinc-900 border border-zinc-800 px-4">

				<Search className="w-4 h-4 text-zinc-500" />

				<input
					placeholder="Search files..."
					className="flex-1 bg-transparent outline-none text-white placeholder:text-zinc-500"
				/>

			</div>

			{/* Files */}

			<div>

				<div className="flex items-center justify-between mb-4">

					<h2 className="text-xl font-semibold">
						Project Files
					</h2>

					<p className="text-sm text-zinc-500">
						{files.length} files
					</p>

				</div>

				<div className="space-y-3">

					{files.map(file => (

						<div
							key={file.id}
							className="
								flex
								items-center
								gap-4
								p-4
								rounded-xl
								border
								border-zinc-800
								bg-zinc-900
								hover:border-blue-500
								transition
								cursor-pointer
							"
						>

							<div className="w-11 h-11 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">

								{file.type === "PDF" && (
									<FileText className="w-5 h-5 text-red-400" />
								)}

								{file.type === "Design" && (
									<Folder className="w-5 h-5 text-blue-400" />
								)}

								{file.type === "Image" && (
									<Image className="w-5 h-5 text-purple-400" />
								)}

								{file.type === "Folder" && (
									<Folder className="w-5 h-5 text-yellow-400" />
								)}

							</div>

							<div className="min-w-0 flex-1">

								<p className="text-white font-medium truncate">
									{file.name}
								</p>

								<div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-zinc-500">

									<span>
										{file.type}
									</span>

									<span>
										{file.size}
									</span>

									<span>
										{file.owner}
									</span>

									<span>
										{file.updated}
									</span>

								</div>

							</div>

							<Button
								variant="ghost"
								size="icon"
								className="text-zinc-500 hover:text-white shrink-0"
							>
								<Download className="w-4 h-4" />
							</Button>

							<Button
								variant="ghost"
								size="icon"
								className="text-zinc-500 hover:text-white shrink-0"
							>
								<MoreHorizontal className="w-4 h-4" />
							</Button>

						</div>

					))}

				</div>

			</div>

		</div>
	)
}
// import {
// 	Search,
// 	Plus,
// 	Folder,
// 	FileText,
// 	Image,
// 	FileArchive,
// 	MoreHorizontal,
// 	Download,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
//
// export default function Files() {
//
// 	const files = [
// 		{
// 			id: 1,
// 			name: "Landing Page Design.fig",
// 			type: "design",
// 			size: "4.8 MB",
// 			updated: "2 hours ago",
// 			owner: "Sarah",
// 		},
// 		{
// 			id: 2,
// 			name: "API Documentation.pdf",
// 			type: "document",
// 			size: "1.2 MB",
// 			updated: "Yesterday",
// 			owner: "Daniel",
// 		},
// 		{
// 			id: 3,
// 			name: "Brand Guidelines.png",
// 			type: "image",
// 			size: "2.4 MB",
// 			updated: "Yesterday",
// 			owner: "Michael",
// 		},
// 		{
// 			id: 4,
// 			name: "Project Assets.zip",
// 			type: "archive",
// 			size: "18.6 MB",
// 			updated: "3 days ago",
// 			owner: "Emma",
// 		},
// 		{
// 			id: 5,
// 			name: "Homepage Copy.docx",
// 			type: "document",
// 			size: "680 KB",
// 			updated: "4 days ago",
// 			owner: "Sarah",
// 		},
// 	]
//
// 	const icon = (type) => {
//
// 		if (type === "image") {
// 			return <Image className="w-5 h-5 text-purple-400" />
// 		}
//
// 		if (type === "archive") {
// 			return <FileArchive className="w-5 h-5 text-yellow-400" />
// 		}
//
// 		if (type === "design") {
// 			return <Folder className="w-5 h-5 text-blue-400" />
// 		}
//
// 		return <FileText className="w-5 h-5 text-zinc-400" />
// 	}
//
// 	return (
// 		<div className="space-y-8 text-white">
//
// 			{/* Header */}
//
// 			<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
//
// 				<div>
//
// 					<h1 className="text-3xl font-bold">
// 						Files
// 					</h1>
//
// 					<p className="text-zinc-400 mt-2">
// 						Everything shared in this project.
// 					</p>
//
// 				</div>
//
// 				<Button className="rounded-xl bg-blue-500 hover:bg-blue-600">
// 					<Plus className="w-4 h-4 mr-2" />
// 					Upload File
// 				</Button>
//
// 			</div>
//
// 			{/* Search */}
//
// 			<div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
//
// 				<div className="flex items-center gap-3 h-11 w-full md:max-w-md rounded-xl bg-zinc-900 border border-zinc-800 px-4">
//
// 					<Search className="w-4 h-4 text-zinc-500" />
//
// 					<input
// 						placeholder="Search files..."
// 						className="flex-1 bg-transparent outline-none text-white placeholder:text-zinc-500"
// 					/>
//
// 				</div>
//
// 				<div className="flex items-center gap-2">
//
// 					<Button
// 						variant="outline"
// 						className="rounded-xl border-zinc-800 bg-zinc-900 text-zinc-300"
// 					>
// 						All Files
// 					</Button>
//
// 					<Button
// 						variant="ghost"
// 						className="rounded-xl text-zinc-500 hover:text-white"
// 					>
// 						Recent
// 					</Button>
//
// 				</div>
//
// 			</div>
//
// 			{/* Recent Files */}
//
// 			<div>
//
// 				<h2 className="text-xl font-semibold mb-4">
// 					Recent Files
// 				</h2>
//
// 				<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
//
// 					{files.slice(0, 3).map(file => (
//
// 						<Card
// 							key={file.id}
// 							className="bg-zinc-900 border-zinc-800 hover:border-blue-500 transition cursor-pointer"
// 						>
//
// 							<CardContent className="p-6">
//
// 								<div className="flex items-start justify-between">
//
// 									<div className="w-11 h-11 rounded-xl bg-zinc-800 flex items-center justify-center">
// 										{icon(file.type)}
// 									</div>
//
// 									<Button
// 										variant="ghost"
// 										size="icon"
// 										className="text-zinc-500 hover:text-white"
// 									>
// 										<MoreHorizontal className="w-5 h-5" />
// 									</Button>
//
// 								</div>
//
// 								<h3 className="text-white font-semibold mt-5 truncate">
// 									{file.name}
// 								</h3>
//
// 								<p className="text-zinc-500 text-sm mt-2">
// 									{file.size} • {file.updated}
// 								</p>
//
// 								<div className="flex items-center gap-2 mt-5">
//
// 									<div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-xs font-semibold">
// 										{file.owner.charAt(0)}
// 									</div>
//
// 									<span className="text-sm text-zinc-400">
// 										{file.owner}
// 									</span>
//
// 								</div>
//
// 							</CardContent>
//
// 						</Card>
//
// 					))}
//
// 				</div>
//
// 			</div>
//
// 			{/* All Files */}
//
// 			<div>
//
// 				<h2 className="text-xl font-semibold mb-4">
// 					All Files
// 				</h2>
//
// 				<Card className="bg-zinc-900 border-zinc-800">
//
// 					<CardContent className="p-0">
//
// 						<div className="hidden md:grid grid-cols-[1.8fr_0.7fr_0.8fr_0.8fr_48px] gap-4 px-6 py-4 border-b border-zinc-800 text-xs uppercase tracking-wider text-zinc-500">
// 							<span>Name</span>
// 							<span>Size</span>
// 							<span>Updated</span>
// 							<span>Owner</span>
// 							<span />
// 						</div>
//
// 						{files.map(file => (
//
// 							<div
// 								key={file.id}
// 								className="
// 									grid
// 									md:grid-cols-[1.8fr_0.7fr_0.8fr_0.8fr_48px]
// 									gap-4
// 									items-center
// 									px-6
// 									py-5
// 									border-b
// 									border-zinc-800
// 									last:border-b-0
// 									hover:bg-zinc-800/40
// 									transition
// 									cursor-pointer
// 								"
// 							>
//
// 								<div className="flex items-center gap-4 min-w-0">
//
// 									<div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
// 										{icon(file.type)}
// 									</div>
//
// 									<div className="min-w-0">
//
// 										<p className="text-white font-medium truncate">
// 											{file.name}
// 										</p>
//
// 										<p className="text-xs text-zinc-500 mt-1 md:hidden">
// 											{file.size} • {file.updated}
// 										</p>
//
// 									</div>
//
// 								</div>
//
// 								<span className="hidden md:block text-sm text-zinc-400">
// 									{file.size}
// 								</span>
//
// 								<span className="hidden md:block text-sm text-zinc-500">
// 									{file.updated}
// 								</span>
//
// 								<div className="hidden md:flex items-center gap-2">
//
// 									<div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-xs font-semibold">
// 										{file.owner.charAt(0)}
// 									</div>
//
// 									<span className="text-sm text-zinc-400">
// 										{file.owner}
// 									</span>
//
// 								</div>
//
// 								<Button
// 									variant="ghost"
// 									size="icon"
// 									className="text-zinc-500 hover:text-white"
// 								>
// 									<MoreHorizontal className="w-5 h-5" />
// 								</Button>
//
// 							</div>
//
// 						))}
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
