import { useState } from "react"
import { Outlet } from "react-router-dom"
import SideBar from "@/components/SideBar"
import menuIcon from "@/assets/menu3.svg"
import { useAppState } from "@/hooks/apptools"

export default function Dashboard() {
	const [toggle, setToggle] = useState(false)
	const [toggleWorkspace, setToggleWorkspace] = useState(false)


	return (
		<div className='bg-[#000] flex h-screen w-full relative overflow-hidden '>
			{toggle && <SideBar setToggle={setToggle} toggleWorkspace={toggleWorkspace} handleToggleWorkspace={setToggleWorkspace} />}
			<div className={`pb-[4rem] overflow-hidden flex-1 ${toggle ? '' : ''}`}>
				{!toggle &&
					<div className="relative">
						<img src={menuIcon} className="absolute w-12 h-12" onClick={(e) => {
							e.stopPropagation()
							setToggle(true)
						}} />
					</div>
				}
				<Outlet context={{ setToggleWorkspace }} />
			</div>
		</div>
	)
}


