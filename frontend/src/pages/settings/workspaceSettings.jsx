import { Outlet } from "react-router-dom";
import SettingsSidebar from "@/components/setting/SettingsSidebar";

export default function WorkspaceSettings() {
	return (
		<div className="min-h-screen bg-zinc-950 overflow-hidden px-4">
			<div className="w-full max-w-5xl mx-auto">

				<div className="flex flex-col md:flex-row gap-8 overflow-hidden">
					<SettingsSidebar />
					<Outlet />
				</div>

			</div>
		</div>
	)
}
