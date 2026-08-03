
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
