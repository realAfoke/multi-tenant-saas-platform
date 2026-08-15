import { Button } from "@/components/ui/button"
import { Input } from "./ui/input"
import { useState } from "react"
import { instance } from "@/api/axios"
import { useMutation } from "@tanstack/react-query"
import { useOutletContext, useNavigate } from "react-router-dom"
import SignupBackWarning from "./Warning"
import { useAppState } from "@/hooks/apptools"

export default function AccountDetails() {
	const { email, showBackWarning, handleChange, setStep } = useOutletContext()
	const navigate = useNavigate()
	const { inviteDetail } = useAppState()
	const [userData, setUserData] = useState({
		firstName: 'mr',
		lastName: 'crab',
		email: email,
		workspace: '',
		password: 'mrcrab',
		confirmPassword: 'mrcrab'
	})
	// const createAccount = useMutation({
	// 	mutationFn: async () => {
	// 		console.log('A: mutation started')
	//
	// 		const { confirmPassword, workspace, ...data } = userData
	// 		const payload = workspace ? { ...data, workspace } : data
	//
	// 		console.log('B: sending request', payload)
	//
	// 		try {
	// 			const response = await instance.post('users/signup/', payload)
	//
	// 			console.log('C: axios resolved', response)
	// 			console.log('D: status:', response.status)
	// 			console.log('E: data:', response.data)
	//
	// 			return response.data
	// 		} catch (error) {
	// 			console.log('X: axios rejected')
	// 			console.log('X error:', error)
	// 			console.log('X response:', error?.response)
	// 			console.log('X request:', error?.request)
	// 			console.log('X message:', error?.message)
	//
	// 			throw error
	// 		}
	// 	},
	//
	// 	onSuccess: (data) => {
	// 		console.log('SUCCESS FIRED:', data)
	// 		console.log('inviteDetail:', inviteDetail)
	//
	// 		if (inviteDetail) {
	// 			navigate(
	// 				`/accept-invite/?token=${inviteDetail.token}&invite=${inviteDetail.id}`
	// 			)
	// 			return
	// 		}
	//
	// 		navigate('/dashboard')
	// 	},
	//
	// 	onError: (error) => {
	// 		console.log('ON ERROR FIRED')
	// 		console.log('error:', error)
	// 		console.log('response:', error?.response)
	// 		console.log('response data:', error?.response?.data)
	// 		console.log('message:', error?.message)
	// 	},
	// })
	const createAccount = useMutation({
		mutationFn: async () => {
			const { confirmPassword, workspace, ...data } = userData
			const payLoad = workspace ? { ...data, workspace } : data
			const response = await instance.post(`users/signup/`, payLoad)
			return response.data
		},
		onSuccess: () => {
			if (inviteDetail) {
				navigate(`/accept-invite/?token=${inviteDetail?.token}&invite=${inviteDetail?.id}`)
				return
			}

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
