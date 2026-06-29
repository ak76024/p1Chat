"use client";

import { FiBell, FiMoon, FiSearch } from "react-icons/fi";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <header className="h-20 bg-slate-800 border-b border-slate-700 px-8 flex items-center justify-between">
      {/* Search */}
      <div className="relative w-96">
        <FiSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={20}
        />

        <input
          type="text"
          placeholder="Search users..."
          className="w-full bg-slate-700 text-white rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <button className="relative text-slate-300 hover:text-white transition">
          <FiBell size={22} />

          <span className="absolute -top-2 -right-3 h-5 min-w-6 px-1 text-center rounded-full bg-red-500 text-xs flex items-center justify-center text-white">
            3
          </span>
        </button>

        {/* Dark Mode */}
        <button className="text-slate-300 hover:text-white transition">
          <FiMoon size={22} />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <Link href={`/user/${session.user.userName}`}>
            <h3 className="text-white font-semibold">{session.user.name.split(" ")[0]}</h3>
            <p className="text-xs text-green-400">Online</p>
          </Link>
        </div>
      </div>
    </header>
  );
}