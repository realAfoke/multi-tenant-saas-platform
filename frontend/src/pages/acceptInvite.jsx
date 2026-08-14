import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
	Users,
	Check,
	X,
	Loader2,
	AlertCircle,
} from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { instance } from "@/api/axios"
import { useSearchParams } from "react-router-dom"
import WrongAccount from "@/components/WrongAccount"
import { fetchUserQueryOption } from "@/queryOptions/queryOptions"
import { useAppState } from "@/hooks/apptools"

export default function AcceptInvite() {
	const [cancel, setCancel] = useState(false)
	const [searchParams] = useSearchParams()
	const token = searchParams.get('token')
	const inviteId = searchParams.get('invite')
	const { setInvite, inviteDetail } = useAppState()
	const navigate = useNavigate()

	const [loading, setLoading] = useState(false)

	const { data: loggedInUser } = useQuery(fetchUserQueryOption())
	const user = loggedInUser?.user ?? {}
	console.log('loggedUser:', user)
	console.log('loggedUserEmail:', user?.email)
	console.log("invite:", inviteDetail)
	console.log("inviteEmail:", inviteDetail?.email)

	const { data: invite } = useQuery({
		queryKey: ['invite', inviteId],
		queryFn: async () => {
			try {
				const wkSpace = await instance.get(`workspaces/${inviteId}/pending-request`)
				return wkSpace?.data
			} catch (error) {
				console.error(error)
				throw Error(error)
			}
		}
	})
	useEffect(() => {
		if (inviteDetail && inviteDetail?.email === invite?.email) return
		setInvite({ token: token, id: inviteId, email: invite?.email })
	}, [invite, inviteDetail])

	const acceptOrDeclineInvite = useMutation({
		mutationFn: async (status) => {
			if (!user) {
				navigate('/login')
				return
			}
			const response = await instance.patch(`workspaces/${inviteId}/accept-invite/`, { token, token, status: status })
			return response?.data
		},
		onSuccess: (mssg) => {
			console.log(mssg?.detail)
			if (mssg?.detail === 'Invite accepted') {
				console.log('inside here')
				setInvite({})
				navigate('/dashboard')
				return
			}
			navigate('/')
		}
	})

	const handleSwtich = async () => {
		try {
			const logout = await instance.post('users/logout/', {})
			navigate('/login')
			return logout?.data
		} catch (error) {
			console.error(error)
		}
	}
	const handleCancel = () => { }


	if (!invite?.isValid) {
		return (
			<div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">

				<Card className="w-full max-w-md bg-zinc-900 border-zinc-800">

					<CardContent className="p-8 text-center">

						<div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">

							<AlertCircle className="w-7 h-7 text-red-400" />

						</div>

						<h1 className="text-xl font-semibold mt-6">
							Invitation unavailable
						</h1>

						<p className="text-zinc-500 mt-2">
							This invitation is invalid or has expired.
						</p>

						<Button
							onClick={() => navigate("/")}
							className="mt-6 w-full rounded-xl"
						>
							Go to OrbitSpace
						</Button>

					</CardContent>

				</Card>

			</div>
		)
	}
	if (user?.email != invite?.email) {
		return (<WrongAccount onSwitchAccount={handleSwtich} onCancel={setCancel} inviteEmail={invite?.email} currentEmail={user?.email} />)
	}

	return (
		<div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6 py-10">

			<div className="w-full max-w-md">


				<div className="text-center mb-10">

					<h1 className="text-3xl font-bold">
						workspace
					</h1>

				</div>

				<Card className="bg-zinc-900 border-zinc-800">

					<CardContent className="p-8">


						<div className="text-center">

							<p className="text-sm text-blue-400 font-medium">
								Workspace Invitation
							</p>

							<h2 className="text-2xl font-bold mt-3">
								You've been invited
							</h2>

							<p className="text-zinc-400 mt-3 leading-relaxed">

								<span className="text-zinc-200 font-medium">
									{`${invite?.invitedBy?.firstName} ${invite?.invitedBy?.lastName}`}
								</span>{" "}

								invited you to join

							</p>

						</div>


						<div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 p-5">

							<div className="flex items-center gap-4">

								<div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">

									<Users className="w-6 h-6 text-blue-400" />

								</div>

								<div>

									<h3 className="font-semibold text-lg text-white">
										{invite?.workspace}
									</h3>

									<p className="text-sm text-zinc-500 mt-1">
										0 members

									</p>

								</div>

							</div>

						</div>

						<p className="text-sm text-zinc-500 text-center mt-6">
							Join this workspace to collaborate with
							the team and access its projects and tasks.
						</p>


						<Button
							disabled={loading}
							onClick={() => acceptOrDeclineInvite.mutate('accept')}
							className="w-full h-12 mt-7 rounded-xl bg-blue-500 hover:bg-blue-600"
						>

							{loading ? (
								<>
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									Joining workspace...
								</>
							) : (
								<>
									<Check className="w-4 h-4 mr-2" />
									Accept Invitation
								</>
							)}

						</Button>


						<Button
							variant="ghost"
							disabled={loading}
							className="w-full mt-2 text-zinc-500 hover:text-red-400"
							onClick={() => navigate("/")}
						>
							<X className="w-4 h-4 mr-2" />
							Decline
						</Button>

					</CardContent>

				</Card>

				<p className="text-center text-xs text-zinc-600 mt-6">
					This invitation was sent through OrbitSpace.
				</p>

			</div>

		</div>
	)
}
