import { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Eye, EyeOff, CircleCheck, ArrowLeft } from "lucide-react";

export default function ResetPassword() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	return (
		<div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
			<div className="w-full max-w-md space-y-7">

				<div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
					<ShieldCheck className="text-blue-500" size={24} />
				</div>

				<div className="space-y-2">
					<h1 className="text-3xl font-bold text-white">
						Create new password
					</h1>
					<p className="text-sm text-zinc-400 leading-relaxed">
						Your new password must be different from
						previously used passwords.
					</p>
				</div>

				<form className="space-y-5">
					<div className="space-y-2">
						<label className="text-sm text-zinc-300">
							New password
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Enter new password"
								className="w-full rounded-lg border border-zinc-800
                bg-zinc-900 px-4 py-3 pr-12 text-white outline-none
                focus:border-blue-500"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
							>
								{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>
					</div>

					<div className="space-y-2">
						<label className="text-sm text-zinc-300">
							Confirm password
						</label>
						<div className="relative">
							<input
								type={showConfirm ? "text" : "password"}
								placeholder="Confirm new password"
								className="w-full rounded-lg border border-zinc-800
                bg-zinc-900 px-4 py-3 pr-12 text-white outline-none
                focus:border-blue-500"
							/>
							<button
								type="button"
								onClick={() => setShowConfirm(!showConfirm)}
								className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
							>
								{showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>
					</div>

					<div className="space-y-3">
						<p className="text-xs font-semibold text-zinc-500">
							PASSWORD REQUIREMENTS
						</p>
						{[
							"At least 8 characters",
							"One uppercase letter",
							"One number or special character",
						].map((item) => (
							<div key={item} className="flex items-center gap-2">
								<CircleCheck size={15} className="text-zinc-600" />
								<span className="text-xs text-zinc-400">{item}</span>
							</div>
						))}
					</div>

					<button className="w-full rounded-lg bg-blue-600
            py-3 text-sm font-semibold text-white
            hover:bg-blue-500 transition">
						Reset password
					</button>
				</form>

				<Link
					to="/login"
					className="flex items-center justify-center gap-2
          text-sm text-zinc-400 hover:text-white transition"
				>
					<ArrowLeft size={16} />
					Back to login
				</Link>
			</div>
		</div>
	);
}
