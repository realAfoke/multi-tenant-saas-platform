import { Button } from "@/components/ui/button"
import { Input } from "./ui/input"
import { useState } from "react"
import { instance } from "@/api/axios"
import { useMutation } from "@tanstack/react-query"
import { useOutletContext, useNavigate } from "react-router-dom"
import SignupBackWarning from "./Warning"

export default function AccountDetails() {
	const { email, showBackWarning, handleChange, setStep } = useOutletContext()
	const navigate = useNavigate()
	const [userData, setUserData] = useState({
		firstName: '',
		lastName: '',
		email: email,
		workspace: '',
		password: '',
		confirmPassword: ''
	})

	const createAccount = useMutation({
		mutationFn: async () => {
			const data = { ...userData }
			delete data.confirmPassword
			if (!data.workspace) {
				delete data.workspace
			}
			const user = await instance.post(`users/signup/`, { ...data })
			return user?.data
		},
		onSuccess: () => {
			navigate('/dashboard')
		},
		onError: (error) => {
			console.error(error?.response)
		}

	})


	return (
		<>
			<SignupBackWarning open={showBackWarning} onOpenChange={handleChange} onConfirm={setStep} />

			<p className="text-sm text-blue-400 font-medium">
				Step 3 of 3
			</p>

			<h1 className="text-3xl font-bold mt-2">
				Finish setting up your account
			</h1>

			<p className="text-zinc-400 mt-2">
				Almost there. Tell us a little about yourself.
			</p>

			<div className="space-y-5 mt-8">

				{/* Name */}
				<div className="grid grid-cols-2 gap-5 mt-10">

					<div>

						<label className="text-sm text-zinc-400">
							First Name
						</label>

						<Input
							className="mt-2 h-12 bg-zinc-900 border-zinc-800 text-white"
							placeholder="John"
							value={userData?.firstName}
							onChange={(e) => setUserData(prev => ({ ...prev, firstName: e.target.value }))}

						/>

					</div>

					<div>

						<label className="text-sm text-zinc-400">
							Last Name
						</label>

						<Input
							className="mt-2 h-12 bg-zinc-900 border-zinc-800 text-white"
							placeholder="Doe"
							value={userData?.lastName}
							onChange={(e) => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
						/>

					</div>

				</div>

				{/* Email */}

				<div>

					<label className="text-sm text-zinc-400">
						Email
					</label>
					<Input
						className="mt-2 h-12 bg-zinc-900 border-zinc-800 text-white"
						placeholder="john@example.com"
						value={userData?.email}
						onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}

					/>
				</div>

				{/* Password */}
				<div className="grid grid-cols-2 gap-4">
					<div>

						<label className="text-sm text-zinc-400">
							Password
						</label>
						<Input
							type="password"
							className="mt-2 h-12 bg-zinc-900 border-zinc-800 text-white"
							value={userData?.password}
							onChange={(e) => setUserData(prev => ({ ...prev, password: e.target.value }))}

						/>

					</div>

					<div>

						<label className="text-sm text-zinc-400">
							Confirm password
						</label>

						<Input
							type="password"
							value={userData.confirmPassword}
							onChange={(e) => setUserData(prev => ({ ...prev, confirmPassword: e.target.value }))}


							className="mt-2 h-12 bg-zinc-900 border-zinc-800"
						/>

						{userData.confirmPassword &&
							userData.password !== userData.confirmPassword && (
								<p className="text-xs text-red-400 mt-2">
									Passwords do not match.
								</p>
							)
						}

					</div>
				</div>

				{/* Workspace */}

				<div>

					<label className="text-sm text-zinc-400">
						Workspace name
					</label>
					<Input
						className="mt-2 h-12 bg-zinc-900 border-zinc-800 text-white"
						placeholder="optional"
						value={userData?.workspace}
						onChange={(e) => setUserData(prev => ({ ...prev, workspace: e.target.value }))}

					/>

					<p className="text-xs text-zinc-500 mt-2">
						This will be your first workspace.
					</p>

				</div>

				<Button
					disabled={
						!userData.email ||
						!userData.firstName ||
						!userData.lastName ||
						!userData.password
					}

					onClick={() => createAccount.mutate()}

					className="w-full h-12 rounded-xl bg-blue-500 hover:bg-blue-600"
				>
					Create Account
				</Button>


			</div>

		</>

	)
}
