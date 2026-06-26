import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { instance } from "@/api/axios"
import useAuthStore from "@/store/authStore"


export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const setUser = useAuthStore((state) => state.setUser)


	async function login() {
		try {
			const logInfo = await instance.post('auth/login/', { email: email, password: password })
			console.log('LOGINFO:', logInfo)
			const userInfo = logInfo.response.data
			setUser(userInfo)

		}
		catch (err) {
			console.error(err.response)
		}
	}

	return (
		<div className="flex lg:px-10 flex-col min-h-screen bg-gray-50 border-2 border-green-500">
			<div className="font-bold text-2xl border-b border-1-gray-200 py-3">
				Orbit
			</div>
			<div className="md:flex md:justify-center">
				<Card className='w-full max-w-md bg-gray-50 border-red-500'>
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
						<Button onClick={async()=>await login()} className='w-full bg-[#060067d6] py-6 rounded-md'>Login</Button>
					</CardContent>
				</Card>
			</div>
		</div>

	)
}


// #070c587a
