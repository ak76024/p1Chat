"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useSession, signIn } from "next-auth/react"
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { data: session } = useSession()
  const [loginForm, setloginForm] = useState({ email: "", password: "" })
  const [forgatePassForm, setforgatePassForm] = useState("")
  const [showPass, setshowPass] = useState(false)
  const [loginBtn, setloginBtn] = useState(false)
  const [forBtn, setforBtn] = useState(false)
  const [ShowLoginForm, setShowLoginForm] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleChange = (e) => {
    setloginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  }

  const handleChangeFor=(e)=>{
    setforgatePassForm(e.target.value)
  }

  const loginReq = async () => {
    setloginBtn(true)
    let loadingToast = toast.loading("Logging in...", { theme: "dark" });
    try {
      if (!loginForm.email) {
        toast.error("Email is required", { theme: "dark" });
        return;
      }
      if (!loginForm.password) {
        toast.error("Password is required", { theme: "dark" });
        return;
      }
      let login = await signIn("credentials", {
        email: loginForm.email,
        password: loginForm.password,
        redirect: false,
      });
      if (login.ok) {
        toast.success("Login Successfull", { theme: "dark" });
        router.push("/dashboard")
      } else {
        toast.error(login.error, { theme: "dark" });
      }
    } catch (error) {
      toast.error(`${error.message}`, { theme: "dark" });
    } finally {
      setloginBtn(false)
      toast.dismiss(loadingToast);
    }
  }

  const otpReq=async ()=>{
    let loadingToast = toast.loading("Sending OTP...", { theme: "dark" });
    setforBtn(true)
    try{
      if(!forgatePassForm){
        toast.error("Email is required", { theme: "dark" });
        return;
      }
      let req = await fetch("/api/forgotPass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgatePassForm }),
      })
      let data = await req.json();
      if(data.sendOtp){
        toast.success("OTP Sent Successfully", { theme: "dark" });
        router.push(`/otp?check=${data.otpHash}&reason=forgotPass`);
      }else{
        toast.error(data.message, { theme: "dark" });
      }
    }catch(error){
      toast.error(`${error.message}`, { theme: "dark" });
    }finally{
      setforBtn(false)
      toast.dismiss(loadingToast);
    }
  }

  if (ShowLoginForm) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-white mb-2">
            Welcome Back 👋
          </h1>

          <p className="text-center text-gray-400 mb-8">
            Sign in to continue
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-gray-300 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={loginForm.email}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">
                Password
              </label>

              <input
                type={showPass ? "text" : "password"}
                name="password"
                onChange={handleChange}
                value={loginForm.password}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-400">
                <input type="checkbox" onChange={() => setshowPass(!showPass)} />
                Show Password
              </label>

              <p onClick={() => {setShowLoginForm(false), setloginForm({ email: "", password: "" })}} className="text-blue-400 cursor-pointer hover:underline">
                Forgot Password?
              </p>
            </div>

            <button onClick={loginReq} disabled={loginBtn} className="w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg text-white font-semibold">
              Login
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          {/* Google Button */}
          <button type="button" onClick={() => signIn("google")} className="w-full flex items-center justify-center gap-3 py-3 rounded-lg bg-white text-gray-800 font-semibold hover:bg-gray-100 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <p className="text-center text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    );
  }else{
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-white mb-2">
            Forgot Password 
          </h1>

          <p className="text-center text-gray-400 mb-8">
            Sign in to continue
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-gray-300 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                onChange={handleChangeFor}
                value={forgatePassForm}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-400">
              </label>

              <p onClick={()=>{setShowLoginForm(true);setforgatePassForm("")}} className="text-blue-400 cursor-pointer hover:underline">
                Back to Login
              </p>
            </div>

            <button onClick={otpReq} disabled={forBtn} className="w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg text-white font-semibold">
              Send OTP
            </button>
          </div>
        </div>
      </div>
    );
  }
}