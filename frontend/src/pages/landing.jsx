import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import menuIcon from "@/assets/menu3.svg"
import { Button } from "@/components/ui/button"
import { Item, ItemGroup, ItemTitle } from "@/components/ui/item"
import Footer from "@/components/Footer"
import createProjectIcon from "@/assets/new-project.svg"
import askToJoin from "@/assets/ask-to-join.svg"
import commentCollaboration from "@/assets/comment-collaboration.svg"
import roleBase from "@/assets/role-base.svg"
import dashboardImg from "@/assets/dashboard.png"
import collab from "@/assets/collab.jpg"
import SideBar from "@/components/landingPage/SideBar"




export default function LandingPage() {
	return (
		<div className="bg-black">
			<SideBar />
			<div className="flex gap-5 flex-col lg:flex-row items-center justify-between px-6 lg:px-20 pt-32 pb-24 min-h-[90vh]">
				<div className="max-w-2xl">

					<span className="inline-block bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
						🚀 Built for startups, remote teams & businesses
					</span>

					<h1 className="text-5xl lg:text-7xl font-black text-white leading-tight mt-6">
						One workspace for your entire team.
					</h1>

					<p className="text-gray-400 text-lg leading-8 mt-8 max-w-xl">
						OrbitSpace brings projects, tasks, documents, files and team
						communication together in one modern workspace—so your team spends
						less time switching apps and more time getting work done.
					</p>

					<div className="flex flex-wrap gap-4 mt-10">
						<Button className="bg-blue-500 hover:bg-blue-600 rounded-full px-8 h-12">
							Get Started Free
						</Button>

						<Button
							variant="outline"
							className="border-zinc-700 text-white rounded-full h-12 px-8"
						>
							Watch Demo
						</Button>
					</div>

					<div className="flex gap-10 mt-12">

						<div>
							<h3 className="text-3xl font-bold text-white">Real-Time</h3>
							<p className="text-gray-500 text-sm">
								Team Collaboration
							</p>
						</div>

						<div>
							<h3 className="text-3xl font-bold text-white">Cloud</h3>
							<p className="text-gray-500 text-sm">
								Secure File Storage
							</p>
						</div>

						<div>
							<h3 className="text-3xl font-bold text-white">Roles</h3>
							<p className="text-gray-500 text-sm">
								Permission Control
							</p>
						</div>

					</div>

				</div>

				<div className="mt-20 lg:mt-0 max-w-2xl">
					<img
						src={dashboardImg}
						className="object-fit-contain rounded-2xl shadow-2xl border border-zinc-800"
					/>
				</div>

			</div>
			<section className="bg-zinc-950 py-28 px-6 lg:px-20">

				<div className="max-w-6xl mx-auto">

					<div className="text-center mb-20">

						<span className="text-blue-400 uppercase tracking-widest text-sm">
							Everything you need
						</span>

						<h2 className="text-4xl lg:text-5xl font-bold text-white mt-4">
							Work smarter with one powerful workspace.
						</h2>

						<p className="text-gray-400 mt-6 max-w-2xl mx-auto leading-8">
							Stop jumping between multiple apps. OrbitSpace combines
							collaboration, project management and file sharing into one
							simple platform.
						</p>

					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

						<Card className="group bg-black border-zinc-800 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300">
							<CardContent className="p-8">

								<img
									src={createProjectIcon}
									className="w-14 mb-6 transition-transform duration-300 group-hover:scale-110"
								/>

								<CardTitle className="text-white mb-3">
									Create Projects
								</CardTitle>

								<CardDescription className="text-gray-400 leading-7">
									Organize work into projects with deadlines,
									milestones and progress tracking.
								</CardDescription>

							</CardContent>

						</Card>


						<Card className="group bg-black border-zinc-800 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300">
							<CardContent className="p-8">

								<img
									src={askToJoin}
									className="w-14 mb-6 transition-transform duration-300 group-hover:scale-110"
								/>

								<CardTitle className="text-white mb-3">
									Invite Your Team
								</CardTitle>

								<CardDescription className="text-gray-400 leading-7">
									Bring everyone together with a single invitation and
									start collaborating instantly.
								</CardDescription>

							</CardContent>

						</Card>


						<Card className="group bg-black border-zinc-800 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300">
							<CardContent className="p-8">

								<img
									src={roleBase}
									className="w-14 mb-6 transition-transform duration-300 group-hover:scale-110"
								/>

								<CardTitle className="text-white mb-3">
									Role Permissions
								</CardTitle>

								<CardDescription className="text-gray-400 leading-7">
									Give every member the right level of access to keep
									your workspace secure.
								</CardDescription>

							</CardContent>

						</Card>


						<Card className="group bg-black border-zinc-800 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300">
							<CardContent className="p-8">

								<img
									src={commentCollaboration}
									className="w-14 mb-6 transition-transform duration-300 group-hover:scale-110"
								/>

								<CardTitle className="text-white mb-3">
									Collaborate Live
								</CardTitle>

								<CardDescription className="text-gray-400 leading-7">
									Comment, discuss ideas and keep everyone aligned
									without endless meetings.
								</CardDescription>

							</CardContent>

						</Card>

					</div>

				</div>

			</section>
			<section className="bg-black py-32 px-6 lg:px-20">

				<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

					<div>

						<span className="text-blue-400 uppercase tracking-widest text-sm">
							Powerful Workspace
						</span>

						<h2 className="text-4xl lg:text-5xl font-bold text-white mt-5 leading-tight">
							Everything your team needs in one beautiful dashboard.
						</h2>

						<p className="text-gray-400 mt-8 leading-8 text-lg">
							Manage projects, assign tasks, organize files, monitor
							progress and collaborate with your entire team without
							switching between different tools.
						</p>

						<div className="space-y-6 mt-10">

							<div className="flex gap-4">
								<div className="w-3 h-3 rounded-full bg-blue-500 mt-2"></div>

								<div>
									<h3 className="text-white font-semibold">
										Project Tracking
									</h3>

									<p className="text-gray-400">
										Know exactly what every team member is working on.
									</p>
								</div>
							</div>

							<div className="flex gap-4">
								<div className="w-3 h-3 rounded-full bg-blue-500 mt-2"></div>

								<div>
									<h3 className="text-white font-semibold">
										Team Collaboration
									</h3>

									<p className="text-gray-400">
										Comment, share updates and communicate in real time.
									</p>
								</div>
							</div>

							<div className="flex gap-4">
								<div className="w-3 h-3 rounded-full bg-blue-500 mt-2"></div>

								<div>
									<h3 className="text-white font-semibold">
										Secure Cloud Storage
									</h3>

									<p className="text-gray-400">
										Keep documents and files organized and always available.
									</p>
								</div>
							</div>

						</div>

						<Button className="mt-12 rounded-full bg-blue-500 hover:bg-blue-600 px-8">
							Explore Features
						</Button>

					</div>

					<div className="relative">

						<div className="absolute -inset-4 bg-blue-500/20 blur-3xl rounded-full"></div>

						<img
							src={dashboardImg}
							className="relative rounded-3xl border border-zinc-800 shadow-2xl hover:scale-[1.02] transition duration-500"
						/>

					</div>

				</div>

			</section>
			<section className="bg-zinc-950 py-32 px-6 lg:px-20">

				<div className="max-w-6xl mx-auto">

					<div className="grid lg:grid-cols-2 gap-16 items-center">

						<div>

							<span className="text-blue-400 uppercase tracking-widest text-sm">
								Why OrbitSpace
							</span>

							<h2 className="text-4xl lg:text-5xl font-bold text-white mt-5">
								Built to remove the chaos from teamwork.
							</h2>

							<p className="text-gray-400 mt-6 leading-8">
								Your team shouldn't waste time searching for files, chasing updates,
								or managing multiple tools. OrbitSpace keeps everything connected.
							</p>

						</div>


						<div className="space-y-6">


							<div className="bg-black border border-zinc-800 rounded-2xl p-6">
								<h3 className="text-white text-xl font-semibold">
									🚀 Move faster
								</h3>

								<p className="text-gray-400 mt-2">
									Create projects, assign tasks and track progress without unnecessary meetings.
								</p>
							</div>


							<div className="bg-black border border-zinc-800 rounded-2xl p-6">
								<h3 className="text-white text-xl font-semibold">
									🤝 Stay connected
								</h3>

								<p className="text-gray-400 mt-2">
									Keep conversations, files and feedback attached to the work itself.
								</p>
							</div>


							<div className="bg-black border border-zinc-800 rounded-2xl p-6">
								<h3 className="text-white text-xl font-semibold">
									🔒 Work securely
								</h3>

								<p className="text-gray-400 mt-2">
									Control access with roles and keep your team's information protected.
								</p>
							</div>


						</div>

					</div>

				</div>

			</section>
			<section className="bg-black py-24 px-6 lg:px-20">

				<div className="max-w-6xl mx-auto text-center">

					<p className="text-gray-500 uppercase tracking-widest text-sm">
						Built for teams of all sizes
					</p>

					<h2 className="text-3xl lg:text-4xl font-bold text-white mt-5">
						One platform. Every kind of team.
					</h2>

					<p className="text-gray-400 mt-5 max-w-2xl mx-auto">
						Whether you're building a startup, managing an agency,
						or coordinating a remote team, OrbitSpace helps everyone
						stay aligned.
					</p>


					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">


						<div className="border border-zinc-800 rounded-2xl p-8 hover:border-blue-500 transition">
							<h3 className="text-white text-xl font-semibold">
								Startups
							</h3>

							<p className="text-gray-500 mt-3 text-sm">
								Move fast and keep everyone aligned.
							</p>
						</div>


						<div className="border border-zinc-800 rounded-2xl p-8 hover:border-blue-500 transition">
							<h3 className="text-white text-xl font-semibold">
								Agencies
							</h3>

							<p className="text-gray-500 mt-3 text-sm">
								Manage clients and projects easily.
							</p>
						</div>


						<div className="border border-zinc-800 rounded-2xl p-8 hover:border-blue-500 transition">
							<h3 className="text-white text-xl font-semibold">
								Remote Teams
							</h3>

							<p className="text-gray-500 mt-3 text-sm">
								Collaborate from anywhere.
							</p>
						</div>


						<div className="border border-zinc-800 rounded-2xl p-8 hover:border-blue-500 transition">
							<h3 className="text-white text-xl font-semibold">
								Businesses
							</h3>

							<p className="text-gray-500 mt-3 text-sm">
								Organize growing teams.
							</p>
						</div>


					</div>

				</div>

			</section>
			<section className="bg-zinc-950 py-32 px-6 lg:px-20">

				<div className="max-w-6xl mx-auto">

					<div className="text-center">

						<span className="text-blue-400 uppercase tracking-widest text-sm">
							Pricing
						</span>

						<h2 className="text-4xl lg:text-5xl font-bold text-white mt-5">
							Simple plans that scale with your team.
						</h2>

						<p className="text-gray-400 mt-6 max-w-2xl mx-auto leading-8">
							Start free and upgrade when your team needs more power.
							No complicated pricing, just the tools you need to get work done.
						</p>

					</div>


					<div className="grid md:grid-cols-3 gap-8 mt-16">


						{/* FREE */}

						<div className="bg-black border border-zinc-800 rounded-2xl p-8">

							<h3 className="text-white text-2xl font-bold">
								Free
							</h3>

							<p className="text-gray-400 mt-3">
								For individuals and small teams getting started.
							</p>


							<div className="mt-8">

								<span className="text-5xl font-black text-white">
									₦0
								</span>

								<span className="text-gray-500">
									/month
								</span>

							</div>


							<Button
								className="w-full mt-8 rounded-full bg-zinc-800 hover:bg-zinc-700"
							>
								Get Started
							</Button>


							<div className="mt-8 space-y-4 text-gray-400">

								<p>✓ Create projects</p>
								<p>✓ Basic collaboration</p>
								<p>✓ Limited storage</p>
								<p>✓ Team workspace</p>

							</div>

						</div>



						{/* PRO */}

						<div className="bg-black border-2 border-blue-500 rounded-2xl p-8 relative">

							<div className="absolute -top-4 left-1/2 -translate-x-1/2">

								<span className="bg-blue-500 text-white px-5 py-2 rounded-full text-sm">
									Most Popular
								</span>

							</div>


							<h3 className="text-white text-2xl font-bold">
								Pro
							</h3>

							<p className="text-gray-400 mt-3">
								For growing teams that need more flexibility.
							</p>


							<div className="mt-8">

								<span className="text-5xl font-black text-white">
									₦15,000
								</span>

								<span className="text-gray-500">
									/month
								</span>

							</div>


							<Button
								className="w-full mt-8 rounded-full bg-blue-500 hover:bg-blue-600"
							>
								Start Pro Trial
							</Button>


							<div className="mt-8 space-y-4 text-gray-400">

								<p>✓ Unlimited projects</p>
								<p>✓ More storage</p>
								<p>✓ Advanced collaboration</p>
								<p>✓ Priority support</p>

							</div>

						</div>



						{/* BUSINESS */}

						<div className="bg-black border border-zinc-800 rounded-2xl p-8">

							<h3 className="text-white text-2xl font-bold">
								Business
							</h3>

							<p className="text-gray-400 mt-3">
								For companies managing larger teams.
							</p>


							<div className="mt-8">

								<span className="text-5xl font-black text-white">
									₦50,000
								</span>

								<span className="text-gray-500">
									/month
								</span>

							</div>


							<Button
								className="w-full mt-8 rounded-full bg-indigo-500 hover:bg-indigo-600"
							>
								Contact Sales
							</Button>


							<div className="mt-8 space-y-4 text-gray-400">

								<p>✓ Unlimited members</p>
								<p>✓ Role permissions</p>
								<p>✓ Advanced security</p>
								<p>✓ Dedicated support</p>

							</div>

						</div>


					</div>

				</div>

			</section>
			<section className="bg-black py-24 px-6 lg:px-20">

				<div className="max-w-4xl mx-auto">

					<div className="text-center">

						<span className="text-blue-400 uppercase tracking-widest text-sm">
							FAQ
						</span>

						<h2 className="text-4xl font-bold text-white mt-5">
							Frequently Asked Questions
						</h2>

						<p className="text-gray-400 mt-5 max-w-2xl mx-auto">
							Everything you need to know about OrbitSpace and our plans.
						</p>

					</div>


					<div className="mt-16 space-y-6">

						<div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

							<h3 className="text-white font-semibold text-lg">
								Can I change my plan later?
							</h3>

							<p className="text-gray-400 mt-3 leading-7">
								Yes. You can upgrade or downgrade your subscription at any time
								from your account settings.
							</p>

						</div>


						<div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

							<h3 className="text-white font-semibold text-lg">
								Is there a free plan?
							</h3>

							<p className="text-gray-400 mt-3 leading-7">
								Absolutely. You can start with our Free plan and upgrade whenever
								your team needs more projects, storage, or collaboration features.
							</p>

						</div>


						<div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

							<h3 className="text-white font-semibold text-lg">
								Can I cancel my subscription?
							</h3>

							<p className="text-gray-400 mt-3 leading-7">
								Yes. There are no long-term contracts. You can cancel your
								subscription whenever you want.
							</p>

						</div>


						<div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

							<h3 className="text-white font-semibold text-lg">
								Is my team's data secure?
							</h3>

							<p className="text-gray-400 mt-3 leading-7">
								Yes. OrbitSpace uses secure cloud infrastructure to protect your
								projects, documents, and team data.
							</p>

						</div>

					</div>

				</div>

			</section>
			<section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 py-32 px-6 lg:px-20">

				<div className="max-w-4xl mx-auto text-center">

					<h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">
						Ready to bring your team together?
					</h2>

					<p className="text-blue-100 text-lg leading-8 mt-6 max-w-2xl mx-auto">
						Create your free OrbitSpace workspace today and give your team
						everything they need to collaborate, manage projects, and get
						work done faster.
					</p>


					<div className="flex flex-wrap justify-center gap-4 mt-10">

						<Button
							className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-10 h-14 font-semibold"
						>
							Start For Free
						</Button>


						<Button
							variant="outline"
							className="border-white text-white hover:bg-white hover:text-blue-600 rounded-full px-10 h-14"
						>
							Contact Sales
						</Button>

					</div>


					<p className="text-blue-200 text-sm mt-8">
						No credit card required • Set up in minutes • Invite your team anytime
					</p>


				</div>

			</section>
			<footer className="bg-black border-t border-zinc-900 px-6 lg:px-20 py-16">

				<div className="max-w-6xl mx-auto">

					<div className="grid md:grid-cols-4 gap-10">


						<div className="md:col-span-2">

							<h2 className="text-white text-2xl font-bold">
								OrbitSpace
							</h2>

							<p className="text-gray-400 mt-5 max-w-sm leading-7">
								A modern workspace that helps teams manage projects,
								collaborate, and get work done from anywhere.
							</p>

						</div>


						<div>

							<h3 className="text-white font-semibold mb-5">
								Product
							</h3>

							<ul className="space-y-3 text-gray-400">

								<li className="hover:text-white cursor-pointer">
									Features
								</li>

								<li className="hover:text-white cursor-pointer">
									Pricing
								</li>

								<li className="hover:text-white cursor-pointer">
									Security
								</li>

								<li className="hover:text-white cursor-pointer">
									Updates
								</li>

							</ul>

						</div>


						<div>

							<h3 className="text-white font-semibold mb-5">
								Company
							</h3>

							<ul className="space-y-3 text-gray-400">

								<li className="hover:text-white cursor-pointer">
									About
								</li>

								<li className="hover:text-white cursor-pointer">
									Contact
								</li>

								<li className="hover:text-white cursor-pointer">
									Blog
								</li>

								<li className="hover:text-white cursor-pointer">
									Careers
								</li>

							</ul>

						</div>


					</div>


					<div className="border-t border-zinc-900 mt-12 pt-8 flex flex-col md:flex-row justify-between gap-4">

						<p className="text-gray-500 text-sm">
							© 2026 OrbitSpace. All rights reserved.
						</p>


						<div className="flex gap-6 text-gray-500 text-sm">

							<span className="hover:text-white cursor-pointer">
								Privacy Policy
							</span>

							<span className="hover:text-white cursor-pointer">
								Terms of Service
							</span>

						</div>

					</div>


				</div>

			</footer>
		</div>
	)
}
// 			<div className="flex justify-between shadow-lg fixed z-99 w-full items-center px-2 py-5 bg-inherit">
// 				<div className="text-white font-bold text-2xl">
// 					OrbitSpace
// 				</div>
// 				<div className="flex gap-2 items-cente">
// 					<Button className="courier uppercase text-xs rounded-3xl p-3 bg-blue-400">started for free</Button>
// 					<img src={menuIcon} className="size-10" />
// 				</div>
// 			</div>



