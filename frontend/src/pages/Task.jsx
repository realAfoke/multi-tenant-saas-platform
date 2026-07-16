import { useAppStore } from "@/store/authStore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import sendBtn from "@/assets/send-button.svg"
import { instance } from "@/api/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { commentNormaliser } from "@/utils/dashboard"
import Comments from "@/components/Comments"
import { ItemGroup } from "@/components/ui/item"

export default function Task() {
	const { id } = useParams()
	const getTask = useAppStore(state => state.getTask)
	let task = getTask(id)
	const [content, setContent] = useState('')
	const queryClient = useQueryClient()

	const { data } = useQuery({
		queryKey: [Number(id)],
		queryFn: () => getTaskComments(Number(id))
	})
	const mutate = useMutation({
		mutationFn: ({ id, data }) => addComment(id, data),
		onSuccess: (newComment, { id }) => {
			queryClient.setQueryData([Number(id)], (oldComments) => ([newComment, ...(oldComments ?? [])]))
		}
	})
	// console.log(data)
	return (
		<div className="text-white p-3 md:px-30  h-full overflow-hidden flex flex-col">
			<div>
				<h3 className="text-md font-semibold">{task?.title}</h3>
				<div className="">{task?.description}</div>
			</div>
			<div className="rounded-sm flex-1 scrollbar scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-900">

				<div>
					<h3>Comments</h3>
					<div>
						<div>comment count:0</div>
					</div>
				</div>
				<div className="flex items-center gap-2 my-5">
					<Input value={content} onChange={(e) => setContent(e.target.value)} className="bg-[#212121] p-6 rounded-[5px] outline-0 border-0" placeholder="Enter your comment..." />
					<Button onClick={() => {
						mutate.mutate({ id, data: { content: content, workspace: task?.workspace, project: task?.project, task: task?.id } })
						setContent('')
					}} className=" p-5 bg-blue-400 max-w-50 self-end rounded-sm my-2">
						<img src={sendBtn} className="w-8 h-8" />
					</Button>
				</div>
				<ItemGroup className="p-2 rounded-sm pb-[19rem] gap-1.5  bg-[#212121]  h-screen overflow-auto scrollbar scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-900">
					{
						data?.map((comment) => (
							<Comments key={comment?.id} comment={comment} />
						))
					}
				</ItemGroup>

			</div>
		</div>
	)

}

const getTaskComments = async (taskId) => {
	try {
		const comments = await instance.get(`workspaces/${taskId}/comments/`)
		return comments.data
	} catch (err) {
		console.error(err)
	}
}

const addComment = async (id, data) => {
	try {
		const comment = await instance.post(`workspaces/${id}/comments/`, { ...data })
		return comment.data
	} catch (error) {
		console.error(error)
	}
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

