"use client"
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SignupPage() {
  const session = useSession()
  const router = useRouter()
  const [signupForm, setsignupForm] = useState({})
  const [loading, setloading] = useState(false)

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session.status, router]);

  const handleChange = (e) => {
    setsignupForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    });
  }

  const signupReq = async () => {
    let loadingToast = toast.loading("Signing up...", { theme: "dark" });
    try {
      setloading(true)
      if (!signupForm.name) {
        toast.error("Name is required", { theme: "dark" });
        return;
      }
      if (!signupForm.email) {
        toast.error("Email is required", { theme: "dark" });
        return;
      }
      if (!signupForm.userName) {
        toast.error("Username is required", { theme: "dark" });
        return;
      }
      if (!signupForm.password) {
        toast.error("Password is required", { theme: "dark" });
        return;
      }
      if (signupForm.password !== signupForm.confirmPassword) {
        toast.error("Password doesn't match", { theme: "dark" });
        return;
      }
      let req = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupForm),
      });

      const data = await req.json();
      if (data.signup) {
        toast.success("Check your email", { theme: "dark" });
        router.push(`/otp?check=${data.otpHash}`);
      } else {
        toast.error(data.message, { theme: "dark" });
      }
    } catch (error) {
      toast.error(error.message, { theme: "dark" })
    } finally {
      setloading(false)
      toast.dismiss(loadingToast)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-3">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Create Account 🚀
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Join us and start your journey
        </p>

        <div className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={signupForm?.name || ""}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              User Name
            </label>

            <input
              type="text"
              name="userName"
              value={signupForm?.userName || ""}
              onChange={handleChange}
              placeholder="Enter your User Name"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={signupForm?.email || ""}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={signupForm?.password || ""}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={signupForm?.confirmPassword || ""}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button disabled={loading} onClick={signupReq} className="w-full disabled:cursor-not-allowed disabled:opacity-60 bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg text-white font-semibold">
            Create Account
          </button>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-600"></div>
          <span className="px-4 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-600"></div>
        </div>

        <button onClick={() => signIn("google")} className="w-full flex items-center justify-center gap-3 py-3 rounded-lg bg-white text-gray-800 font-semibold hover:bg-gray-100 transition">
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}