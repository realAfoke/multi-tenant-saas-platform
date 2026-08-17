import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
	PanelRightClose,
	PanelRightOpen,
	CalendarDays,
	CheckCircle2,
	Circle,
	Paperclip,
	Send,
} from "lucide-react"
import { ItemGroup } from "@/components/ui/item"
import { Input } from "@/components/ui/input"
import { useAppState } from "@/hooks/apptools"
import { commentQueryOption, selectedTaskQueryOption } from "@/queryOptions/queryOptions"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Comments from "@/components/Comments"
import { addCommentMutationOption } from "@/mutationOptions/mutationOption"

export default function Task() {
	const { selectedWorkspace, selectedProject, selectedTask } = useAppState()
	// const { data: project } = useQuery(projectQueryOption(selectedWorkspace?.id, selectedProject?.id))
	// const tasks = (project?.tasks) ?? []
	// const task = tasks?.find(tk => tk?.id == selectedTask?.id)
	// console.log(task)
	const { data: task } = useQuery(selectedTaskQueryOption(selectedWorkspace?.id, selectedProject?.id, selectedTask?.id))
	const checkList = task?.checkList ?? []
	const assigner = task?.createdBy?.user ?? {}

	const initials = `${assigner?.firstName?.[0] ?? ""}${assigner?.lastName?.[0] ?? ""}`.toUpperCase()
	const [showDetails, setShowDetails] = useState(true)
	const [content, setContent] = useState('')
	const { data: comments } = useQuery(commentQueryOption(selectedTask?.id))
	const queryClient = useQueryClient()

	const addComment = useMutation(addCommentMutationOption(queryClient))

	return (
		<div className="h-screen overflow-y-auto bg-zinc-950 text-white flex -mt-25">


			<div className="flex-1 min-w-0 flex flex-col mt-30">


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

							<ItemGroup className="space-y-1 pb-6">

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
									className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 min-h-14 p-5 rounded-xl"
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
									<Send className="w-4 h-4" />
								</Button>

							</div>

						</div>

					</div>

				</div>

			</div>


			{showDetails && (

				<aside className="hidden md:block w-80 shrink-0 border-l border-zinc-800 bg-zinc-900/50 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-900">

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

								<p className={`mt-2 text-sm capitalize ${task?.priority === 'high' ? 'text-red-400' : task?.priority === 'normal' ? 'text-green-400' : 'text-blue-400'}`}>
									{task?.priority}
								</p>
							</div>

							<div>
								<p className="text-xs uppercase tracking-wider text-zinc-500">
									Assignee
								</p>

								<div className="flex items-center gap-3 mt-2">

									<div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-sm font-semibold">
										{initials}
									</div>

									<span className="text-sm">
										{assigner?.firstName}
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
									{selectedProject?.name}
								</p>
							</div>

							<div className="border-t border-zinc-800 pt-6">

								<div className="flex items-center justify-between">

									<p className="text-xs uppercase tracking-wider text-zinc-500">
										Checklist
									</p>

									<span className="text-xs text-zinc-500">
										{`${checkList.filter(list => list.status).length}/${checkList.length}`}
									</span>

								</div>

								<div className="space-y-3 mt-4">
									{checkList.map((list) => (
										<div key={list?.id} className="flex items-center gap-2">
											{list?.status ? <CheckCircle2 className="w-4 h-4 text-blue-400" /> :
												<Circle className="w-4 h-4 text-zinc-600" />}
											<span className={`text-sm ${list?.status ? 'line-through text-zinc-400 ' : 'text-white'}`}>
												{list?.title}
											</span>
										</div>

									))}



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



// <div className="flex items-center gap-2">
// 	<CheckCircle2 className="w-4 h-4 text-blue-400" />
// 	<span className="text-sm text-zinc-400 line-through">
// 		Session Handling
// 	</span>
// </div>
//
// <div className="flex items-center gap-2">
// 	<Circle className="w-4 h-4 text-zinc-600" />
// 	<span className="text-sm text-white">
// 		Refresh Token
// 	</span>
// </div>
//
// <div className="flex items-center gap-2">
// 	<Circle className="w-4 h-4 text-zinc-600" />
// 	<span className="text-sm text-white">
// 		Password Reset
// 	</span>
// </div>

