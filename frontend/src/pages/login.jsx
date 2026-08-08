import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { instance } from "@/api/axios"
import useAuthStore from "@/store/authStore"
import { useNavigate, redirect, Navigate, Link } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchUserQueryOption } from "@/queryOptions/queryOptions"


export default function Login() {
	const [email, setEmail] = useState('user@example.com')
	const [password, setPassword] = useState('user')
	const setUser = useAuthStore((state) => state.setUser)
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	// const { data: user } = useQueryClient(fetchUserQueryOption())

	const mutate = useMutation({
		mutationFn: ({ email, password, navigate }) => login(email, password, navigate),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['user']
			})
		}
	})
	// console.log('user:', user)
	// if (user) {
	// return <Navigate to='/dashboard' />
	// }
	return (
		<div className="min-h-screen bg-zinc-950 text-white lg:grid lg:grid-cols-2">

			{/* Left Side */}

			<div className="hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950">

				<div>

					<h1 className="text-4xl font-bold">
						OrbitSpace
					</h1>

					<p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-md">
						Manage projects, tasks, discussions and your entire team
						from one beautiful workspace.
					</p>

				</div>

				<div className="space-y-5">

					<div className="flex items-center gap-3">
						<div className="w-2 h-2 rounded-full bg-blue-500"></div>
						Unlimited Projects
					</div>

					<div className="flex items-center gap-3">
						<div className="w-2 h-2 rounded-full bg-blue-500"></div>
						Task Boards
					</div>

					<div className="flex items-center gap-3">
						<div className="w-2 h-2 rounded-full bg-blue-500"></div>
						Team Discussions
					</div>

					<div className="flex items-center gap-3">
						<div className="w-2 h-2 rounded-full bg-blue-500"></div>
						File Sharing
					</div>

					<div className="flex items-center gap-3">
						<div className="w-2 h-2 rounded-full bg-blue-500"></div>
						Timeline & Progress Tracking
					</div>

				</div>

			</div>

			{/* Right Side */}

			<div className="flex items-center justify-center px-6 py-10">

				<div className="w-full max-w-md">

					<div className="lg:hidden mb-10">

						<h1 className="text-3xl font-bold">
							OrbitSpace
						</h1>

					</div>

					<h2 className="text-3xl font-bold">
						Welcome back
					</h2>

					<p className="text-zinc-400 mt-2">
						Sign in to continue to your workspace.
					</p>

					<div className="mt-10 space-y-6">

						<div>

							<label className="text-sm text-zinc-400">
								Email
							</label>

							<Input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="mt-2 h-12 bg-zinc-900 border-zinc-800 text-white"
							/>

						</div>

						<div>

							<label className="text-sm text-zinc-400">
								Password
							</label>

							<Input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="mt-2 h-12 bg-zinc-900 border-zinc-800 text-white"
							/>

							<div className="text-right mt-3">

								<button className="text-sm text-blue-400 hover:text-blue-300">
									Forgot password ?
								</button>

							</div>

						</div>

						{mutate.error && !mutate.isPending &&
							<p className="text-red-400 text-sm">
								Unable to login.
							</p>
						}

						<Button
							className="w-full h-12 rounded-xl bg-blue-500 hover:bg-blue-600"
							disabled={!email || !password}
							onClick={() =>
								mutate.mutate({ email, password, navigate })
							}
						>

							{mutate.isPending ? (
								<div className="h-6 w-6 rounded-full border-2 border-white border-t-transparent animate-spin" />
							) : (
								"Sign In"
							)}

						</Button>

					</div>

					<div className="mt-10 text-center text-zinc-500">

						Don't have an account?{" "}

						<Link to='/signup' className="text-blue-400 hover:text-blue-300">
							Create one
						</Link>

					</div>

				</div>

			</div>

		</div>

	)
}
async function login(email, password, navigate) {
	try {
		await instance.post('auth/login/', { email: email, password: password })
		navigate('/dashboard', { replace: true })
	}
	catch (err) {
		console.error('Error:', err)
	}
}

export async function loader() {
	try {
		await instance.get('users/me')
		return redirect('/dashboard')
	} catch (error) {
		console.error(error)
	}
}
// #070c587a
//
//
//// <div className="flex lg:px-10 flex-col min-h-screen bg-gray-50">
// 	<div className="font-bold text-2xl border-b border-1-gray-200 p-3">
// 		Orbit
// 	</div>
// 	<div className="md:flex md:justify-center">
// 		<Card className='ring-0 border-none shadow-none w-full max-w-md bg-gray-50 border-red-500'>
// 			<CardHeader>
// 				<div className="text-xl font-semibold">
// 					Sign in to your Workspace
// 				</div>
// 			</CardHeader>
// 			<CardContent className='space-y-4'>
// 				<div className="flex flex-col">
// 					<label className="p-1">
// 						email
// 					</label>
//
// 					<Input value={email} onChange={(e) => setEmail(e.currentTarget.value)} className='rounded-md border border-gray-200 p-6' />
// 				</div>
//
// 				<div className="flex flex-col">
// 					<label className="p-1">
// 						password
// 					</label>
//
// 					<Input type='password' className='rounded-md border border-gray-200 p-6' value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
// 					<div className="self-end p-2 text-blue-500">
// 						forgot your password?
// 					</div>
// 				</div>
// 				{(mutate.error && !mutate.isPending) && <div className="text-red-500">{mutate.errorMsg}</div>}
// 				<Button disabled={email.length <= 0 || password.length <= 0} onClick={async () => mutate.mutate({ email, password, navigate })} className='w-full bg-[#060067d6] py-6 rounded-md'>
// 					{mutate.isPending ? (
// 						<div className="h-7 w-7 rounded-full border-3 border-white border-t-transparent animate-spin"></div>
// 					) : (
// 						<div>Login</div>
// 					)}
// 				</Button>
// 			</CardContent>
// 		</Card>
// 	</div>
// </div>
//
