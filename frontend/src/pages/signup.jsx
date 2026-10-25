import { useState } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { useAppState } from "@/hooks/apptools"


export default function SignUp() {
	const navigate = useNavigate()
	const { inviteDetail } = useAppState()
	const [email, setEmail] = useState(() => inviteDetail?.email ?? "")
	const [showBackWarning, setShowBackWarning] = useState(false)
	const location = useLocation()
	const [error, setError] = useState(false)

	const paths = location.pathname.split('/').filter(path => path != '')
	const restartSignup = () => {
		navigate('/signup', { replace: true })
	}
	const step = {
		'otp-verification': 2,
		'account-detail': 3,
	}[paths[1]] ?? 1

	const handleChange = () => {
		setShowBackWarning(false)
		navigate('./')
	}


	return (
		<div className="min-h-screen bg-zinc-950 text-white lg:grid lg:grid-cols-2">


			<div className="hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950">

				<div>
					<h1 className="text-4xl font-bold">
						OrbitSpace
					</h1>

					<p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-md">
						Bring your projects, tasks and team together
						in one organized workspace.
					</p>
				</div>

				<div className="space-y-5 text-sm text-zinc-300">

					<div className="flex items-center gap-3">
						<span className="w-2 h-2 rounded-full bg-blue-500" />
						Organize projects and tasks
					</div>

					<div className="flex items-center gap-3">
						<span className="w-2 h-2 rounded-full bg-blue-500" />
						Collaborate with your team
					</div>

					<div className="flex items-center gap-3">
						<span className="w-2 h-2 rounded-full bg-blue-500" />
						Track work from start to finish
					</div>

				</div>

			</div>

			{/* Form */}
			<div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6 py-10">

				<div className="w-full max-w-lg">
					<div className="lg:hidden mb-12">

						<h1 className="text-3xl font-bold">
							OrbitSpace
						</h1>

					</div>
					{error && <div className="text-red-400 text-sm">{error}</div>}

					{inviteDetail?.id && <span className="text-blue-400 text-sm">creating account for invite email {inviteDetail?.email}</span>}

					<div className="grid grid-cols-2 justify-between">
						<div className={`${inviteDetail ? 'my-5' : ''} flex items-center gap-2 mb-10`}>

							{Array.from({ length: step }, (_, i) => i + 1).map((i) => (<span key={i} className="w-7 h-1 rounded-full bg-blue-500" />))}

						</div>
						<button
							onClick={() => setShowBackWarning(true)}
							className="w-full text-sm text-zinc-500 hover:text-white"
						>
							← Back
						</button>
					</div>

					<Outlet context={{ email, setEmail, showBackWarning, handleChange, restartSignup, setError }} />
				</div>
			</div>
		</div>
	)
}

