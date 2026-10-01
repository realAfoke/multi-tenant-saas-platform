
import { useAppState } from "@/hooks/apptools"
import { useLocation, useNavigate, useParams } from "react-router-dom"

export default function SettingsSidebar() {
	const { selectedWorkspace } = useAppState()
	const settingsRoutes = [
		{ name: "general", path: "" },
		{ name: "members", path: "members" },
		{ name: "channels", path: "channels" },
		{ name: "invitations", path: "invitations" },
	]

	const { wkName } = useParams()
	const navigate = useNavigate()
	const location = useLocation()

	const currentRoute =
		location.pathname.split("/").filter(Boolean).pop()

	return (
		<nav className="w-full md:w-44 shrink-0 pt-[5rem]">

			<div className="mb-4">
				<p className="text-sm font-medium text-white truncate">
					{selectedWorkspace?.name}
				</p>

				<p className="text-xs text-zinc-600 mt-1">
					Workspace
				</p>
			</div>

			<div className="space-y-1">
				{settingsRoutes.map((route) => {
					const isActive =
						route.path === ""
							? currentRoute === "settings"
							: currentRoute === route.name

					return (
						<button
							key={route.name}
							className={`w-full text-left px-3 py-2 rounded-md text-sm ${isActive
								? "text-white bg-zinc-800"
								: "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 transition"
								}`}
							onClick={() =>
								navigate(
									`/${wkName}/settings${route.path ? `/${route.path}` : ""
									}`
								)
							}
						>
							{route.name}
						</button>
					)
				})}
			</div>
		</nav>
	)
}

