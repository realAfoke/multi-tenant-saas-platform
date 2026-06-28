import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { instance } from "@/api/axios"
import useAuthStore from "@/store/authStore"
import { useNavigate, Navigate } from "react-router-dom"


export default function Login() {
	const [email, setEmail] = useState('saas@example.com')
	const [loader, setLoader] = useState({ isLoading: false, loaderMsg: '' })
	const [password, setPassword] = useState('saas')
	const setUser = useAuthStore((state) => state.setUser)
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn())
	const navigate = useNavigate()
	if (isLoggedIn) {
		return <Navigate to='/dashboard' replace />
	}


	async function login() {
		try {
			setLoader((prev) => ({ ...prev, isLoading: true }))
			const logInfo = await instance.post('auth/login/', { email: email, password: password })
			const userInfo = logInfo.data
			setUser(userInfo)
			setLoader((prev) => ({ ...prev, isLoading: false }))
			navigate('/dashboard', { replace: true })
		}
		catch (err) {
			console.error('Error:', err.response)
			const errorMsg = err.response.data?.nonFieldErrors[0]
			setLoader((prev) => ({ ...prev, isLoading: false, loaderMsg: errorMsg }))
		}
	}

	return (
		<div className="flex lg:px-10 flex-col min-h-screen bg-gray-50 border-2 border-green-500">
			<div className="font-bold text-2xl border-b border-1-gray-200 p-3">
				Orbit
			</div>
			<div className="md:flex md:justify-center">
				<Card className='ring-0 border-none shadow-none w-full max-w-md bg-gray-50 border-red-500'>
					<CardHeader>
						<div className="text-xl font-semibold">
							Sign in to your Workspace
						</div>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className="flex flex-col">
							<label className="p-1">
								email
							</label>

							<Input value={email} onChange={(e) => setEmail(e.currentTarget.value)} className='rounded-md border border-gray-200 p-6' />
						</div>

						<div className="flex flex-col">
							<label className="p-1">
								password
							</label>

							<Input type='password' className='rounded-md border border-gray-200 p-6' value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
							<div className="self-end p-2 text-blue-500">
								forgot your password?
							</div>
						</div>
						{(loader.loaderMsg && !loader.isLoading) && <div className="text-red-500">{loader.loaderMsg}</div>}
						<Button disabled={email.length <= 0 || password.length <= 0} onClick={async () => await login()} className='w-full bg-[#060067d6] py-6 rounded-md'>
							{loader.isLoading ? (
								<div className="h-7 w-7 rounded-full border-3 border-white border-t-transparent animate-spin"></div>
							) : (
								<div>Login</div>
							)}
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>

	)
}


// #070c587a
