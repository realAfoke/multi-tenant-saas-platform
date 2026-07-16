import { instance } from "@/api/axios"
import { useEffect, useState } from "react"
import { useLoaderData, Outlet, useNavigate } from "react-router-dom"
import { useAppStore } from "@/store/authStore"
import { normalise } from "@/utils/dashboard"
import SideBar from "@/components/SideBar"
import menuIcon from "@/assets/menu3.svg"



export default function Dashboard() {
	const setApp = useAppStore(state => state.setApp)
	const navigate = useNavigate()
	const loaderData = useLoaderData()
	const [toggle, setToggle] = useState(false)
	const [selectedWorkspace, setSelectedWorkspace] = useState({ id: null, name: '', show: false })
	const [selectedProject, setSelectedProject] = useState({ id: null, name: '', show: false })
	const [selectedTask, setSelectedTask] = useState({ id: null, name: '', show: false })
	const [toggleWorkspace, setToggleWorkspace] = useState(false)


	useEffect(() => {
		if (selectedTask.id) {
			navigate(`/dashboard/${selectedWorkspace?.name}/${selectedProject?.name}/task/${selectedTask.id}`)
		}
	}, [selectedTask])

	useEffect(() => {
		setApp(normalise(loaderData))
	}, [])
// bg-[#131011]
	return (
		<div className='bg-[#000] flex h-screen w-full relative overflow-hidden '>
			{toggle && <SideBar setToggle={setToggle} handleWk={setSelectedWorkspace} handleProject={setSelectedProject} selectedProject={selectedProject} selectedWorkspace={selectedWorkspace} toggleWorkspace={toggleWorkspace} handleToggleWorkspace={setToggleWorkspace} handleTask={setSelectedTask} />}
			<div className={`pb-[4rem] overflow-hidden flex-1 ${toggle ? '' : ''}`}>
				{!toggle &&
					<div>
						<img src={menuIcon} className="w-12 h-12" onClick={(e) => {
							e.stopPropagation()
							setToggle(true)
						}} />
					</div>
				}
				<Outlet context={{ selectedProject, selectedWorkspace, setSelectedWorkspace, setSelectedProject, setToggleWorkspace }} />
			</div>
		</div>
	)
}


export async function dashboardLoader() {
	try {
		const user = localStorage.getItem('user')
		if (!user) return
		const dashboard = await instance.get('workspaces/')
		return dashboard.data
	} catch (err) {
		console.error(err)
	}
}
