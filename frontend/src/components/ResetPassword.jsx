import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
	ShieldCheck,
	Eye,
	EyeOff,
	CircleCheck,
	ArrowLeft,
	CheckCircle2,
	XCircle,
	KeyRound,
	ArrowRight,
	Loader2,
	LockKeyhole,
} from "lucide-react";
import { instance } from "@/api/axios";

export default function ResetPassword() {
	const [searchParams] = useSearchParams();

	const [resetDetail, setResetDetail] = useState({
		token: searchParams.get("token"),
		id: searchParams.get("uid"),
		password: "",
	});

	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [loading, setLoading] = useState(false);

	const [status, setStatus] = useState("form");
	const [error, setError] = useState("");

	const requirements = [
		{
			label: "At least 8 characters",
			valid: resetDetail.password.length >= 8,
		},
		{
			label: "One uppercase letter",
			valid: /[A-Z]/.test(resetDetail.password),
		},
		{
			label: "One number or special character",
			valid: /[\d\W]/.test(resetDetail.password),
		},
	];

	const handleSubmit = async () => {
		setError("");

		if (!resetDetail.token || !resetDetail.id) {
			setStatus("invalid");
			return;
		}

		if (resetDetail.password !== confirmPassword) {
			setError("Your passwords do not match.");
			return;
		}

		if (requirements.some((item) => !item.valid)) {
			setError("Please meet all password requirements.");
			return;
		}

		try {
			setLoading(true);
			await instance.patch("users/reset-password/", resetDetail);
			setStatus("success");
		} catch (err) {
			const message =
				err.response?.data?.detail ||
				err.response?.data?.password?.[0] ||
				err.response?.data?.[0] ||
				"Something went wrong. Please try again.";

			if (
				err.response?.status === 404 ||
				/invalid reset link|invalid password reset link|expired/i.test(
					String(message)
				)
			) {
				setStatus("invalid");
			} else {
				setError(
					typeof message === "string"
						? message
						: "Unable to reset password. Please try again."
				);
			}
		} finally {
			setLoading(false);
		}
	};

	if (status === "success") {
		return (
			<div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
				<div className="w-full max-w-md text-center space-y-7">

					<div className="relative mx-auto w-fit">
						<div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full" />
						<div className="relative h-20 w-20 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
							<CheckCircle2 size={40} className="text-green-400" />
						</div>
					</div>

					<div className="space-y-3">
						<div className="text-xs font-semibold tracking-[0.2em] text-green-400 uppercase">
							Password updated
						</div>

						<h1 className="text-3xl font-bold text-white">
							You're all set!
						</h1>

						<p className="text-sm leading-7 text-zinc-400 max-w-sm mx-auto">
							Your password has been successfully changed.
							Your account is now secured with your new password.
						</p>
					</div>

					<div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 flex items-center gap-3 text-left">
						<div className="h-10 w-10 shrink-0 rounded-lg bg-blue-500/10 flex items-center justify-center">
							<LockKeyhole size={19} className="text-blue-400" />
						</div>
						<div>
							<p className="text-sm font-medium text-white">
								Security updated
							</p>
							<p className="text-xs text-zinc-500 mt-1">
								Your new password is ready to use.
							</p>
						</div>
					</div>

					<Link
						to="/login"
						className="flex items-center justify-center gap-2 w-full rounded-lg bg-blue-600 hover:bg-blue-500 py-3.5 text-sm font-semibold text-white transition"
					>
						Continue to login
						<ArrowRight size={17} />
					</Link>

					<p className="text-xs text-zinc-600">
						Didn't make this change? Contact our support team.
					</p>
				</div>
			</div>
		);
	}

	if (status === "invalid") {
		return (
			<div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
				<div className="w-full max-w-md text-center space-y-7">

					<div className="mx-auto h-20 w-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
						<XCircle size={40} className="text-red-400" />
					</div>

					<div className="space-y-3">
						<p className="text-xs font-semibold tracking-[0.2em] uppercase text-red-400">
							Link unavailable
						</p>

						<h1 className="text-3xl font-bold text-white">
							This link has expired
						</h1>

						<p className="text-sm text-zinc-400 leading-7 max-w-sm mx-auto">
							Your password reset link is invalid or has expired.
							For your security, password reset links can only be
							used within a limited period.
						</p>
					</div>

					<div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-left">
						<p className="text-sm font-medium text-white mb-2">
							What can you do?
						</p>
						<p className="text-xs text-zinc-500 leading-6">
							Request a new password reset link and follow the
							instructions sent to your email.
						</p>
					</div>

					<Link
						to="/forgot-password"
						className="flex items-center justify-center gap-2 w-full rounded-lg bg-blue-600 hover:bg-blue-500 py-3.5 text-sm font-semibold text-white transition"
					>
						<KeyRound size={17} />
						Request a new link
					</Link>

					<Link
						to="/login"
						className="flex items-center justify-center gap-2 text-sm text-zinc-500 hover:text-white transition"
					>
						<ArrowLeft size={16} />
						Back to login
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-10">
			<div className="w-full max-w-md space-y-8">

				<div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center">
					<ShieldCheck className="text-blue-500" size={25} />
				</div>

				<div className="space-y-2">
					<p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-400">
						Account security
					</p>

					<h1 className="text-3xl font-bold text-white">
						Create new password
					</h1>

					<p className="text-sm text-zinc-400 leading-relaxed">
						Choose a strong password that you haven't used before
						to keep your account secure.
					</p>
				</div>

				{error && (
					<div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-3.5">
						<XCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
						<p className="text-sm text-red-300">{error}</p>
					</div>
				)}

				<div className="space-y-5">

					<div className="space-y-2">
						<label className="text-sm text-zinc-300">
							New password
						</label>

						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								value={resetDetail.password}
								onChange={(e) =>
									setResetDetail((prev) => ({
										...prev,
										password: e.target.value,
									}))
								}
								placeholder="Enter new password"
								className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 pr-12 text-white outline-none focus:border-blue-500 transition placeholder:text-zinc-600"
							/>

							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
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
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								placeholder="Confirm new password"
								className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 pr-12 text-white outline-none focus:border-blue-500 transition placeholder:text-zinc-600"
							/>

							<button
								type="button"
								onClick={() => setShowConfirm(!showConfirm)}
								className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
							>
								{showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>
					</div>

					<div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-3">
						<p className="text-xs font-semibold tracking-wider text-zinc-500">
							PASSWORD REQUIREMENTS
						</p>

						{requirements.map((item) => (
							<div key={item.label} className="flex items-center gap-2">
								<CircleCheck
									size={15}
									className={
										item.valid ? "text-green-400" : "text-zinc-600"
									}
								/>
								<span
									className={`text-xs ${item.valid ? "text-green-400" : "text-zinc-400"
										}`}
								>
									{item.label}
								</span>
							</div>
						))}
					</div>

					<button
						onClick={() => {
							console.log("clicked")
							handleSubmit()
						}
						}
						type="submit"
						disabled={loading}
						className="w-full rounded-lg bg-blue-600 py-3.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
					>
						{loading ? (
							<>
								<Loader2 size={17} className="animate-spin" />
								Updating password...
							</>
						) : (
							"Reset password"
						)}
					</button>
				</div>

				<Link
					to="/login"
					className="flex items-center justify-center gap-2 text-sm text-zinc-500 hover:text-white transition"
				>
					<ArrowLeft size={16} />
					Back to login
				</Link>

			</div>
		</div>
	);
}
