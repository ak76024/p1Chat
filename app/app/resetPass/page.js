"use client";

import { useEffect, useState } from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { verifyOtpPage } from "../otp/function/userAction";

export default function ResetPassword() {
  const router = useRouter();
  const params = useSearchParams();

  const check = params.get("check");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!check) {
        toast.error("Invalid password reset request.", {
          theme: "dark",
        });
        router.push("/login");
        return;
      }

      const toastId = toast.loading("Verifying request...", {
        theme: "dark",
      });

      try {
        const valid = await verifyOtpPage(check);

        if (!valid) {
          toast.error("Invalid or expired reset link.", {
            theme: "dark",
          });

          router.push("/login");
        }
      } catch (err) {
        toast.error("Something went wrong.", {
          theme: "dark",
        });

        router.push("/login");
      } finally {
        toast.dismiss(toastId);
      }
    })();
  }, [check, router]);

  const changePassword = async () => {
    if (!password || !confirmPassword) {
      toast.error("All fields are required.", {
        theme: "dark",
      });
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.", {
        theme: "dark",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", {
        theme: "dark",
      });
      return;
    }

    setLoading(true);

    const toastId = toast.loading("Updating password...", {
      theme: "dark",
    });

    try {
      const res = await fetch("/api/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          check,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (data.changed) {
        toast.success("Password changed successfully.", {
          theme: "dark",
        });

        router.push("/login");
      } else {
        toast.error(data.message, {
          theme: "dark",
        });
      }
    } catch (err) {
      toast.error("Something went wrong.", {
        theme: "dark",
      });
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <main className="min-h-screen bg-[#111827] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-[#1F2937] border border-slate-700 rounded-3xl p-8 shadow-2xl">

        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-indigo-600/20 flex items-center justify-center">
            <FiLock className="text-4xl text-indigo-400" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-white mt-6">
          Reset Password
        </h1>

        <p className="text-slate-400 text-center mt-3">
          Create a new password for your account.
        </p>

        {/* Password */}
        <div className="relative mt-8">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 pr-12 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative mt-5">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 pr-12 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            {showConfirmPassword ? (
              <FiEyeOff size={20} />
            ) : (
              <FiEye size={20} />
            )}
          </button>
        </div>

        {/* Button */}
        <button
          disabled={loading}
          onClick={changePassword}
          className="w-full mt-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>

      </div>

    </main>
  );
}