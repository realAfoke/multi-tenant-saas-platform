import { Link } from "react-router-dom";
import { LockKeyhole, ArrowLeft } from "lucide-react";
import { instance } from "@/api/axios";
import { useState } from "react";


export default function ForgotPassword() {
  const [email, setEmail] = useState("lucashood@gmail.com")
  const [response, setResponse] = useState({ msg: "", isError: false })
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-7 relative">
        <div className={`${response.isError ? 'bg-red-500' : 'bg-green-500'} absolute top-5 w-full left-0`}>{response?.msg}</div>

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

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-zinc-800
              bg-zinc-900 px-4 py-3 text-white outline-none
              placeholder:text-zinc-600 focus:border-blue-500"
            />
          </div>

          <button onClick={async () => {
            try {
              const response = await instance.post("users/send-reset-link", { email: email })
              setResponse((prev) => ({ ...prev, msg: response.data.status }))
            } catch (error) {
              setResponse((prev) => ({ ...prev, msg: error, isError: true }))
              console.log("Error:", error)
            }
          }} className="w-full rounded-lg bg-blue-600
            py-3 text-sm font-semibold text-white
            hover:bg-blue-500 transition" >
            Send reset link
          </button>
        </div>

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
