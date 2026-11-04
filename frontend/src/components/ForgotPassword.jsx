import { Link } from "react-router-dom";
import { LockKeyhole, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-7">

        <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
          <LockKeyhole className="text-blue-500" size={24} />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">
            Forgot password?
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            No worries, it happens. Enter the email address
            associated with your account and we'll send you
            a link to reset your password.
          </p>
        </div>

        <form className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-zinc-800
              bg-zinc-900 px-4 py-3 text-white outline-none
              placeholder:text-zinc-600 focus:border-blue-500"
            />
          </div>

          <button className="w-full rounded-lg bg-blue-600
            py-3 text-sm font-semibold text-white
            hover:bg-blue-500 transition">
            Send reset link
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
