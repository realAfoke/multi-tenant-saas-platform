import { Search, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Discussion() {
	return (
		<div className="h-full flex flex-col text-white">

			<div className="mb-8">

				<h1 className="text-3xl font-bold">
					Discussion
				</h1>

				<p className="text-zinc-400 mt-2">
					Keep project conversations in one place.
				</p>

			</div>

			<div className="flex-1 flex flex-col min-h-0 max-w-5xl">

				<div className="flex items-center gap-3 h-11 rounded-xl bg-zinc-900 border border-zinc-800 px-4 mb-6">

					<Search className="w-4 h-4 text-zinc-500" />

					<input
						placeholder="Search conversation..."
						className="flex-1 bg-transparent outline-none text-white placeholder:text-zinc-500"
					/>

				</div>

				<div className="flex-1 overflow-y-auto space-y-6 pr-2">

					<div>

						<p className="text-xs uppercase tracking-wider text-zinc-600 mb-4">
							Today
						</p>

						<div className="space-y-6">

							<div className="flex gap-3">

								<div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-sm font-semibold shrink-0">
									S
								</div>

								<div>

									<div className="flex items-center gap-2">
										<p className="text-sm font-medium">
											Sarah
										</p>

										<span className="text-xs text-zinc-600">
											10:24 AM
										</span>
									</div>

									<p className="text-zinc-400 mt-2 leading-relaxed">
										Has everyone reviewed the new landing page?
									</p>

								</div>

							</div>

							<div className="flex gap-3">

								<div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-sm font-semibold shrink-0">
									D
								</div>

								<div>

									<div className="flex items-center gap-2">
										<p className="text-sm font-medium">
											Daniel
										</p>

										<span className="text-xs text-zinc-600">
											10:31 AM
										</span>
									</div>

									<p className="text-zinc-400 mt-2 leading-relaxed">
										Yes. I made a few changes to the hero section and
										pushed the latest version.
									</p>

								</div>

							</div>

							<div className="flex gap-3">

								<div className="w-9 h-9 rounded-full bg-yellow-500 flex items-center justify-center text-sm font-semibold shrink-0">
									M
								</div>

								<div>

									<div className="flex items-center gap-2">
										<p className="text-sm font-medium">
											Michael
										</p>

										<span className="text-xs text-zinc-600">
											11:02 AM
										</span>
									</div>

									<p className="text-zinc-400 mt-2 leading-relaxed">
										I uploaded the latest design files as well.
									</p>

								</div>

							</div>

						</div>

					</div>

					<div className="pt-4">

						<p className="text-xs uppercase tracking-wider text-zinc-600 mb-4">
							Yesterday
						</p>

						<div className="flex gap-3">

							<div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center text-sm font-semibold shrink-0">
								E
							</div>

							<div>

								<div className="flex items-center gap-2">
									<p className="text-sm font-medium">
										Emma
									</p>

									<span className="text-xs text-zinc-600">
										4:18 PM
									</span>
								</div>

								<p className="text-zinc-400 mt-2 leading-relaxed">
									The new pricing section is ready for review.
								</p>

							</div>

						</div>

					</div>

				</div>

				<div className="pt-5">

					<div className="flex items-end gap-3 rounded-xl bg-zinc-900 border border-zinc-800 p-3">

						<textarea
							rows={2}
							placeholder="Write a message..."
							className="flex-1 resize-none bg-transparent outline-none text-white placeholder:text-zinc-500 px-2 py-2"
						/>

						<Button className="w-11 h-11 rounded-xl bg-blue-500 hover:bg-blue-600 shrink-0">
							<Send className="w-4 h-4" />
						</Button>

					</div>

				</div>

			</div>

		</div>
	)
}
