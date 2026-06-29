"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
export default function Settings() {
    
    return (
        <div className="min-h-screen bg-[#111827] text-white p-8">
            <h1 className="text-3xl font-bold mb-8">Settings</h1>

            <div className="space-y-6">

                {/* Profile */}
                <section className="bg-slate-800 rounded-xl p-5">
                    <h2 className="text-lg font-semibold mb-4">Profile</h2>

                    <div className="space-y-3">
                        <Link href="/dashboard/editprofile" className="w-full flex justify-between hover:bg-slate-700 p-3 rounded-lg">
                            <button className="w-full flex justify-between hover:bg-slate-700 p-3 rounded-lg">
                                <span>Edit Profile</span>
                                <span>→</span>
                            </button>
                        </Link>
                    </div>
                </section>

                {/* Privacy */}
                <section className="bg-slate-800 rounded-xl p-5">
                    <h2 className="text-lg font-semibold mb-4">Privacy</h2>

                    <div className="flex justify-between py-3">
                        <span>Private Account</span>
                        <input type="checkbox" />
                    </div>

                    <div className="flex justify-between py-3">
                        <span>Show Online Status</span>
                        <input type="checkbox" />
                    </div>

                    <div className="flex justify-between py-3">
                        <span>Read Receipts</span>
                        <input type="checkbox" />
                    </div>
                </section>

                {/* Appearance */}
                <section className="bg-slate-800 rounded-xl p-5">
                    <h2 className="text-lg font-semibold mb-4">Appearance</h2>

                    <div className="flex justify-between py-3">
                        <span>Dark Mode</span>
                        <input type="checkbox" />
                    </div>
                </section>

                {/* Logout */}
                <button type="button" onClick={() => signOut()} className="w-full bg-red-600 hover:bg-red-700 transition rounded-xl py-3 font-semibold">
                    Logout
                </button>

            </div>
        </div>
    );
}