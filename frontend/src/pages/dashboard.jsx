import { instance } from "@/api/axios"
import { useEffect, useState } from "react"
import { useLoaderData, Outlet, useNavigate } from "react-router-dom"
import { useAppStore } from "@/store/authStore"
import { normalise } from "@/utils/dashboard"
import SideBar from "@/components/SideBar"
import menuIcon from "@/assets/menu3.svg"
import { useParams } from "react-router-dom"
import useAuthStore from "@/store/authStore"
import { useQuery } from "@tanstack/react-query"
import { fetchUserQueryOption, workspaceQueryOption } from "@/queryOptions/queryOptions"

export default function Dashboard() {
	const setApp = useAppStore(state => state.setApp)
	const navigate = useNavigate()
	const loaderData = useLoaderData()
	// const user = useAuthStore(state => state.user)
	// const setUser = useAuthStore(state => state.setUser)
	const [toggle, setToggle] = useState(false)
	const workspaces = useAppStore(state => state.cacheWorkspace?.workspaces)
	const { projects = {} } = useAppStore(state => state.cacheProjects)
	const [selectedWorkspace, setSelectedWorkspace] = useState({ id: null, name: '', show: false })
	const [selectedProject, setSelectedProject] = useState({ id: null, name: '', show: false })
	const [selectedTask, setSelectedTask] = useState({ id: null, name: '', show: false })
	const [toggleWorkspace, setToggleWorkspace] = useState(false)
	const { wkName, prjName } = useParams()

	const {data}=useQuery(workspaceQueryOption())
	// console.log('data:',data)
	useQuery(fetchUserQueryOption())

	useEffect(() => {
		if (selectedTask?.name) {
			navigate(`/dashboard/${selectedWorkspace?.name}/${selectedProject?.name}/task/${selectedTask.id}`)
		}
	}, [selectedTask])

	useEffect(() => {
		if (wkName) {
			const workspace = Object.values(workspaces ?? {}).find(wk => wk?.name == wkName)
			setSelectedWorkspace((prev) => ({ ...prev, id: workspace?.id, name: wkName, show: true }))
			if (prjName) {
				const project = Object.values(projects ?? {}).find((prj) => prj?.name == prjName)
				setSelectedProject((prev) => ({ ...prev, id: project?.id, name: prjName, show: true }))
			}
		}
	}, [workspaces])
	useEffect(() => {
		setApp(normalise(loaderData))
	}, [])

	return (
		<div className='bg-[#000] flex h-screen w-full relative overflow-hidden '>
			{toggle && <SideBar setToggle={setToggle} handleWk={setSelectedWorkspace} handleProject={setSelectedProject} selectedProject={selectedProject} selectedWorkspace={selectedWorkspace} toggleWorkspace={toggleWorkspace} handleToggleWorkspace={setToggleWorkspace} handleTask={setSelectedTask} />}
			<div className={`pb-[4rem] overflow-hidden flex-1 ${toggle ? '' : ''}`}>
				{!toggle &&
					<div className="relative">
						<img src={menuIcon} className="absolute w-12 h-12" onClick={(e) => {
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


