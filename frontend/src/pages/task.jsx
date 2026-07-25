import { useEffect, useState } from "react"
import { useOutletContext, useParams, useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import sendBtn from "@/assets/send-button.svg"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
// import { commentNormaliser } from "@/utils/dashboard"
import Comments from "@/components/Comments"
import { ItemGroup } from "@/components/ui/item"
import { commentQueryOption, taskQueryOption } from "@/queryOptions/queryOptions"
import { addCommentMutationOption } from "@/mutationOptions/mutationOption"
import { useAppState } from "@/hooks/apptools"

export default function Task() {
	// const navigate = useNavigate()
	const { id } = useParams()
	const [content, setContent] = useState('')
	const queryClient = useQueryClient()
	const { selectedWorkspace, selectedProject } = useAppState()

	const { data: projectTasks } = useQuery(taskQueryOption(selectedWorkspace?.id, selectedProject?.id))
	const { tasks } = projectTasks ?? {}
	const task = tasks?.[id]
	const { data: comments } = useQuery(commentQueryOption(task?.id))

	const addComment = useMutation(addCommentMutationOption(queryClient))
	// useEffect(() => {


	// 	if (selectedTask?.id) {
	// 		navigate(`/dashboard/${selectedWorkspace?.name}/${selectedProject?.name}/task/${selectedTask?.id}`)
	// 	}
	// }, [selectedTask?.id, selectedWorkspace?.id, selectedProject?.id])
	//
	return (
		<div className="text-white p-3 md:px-30  h-screen overflow-hidden flex flex-col py-15">
			<div>
				<h3 className="text-md font-semibold">{task?.title}</h3>
				<div className="">{task?.description}</div>
			</div>
			<div className="rounded-sm h-screen overflow-hidden flex-1 scrollbar scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-900">

				<div>
					<h3>Comments</h3>
					<div>
						<div>comment count:0</div>
					</div>
				</div>
				<div className="flex items-center gap-2 my-5">
					<Input value={content} onChange={(e) => setContent(e.target.value)} className="bg-[#212121] p-6 rounded-[5px] outline-0 border-0" placeholder="Enter your comment..." />
					<Button disabled={!content.trim()} onClick={() => {
						if (!content.trim()) return
						addComment.mutate({ id: task?.id, data: { content: content, workspace: task?.workspace, project: task?.project, task: task?.id } })
						setContent('')
					}} className=" p-5 bg-blue-400 max-w-50 self-end rounded-sm my-2">
						<img src={sendBtn} className="w-8 h-8" />
					</Button>
				</div>
				<ItemGroup className="p-2 rounded-sm pb-[15rem] gap-1.5  bg-[#212121]  h-screen overflow-auto scrollbar scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-900">
					{
						comments?.map((comment) => (
							<Comments key={comment?.id} comment={comment} />
						))
					}
				</ItemGroup>

			</div>
		</div>
	)

}



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

