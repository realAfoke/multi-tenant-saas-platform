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

export default function LandingPage() {
	return (
		<div className="bg-[#000] h-screen ">
			<div className="flex justify-between shadow-lg fixed z-99 w-full items-center px-2 py-5 bg-inherit">
				<div className="text-white font-bold text-2xl">
					OrbitSpace
				</div>
				<div className="flex gap-2 items-cente">
					<Button className="courier uppercase text-xs rounded-3xl p-3 bg-blue-400">started for free</Button>
					<img src={menuIcon} className="size-10" />
				</div>
			</div>
			<div className="flex relative pt-[5rem]">
				<div className="flex-2">
					<div className="absolute md:static md:max-w-150 flex flex-col gap-3 px-3 p-5">
						<h2 className="text-2xl font-bold text-white capitalize">free online workspace for modern teams</h2>
						<div className="text-white text-gray-400 leading-[1.5rem] md:mb-3">
							Bring your team together in one powerful workspace. Collaborate on documents, manage projects, assign tasks, schedule meetings, and communicate seamlessly from anywhere. Designed for startups, businesses, and remote teams looking to work smarter and faster.
						</div>
						<Button className="uppercase text-xs rounded-3xl p-3 bg-blue-400 max-w-[150px]">get started</Button>
					</div>
				</div>
				<div className=" bg-gradient-to-r from-blue-800 via-indigo-900 via-50% to-black flex-1 min-h-80 ">
				</div>
			</div>
			<div className="bg-gray-200 my-[5rem] grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 p-3 py-[5rem]">
				<Card className=" relative flex py-0 my-0 ">
					<CardContent className="flex-2 flex gap-3 p-3 items-center h-full absolute left-0 bg-gradient-to-r from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.7)]">
						<CardTitle className="text-white font-semibold capitalize">
							Built for Every Team to increase productivity
						</CardTitle>
						<CardDescription className="text-gray-300">
							Whether you're managing marketing campaigns, closing sales, handling customer support, or coordinating operations, your team gets the tools they need to stay productive from one intuitive platform.
							Spend less time managing software and more time delivering results. Automated workflows, organized workspaces, and streamlined collaboratio

						</CardDescription>
					</CardContent>

					<img src={dashboardImg} />
				</Card>
				<Card className="flex flex-row relative py-0 my-0">
					<CardContent className="flex-2 flex items-center p-3 absolute h-full bg-gradient-to-r from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.7)]">
						<CardTitle className="text-white font-semibold capitalize">
							Real-Time Collaboration
						</CardTitle>
						<CardDescription className="text-gray-300">
							Work together without delays. Team members can edit shared documents simultaneously, leave comments, track changes, and stay synchronized in real time, whether they're working remotely or in the office.
						</CardDescription>
					</CardContent>
					<img src={collab} />
				</Card>
				<Card className="flex flex-row relative py-0 my-0">
					<CardContent className="flex-2 flex items-center p-3 absolute h-full bg-gradient-to-r from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.7)]">
						<CardTitle className="text-white font-semibold capitalize">
							Secure Cloud Workspace

						</CardTitle>
						<CardDescription className="text-gray-300">
							Keep your important files organized and accessible from anywhere. Store documents, presentations, contracts, images, and creative assets securely in the cloud, ensuring your entire team always has access to the latest version.
						</CardDescription>
					</CardContent>

					<img src={collab} />
				</Card>

			</div>
		</div >
	)
}


// <div className="fixed left-0 flex justify-between w-full p-3">
// 				<img src={menuIcon} className="w-12 h-12" />
// 				<Button className="ring-2 ring-blue-500 rounded-md p-2 capitalize h-7">Sign in</Button>
// 			</div>

// <Card className="bg-inherit md:px-[15rem] md:py-[3rem]">
// 	<CardContent>
// 		<CardTitle className="text-white capitalize text-[1.8rem] text-center p-6 pb-4 font-bold">
// 			Manage Project,Track tasks,Collaborate faster
// 		</CardTitle>
// 		<CardDescription className="text-gray-300 *:text-lg *:text-center">
// 			<div>
// 				Teams waste time switching between tools,spreadsheet are messy,collaboration is scattered
// 				.<span className="bg-blue-500 px-2 inline-block m-2 py-1 rounded-sm font-bold text-xl">Orbit</span>brings everything together.One workspace for your enitre team
// 			</div>
//
// 		</CardDescription>
// 	</CardContent>
// </Card>
// Manage work like a real company.
// From HR to Engineering,
// every department works
// together in one workspace.


// <div classname="flex justify-center mb-15">
// 				<button classname="text-xl font-bold ring-2 ring-blue-500 bg-blue-400 text-white rounded-md p-4 capitalize w-70 h-13">sign in</button>
// 			</div>
// 			<div className=" bg-[#010924] py-[40px] px-[20px]">
// 				<div className="text-white font-bold text-xl capitalize mb-3">
// 					Features
// 				</div>
//
// 				<ItemGroup className="gap-0 *:py-1 *:my-1  md:grid md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
// 					<Item className="flex items-center">
// 						<img src={createProjectIcon} className="w-6 h-6" />
// 						<ItemTitle className="text-white capitalize">
// 							Create Project in seconds
// 						</ItemTitle>
// 					</Item>
// 					<Item className="flex items-center">
// 						<img src={askToJoin} className="w-6 h-6" />
// 						<ItemTitle className="text-white capitalize">
// 							Assing tasks to team members
// 						</ItemTitle>
// 					</Item>
// 					<Item className="flex items-center">
// 						<img src={commentCollaboration} className="w-6 h-6" />
// 						<ItemTitle className="text-white capitalize">
// 							Comment and collaborate
// 						</ItemTitle>
// 					</Item>
// 					<Item className="flex items-center">
// 						<img src={roleBase} className="w-8 h-8" />
// 						<ItemTitle className="text-white capitalize">
// 							Role-based Access(RBA)
// 						</ItemTitle>
// 					</Item>
//
// 				</ItemGroup>
// 			</div>
// 			<Footer />

