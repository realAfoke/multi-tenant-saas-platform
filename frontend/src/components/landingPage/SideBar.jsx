
import { useState } from "react"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import menuIcon from "@/assets/menu3.svg"
export default function SideBar() {
	const [toggleMenu, setToggleMenu] = useState(false)
	return (
		< div className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900" >

			<div className="flex items-center justify-between px-6 lg:px-20 py-5 relative">

				<div className="text-white font-bold text-2xl tracking-tight">
					OrbitSpace
				</div>


				<div className={`${toggleMenu ? ' flex flex-col md:flex-row' : 'hidden md:flex md:flex-row'}  items-start md:items-center p-5 md:p-0 w-full h-screen md:h-auto md:w-auto bg-white md:bg-transparent absolute top-20 left-0 md:static gap-8 text-gray-400`}>

					<a className="hover:text-white transition cursor-pointer">
						Features
					</a>

					<a className="hover:text-white transition cursor-pointer">
						Solutions
					</a>

					<Link to='pricing' className="hover:text-white transition cursor-pointer">
						Pricing
					</Link>

					<a className="hover:text-white transition cursor-pointer">
						About
					</a>
					<Link to="login" className="py-8 border-none">
						<Button
							variant="ghost"
							className=" md:hidden text-gray-300 bg-blue-500 w-full   rounded-full font-bold hover:text-white"
						>
							Login
						</Button>
					</Link>
				</div>


				<div className="flex items-center gap-3">
					<Link to="login" className="hidden md:block text-gray-300 hover:text-white">
						<Button
							variant="ghost"
							className="hover:bg-transparent hover:text-white text-gray-400"
						>
							Login
						</Button>
					</Link>

					<Button
						className="rounded-full bg-blue-500 hover:bg-blue-600 px-6"
		
					>
						Get Started
					</Button>


					<img
						src={menuIcon}
						className="md:hidden size-9"
						onClick={() => setToggleMenu((prev) => (!prev))}
					/>

				</div>

			</div>

		</div >
	)
}
