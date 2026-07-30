import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
	PanelRightClose,
	PanelRightOpen,
	CalendarDays,
	CheckCircle2,
	Circle,
	Paperclip,
} from "lucide-react"
import { ItemGroup, Item, ItemContent, ItemDescription } from "@/components/ui/item"
import { Input } from "@/components/ui/input"

export default function Task() {
	// keep all your existing logic above this point
	const task = { title: 'testing', description: 'descritpion' }
	const comments = []
	const [showDetails, setShowDetails] = useState(true)
	const [content, setContent] = useState('')

	return (
		<div className="h-screen overflow-hidden bg-zinc-950 text-white flex">

			{/* Main */}

			<div className="flex-1 min-w-0 flex flex-col">

				{/* Header */}

				<div className="px-4 md:px-8 lg:px-12 pt-7 pb-6 border-b border-zinc-800">

					<div className="flex items-center justify-between gap-4">

						<div className="min-w-0">

							<div className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
								<span>Board</span>
								<span>/</span>
								<span className="text-zinc-300">Task</span>
							</div>

							<h1 className="text-2xl md:text-3xl font-bold truncate">
								{task?.title}
							</h1>

							<p className="text-zinc-400 mt-3 max-w-3xl leading-relaxed">
								{task?.description}
							</p>

						</div>

						<Button
							variant="ghost"
							className="shrink-0 text-zinc-400 hover:text-white"
							onClick={() => setShowDetails(prev => !prev)}
						>
							{showDetails ? (
								<PanelRightClose className="w-5 h-5" />
							) : (
								<PanelRightOpen className="w-5 h-5" />
							)}
						</Button>

					</div>

				</div>

				{/* Discussion */}

				<div className="flex-1 overflow-hidden px-4 md:px-8 lg:px-12 py-6">

					<div className="max-w-5xl h-full flex flex-col">

						<div className="mb-5">

							<h2 className="text-xl font-semibold">
								Discussion
							</h2>

							<p className="text-sm text-zinc-500 mt-1">
								{comments?.length ?? 0} comments
							</p>

						</div>

						<div className="flex-1 overflow-auto scrollbar scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-950">

							<ItemGroup className="space-y-3 pb-6">

								{comments?.map(comment => (
									<Comments
										key={comment?.id}
										comment={comment}
									/>
								))}

							</ItemGroup>

						</div>

						<div className="pt-5">

							<div className="flex items-end gap-3">

								<Input
									value={content}
									onChange={e => setContent(e.target.value)}
									className="
										bg-zinc-900
										border-zinc-800
										text-white
										placeholder:text-zinc-500
										min-h-14
										rounded-xl
									"
									placeholder="Write a comment..."
								/>

								<Button
									disabled={!content.trim()}
									onClick={() => {
										if (!content.trim()) return

										addComment.mutate({
											id: task?.id,
											data: {
												content,
												workspace: task?.workspace,
												project: task?.project,
												task: task?.id
											}
										})

										setContent('')
									}}
									className="h-14 w-14 shrink-0 rounded-xl bg-blue-500 hover:bg-blue-600"
								>
								</Button>

							</div>

						</div>

					</div>

				</div>

			</div>

			{/* Details Sidebar */}

			{showDetails && (

				<aside className="hidden md:block w-80 shrink-0 border-l border-zinc-800 bg-zinc-900/50 overflow-y-auto">

					<div className="p-6">

						<div className="flex items-center justify-between mb-8">

							<h2 className="text-lg font-semibold">
								Task Details
							</h2>

							<Button
								variant="ghost"
								size="icon"
								className="text-zinc-500 hover:text-white"
								onClick={() => setShowDetails(false)}
							>
								<PanelRightClose className="w-5 h-5" />
							</Button>

						</div>

						<div className="space-y-7">

							<div>
								<p className="text-xs uppercase tracking-wider text-zinc-500">
									Status
								</p>

								<p className="mt-2 text-sm text-white">
									In Progress
								</p>
							</div>

							<div>
								<p className="text-xs uppercase tracking-wider text-zinc-500">
									Priority
								</p>

								<p className="mt-2 text-sm text-red-400">
									High
								</p>
							</div>

							<div>
								<p className="text-xs uppercase tracking-wider text-zinc-500">
									Assignee
								</p>

								<div className="flex items-center gap-3 mt-2">

									<div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-sm font-semibold">
										D
									</div>

									<span className="text-sm">
										Daniel
									</span>

								</div>
							</div>

							<div>
								<p className="text-xs uppercase tracking-wider text-zinc-500">
									Due Date
								</p>

								<div className="flex items-center gap-2 mt-2">

									<CalendarDays className="w-4 h-4 text-zinc-500" />

									<span className="text-sm">
										Tomorrow
									</span>

								</div>
							</div>

							<div>
								<p className="text-xs uppercase tracking-wider text-zinc-500">
									Project
								</p>

								<p className="mt-2 text-sm text-white">
									Landing Page Redesign
								</p>
							</div>

							<div className="border-t border-zinc-800 pt-6">

								<div className="flex items-center justify-between">

									<p className="text-xs uppercase tracking-wider text-zinc-500">
										Checklist
									</p>

									<span className="text-xs text-zinc-500">
										2 / 4
									</span>

								</div>

								<div className="space-y-3 mt-4">

									<div className="flex items-center gap-2">
										<CheckCircle2 className="w-4 h-4 text-blue-400" />
										<span className="text-sm text-zinc-400 line-through">
											JWT Login
										</span>
									</div>

									<div className="flex items-center gap-2">
										<CheckCircle2 className="w-4 h-4 text-blue-400" />
										<span className="text-sm text-zinc-400 line-through">
											Session Handling
										</span>
									</div>

									<div className="flex items-center gap-2">
										<Circle className="w-4 h-4 text-zinc-600" />
										<span className="text-sm text-white">
											Refresh Token
										</span>
									</div>

									<div className="flex items-center gap-2">
										<Circle className="w-4 h-4 text-zinc-600" />
										<span className="text-sm text-white">
											Password Reset
										</span>
									</div>

								</div>

							</div>

							<div className="border-t border-zinc-800 pt-6">

								<div className="flex items-center justify-between">

									<p className="text-xs uppercase tracking-wider text-zinc-500">
										Attachments
									</p>

									<Paperclip className="w-4 h-4 text-zinc-500" />

								</div>

								<div className="space-y-3 mt-4">

									<div className="rounded-lg border border-zinc-800 p-3 hover:border-zinc-700 transition">
										<p className="text-sm text-white">
											api-spec.pdf
										</p>

										<p className="text-xs text-zinc-500 mt-1">
											1.2 MB
										</p>
									</div>

									<div className="rounded-lg border border-zinc-800 p-3 hover:border-zinc-700 transition">
										<p className="text-sm text-white">
											auth-flow.png
										</p>

										<p className="text-xs text-zinc-500 mt-1">
											840 KB
										</p>
									</div>

								</div>

							</div>

						</div>

					</div>

				</aside>

			)}

		</div>
	)
}

