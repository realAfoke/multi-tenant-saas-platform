import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { useOutletContext, useNavigate } from "react-router-dom"
import { instance } from "@/api/axios"

export default function VerifyEmail() {
	const [otp, setOtp] = useState(["", "", "", "", "", ""])
	const { email, setStep } = useOutletContext()
	const navigate = useNavigate()

	const handleChange = (value, index) => {
		if (!/^\d?$/.test(value)) return

		const next = [...otp]
		next[index] = value
		setOtp(next)

		if (value && index < 5) {
			document.getElementById(`otp-${index + 1}`)?.focus()
		}
	}


	const confirmEmail = useMutation({
		mutationFn: async () => {
			const confrim = await instance.post(`users/confirm-otp/`, { key: email, otp: Number(otp.join('')) })
			return confrim?.data
		},
		onSuccess: () => {
			setStep(3)
			navigate('../account-detail')
		}
	})
	return (

		<>
			<p className="text-sm text-blue-400 font-medium">
				Step 2 of 3
			</p>

			<h1 className="text-3xl font-bold mt-2">
				Verify your email
			</h1>

			<p className="text-zinc-400 mt-3 leading-relaxed">
				We sent a verification code to{" "}
				<span className="text-zinc-200">
					{email || "your email"}
				</span>
			</p>

			<div className="flex gap-2 mt-8">

				{otp.map((value, index) => (
					<input
						key={index}
						id={`otp-${index}`}
						value={value}
						maxLength={1}
						inputMode="numeric"
						onChange={(e) =>
							handleChange(e.target.value, index)
						}
						className="
								w-full
								h-14
								text-center
								text-xl
								font-semibold
								rounded-xl
								bg-zinc-900
								border
								border-zinc-800
								text-white
								outline-none
								focus:border-blue-500
							"
					/>
				))}

			</div>

			<Button
				disabled={otp.length !== 6}
				onClick={() => {
					confirmEmail.mutate()
				}}
				className="w-full h-12 mt-6 rounded-xl bg-blue-500 hover:bg-blue-600"
			>
				Verify Email
			</Button>

			<div className="flex justify-between items-center mt-7">

				<button
					onClick={() => navigate('../')}
					className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white"
				>
					<ArrowLeft className="w-4 h-4" />
					Change email
				</button>

				<button className="text-sm text-blue-400 hover:text-blue-300">
					Resend code
				</button>

			</div>
		</>


	)
}
