
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { useOutletContext, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { instance } from "@/api/axios"


export default function SignEmail() {
	const { email, setEmail, setStep } = useOutletContext()
	const navigate = useNavigate()
	// const handleContinue = () => {
	// }

	const verifyEmail = useMutation({
		mutationFn: async () => {
			const verify = await instance.post(`users/verify-email/`, { email: email })
			return verify?.data
		},
		onSuccess: () => {
			setStep(2)
			navigate('otp-verification')
		}
	})
	return (
		<>

			<div className="mb-10">

				<p className="text-sm text-blue-400 font-medium">
					Step 1 of 3
				</p>

				<h2 className="text-3xl font-bold mt-2">
					Create your account
				</h2>

				<p className="text-zinc-400 mt-2">
					Enter your email to get started.
				</p>

			</div>

			<div>

				<label className="text-sm text-zinc-400">
					Email
				</label>

				<Input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="you@example.com"
					className="
								mt-2
								h-12
								bg-zinc-900
								border-zinc-800
								text-white
								placeholder:text-zinc-600
								focus:border-blue-500
							"
				/>

			</div>

			<Button
				disabled={!email.trim()}
				onClick={() => verifyEmail.mutate()}
				className="
							w-full
							h-12
							mt-6
							rounded-xl
							bg-blue-500
							hover:bg-blue-600
						"
			>
				Continue
			</Button>

			<div className="flex items-center gap-2 mt-8">

				<ArrowLeft className="w-4 h-4 text-zinc-600" />

				<Link
					to="/login"
					className="text-sm text-zinc-500 hover:text-white transition"
				>
					Already have an account? Sign in
				</Link>

			</div>

		</>

	)
}