// import { useEffect, useState } from "react"
// import { useOutletContext, useParams, useNavigate } from "react-router-dom"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import sendBtn from "@/assets/send-button.svg"
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
// // import { commentNormaliser } from "@/utils/dashboard"
// import Comments from "@/components/Comments"
// import { ItemGroup } from "@/components/ui/item"
// import { commentQueryOption, taskQueryOption } from "@/queryOptions/queryOptions"
// import { addCommentMutationOption } from "@/mutationOptions/mutationOption"
// import { useAppState } from "@/hooks/apptools"
//
// export default function Task() {
// 	// const navigate = useNavigate()
// 	const { id } = useParams()
// 	const [content, setContent] = useState('')
// 	const queryClient = useQueryClient()
// 	const { selectedWorkspace, selectedProject } = useAppState()
//
// 	const { data: projectTasks } = useQuery(taskQueryOption(selectedWorkspace?.id, selectedProject?.id))
// 	const { tasks } = projectTasks ?? {}
// 	const task = tasks?.[id]
// 	const { data: comments } = useQuery(commentQueryOption(task?.id))
//
// 	const addComment = useMutation(addCommentMutationOption(queryClient))
// 	// useEffect(() => {
//
//
// 	// 	if (selectedTask?.id) {
// 	// 		navigate(`/dashboard/${selectedWorkspace?.name}/${selectedProject?.name}/task/${selectedTask?.id}`)
// 	// 	}
// 	// }, [selectedTask?.id, selectedWorkspace?.id, selectedProject?.id])
// 	//
// 	return (
// 		<div className="h-screen overflow-hidden text-white flex flex-col">
//
// 			{/* Header */}
//
// 			<div className="px-4 md:px-10 lg:px-20 pt-8 pb-6 border-b border-zinc-800">
//
// 				<div className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
// 					<span className="hover:text-white cursor-pointer">
// 						Board
// 					</span>
//
// 					<span>/</span>
//
// 					<span className="text-zinc-300">
// 						Task
// 					</span>
// 				</div>
//
// 				<h1 className="text-2xl md:text-3xl font-bold text-white">
// 					{task?.title}
// 				</h1>
//
// 				<p className="text-zinc-400 mt-3 max-w-3xl leading-relaxed">
// 					{task?.description}
// 				</p>
//
// 			</div>
//
// 			{/* Task information */}
//
// 			<div className="px-4 md:px-10 lg:px-20 py-5 border-b border-zinc-800">
//
// 				<div className="flex flex-wrap items-center gap-x-8 gap-y-4">
//
// 					<div>
// 						<p className="text-xs uppercase tracking-wide text-zinc-500">
// 							Status
// 						</p>
//
// 						<p className="text-sm text-white mt-1">
// 							In Progress
// 						</p>
// 					</div>
//
// 					<div>
// 						<p className="text-xs uppercase tracking-wide text-zinc-500">
// 							Priority
// 						</p>
//
// 						<p className="text-sm text-red-400 mt-1">
// 							High
// 						</p>
// 					</div>
//
// 					<div>
// 						<p className="text-xs uppercase tracking-wide text-zinc-500">
// 							Assignee
// 						</p>
//
// 						<div className="flex items-center gap-2 mt-1">
//
// 							<div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-xs font-semibold">
// 								D
// 							</div>
//
// 							<span className="text-sm text-white">
// 								Daniel
// 							</span>
//
// 						</div>
// 					</div>
//
// 					<div>
// 						<p className="text-xs uppercase tracking-wide text-zinc-500">
// 							Due Date
// 						</p>
//
// 						<p className="text-sm text-white mt-1">
// 							Tomorrow
// 						</p>
// 					</div>
//
// 				</div>
//
// 			</div>
//
// 			{/* Discussion */}
//
// 			<div className="flex-1 overflow-hidden px-4 md:px-10 lg:px-20 py-6">
//
// 				<div className="max-w-5xl h-full flex flex-col">
//
// 					<div className="flex items-center justify-between mb-5">
//
// 						<div>
//
// 							<h2 className="text-xl font-semibold text-white">
// 								Discussion
// 							</h2>
//
// 							<p className="text-sm text-zinc-500 mt-1">
// 								{comments?.length ?? 0} comments
// 							</p>
//
// 						</div>
//
// 					</div>
//
// 					{/* Comments */}
//
// 					<div className="flex-1 overflow-auto scrollbar scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-950">
//
// 						<ItemGroup className="space-y-3 pb-6">
//
// 							{
// 								comments?.map((comment) => (
// 									<Comments
// 										key={comment?.id}
// 										comment={comment}
// 									/>
// 								))
// 							}
//
// 						</ItemGroup>
//
// 					</div>
//
// 					{/* Composer */}
//
// 					<div className="pt-5">
//
// 						<div className="flex items-end gap-3">
//
// 							<Input
// 								value={content}
// 								onChange={(e) => setContent(e.target.value)}
// 								className="
// 								bg-zinc-900
// 								border-zinc-800
// 								text-white
// 								placeholder:text-zinc-500
// 								min-h-14
// 								rounded-xl
// 								focus-visible:ring-1
// 								focus-visible:ring-blue-500
// 							"
// 								placeholder="Write a comment..."
// 							/>
//
// 							<Button
// 								disabled={!content.trim()}
// 								onClick={() => {
// 									if (!content.trim()) return
//
// 									addComment.mutate({
// 										id: task?.id,
// 										data: {
// 											content,
// 											workspace: task?.workspace,
// 											project: task?.project,
// 											task: task?.id
// 										}
// 									})
//
// 									setContent('')
// 								}}
// 								className="
// 								h-14
// 								w-14
// 								shrink-0
// 								rounded-xl
// 								bg-blue-500
// 								hover:bg-blue-600
// 							"
// 							>
// 								<img
// 									src={sendBtn}
// 									className="w-6 h-6"
// 								/>
// 							</Button>
//
// 						</div>
//
// 					</div>
//
// 				</div>
//
// 			</div>
//
// 		</div>
// 	)
// }

