import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { instance } from "@/api/axios"
import useAuthStore from "@/store/authStore"
import { useNavigate, redirect } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchUserQueryOption } from "@/queryOptions/fetchUserQueryOptions"


export default function Login() {
	const [email, setEmail] = useState('user@example.com')
	const [password, setPassword] = useState('user')
	const setUser = useAuthStore((state) => state.setUser)
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	// const user = queryClient.getQueryData(['user'])

	const mutate = useMutation({
		mutationFn: ({ email, password, navigate }) => login(email, password, navigate),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['user']
			})
		}
	})
	// if (user) {
	// 	return <Navigate to='/dashboard' replace />
	// }
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
						{(mutate.error && !mutate.isPending) && <div className="text-red-500">{mutate.errorMsg}</div>}
						<Button disabled={email.length <= 0 || password.length <= 0} onClick={async () => mutate.mutate({ email, password, navigate })} className='w-full bg-[#060067d6] py-6 rounded-md'>
							{mutate.isPending ? (
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
		const user = await instance.get('users/me')
		return redirect('/dashboard')
	} catch (error) {
		console.error(error)
	}
}
// #070c587a
