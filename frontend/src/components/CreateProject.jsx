import { ArrowLeft, ImagePlus, Users, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function CreateProject() {
	return (
		<div className="max-w-4xl mx-auto space-y-8 text-white">

			<div>
				<button className="flex items-center gap-2 text-zinc-500 hover:text-white transition mb-5">
					<ArrowLeft className="w-4 h-4" />
					Back
				</button>

				<h1 className="text-3xl font-bold">
					Create Project
				</h1>

				<p className="text-zinc-400 mt-2">
					Create a new project inside your workspace.
				</p>
			</div>

			<Card className="bg-zinc-900 border-zinc-800">
				<CardContent className="p-7 space-y-7">

					<div>
						<label className="text-sm font-medium text-zinc-300">
							Project Name
						</label>

						<Input
							placeholder="e.g. Landing Page Redesign"
							className="mt-2 h-12 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600"
						/>
					</div>

					<div>
						<label className="text-sm font-medium text-zinc-300">
							Description
						</label>

						<textarea
							rows={4}
							placeholder="What is this project about?"
							className="mt-2 w-full rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-600 outline-none p-4 resize-none focus:border-blue-500"
						/>
					</div>

					<div>
						<label className="text-sm font-medium text-zinc-300">
							Project Cover
						</label>

						<div className="mt-2 border border-dashed border-zinc-700 rounded-xl p-8 flex flex-col items-center justify-center hover:border-blue-500 transition cursor-pointer">

							<div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center">
								<ImagePlus className="w-5 h-5 text-zinc-400" />
							</div>

							<p className="text-sm text-white mt-4">
								Add a project image
							</p>

							<p className="text-xs text-zinc-500 mt-1">
								Optional
							</p>

						</div>
					</div>

					<div className="grid md:grid-cols-2 gap-5">

						<div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

							<div className="flex items-center gap-3">
								<div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
									<Users className="w-5 h-5 text-zinc-400" />
								</div>

								<div>
									<p className="text-sm text-white">
										Members
									</p>

									<p className="text-xs text-zinc-500 mt-1">
										Add people to this project
									</p>
								</div>
							</div>

						</div>

						<div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

							<div className="flex items-center gap-3">
								<div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
									<CalendarDays className="w-5 h-5 text-zinc-400" />
								</div>

								<div>
									<p className="text-sm text-white">
										Deadline
									</p>

									<p className="text-xs text-zinc-500 mt-1">
										Set a project deadline
									</p>
								</div>
							</div>

						</div>

					</div>

					<div className="flex justify-end gap-3 pt-3">

						<Button
							variant="outline"
							className="rounded-xl border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
						>
							Cancel
						</Button>

						<Button className="rounded-xl bg-blue-500 hover:bg-blue-600 px-6">
							Create Project
						</Button>

					</div>

				</CardContent>
			</Card>

		</div>
	)
}