// return (
// 	<div className="text-white p-3 md:px-30  h-screen overflow-hidden flex flex-col py-15">
// 		<div>
// 			<h3 className="text-md font-semibold">{task?.title}</h3>
// 			<div className="">{task?.description}</div>
// 		</div>
// 		<div className="rounded-sm h-screen overflow-hidden flex-1 scrollbar scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-900">
//
// 			<div>
// 				<h3>Comments</h3>
// 				<div>
// 					<div>comment count:0</div>
// 				</div>
// 			</div>
// 			<div className="flex items-center gap-2 my-5">
// 				<Input value={content} onChange={(e) => setContent(e.target.value)} className="bg-[#212121] p-6 rounded-[5px] outline-0 border-0" placeholder="Enter your comment..." />
// 				<Button disabled={!content.trim()} onClick={() => {
// 					if (!content.trim()) return
// 					addComment.mutate({ id: task?.id, data: { content: content, workspace: task?.workspace, project: task?.project, task: task?.id } })
// 					setContent('')
// 				}} className=" p-5 bg-blue-400 max-w-50 self-end rounded-sm my-2">
// 					<img src={sendBtn} className="w-8 h-8" />
// 				</Button>
// 			</div>
// 			<ItemGroup className="p-2 rounded-sm pb-[15rem] gap-1.5  bg-[#212121]  h-screen overflow-auto scrollbar scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-900">
// 				{
// 					comments?.map((comment) => (
// 						<Comments key={comment?.id} comment={comment} />
// 					))
// 				}
// 			</ItemGroup>
//
// 		</div>
// 	</div>
// )


// export async function loader(params) {
// 	try {
// 		console.log('param:', params)
// 		const { id } = params.params
// 		const comments = await instance.get(`${Number(id)}/comments`)
// 		return comments.data
// 	}
// 	catch (error) {
//
// 	}
//
// }
//
//
// <ItemGroup className="gap-1.5 h-160 overflow-auto scrollbar scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-900">

// 					</ItemGroup>

