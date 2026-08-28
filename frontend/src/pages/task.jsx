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
	Smile,
} from "lucide-react"
import { ItemGroup } from "@/components/ui/item"
import { Input } from "@/components/ui/input"
import { useAppState } from "@/hooks/apptools"
import { commentQueryOption, selectedTaskQueryOption } from "@/queryOptions/queryOptions"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Comments from "@/components/Comments"
import { addCommentMutationOption } from "@/mutationOptions/mutationOption"

export default function Task() {
	const { selectedWorkspace, selectedChannel, selectedTask } = useAppState()
	const { data: task } = useQuery(selectedTaskQueryOption(selectedWorkspace?.id, selectedChannel?.id, selectedTask?.id))
	const checkList = task?.checkList ?? []
	const assigner = task?.createdBy?.user ?? {}

	const initials = `${assigner?.firstName?.[0] ?? ""}${assigner?.lastName?.[0] ?? ""}`.toUpperCase()
	const [showDetails, setShowDetails] = useState(false)
	const [content, setContent] = useState('')
	const { data: comments } = useQuery(commentQueryOption(selectedTask?.id))
	const queryClient = useQueryClient()

	const addComment = useMutation(addCommentMutationOption(queryClient))

	return (
		<div className="flex h-screen overflow-hidden gap-2">
			<div className={`${showDetails ? 'hidden md:flex' : 'flex'} h-screen overflow-hidden bg-zinc-950  flex-1 text-white flex-col pt-2 md:pt-18`}>
				<div className="px-3 md:px-6 flex-1 overflow-auto space-y-7 pt-3 md:pt-[2rem] pb-[2rem] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-zinc-900 ">

					<div className="overflow-auto mx-auto max-w-4xl">

						<div className="px-4 md:px-8 lg:px-12 border-b border-zinc-800">

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


						<div className="px-4 md:px-8 lg:px-12 pt-5">

							<div className="max-w-5xl h-full flex flex-col">

								<div className="flex-1 overflow-auto scrollbar scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-950">

									<ItemGroup className="space-y-1">

										{comments?.map(comment => (
											<Comments
												key={comment?.id}
												comment={comment}
											/>
										))}

									</ItemGroup>

								</div>


							</div>

						</div>
					</div>

				</div>
				<div className="md:px-6 md:pb-5 pt-5">

					<div className="max-w-4xl mx-auto">

						<div className="rounded-xl border border-zinc-800 bg-zinc-900 p-2">

							<div className="flex items-end gap-2">

								<Button
									variant="ghost"
									size="icon"
									className="text-zinc-500 hover:text-white flex-shrink-0"
								>
									<Paperclip className="w-5 h-5" />
								</Button>


								<textarea
									value={content}
									onChange={e => setContent(e.target.value)}

									onKeyDown={(e) => {

										if (
											e.key === "Enter" &&
											!e.shiftKey
										) {
											e.preventDefault()
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
										}

									}}
									rows={1}
									placeholder='comment'
									className="
										flex-1
										bg-transparent
										resize-none
										outline-none
										text-sm
										text-white
										placeholder:text-zinc-600
										py-2
										max-h-32
									"
								/>


								<Button
									variant="ghost"
									size="icon"
									className="text-zinc-500 hover:text-white flex-shrink-0"
								>
									<Smile className="w-5 h-5" />
								</Button>


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

									size="icon"

									className="flex-shrink-0 bg-blue-500 hover:bg-blue-600"
								>
									<Send className="w-4 h-4" />
								</Button>


							</div>

						</div>

					</div>

				</div>
			</div>

			{showDetails && (

				<aside className="block w-full md:w-80 border-l border-zinc-800 bg-zinc-900/50 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-900">

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
									channel
								</p>

								<p className="mt-2 text-sm text-white">
									{selectedChannel?.name}
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
// //<div className="mb-5">
//
// 							<h2 className="text-xl font-semibold">
// 								Discussion
// 							</h2>
//
// 							<p className="text-sm text-zinc-500 mt-1">
// 								{comments?.length ?? 0} comments
// 							</p>
//
// 						</div>
//
//

