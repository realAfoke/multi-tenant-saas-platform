import ContinueWorking from "@/components/board/ContinueWorking"
import BoardHeader from "@/components/board/BoardHeader"
import StatusFilter from "@/components/board/StatusFilter"
import SearchBar from "@/components/board/SeacrhBar"
import TaskList from "@/components/board/TaskList"

export default function Board() {
	return (
		<div className="space-y-8">

			<BoardHeader />

			<ContinueWorking />

			<div className="space-y-6">

				<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

					<StatusFilter />

					<SearchBar />

				</div>

				<TaskList />

			</div>

		</div>
	)
}