//workflow section
//			<section className="bg-zinc-950 py-32 px-6 lg:px-20">

// 	<div className="max-w-6xl mx-auto">
//
// 		<div className="text-center">
//
// 			<span className="text-blue-400 uppercase tracking-widest text-sm">
// 				Simple workflow
// 			</span>
//
// 			<h2 className="text-4xl lg:text-5xl font-bold text-white mt-5">
// 				Get your team working together in minutes.
// 			</h2>
//
// 			<p className="text-gray-400 mt-6 max-w-2xl mx-auto leading-8">
// 				Create your workspace, invite your team, organize projects,
// 				and start collaborating without complicated setup.
// 			</p>
//
// 		</div>
//
//
// 		<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
//
//
// 			<div className="relative">
//
// 				<div className="bg-black border border-zinc-800 rounded-2xl p-8 h-full hover:border-blue-500 transition group">
//
// 					<div className="text-blue-400 text-5xl font-black mb-6">
// 						01
// 					</div>
//
// 					<img
// 						src={createProjectIcon}
// 						className="w-14 mb-6 group-hover:scale-110 transition-transform"
// 					/>
//
// 					<h3 className="text-white text-xl font-semibold mb-3">
// 						Create Workspace
// 					</h3>
//
// 					<p className="text-gray-400 leading-7">
// 						Set up your workspace and organize your projects
// 						in one central location.
// 					</p>
//
// 				</div>
//
// 			</div>
//
//
//
// 			<div className="bg-black border border-zinc-800 rounded-2xl p-8 hover:border-blue-500 transition group">
//
// 				<div className="text-blue-400 text-5xl font-black mb-6">
// 					02
// 				</div>
//
// 				<img
// 					src={askToJoin}
// 					className="w-14 mb-6 group-hover:scale-110 transition-transform"
// 				/>
//
// 				<h3 className="text-white text-xl font-semibold mb-3">
// 					Invite Your Team
// 				</h3>
//
// 				<p className="text-gray-400 leading-7">
// 					Bring your teammates together and give everyone
// 					access instantly.
// 				</p>
//
// 			</div>
//
//
//
// 			<div className="bg-black border border-zinc-800 rounded-2xl p-8 hover:border-blue-500 transition group">
//
// 				<div className="text-blue-400 text-5xl font-black mb-6">
// 					03
// 				</div>
//
// 				<img
// 					src={roleBase}
// 					className="w-14 mb-6 group-hover:scale-110 transition-transform"
// 				/>
//
// 				<h3 className="text-white text-xl font-semibold mb-3">
// 					Set Permissions
// 				</h3>
//
// 				<p className="text-gray-400 leading-7">
// 					Manage roles and control who can access your
// 					workspace.
// 				</p>
//
// 			</div>
//
//
//
// 			<div className="bg-black border border-zinc-800 rounded-2xl p-8 hover:border-blue-500 transition group">
//
// 				<div className="text-blue-400 text-5xl font-black mb-6">
// 					04
// 				</div>
//
// 				<img
// 					src={commentCollaboration}
// 					className="w-14 mb-6 group-hover:scale-110 transition-transform"
// 				/>
//
// 				<h3 className="text-white text-xl font-semibold mb-3">
// 					Collaborate
// 				</h3>
//
// 				<p className="text-gray-400 leading-7">
// 					Share ideas, comment on tasks and move projects
// 					forward together.
// 				</p>
//
// 			</div>
//
//
// 		</div>
//
// 	</div>
//
// </section>
