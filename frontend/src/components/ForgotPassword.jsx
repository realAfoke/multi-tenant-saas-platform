import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LockKeyhole,
  ArrowLeft,
  ArrowRight,
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { instance } from "@/api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("form");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await instance.post(
        "users/send-reset-link/",
        { email: email.trim() }
      );

      setStatus("sent");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "We couldn't process your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // EMAIL SENT SCREEN
  if (status === "sent") {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md space-y-7 text-center">

          <div className="relative mx-auto w-fit">
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
            <div className="relative h-20 w-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Mail size={38} className="text-blue-400" />
            </div>

            <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-green-500 border-4 border-zinc-950 flex items-center justify-center">
              <CheckCircle2 size={17} className="text-white" />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-400">
              Check your inbox
            </p>

            <h1 className="text-3xl font-bold text-white">
              Check your email
            </h1>

            <p className="text-sm text-zinc-400 leading-7">
              We've received your password reset request.
              If an account exists with the email address below,
              you'll receive instructions to reset your password.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 flex items-center gap-3 text-left">
            <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Mail size={18} className="text-blue-400" />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-zinc-500 mb-1">
                Reset instructions sent to
              </p>
              <p className="text-sm font-medium text-white truncate">
                {email}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-zinc-900/40 border border-zinc-800/70 p-4 text-left space-y-2">
            <p className="text-sm font-medium text-zinc-200">
              Didn't receive the email?
            </p>

            <p className="text-xs text-zinc-500 leading-6">
              Check your spam or junk folder. You can also
              request another reset link.
            </p>
          </div>

          <button
            onClick={() => setStatus("form")}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 py-3.5 text-sm font-semibold text-zinc-200 hover:bg-zinc-800 transition"
          >
            <RefreshCw size={16} />
            Try another email
          </button>

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

  // FORGOT PASSWORD FORM
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-8">

        <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center">
          <LockKeyhole className="text-blue-500" size={25} />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-400">
            Account recovery
          </p>

          <h1 className="text-3xl font-bold text-white">
            Forgot password?
          </h1>

          <p className="text-sm text-zinc-400 leading-7">
            No worries, it happens. Enter the email address
            associated with your account and we'll send you
            instructions to reset your password.
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-3.5">
            <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">
              Email address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 pl-11 pr-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-blue-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Sending reset link...
              </>
            ) : (
              <>
                Send reset link
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 text-xs text-zinc-600">
          <ShieldCheck size={15} />
          Your account security is our priority.
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
// import { Link } from "react-router-dom";
// import { LockKeyhole, ArrowLeft } from "lucide-react";
// import { instance } from "@/api/axios";
// import { useState } from "react";
//
//
// export default function ForgotPassword() {
//   const [email, setEmail] = useState("lucashood@gmail.com")
//   const [response, setResponse] = useState({ msg: "", isError: false })
//   return (
//     <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
//       <div className="w-full max-w-md space-y-7 relative">
//         <div className={`${response.isError ? 'bg-red-500' : 'bg-green-500'} absolute top-5 w-full left-0`}>{response?.msg}</div>
//
//         <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
//           <LockKeyhole className="text-blue-500" size={24} />
//         </div>
//
//         <div className="space-y-2">
//           <h1 className="text-3xl font-bold text-white">
//             Forgot password?
//           </h1>
//           <p className="text-sm text-zinc-400 leading-relaxed">
//             No worries, it happens. Enter the email address
//             associated with your account and we'll send you
//             a link to reset your password.
//           </p>
//         </div>
//
//         <div className="space-y-5">
//           <div className="space-y-2">
//             <label className="text-sm text-zinc-300">
//               Email address
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="you@example.com"
//               className="w-full rounded-lg border border-zinc-800
//               bg-zinc-900 px-4 py-3 text-white outline-none
//               placeholder:text-zinc-600 focus:border-blue-500"
//             />
//           </div>
//
//           <button onClick={async () => {
//             try {
//               const response = await instance.post("users/send-reset-link", { email: email })
//               setResponse((prev) => ({ ...prev, msg: response.data.status }))
//             } catch (error) {
//               setResponse((prev) => ({ ...prev, msg: error, isError: true }))
//               console.log("Error:", error)
//             }
//           }} className="w-full rounded-lg bg-blue-600
//             py-3 text-sm font-semibold text-white
//             hover:bg-blue-500 transition" >
//             Send reset link
//           </button>
//         </div>
//
//         <Link
//           to="/login"
//           className="flex items-center justify-center gap-2
//           text-sm text-zinc-400 hover:text-white transition"
//         >
//           <ArrowLeft size={16} />
//           Back to login
//         </Link>
//       </div>
//     </div>
//   );
// }
