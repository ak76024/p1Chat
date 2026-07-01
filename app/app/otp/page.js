"use client";
import { useState, useRef, useEffect } from "react";
import { FiShield } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { verifyOtpPage } from "./function/userAction";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function VerifyOTP() {
  const [timer, settimer] = useState(25)
  const [resendOtp, setresendOtp] = useState(false)
  const params = useSearchParams();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);
  const check = params.get("check");
  const redirect = useRouter()

  useEffect(() => {
    (async () => {
      let aa = toast.loading("Verifying OTP Page...", { theme: "dark" })
      let a = await verifyOtpPage(check)
      if (!a) {
        toast.error("Invalid OTP Request", { theme: "dark" })
        toast.dismiss(aa);
        redirect.push("/signup")
      }
      toast.dismiss(aa);
    })()
  }, [])

  useEffect(() => {
    if (timer === 0) {
      setresendOtp(true);
      return;
    }

    const timeout = setTimeout(() => {
      settimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const sendOtp = async () => {
    let loading = toast.loading("Verifying OTP...", { theme: "dark" });
    try {
      const enteredOtp = otp.join("");

      if (enteredOtp.length !== 6) {
        toast.error("Please enter a valid OTP..", {
          theme: "dark",
        });
        return;
      }

      let otpr = otp.join("");

      const res = await fetch("/api/verifyOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otpr ,otpHash:check}),
      })

      const data = await res.json();
      if(data.verified){
        toast.success("OTP Verified Successfully, Login Now..", {
          theme: "dark",
        })
        redirect.push("/login")
      }else{
        toast.error(data.message, {
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        theme: "dark",
      });
    }finally{
      toast.dismiss(loading);
    }
  };

  return (
    <main className="min-h-screen bg-[#111827] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-[#1F2937] border border-slate-700 rounded-3xl p-8 shadow-2xl">

        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-indigo-600/20 flex items-center justify-center">
            <FiShield className="text-4xl text-indigo-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-white mt-6">
          Verify Email
        </h1>

        <p className="text-slate-400 text-center mt-3">
          Enter the 6-digit verification code sent to
        </p>

        <p className="text-indigo-400 text-center font-semibold mt-1">
          akash@gmail.com
        </p>

        {/* OTP */}
        <div className="flex justify-between gap-3 mt-8">

          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 text-center text-2xl text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
          ))}

        </div>

        {/* Button */}
        <button onClick={sendOtp} className="w-full disabled:opacity-50 disabled:hover:from-indigo-600 disabled:hover:to-purple-600 disabled:cursor-not-allowed cursor-pointer mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition rounded-xl py-3 font-semibold text-white">
          Verify OTP
        </button>

        {/* Timer */}
        <p className="text-center text-slate-400 mt-6">
          Resend code in
          <span className="text-indigo-400 font-semibold ml-1">
            00:{timer > 9 ? timer : `0${timer}`}
          </span>
        </p>

        <button disabled={!resendOtp} className="w-full disabled:opacity-50 disabled:hover:from-indigo-600 disabled:hover:to-purple-600 disabled:cursor-not-allowed cursor-pointer mt-3 text-indigo-400 hover:text-indigo-300 transition">
          Resend Code
        </button>

      </div>

    </main>
  );
}