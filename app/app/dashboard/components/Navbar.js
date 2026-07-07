"use client";

import { FiBell, FiMoon, FiSearch } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setuser] = useState(null);
  useEffect(() => {
    (async()=>{
      let user = await fetch('/api/user');
      let {name} = await user.json();
      setuser(name);
    })()
  }, [])
  
  return (
    <header className="h-20 bg-slate-800 border-b border-slate-700 px-8 flex items-center justify-between">
      <div>
      <h1 className="text-3xl font-bold">
          Welcome Back, {user} 👋
        </h1>

        <p className="text-gray-200 mt-2">
          Stay connected with your friends.
        </p>
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
          <Link href={`/user/${user}`}>
            <h3 className="text-white font-semibold">{user?.split(" ")[0]}</h3>
            <p className="text-xs text-green-400">Online</p>
          </Link>
        </div>
      </div>
    </header>
  );
}